# Bash version of the OSC7 reporter. See herdr-osc7.zsh for why this exists.
#
# Install: source this file from ~/.bashrc
#
#     source /path/to/herdr-radar/shell/herdr-osc7.bash

__herdr_osc7() {
  local win rest
  # In the shell, not by calling cygpath: this runs before every prompt, and a
  # subprocess on Windows costs real kernel time. See the zsh version.
  case $PWD in
    /[a-zA-Z]/*|/[a-zA-Z])
      rest="${PWD:2}"
      win="${PWD:1:1}:${rest:-/}"
      win="${win^}"
      ;;
    *) win=$PWD ;;
  esac
  printf '\033]7;file:///%s\033\\' "${win#/}"
}

# Prepend rather than replace: other tools put things here too.
case "$PROMPT_COMMAND" in
  *__herdr_osc7*) ;;
  *) PROMPT_COMMAND="__herdr_osc7${PROMPT_COMMAND:+; $PROMPT_COMMAND}" ;;
esac
