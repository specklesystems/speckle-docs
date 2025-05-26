# .devcontainer/zshrc
HISTFILE=$HOME/.zsh_history
HISTSIZE=10000
SAVEHIST=10000

setopt INC_APPEND_HISTORY   # write each command as you go
setopt SHARE_HISTORY        # pull in commands from other sessions

alias rundev='CHOKIDAR_USEPOLLING=true cross-env NODE_OPTIONS=--openssl-legacy-provider vuepress dev'
