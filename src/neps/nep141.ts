import { Required, Property } from "@tsed/schema";
import { NEP } from "./NEPStandard";

class FTBalanceOfArgs {
    @Required()
    account_id: string;
}

class FTTransferArgs {
    @Required()
    receiver_id: string;

    @Required()
    amount: string;

    @Property()
    memo?: string;
}

const NEP141: NEP = {
    name: 'nep141',
    changeMethods: [
        {
            methodName: 'ft_transfer',
            callArgs: FTTransferArgs
        }
    ],
    viewMethods: [
        {
            methodName: 'ft_balance_of',
            callArgs: FTBalanceOfArgs
        }
    ]
}

export default NEP141;
