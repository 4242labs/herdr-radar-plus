# Report the working directory to the terminal on every prompt (OSC7).
#
# Why this matters for Herdr:
#
# Herdr only knows where a pane was *launched*. It does not see a later `cd`
# (its own Windows support matrix calls live cwd "partial", and `herdr pane
# process-info` does not track it either — both keep reporting the launch
# directory). That stale value is what `resume_agents_on_restore` uses to
# relaunch agents after a server restart, so an agent started from the home
# directory and then pointed at a project comes back sitting in the home
# directory — wrong context, and a trust prompt on top.
#
# OSC7 is the escape sequence a shell uses to tell its terminal where it is.
# Herdr honours it, which makes `cd` visible to Herdr and the recorded cwd
# correct. One requirement, found the hard way: the URL host must be EMPTY.
#
#     file:///C:/code/project     works
#     file://HOSTNAME/C:/code/... ignored
#
# Install: source this file from ~/.zshrc
#
#     source /path/to/herdr-radar/shell/herdr-osc7.zsh
#
# Harmless outside Herdr: OSC7 is a standard sequence that other terminals
# either use for the same purpose or ignore.

__herdr_osc7() {
  local win
  # /c/code/x -> C:/code/x, done in the shell rather than by calling cygpath.
  #
  # This runs before every prompt, and on Windows a subprocess is not cheap: a
  # measured prompt on this machine spent about 150ms of kernel time on this one
  # call alone, on top of whatever the theme spawns. Multiply by one prompt per
  # finished command per pane and it stops being rounding error. The expansion
  # agrees with `cygpath -m` on /c/code/work, on /c, and on other drives.
  #
  # Anything that is not a Windows drive path — every Linux and macOS path —
  # falls through unchanged, which is what those shells already need.
  case $PWD in
    /[a-zA-Z]/*|/[a-zA-Z])
      win="${(U)PWD[2]}:${PWD:2}"
      [[ $win == *: ]] && win="$win/"
      ;;
    *) win=$PWD ;;
  esac
  printf '\033]7;file:///%s\033\\' "${win#/}"
}

autoload -Uz add-zsh-hook
add-zsh-hook precmd __herdr_osc7
