import { Required, Default, Property } from "@tsed/schema";

export class CallParams {
  @Default("testnet")
  network_id: string;

  @Required()
  account_id: string;

  @Property()
  args: Record<string, unknown>;

  @Default("200 Tgas")
  gas: string = "200 Tgas";

  @Default("0")
  deposit: string = "0";
}
