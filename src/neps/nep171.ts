import { Required, Property } from "@tsed/schema";
import { NEP } from "./NEPStandard";


class NFTTransferArgs {
  @Required()
  receiver_id: string;

  @Required()
  token_id: string;

  @Property()
  approval_id?: number;

  @Property()
  memo?: string;
}

class NFTTokenArgs {
  @Required()
  token_id: string;
}

const NEP171: NEP = {
  name: 'nep171',
  changeMethods: [
    {
      methodName: 'nft_transfer',
      callArgs: NFTTransferArgs
    }
  ],
  viewMethods: [
    {
      methodName: 'nft_token',
      callArgs: NFTTokenArgs
    }
  ]
}

export default NEP171;
