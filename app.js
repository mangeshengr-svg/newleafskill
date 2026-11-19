const path = require('path');
const fs = require('fs');

process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || 3000;

// Agar standalone server exist karta hai toh use chalayein
const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(standaloneServer)) {
  require(standaloneServer);
} else if (fs.existsSync(path.join(__dirname, 'server.js'))) {
  require(path.join(__dirname, 'server.js'));
} else {
  // Fallback direct Next.js start
  const next = require('next');
  const http = require('http');
  const app = next({ dev: false, dir: __dirname });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    http.createServer((req, res) => handle(req, res)).listen(process.env.PORT, () => {
      console.log(`> Server ready on http://localhost:${process.env.PORT}`);
    });
  }).catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
