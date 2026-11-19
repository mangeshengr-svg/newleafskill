const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const nextDir = path.join(rootDir, '.next');
const prodDir = path.join(rootDir, 'prod-build');

if (fs.existsSync(prodDir)) {
  fs.rmSync(prodDir, { recursive: true, force: true });
}
fs.mkdirSync(prodDir, { recursive: true });

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      copyRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy only necessary production files
const items = ['BUILD_ID', 'package.json', 'server', 'static', 'build', 'types'];
for (const item of items) {
  const src = path.join(nextDir, item);
  const dest = path.join(prodDir, item);
  copyRecursive(src, dest);
}

// Copy manifest json files from root of .next
for (const file of fs.readdirSync(nextDir)) {
  if (file.endsWith('.json')) {
    fs.copyFileSync(path.join(nextDir, file), path.join(prodDir, file));
  }
}

console.log('Production files prepared in prod-build!');

const zipFile = path.join(rootDir, 'next-production.zip');
if (fs.existsSync(zipFile)) {
  fs.unlinkSync(zipFile);
}

// Use powershell Compress-Archive
try {
  cp.execSync(`powershell -Command "Compress-Archive -Path '${prodDir}/*' -DestinationPath '${zipFile}' -Force"`, { stdio: 'inherit' });
  const stat = fs.statSync(zipFile);
  const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
  console.log(`Success! Created next-production.zip with size: ${sizeMB} MB`);
} catch (e) {
  console.error('Failed to compress:', e);
}
