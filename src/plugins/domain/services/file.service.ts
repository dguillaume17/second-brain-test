import fs from 'fs';
import path from 'path';
import { FilePath } from '../models/file-path.model';

export class FileService {

    // Public work

    public castSourcePathToFilePath(sourcePath: string): FilePath {
        const projectPath = sourcePath.replace('@site/', '');
        const systemPath = path.join(process.cwd(), projectPath);

        return new FilePath(
            projectPath,
            systemPath,
        );
    }

    public getFileContent(filePath: FilePath): string {
        return fs.readFileSync(filePath.projectPath, 'utf-8');
    }

}