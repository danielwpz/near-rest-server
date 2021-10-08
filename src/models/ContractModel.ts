import {Required, Default, Property} from "@tsed/schema";

export class CallParams {
  @Required()
  account_id: string;

  @Property()
  args: Record<string, unknown>;

  @Default("200000000000000")
  gas: string;

  @Default("0")
  deposit: string;
}
