import { Service } from "@tsed/di";
import config from "config";
import * as nearApi from "near-api-js";

@Service()
export class NearAPI {
  near: Promise<nearApi.Near>;
  anonymousAccount: nearApi.Account;

  constructor() {
    const keyStore = new nearApi.keyStores.UnencryptedFileSystemKeyStore(config.get("keyStorePath"));
    const nearConfig = {
      networkId: config.get("network.id") as string,
      nodeUrl: config.get("network.rpc") as string,
      deps: {
        keyStore
      }
    };

    this.near = nearApi.connect(nearConfig);

    // account
    const provider = new nearApi.providers.JsonRpcProvider(config.get("network.rpc") as string);
    this.anonymousAccount = new nearApi.Account({ provider });
  }
}
