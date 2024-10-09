import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "node:path";

import { AppModule } from "./app.module";
import KitaViews from "./kita-views";

// Node Modules to be exposed as static assets (see layouts/base.tsx)
const nodeModulesAssets = ["htmx.org", "alpinejs"];

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, "../..", "assets"), {
    prefix: "/assets/",
  });
  const viewsDirectory = join(__dirname, "views");
  app.setBaseViewsDir(viewsDirectory);
  // NestJS runs built code so .js extension will be expected for
  // views and layouts. Change to .tsx if you have an Express.js app
  // using ts-node or tsx.
  app.engine(
    "js",
    KitaViews({
      viewsDirectory,
    }),
  );
  app.set("view engine", "js");
  app.set("views", viewsDirectory);

  for (const asset of nodeModulesAssets) {
    app.useStaticAssets(
      join(__dirname, "../..", "node_modules", asset),
      {
        prefix: `/${asset}/`,
      },
    );
  }

  await app.listen(process.env.PORT || 3100);
}
bootstrap();
