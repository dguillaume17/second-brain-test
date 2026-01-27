import { CodeBlockItem } from "../models/code-block-item.model";

export namespace CodeBlockItemExtractorUtils {

    export function extractCodeBlockItemsFrom(codeBlockItemContainers: NodeListOf<Element>): CodeBlockItem[] {
        return Array.from(codeBlockItemContainers).map((container) => {
            const titleElement = container.querySelector('[class*="codeBlockTitle"]');
            const codeElement = container.querySelector('pre');
            if (!titleElement || !codeElement) return null;

            return {
                name: titleElement.textContent?.trim() || 'file.ts',
                content: codeElement.innerText
            };
        }).filter(item => item !== null) as { name: string, content: string }[];
    }
}
