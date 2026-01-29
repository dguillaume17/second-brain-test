import { lexer, Tokens } from 'marked';
import { Toc } from '../models/note-metadata/toc/toc.model';
import { TocItem } from '../models/note-metadata/toc/toc-item.model';
import { TocHeading } from '../models/note-metadata/toc/toc-heading.model';
import { ReferenceLite } from '../models/note-metadata/base/reference-lite.model';
import { SnippetLite } from '../models/note-metadata/base/snippet-lite.model';

export namespace MarkdownUtils {

    const HEADING_TYPE = 'heading';
    const HEADING_TEXT = 'TOC';
    const LIST_TYPE = 'list';
    const TEXT_TYPE = 'text';

    export function extractNodesFrom(content: string): Toc {
        const emptyTableOfContent = new Toc([]);

        const tokens = lexer(content);

        const tocHeadingTokenIndex = tokens.findIndex(token => {
            return token.type === HEADING_TYPE && token.text === HEADING_TEXT;
        });

        if (tocHeadingTokenIndex === -1 || tocHeadingTokenIndex + 1 >= tokens.length) {
            console.log('No TOC found');
            return emptyTableOfContent;
        }

        const tokenAfterTocHeadingToken = tokens[tocHeadingTokenIndex + 1];

        if (tokenAfterTocHeadingToken.type === LIST_TYPE) {
            const tokenList = tokenAfterTocHeadingToken as Tokens.List;

            return new Toc(getTocItems(tokenList, 1));
        }

        return emptyTableOfContent;
    }

    function getTocItems(tokenList: Tokens.List, level: number): TocItem[] {
        return tokenList.items.map(item => {
            let tocReferenceLink: ReferenceLite;
            let tocSnippetLink: SnippetLite;
            let tocHeading: TocHeading;

            item.tokens.forEach(token => {
                if (token.type === TEXT_TYPE) {
                    const textToken = token as Tokens.Text;
                    const text = textToken.text;
                    
                    const forbiddenPattern = /(\s{2,}|\n)/;                    

                    if (forbiddenPattern.test(text)) {
                        console.log(`Forbidden pattern found: "${text}"`);
                        return;
                    }

                    tocHeading = new TocHeading(
                        textToken.text,
                        tocHeading?.children || []
                    );
                }

                if (token.type === LIST_TYPE) {
                    const listToken = token as Tokens.List;

                    tocHeading = new TocHeading(
                        tocHeading?.title ?? 'Default',
                        getTocItems(listToken, level + 1)
                    );
                }

                
            });

            if (tocReferenceLink != null) {
                return new TocItem(
                    tocReferenceLink,
                    null,
                    null,
                );
            }

            if (tocSnippetLink != null) {
                return new TocItem(
                    null,
                    tocSnippetLink,
                    null,
                );
            }

            if (tocHeading != null) {
                return new TocItem(
                    null,
                    null,
                    tocHeading,
                );
            }

            return null;
        }).filter(tableOfContent => tableOfContent != null);
    }

}