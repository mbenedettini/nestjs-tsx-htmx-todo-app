# NestJS + Server-Side TSX + HTMX Todo App

This is a simple todo app built with NestJS, Server-Side TSX, and HTMX that works
as an example or boilerplate for building full stack web apps using TypeScript
on the server side.

## Features

Backend:
- NestJS
- Server-Side TSX powered by [KitaJS](https://github.com/kitajs/html). If you are only
interested in this and you have an Express.js app you can just take `src/kita-views.tsx`
and add it to your project (make sure to check [KitaJS documentation to see how to setup
the project](https://github.com/kitajs/html/tree/master/packages/html#installing)).
- [Drizzle ORM](https://orm.drizzle.team/) + SQLite
- [Zod](https://github.com/colinhacks/zod) for requests validation (see `src/zod-nestjs.ts` for the NestJS integration)
- A [Nix Flake](https://nixos.wiki/wiki/Flakes) for development and building the project

Frontend:
- [HTMX](https://htmx.org/) + [AlpineJS](https://alpinejs.dev/) + [TailwindCSS](https://tailwindcss.com/)
- Add/Edit Todos using a Modal dialog.

Others:
- Linting and Formatting with [Biome](https://github.com/biomejs/biome)
- Optimized multi-stage Dockerfile (TODO)

## Usage

1) Clone this repo and use your favorite tool (NVM or whichever else) to have ready Node >= 20
and PNPM >= 9.

If you feel enthusiastic about Nix, you can install it following instructions [here](https://nix.dev/install-nix) and then run `nix develop` to enter a shell with the right Node version and PNPM.

2) Run `pnpm install` to install the dependencies.

3) Run `pnpm run migrations:migrate` to run migrations and create the database.

4) Run `pnpm run start:dev` to start the development server and go to `http://localhost:3100`.

## License

MIT
