# .devcontainer/Dockerfile
ARG VARIANT=18
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}

USER root
RUN apt-get update \
  && apt-get install -y zsh git curl \
  && rm -rf /var/lib/apt/lists/*

ENV ZSH=/home/node/.oh-my-zsh
# only clone if it doesn’t already exist
RUN if [ ! -d "${ZSH}" ]; then \
  git clone --depth=1 https://github.com/ohmyzsh/ohmyzsh.git "${ZSH}"; \
  fi \
  && cp "${ZSH}/templates/zshrc.zsh-template" /home/node/.zshrc \
  && sed -i 's|^export ZSH=.*|export ZSH="'"${ZSH}"'"|' /home/node/.zshrc \
  && sed -i 's|^ZSH_THEME=.*|ZSH_THEME="robbyrussell"|' /home/node/.zshrc \
  && echo "alias rundev='CHOKIDAR_USEPOLLING=true npm run dev'" >> /home/node/.zshrc

# Ensure the home dir is yours
RUN chown -R node:node /home/node

# Switch to the non-root user and set an (empty) workspace dir
USER node
WORKDIR /workspaces/speckle-docs
