#!/usr/bin/env python3
"""Local dev server that mimics .htaccess routing for pages/"""

import http.server
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080

ROUTES = {
    '/unsere-leistungen/': '/pages/unsere-leistungen/index.html',
    '/ueber-uns/':         '/pages/ueber-uns/index.html',
    '/kontakt/':           '/pages/kontakt/index.html',
    '/anfahrt/':           '/pages/anfahrt/index.html',
    '/impressum/':         '/pages/impressum/index.html',
    '/datenschutz/':       '/pages/datenschutz/index.html',
    '/druckkoepfe/':       '/pages/druckkoepfe/index.html',
    '/en/':                '/en/index.html',
    '/en/services/':       '/en/pages/services/index.html',
    '/en/about/':          '/en/pages/about/index.html',
    '/en/contact/':        '/en/pages/contact/index.html',
    '/en/directions/':     '/en/pages/directions/index.html',
    '/en/printheads/':     '/en/pages/printheads/index.html',
}

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        path = self.path.split('?')[0]
        if path in ROUTES:
            self.path = ROUTES[path]
        elif not path.endswith('/') and path + '/' in ROUTES:
            self.send_response(301)
            self.send_header('Location', path + '/')
            self.end_headers()
            return
        super().do_GET()

    def log_message(self, fmt, *args):
        print(f"  {args[0]} {args[1]}")

if __name__ == '__main__':
    os.chdir(ROOT)
    print(f"\n  Server running at http://localhost:{PORT}")
    print(f"  Press Ctrl+C to stop\n")
    http.server.test(HandlerClass=Handler, port=PORT, bind='')
