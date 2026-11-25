#!/usr/bin/env bash
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
chmod +x "$DIR/host.py" "$DIR/termux_server.py"
mkdir -p ~/bridge_workspace

if [ -n "$TERMUX_VERSION" ]; then
    pkg update -y && pkg install python zip -y
    if [ -d "/sdcard/Download" ]; then
        cd "$DIR/extension" && zip -r /sdcard/Download/aether_bridge_extension.zip . >/dev/null
    fi
    printf '#!/usr/bin/env bash\npython3 "%s/termux_server.py"\n' "$DIR" > "$PREFIX/bin/aether-bridge"
    chmod +x "$PREFIX/bin/aether-bridge"
    echo "✅ Installazione Android/Termux completata! Avvia con: aether-bridge"
    exit 0
fi

read -p "Incolla l'ID dell'estensione (32 caratteri): " EXT_ID
[ -z "$EXT_ID" ] && echo "ID non valido" && exit 1

OS="$(uname -s)"
TARGETS=()
if [ "$OS" = "Linux" ]; then
    TARGETS=("$HOME/.config/google-chrome/NativeMessagingHosts" "$HOME/.config/chromium/NativeMessagingHosts" "$HOME/.config/BraveSoftware/Brave-Browser/NativeMessagingHosts" "$HOME/.config/microsoft-edge/NativeMessagingHosts")
elif [ "$OS" = "Darwin" ]; then
    TARGETS=("$HOME/Library/Application Support/Google/Chrome/NativeMessagingHosts" "$HOME/Library/Application Support/Chromium/NativeMessagingHosts" "$HOME/Library/Application Support/BraveSoftware/Brave-Browser/NativeMessagingHosts" "$HOME/Library/Application Support/Microsoft Edge/NativeMessagingHosts")
fi

for TARGET in "${TARGETS[@]}"; do
    mkdir -p "$TARGET"
    cat << JSON > "$TARGET/aether_bridge.json"
{
  "name": "aether_bridge",
  "description": "Ponte locale per Aether Bridge",
  "path": "$DIR/host.py",
  "type": "stdio",
  "allowed_origins": [
    "chrome-extension://$EXT_ID/"
  ]
}
JSON
    echo "✅ Configurato: $TARGET/aether_bridge.json"
done
