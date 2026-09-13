#!/usr/bin/env bash
# Installs Pi and makes the repository's non-secret Novita model configuration
# available to the dev-container user. The API key remains in the mounted file.

set -euo pipefail

readonly PI_CONFIG_DIRECTORY="${HOME}/.pi/agent"
readonly NOVITA_KEY_FILE="${HOME}/.novita-key"
readonly MODELS_SOURCE=".devcontainer/pi-models.json"
readonly MODELS_DESTINATION="${PI_CONFIG_DIRECTORY}/models.json"

# install_pi installs the Pi coding-agent CLI for the current dev-container user.
#
# Arguments: none.
# Returns: 0 when npm installs Pi successfully.
# Errors: exits non-zero if npm cannot install the package.
# Side effects: writes the global npm package and executable.
install_pi() {
  npm install --global @mariozechner/pi-coding-agent
}

# install_novita_models copies the tracked, credential-free provider definition.
#
# Arguments: none.
# Returns: 0 after the configuration is installed.
# Errors: exits non-zero if the source configuration cannot be read or copied.
# Side effects: creates and writes Pi's per-user configuration directory.
install_novita_models() {
  install --directory --mode=700 "${PI_CONFIG_DIRECTORY}"
  install --mode=600 "${MODELS_SOURCE}" "${MODELS_DESTINATION}"
}

# require_novita_key verifies the host key file was mounted before configuring Pi.
#
# Arguments: none.
# Returns: 0 when a non-empty key file is present.
# Errors: writes a rebuild instruction to stderr and exits 1 when the file is absent.
# Side effects: none.
require_novita_key() {
  if [[ -s "${NOVITA_KEY_FILE}" ]]; then
    return 0
  fi

  printf '%s\n' "Missing ${NOVITA_KEY_FILE}. Create ~/.novita-key on the host, then rebuild the dev container." >&2
  return 1
}

require_novita_key
install_pi
install_novita_models
