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

class NFTTokensArgs {
  @Property()
  from_index?: string;

  @Property()
  limit?: number;
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
    },
    {
      methodName: 'nft_tokens',
      callArgs: NFTTokensArgs
    }
  ]
}

export default NEP171;
