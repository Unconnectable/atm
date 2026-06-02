"""ATM 系统 Web 服务器 — 提供静态文件服务和 data.json 读写 API，确保桌面版与 Web 版数据同步。"""
import http.server
import json
import os
import urllib.parse

DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data.json')


class ATMHandler(http.server.SimpleHTTPRequestHandler):
    """自定义请求处理器，在静态文件服务基础上增加 /api/data 端点。"""

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/data':
            self._serve_data_file()
        else:
            super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/data':
            self._save_data_file()
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def _serve_data_file(self):
        try:
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                data = f.read()
            self._send_json(200, data)
        except FileNotFoundError:
            self._send_json(404, json.dumps({"error": "data.json not found"}))

    def _save_data_file(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            with open(DATA_FILE, 'w', encoding='utf-8') as f:
                f.write(body.decode('utf-8'))
            self._send_json(200, json.dumps({"ok": True}))
        except Exception as e:
            self._send_json(500, json.dumps({"error": str(e)}))

    def _send_json(self, status, content):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(content.encode('utf-8'))

    def log_message(self, format, *args):
        pass  # 静默日志


def main():
    port = 8000
    server = http.server.HTTPServer(('', port), ATMHandler)
    print(f'ATM Server running at http://localhost:{port}')
    print(f'Data file: {DATA_FILE}')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nServer stopped.')


if __name__ == '__main__':
    main()
