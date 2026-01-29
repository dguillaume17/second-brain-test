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
}
