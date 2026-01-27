import fs from 'fs';
import path from 'path';

export namespace FileUtils {
  export function getDocFolderPath(): string {
    return path.join(process.cwd(), 'docs');
  }

  export function getAllMarkdownFilePathesFrom(folderPath: string, baseFolderPath = folderPath): string[] {
    const entries = fs.readdirSync(folderPath, { withFileTypes: true });
    const files: string[] = [];

    for (const entry of entries) {
      const fullPath = path.join(folderPath, entry.name);
      if (entry.isDirectory()) {
        files.push(...getAllMarkdownFilePathesFrom(fullPath, baseFolderPath));
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(path.resolve(baseFolderPath, fullPath));
      }
    }

    return files;
  }
}