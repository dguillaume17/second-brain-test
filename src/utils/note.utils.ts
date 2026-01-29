import { CodeBlock } from "../models/code-block.model";
import { Slug } from "../models/slug.model";
import { WikiLink } from "../models/wiki-link.model";

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

    export function extractSlugsFrom(content: string): Slug[] {
        const regex = /(\[\[.*?\]\])/g;

        const matches = [...content.matchAll(regex)];

        return matches
            .map(match => match[1])
            .map(rawLink => {
                try {
                    const wikiLink = new WikiLink(rawLink);
                    return wikiLink.castToSlug();
                } catch (error) {
                    if (error instanceof Error) console.warn(`Unable to cast "${rawLink}" in WikiLink and Slug: ${error.message}`)
                    return null;
                }
            })
            .filter(slug => slug != null) ?? [];
    }
}
