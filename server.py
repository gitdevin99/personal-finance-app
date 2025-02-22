from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class CustomHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        # Map paths to the correct directories
        if self.path == '/':
            self.path = '/index.html'
        elif self.path == '/login':
            self.path = '/login/index.html'
        elif self.path == '/signup':
            self.path = '/signup/index.html'
        elif self.path == '/onboarding/goals':
            self.path = '/onboarding/goals/index.html'
        elif self.path == '/onboarding/bank-link':
            self.path = '/onboarding/bank-link/index.html'
        
        return SimpleHTTPRequestHandler.do_GET(self)

if __name__ == '__main__':
    server_address = ('', 3000)
    httpd = HTTPServer(server_address, CustomHandler)
    print('Server running on http://localhost:3000')
    httpd.serve_forever()
