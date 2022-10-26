# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.245.0/containers/codespaces-linux/.devcontainer/base.Dockerfile

FROM mcr.microsoft.com/vscode/devcontainers/universal:2-linux

# ** [Optional] Uncomment this section to install additional packages. **
# USER root
#
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>
#
USER codespace

# SET NPM_TOKEN to a valid token to use for the atos-parallel package registry
RUN npm config set //npm.pkg.github.com/:_authToken '${NPM_TOKEN}'

# Stick to legacy OpenSSL with node 17 and higher until we migrate to webpack 5
# https://github.com/webpack/webpack/issues/14532
# RUN export NODE_OPTIONS=--openssl-legacy-provider
