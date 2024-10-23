# NestJS + Server-Side TSX + HTMX Todo App

This is a simple todo app built with NestJS, server-side TSX, and HTMX that works
as an example or boilerplate for building full stack web apps using TypeScript
with all the ease of JSX to reutilize components on server side and
the mentioned HTMX + AlpineJS on the frontend.

Features a modal dialog to show the todo form elegantly resolved with AlpineJS events.

![Kapture 2024-10-23 at 18 45 39 ii](https://github.com/user-attachments/assets/7a029537-cb6b-480a-9dea-e2837b5623e0)


## Features

Backend:
- [NestJS](https://nestjs.com/)
- Server-Side TSX powered by [KitaJS](https://github.com/kitajs/html). If you are only
interested in this and you have an Express.js app you can just take `src/kita-views.tsx`
and add it to your project (make sure to check [KitaJS documentation to see how to setup
the project](https://github.com/kitajs/html/tree/master/packages/html#installing)).
- [Drizzle ORM](https://orm.drizzle.team/) + SQLite
- [Zod](https://github.com/colinhacks/zod) for requests validation (see `src/zod-nestjs.ts` for the NestJS integration)
- A [Nix Flake](https://nixos.wiki/wiki/Flakes) for development and building the project, including an optimized Docker image.

Frontend:
- [HTMX](https://htmx.org/) + [AlpineJS](https://alpinejs.dev/) + [TailwindCSS](https://tailwindcss.com/)
- Add/Edit Todos using a Modal dialog.

Others:
- Linting and Formatting with [Biome](https://github.com/biomejs/biome)

## Usage

1) Clone this repo and use your favorite tool (NVM or whichever else) to have ready Node >= 20
and PNPM >= 9.

  If you feel enthusiastic about Nix, you can install it following instructions [here](https://nix.dev/install-nix) and then run `nix develop` to enter a shell with the right Node version and PNPM.

2) Run `pnpm install` to install the dependencies.

3) Run `pnpm run migrations:migrate` to run migrations and create the database.

4) Run `pnpm run start:dev` to start the development server and go to `http://localhost:3100`.

## Build the Docker image

Cross platform building is not easy on Nix. If you are on MacOS or don't want to install Nix, it's just easier to run `nix build` inside a Linux container:

```sh
docker run --platform linux/amd64 -v .:/src -ti nixos/nix:2.24.9 bash -c "cd /src && nix build --extra-experimental-features nix-command --extra-experimental-features flakes --no-filter-syscalls --impure .#docker-image && rm todo-app.tar.gz && cp -L result todo-app.tar.gz" && docker load < todo-app.tar.gz
```

Then just run the image:

```sh
docker run --init -e PORT=3200 -p 3200:3200 todo-app:latest
```

and head to `http://localhost:3200`.

If you are on Linux, you can just run `nix build .#docker-image` and then `docker load -i result` and then `docker run --init -e PORT=3200 -p 3200:3200 todo-app:latest`.

## License

MIT
