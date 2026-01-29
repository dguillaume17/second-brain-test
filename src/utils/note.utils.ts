import { NoteType } from "../enums/note-type.enum";
import { CodeBlock } from "../models/code-block.model";

export namespace NoteUtils {

    export function extractCodeBlockItemsFrom(codeBlockItemContainers: NodeListOf<Element>): CodeBlock[] {
        return Array.from(codeBlockItemContainers).map((container) => {
            const titleElement = container.querySelector('[class*="codeBlockTitle"]');
            const codeElement = container.querySelector('pre');
            if (!titleElement || !codeElement) return null;

            const codeBlockItem = new CodeBlock(
                codeElement.innerText,
                titleElement.textContent?.trim() || 'file.ts'
            );

            return codeBlockItem;
        }).filter(item => item !== null);
    }

    export function extractSlugsFrom(noteContent: string, noteType: NoteType, strictMode = false): string[] {
        const fileNamePrefix = NoteType.getAssociatedFileNamePrefix(noteType);
        const regex = new RegExp(`\\[\\[(${fileNamePrefix}.*?)\\]\\]`, 'g');

        const matches = [...noteContent.matchAll(regex)];

        if (strictMode) {
            if (matches.length != 1 ) {
                return [];
            }
            
            const uniqueMatchContent = matches[1][1];

            if (uniqueMatchContent != noteContent) {
                return [];
            }
        }

        return matches
            .map(match => match[1])
            .map(link => NoteType.getAssociatedSlugPrefix(noteType) + '/' + link);
    }
}
