import {Controller, Get, Post, PathParams, BodyParams} from "@tsed/common";
import {CallParams} from "../models/ContractModel";

@Controller("/contract")
export class ContractController {
  @Post("/:contractId/:methodName")
  async call(
    @PathParams("contractId") contractId: string,
    @PathParams("methodName") methodName: string,
    @BodyParams() params: CallParams
  ): Promise<string> {
    console.log(params);
    return `${contractId}/${methodName}`;
  }

  @Get("/:contractId/:methodName")
  async view(@PathParams("contractId") contractId: string, @PathParams("methodName") methodName: string): Promise<string> {
    return `${contractId}/${methodName}`;
  }
}
