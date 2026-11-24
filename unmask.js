const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '.next', 'server');

function unmaskFiles(dir) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      unmaskFiles(fullPath);
    } else if (item.endsWith('.js.txt')) {
      const newPath = path.join(dir, item.replace('.js.txt', '.js'));
      fs.renameSync(fullPath, newPath);
    }
  }
}

console.log('Unmasking .txt to .js in .next/server...');
unmaskFiles(targetDir);
console.log('Done! All .js files restored.');
