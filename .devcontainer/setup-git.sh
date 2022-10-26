#!/usr/bin/env bash

# Setup default git settings
git config --global core.autocrlf input
git config --global core.longpaths true
git config --global core.fsmonitor true

git config --global fetch.prune true
git config --global push.followTags true
git config --global rebase.updateRefs true

# Add useful git aliases
git config --global alias.godlog "log --oneline --decorate --graph"
git config --global alias.gone "! git fetch -p && git for-each-ref --format '%(refname:short) %(upstream:track)' | awk '\$2 == \"[gone]\" {print \$1}' | xargs -r git branch -D"
