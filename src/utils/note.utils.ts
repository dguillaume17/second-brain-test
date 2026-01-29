import { CodeBlock } from "../models/code-block.model";

export namespace NoteUtils {
    export function extractCodeBlockItemsFrom(markdownContent: string): CodeBlock[] {
        const codeBlocks: CodeBlock[] = [];
        
        // Regex expliquée :
        // ```(\w+)?            -> Capture le langage (ex: typescript)
        // (?:\s+title="([^"]*)")? -> Capture optionnelle du titre entre guillemets
        // \n([\s\S]*?)         -> Capture tout le contenu jusqu'aux prochains ```
        // \n```                -> Fin du bloc
        const regex = /```(\w+)?(?:\s+title="([^"]*)")?([\s\S]*?)```/g;
        
        let match;
        while ((match = regex.exec(markdownContent)) !== null) {
            codeBlocks.push(new CodeBlock(
                match[3].trim(),
                match[1] || null,
                match[2]
            ));
        }
        
        return codeBlocks;
        }
}
