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

    export function extractSlugsFrom(content: string, noteType: NoteType): string[] {
       const matches = getExtractionSlugMatches(content, noteType);

        return matches
            .map(match => match[1])
            .map(link => getSlugFrom(link, noteType));
    }

    export function extractUniqueSlugFrom(content: string, noteType: NoteType): {hasError: boolean, errorMessage: string | null, hasSlug: boolean, slug: string | null} {
        const matches = getExtractionSlugMatches(content, noteType);

        if (matches.length === 0) {
            return {
                hasError: false,
                errorMessage: null,
                hasSlug: false,
                slug: null
            };
        }

        if (matches.length != 1) {
            return {
                hasError: true,
                errorMessage: `Expected exactly one match for strict mode, but found ${matches.length}`, // TODO error handling
                hasSlug: false,
                slug: null
            };
        }
        
        const uniqueMatchContent = matches[0][1];
        const formattedUniqueMatchContent = `[[${uniqueMatchContent}]]`;

        if (formattedUniqueMatchContent != content) {
              return {
                hasError: true,
                errorMessage: `Content does not exactly match the expected format in strict mode: ${formattedUniqueMatchContent} <> ${content}`, // TODO error handling
                hasSlug: false,
                slug: null
            };
        }

        return {
            hasError: false,
            errorMessage: null,
            hasSlug: true,
            slug: getSlugFrom(uniqueMatchContent, noteType)
        }
    }

    function getExtractionSlugMatches(content: string, noteType: NoteType): RegExpExecArray[] {
        const fileNamePrefix = NoteType.getAssociatedFileNamePrefix(noteType);
        const regex = new RegExp(`\\[\\[(${fileNamePrefix}.*?)\\]\\]`, 'g');

        const matches = [...content.matchAll(regex)];

        return matches;
    }

    function getSlugFrom(link: string, noteType: NoteType): string {
        return NoteType.getAssociatedSlugPrefix(noteType) + '/' + link;
    }
}
