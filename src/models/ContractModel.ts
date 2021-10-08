import {Required, Default} from "@tsed/schema";

export class CallParams {
  @Required()
  account_id: string;

  args: Record<string, unknown> | null;

  @Default("200000000000000")
  gas: string;

  @Default("0")
  deposit: string;
}
