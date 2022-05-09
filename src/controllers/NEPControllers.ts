import { Controller } from "@tsed/di";
import { Get, Post, Required, Default, Property } from "@tsed/schema";
import { NEP } from "../neps/NEPStandard";

import NEP171 from "../neps/nep171";
import NEP141 from "../neps/nep141";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import { ContractService } from "../services/ContractService";

const standards: NEP[] = [
  NEP171,
  NEP141,
]

for (const standard of standards) {
  @Controller(standard.name)
  class NEPController {
    constructor(private readonly service: ContractService) {}
  }

  // build all view methods
  if (standard.viewMethods) {
    for (const viewMethod of standard.viewMethods) {
      const methodBody = async function (networkId: string, contractId: string, query: typeof viewMethod.callArgs): Promise<unknown> {
        return this.service.viewMethod(networkId, contractId, viewMethod.methodName, query);
      }

      Object.defineProperty(NEPController.prototype, viewMethod.methodName, {
        value: methodBody
      });

      // decorate parameter
      const networkIdDecorator = PathParams('networkId');
      networkIdDecorator(NEPController.prototype, viewMethod.methodName, 0);
      const contractIdDecorator = PathParams('contractId');
      contractIdDecorator(NEPController.prototype, viewMethod.methodName, 1);
      const paramDecorator = QueryParams(viewMethod.callArgs);
      paramDecorator(NEPController.prototype, viewMethod.methodName, 2);

      const methodDecorator = Get(`/:contractId/${viewMethod.methodName}`);
      const descriptor = Object.getOwnPropertyDescriptor(NEPController.prototype, viewMethod.methodName);
      Reflect.decorate([methodDecorator], NEPController.prototype, viewMethod.methodName, descriptor); 
    }
  }

  // build all change methods

  if (standard.changeMethods) {
    for (const changeMethod of standard.changeMethods) {
      class ChangeMethodArgType {
        @Required()
        account_id: string;
      
        @Property()
        args: Record<string, unknown>;
      
        @Default("200 Tgas")
        gas: string = "200 Tgas";
      
        @Default("0")
        deposit: string = "0";
      }

      const methodBody = async function (networkId: string, contractId: string, body: ChangeMethodArgType): Promise<unknown> {
        console.log(`calling ${changeMethod.methodName}`);
        console.log(contractId);
        console.log(body);
        return this.service.callMethod(
          networkId, 
          body.account_id, 
          contractId, 
          changeMethod.methodName, 
          body.args, 
          body.gas, 
          body.deposit
        );
      }

      Object.defineProperty(NEPController.prototype, changeMethod.methodName, {
        value: methodBody
      });

      const methodDecorator = Post(`/:contractId/${changeMethod.methodName}`);
      const descriptor = Object.getOwnPropertyDescriptor(NEPController.prototype, changeMethod.methodName);
      Reflect.decorate([methodDecorator], NEPController.prototype, changeMethod.methodName, descriptor); 

      const networkIdDecorator = PathParams('networkId');
      networkIdDecorator(NEPController.prototype, changeMethod.methodName, 0);
      const contractIdDecorator = PathParams('contractId');
      contractIdDecorator(NEPController.prototype, changeMethod.methodName, 1);
      const bodyDecorator = BodyParams(ChangeMethodArgType);
      bodyDecorator(NEPController.prototype, changeMethod.methodName, 2);
    }
  }

  exports[standard.name] = NEPController;
}
