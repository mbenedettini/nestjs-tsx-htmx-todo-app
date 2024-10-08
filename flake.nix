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
                # CI value:
                defaultHash = "sha256-FAt2ZKlM5ZGK3jQgVV0YOXhf0wm+XNogR6AA11rOTps=";
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
            # cp -r lib $out/lib
            # cp -r web $out/web
            # cp -r schemas $out/schemas
            cp package.json $out/
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
      });


      devShell = forAllSystems ({ pkgs }: pkgs.mkShell {
        buildInputs = with pkgs; [
          nodejs_20
          pnpm_9
        ];
      });
    };
}
