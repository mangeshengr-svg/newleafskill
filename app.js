const path = require('path');
const fs = require('fs');

process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || 3000;

// Deep recursive unmask for all subdirectories in .next
function unmaskRecursively(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      unmaskRecursively(fullPath);
    } else if (entry.name.endsWith('.js.txt')) {
      const realJs = fullPath.slice(0, -4); // removes .txt -> leaves .js
      try {
        fs.renameSync(fullPath, realJs);
      } catch (err) {
        // ignore if already renamed
      }
    }
  }
}

try {
  unmaskRecursively(path.join(__dirname, '.next', 'server'));
  unmaskRecursively(path.join(__dirname, '.next', 'static'));
  console.log('Unmask completed successfully!');
} catch (e) {
  console.error('Unmask error:', e);
}

// Start Next.js Server
if (fs.existsSync(path.join(__dirname, 'server.js'))) {
  require(path.join(__dirname, 'server.js'));
} else {
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
