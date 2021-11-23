import { Service } from "@tsed/di";
import config from "config";
import * as nearApi from "near-api-js";
import _ from "lodash";

@Service()
export class NearAPI {
  nearInstances: {[network: string]: Promise<nearApi.Near>};
  anonymousAccounts: {[network: string]: nearApi.Account};

  constructor() {
    const keyStore = new nearApi.keyStores.UnencryptedFileSystemKeyStore(config.get("keyStorePath"));
    // eslint-disable-next-line
    const networks: Record<string, any> = config.get("networkConfig");

    this.nearInstances = _.mapValues(networks, config => {
      const nearConfig = {
        networkId: config.id,
        nodeUrl: config.rpc,
        deps: {
          keyStore
        }
      };

      return nearApi.connect(nearConfig);
    });

    this.anonymousAccounts = _.mapValues(networks, config => {
      const provider = new nearApi.providers.JsonRpcProvider(config.rpc);
      // eslint-disable-next-line
      return new nearApi.Account({ provider } as any, 'nobody.near');
    });

  }

  async getNear(networkId: string): Promise<nearApi.Near> {
    if (!this.nearInstances[networkId]) {
      throw new Error(`wrong network id: ${networkId}`);
    }
    return this.nearInstances[networkId];
  }

  getAnonymousAccount(networkId: string): nearApi.Account {
    if (!this.anonymousAccounts[networkId]) {
      throw new Error(`wrong network id: ${networkId}`);
    }
    return this.anonymousAccounts[networkId];
  }
}
