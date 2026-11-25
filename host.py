#!/usr/bin/env python3
import sys, json, struct, subprocess, os

WORKSPACE = os.path.expanduser("~/bridge_workspace")
os.makedirs(WORKSPACE, exist_ok=True)

def get_message():
    raw_length = sys.stdin.buffer.read(4)
    if len(raw_length) == 0:
        sys.exit(0)
    message_length = struct.unpack('@I', raw_length)[0]
    message = sys.stdin.buffer.read(message_length).decode('utf-8')
    return json.loads(message)

def send_message(message_content):
    encoded_content = json.dumps(message_content).encode('utf-8')
    encoded_length = struct.pack('@I', len(encoded_content))
    sys.stdout.buffer.write(encoded_length)
    sys.stdout.buffer.write(encoded_content)
    sys.stdout.buffer.flush()

while True:
    received = get_message()
    if "cmd" in received:
        try:
            res = subprocess.run(received["cmd"], shell=True, cwd=WORKSPACE, capture_output=True, text=True, timeout=60)
            output = (res.stdout + res.stderr).strip() or "[Comando eseguito senza output]"
            send_message({"status": "ok", "output": output})
        except Exception as e:
            send_message({"status": "error", "output": str(e)})
