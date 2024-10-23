{
  description = "Development environment and build for TODO project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    let
      allSystems = [
        "x86_64-linux" "aarch64-linux"
        "x86_64-darwin" "aarch64-darwin"
      ];
      forAllSystems = f: nixpkgs.lib.genAttrs allSystems (system: f {
        pkgs = import nixpkgs {
          inherit system;
          overlays = [
            (final: prev: {
              pnpm = prev.pnpm_9;
            })
          ];
        };
      });
    in
    {
      packages = forAllSystems ({ pkgs }: {
        app = pkgs.stdenv.mkDerivation (finalAttrs: {
          pname = "todo";
          version = "0.0.1";
          src = ./.;

          nativeBuildInputs = with pkgs; [
            nodejs_20
            pnpm.configHook
            cacert
            python3 # required for node-gyp
          ];

          pnpmDeps = pkgs.pnpm.fetchDeps {
            inherit (finalAttrs) pname version src;
            hash =
              let
                envHash = builtins.getEnv "PNPM_HASH";
                # linux/amd64 value
                defaultHash = "sha256-FkKSDmoPJJyx35jsOpSzQ10XDyLMHXxf80mQqhsfE2o=";
              in
              if envHash != "" then envHash else defaultHash;
          };

          buildPhase = ''
            pnpm run build
            rm -rf node_modules
            pnpm install --prod
          '';

          installPhase = ''
            mkdir -p $out
            cp -r node_modules $out/node_modules
            cp package.json $out/
            cp -r dist $out/dist
            cp -r src/db/migrations $out/dist/src/db/migrations
            cp -R assets $out/assets
          '';
        });

        extra-packages = pkgs.buildEnv {
          name = "extra-packages";
          paths = with pkgs; [
            nodejs_20
            pnpm
          ];
          pathsToLink = [ "/bin" ];
        };

        docker-image = pkgs.dockerTools.buildLayeredImage {
          name = "todo-app";
          tag = "latest";
          contents = [
            pkgs.nodejs_20
            pkgs.pnpm
            self.packages.${pkgs.system}.app
            pkgs.bash
            pkgs.coreutils-full
          ];
          config = {
            Cmd = [
              "${pkgs.bash}/bin/bash"
              "-c"
              ''
                ${pkgs.nodejs_20}/bin/node ${self.packages.${pkgs.system}.app}/dist/src/db/migrate.js && \
                exec ${pkgs.nodejs_20}/bin/node ${self.packages.${pkgs.system}.app}/dist/src/main.js
              ''
            ];
            WorkingDir = "/app";
            Env = [
              "NODE_ENV=production"
            ];
          };
        };

      });


      devShell = forAllSystems ({ pkgs }: pkgs.mkShell {
        buildInputs = with pkgs; [
          nodejs_20
          pnpm_9
        ];
      });

    };
}
