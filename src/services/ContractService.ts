import { Service } from "@tsed/common";
import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import { NearAPI } from "../utils/near";
import BN from 'bn.js';

@Service()
export class ContractService {
  constructor(private readonly nearApi: NearAPI) { }

  async viewMethod(contractId: string, methodName: string, args?: Record<string, unknown>): Promise<string> {
    return this.nearApi.anonymousAccount.viewFunction(contractId, methodName, args);
  }

  async callMethod(
    accountId: string,
    contractId: string,
    methodName: string,
    args: Record<string, unknown>,
    gas?: string,
    deposit?: string
  ): Promise<FinalExecutionOutcome> {
    const near = await this.nearApi.near;
    const account = await near.account(accountId);
    return account.functionCall({
      contractId,
      methodName,
      args: args,
      gas: gas ? new BN(gas) : undefined,
      attachedDeposit: deposit ? new BN(deposit) : undefined
    });
  }
}
