import { $log } from "@tsed/common";
import { PlatformKoa } from "@tsed/platform-koa";
import { Server } from "./Server";

async function bootstrap() {
  try {
    const network = process.env.NODE_ENV || 'testnet';
    $log.info(`NEAR network is: ${network}`);

    $log.debug("Start server...");
    const platform = await PlatformKoa.bootstrap(Server);

    await platform.listen();
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
