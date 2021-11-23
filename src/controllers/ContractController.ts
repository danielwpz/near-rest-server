import { Controller, Get, Post, PathParams, BodyParams, Req, PlatformRequest, UseBefore } from "@tsed/common";
import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import _ from 'lodash';
import { ContractService } from "../services/ContractService";
import { CallParams } from "../models/ContractModel";
import ParseNumberMiddleware from "../middlewares/ParseNumberMiddleware";

@Controller("/contract")
export class ContractController {
  constructor(private readonly service: ContractService) { }

  @Post("/:contractId/:methodName")
  async call(
    @PathParams("networkId") networkId: string,
    @PathParams("contractId") contractId: string,
    @PathParams("methodName") methodName: string,
    @BodyParams(CallParams) params: CallParams
  ): Promise<FinalExecutionOutcome> {
    const result = await this.service.callMethod(
      networkId,
      params.account_id, 
      contractId, 
      methodName, 
      params.args || {}, 
      params.gas, 
      params.deposit
    );
    return result;
  }

  @Get("/:contractId/:methodName")
  @UseBefore(ParseNumberMiddleware)
  async view(
    @Req() req: PlatformRequest,
    @PathParams("networkId") networkId: string,
    @PathParams("contractId") contractId: string,
    @PathParams("methodName") methodName: string
  ): Promise<string> {
    return this.service.viewMethod(
      networkId,
      contractId, 
      methodName, 
      _.isEmpty(req.body) ? req.query : req.body);
  }
}
