import Html from "@kitajs/html";

export default function BaseLayout({ children }: Html.PropsWithChildren) {
  return (
    <>
      {"<!doctype html>"}
      <html lang="en" class="h-full bg-white">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Todo</title>
          <script src="https://unpkg.com/htmx.org@1.9.10" />
          <script src="https://unpkg.com/hyperscript.org@0.9.12" />
          <link
            rel="stylesheet"
            type="text/css"
            href="/assets/fonts/inter/inter.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/assets/dist/index.css"
          />
          <script
            src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
            defer
          />
        </head>
        <body class="h-full bg-gray-100">{children}</body>
      </html>
    </>
  );
}
