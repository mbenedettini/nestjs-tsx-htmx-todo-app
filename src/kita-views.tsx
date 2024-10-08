import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from "@nestjs/common";
import { Application, Request } from "express";
import { resolve } from "node:path";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
class DefaultLayoutInterceptor implements NestInterceptor {
  constructor(private readonly defaultLayout: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const routeName =
      (request.path ?? "unknown")
        ?.split("?")[0]
        ?.replace(/^\/+/, "")
        ?.replace(/\/+$/, "") || "unknown";

    let defaultLayout = this.defaultLayout;
    if (Boolean(request.headers["hx-request"])) {
      defaultLayout = "layouts/partial";
    }

    return next.handle().pipe(
      map((data) => {
        if (typeof data === "object" && !Array.isArray(data)) {
          return { ...data, defaultLayout, routeName };
        }
        return { view: data, defaultLayout, routeName };
      }),
    );
  }
}

export function DefaultLayout(layout: string) {
  return UseInterceptors(new DefaultLayoutInterceptor(layout));
}

export const DEFAULT_LAYOUT_KEY = "defaultLayout";

type EngineCallbackParameters = Parameters<
  Parameters<Application["engine"]>[1]
>;

interface KitaViewsOptions {
  viewsDirectory: string;
}

interface ExpressRenderOptions {
  [name: string]: unknown;
  req: Request;
  defaultLayout?: string;
  layout?: string;
}

export default function KitaViews(viewOptions: KitaViewsOptions) {
  return async function renderFile(
    ...[filename, options, next]: EngineCallbackParameters
  ): Promise<void> {
    const expressRenderOptions = options as ExpressRenderOptions;
    const { ...props } = expressRenderOptions;

    // Check for default layout from decorator
    const layout =
      expressRenderOptions.layout || expressRenderOptions.defaultLayout;
    if (!layout) {
      throw new Error("No layout provided");
    }

    try {
      const Component = (await import(filename)).default;

      if (!Component) {
        throw new Error(`Module ${filename} does not have a default export`);
      }

      if (layout) {
        const layoutPath = resolve(viewOptions.viewsDirectory, layout);
        const Layout = (await import(layoutPath)).default;

        if (!Layout) {
          throw new Error(
            `Layout ${layoutPath} does not have a default export`,
          );
        }

        const res = (
          <Layout {...props} safe>
            <Component {...props} />
          </Layout>
        );

        next(null, await res);
      } else {
        const res = <Component {...props} safe />;
        next(null, await res);
      }
    } catch (error) {
      next(error);
    }
  };
}
