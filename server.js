const path = require('path');
const fs = require('fs');

// Deep recursive unmask for all subdirectories in .next
function unmaskRecursively(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      unmaskRecursively(fullPath);
    } else if (entry.name.endsWith('.js.txt')) {
      const realJs = fullPath.slice(0, -4);
      try {
        fs.renameSync(fullPath, realJs);
      } catch (err) {}
    }
  }
}

try {
  unmaskRecursively(path.join(__dirname, '.next', 'server'));
  unmaskRecursively(path.join(__dirname, '.next', 'static'));
} catch (e) {}

const dir = path.join(__dirname);
process.env.NODE_ENV = 'production';
process.chdir(__dirname);

const currentPort = parseInt(process.env.PORT, 10) || 3000;
const hostname = process.env.HOSTNAME || '0.0.0.0';

let keepAliveTimeout = parseInt(process.env.KEEP_ALIVE_TIMEOUT, 10);
const next = require('next');
const http = require('http');

const app = next({ dev: false, dir });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http.createServer((req, res) => {
    handle(req, res);
  }).listen(currentPort, () => {
    console.log(`> Ready on http://${hostname}:${currentPort}`);
  });
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
