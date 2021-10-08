import {Controller, Get, Post, PathParams, BodyParams, Req, PlatformRequest} from "@tsed/common";
import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import {ContractService} from "src/services/ContractService";
import {CallParams} from "../models/ContractModel";

@Controller("/contract")
export class ContractController {
  constructor(private readonly service: ContractService) {}

  @Post("/:contractId/:methodName")
  async call(
    @PathParams("contractId") contractId: string,
    @PathParams("methodName") methodName: string,
    @BodyParams(CallParams) params: CallParams
  ): Promise<FinalExecutionOutcome> {
    console.log(`Calling ${contractId}.${methodName} with args:`);
    console.log(params);
    const result = await this.service.callMethod(params.account_id, contractId, methodName, params.args || {}, params.gas, params.deposit);
    return result;
  }

  @Get("/:contractId/:methodName")
  async view(
    @Req() req: PlatformRequest,
    @PathParams("contractId") contractId: string,
    @PathParams("methodName") methodName: string
  ): Promise<string> {
    return this.service.viewMethod(contractId, methodName, req.query);
  }
}
