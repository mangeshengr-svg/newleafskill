import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function unmaskDir(dir: string, list: string[] = []) {
  if (!fs.existsSync(dir)) return list;
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      unmaskDir(fullPath, list);
    } else if (item.endsWith('.js.txt')) {
      const targetJs = path.join(dir, item.slice(0, -4));
      try {
        fs.copyFileSync(fullPath, targetJs);
        list.push(targetJs);
      } catch (err) {}
    }
  }
  return list;
}

export async function GET() {
  const rootDir = process.cwd();
  const nextServer = path.join(rootDir, '.next', 'server');
  const nextStatic = path.join(rootDir, '.next', 'static');
  
  const serverRestored = unmaskDir(nextServer);
  const staticRestored = unmaskDir(nextStatic);
  
  return NextResponse.json({
    success: true,
    message: 'Unmasking completed successfully!',
    restoredFilesCount: serverRestored.length + staticRestored.length
  });
}
