import { NoteItem } from "../models/note-item.model";
import fs from 'fs';
import matter from 'gray-matter';

export namespace NoteItemUtils {

    export function castMarkdownFilePathesAsNoteItems(filePathes: string[]): NoteItem[] {
        return filePathes
        .map(filePath => {
            const raw = fs.readFileSync(filePath, 'utf-8');
            const { data: frontMatter } = matter(raw);

            return new NoteItem({ filePath: filePath, frontMatter, content: raw });
        });
    }
}