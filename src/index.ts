import {$log} from "@tsed/common";
import {PlatformKoa} from "@tsed/platform-koa";
import {Server} from "./Server";

async function bootstrap() {
  try {
    $log.debug("Start server...");
    const platform = await PlatformKoa.bootstrap(Server);

    await platform.listen();
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
