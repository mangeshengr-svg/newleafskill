const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const nextDir = path.join(rootDir, '.next');
const deployDir = path.join(rootDir, 'build-deploy');

if (!fs.existsSync(nextDir)) {
  console.error('Error: .next folder not found! Please run "npm run build" first.');
  process.exit(1);
}

console.log('Syncing .next build files into build-deploy for cPanel Git Deployment...');

if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true, force: true });
}
fs.mkdirSync(deployDir, { recursive: true });

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

// 1. Copy required folders
const foldersToCopy = ['server', 'static', 'build', 'types'];
for (const folder of foldersToCopy) {
  const src = path.join(nextDir, folder);
  const dest = path.join(deployDir, folder);
  if (fs.existsSync(src)) {
    copyRecursive(src, dest);
  }
}

// 2. Copy root files and manifests
const rootFiles = ['BUILD_ID', 'package.json', 'export-marker.json', 'required-server-files.json', 'routes-manifest.json', 'images-manifest.json', 'prerender-manifest.json', 'build-manifest.json', 'app-path-routes-manifest.json', 'fallback-build-manifest.json', 'next-minimal-server.js.nft.json', 'next-server.js.nft.json'];

for (const file of fs.readdirSync(nextDir)) {
  if (file.endsWith('.json') || rootFiles.includes(file)) {
    const src = path.join(nextDir, file);
    const dest = path.join(deployDir, file);
    if (fs.statSync(src).isFile()) {
      fs.copyFileSync(src, dest);
    }
  }
}

console.log('✅ build-deploy updated successfully and ready for Git commit!');
