import { Controller, Get, Post, PathParams, BodyParams, Req, PlatformRequest } from "@tsed/common";
import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import _ from 'lodash';
import { ContractService } from "../services/ContractService";
import { CallParams } from "../models/ContractModel";

@Controller("/contract")
export class ContractController {
  constructor(private readonly service: ContractService) { }

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
    let query = req.query;
    if (query) {
      // by default parse all number-like args into number
      query = _.mapValues(query, v => {
        const parsed = _.toNumber(v);
        if (_.isNaN(parsed)) return v;
        return parsed;
      })
    }
    return this.service.viewMethod(contractId, methodName, _.isEmpty(req.body) ? query : req.body);
  }
}
