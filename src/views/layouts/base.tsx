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
          <script src="/htmx.org/dist/htmx.min.js" />
          <script defer src="/alpinejs/dist/cdn.min.js" />
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
        </head>
        <body class="h-full bg-gray-100">{children}</body>
      </html>
    </>
  );
}
