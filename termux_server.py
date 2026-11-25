#!/usr/bin/env python3
from http.server import HTTPServer, BaseHTTPRequestHandler
import json, subprocess, os

WORKSPACE = os.path.expanduser("~/bridge_workspace")
os.makedirs(WORKSPACE, exist_ok=True)

class Handler(BaseHTTPRequestHandler):
    def log_message(self, format, *args): pass
    def _cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
    def do_OPTIONS(self):
        self.send_response(200); self._cors(); self.end_headers()
    def do_POST(self):
        length = int(self.headers.get('Content-Length', 0))
        data = json.loads(self.rfile.read(length).decode('utf-8'))
        try:
            res = subprocess.run(data.get("cmd", ""), shell=True, cwd=WORKSPACE, capture_output=True, text=True, timeout=60)
            out = (res.stdout + res.stderr).strip() or "[Comando eseguito senza output]"
            resp = {"status": "ok", "output": out}
        except Exception as e:
            resp = {"status": "error", "output": str(e)}
        self.send_response(200); self.send_header('Content-Type', 'application/json'); self._cors(); self.end_headers()
        self.wfile.write(json.dumps(resp).encode('utf-8'))

print("🚀 Aether Bridge Server attivo su http://127.0.0.1:8765")
HTTPServer(('127.0.0.1', 8765), Handler).serve_forever()
