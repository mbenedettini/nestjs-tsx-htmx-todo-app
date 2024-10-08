import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "node:path";

import { AppModule } from "./app.module";
import KitaViews from "./kita-views";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const dir = join(__dirname, "../..", "assets");
  console.log(dir);
  app.useStaticAssets(dir, {
    prefix: "/assets/",
  });
  app.setBaseViewsDir(join(__dirname, "views"));

  const viewsDirectory = join(__dirname, "views");
  app.engine(
    "js",
    KitaViews({
      viewsDirectory,
    }),
  );
  app.set("view engine", "js");
  app.set("views", viewsDirectory);

  await app.listen(process.env.PORT || 3100);
}
bootstrap();
