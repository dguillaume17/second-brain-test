import { lexer, Tokens } from 'marked';
import { Toc } from '../models/note-metadata/toc/toc.model';
import { TocItem } from '../models/note-metadata/toc/toc-item.model';
import { TocHeading } from '../models/note-metadata/toc/toc-heading.model';
import { ReferenceLite } from '../models/note-metadata/base/reference-lite.model';
import { SnippetLite } from '../models/note-metadata/base/snippet-lite.model';
import { NoteUtils } from './note.utils';
import { NoteType } from '../enums/note-type.enum';

export namespace MarkdownUtils {

    const HEADING_TYPE = 'heading';
    const HEADING_TEXT = 'TOC';
    const LIST_TYPE = 'list';
    const TEXT_TYPE = 'text';

    export function extractNodesFrom(content: string, referencesLiteDataset: ReferenceLite[], snippetsLiteDataset: SnippetLite[]): Toc {
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

            return new Toc(getTocItems(tokenList, 1, referencesLiteDataset, snippetsLiteDataset));
        }

        return emptyTableOfContent;
    }

    function getTocItems(tokenList: Tokens.List, level: number, referencesLiteDataset: ReferenceLite[], snippetsLiteDataset: SnippetLite[]): TocItem[] {
        return tokenList.items.map(item => {
            let tocReferenceLink: ReferenceLite;
            let tocSnippetLink: SnippetLite;
            let tocHeading: TocHeading;

            item.tokens.forEach(token => {
                if (token.type === TEXT_TYPE) {
                    const textToken = token as Tokens.Text;
                    const title = textToken.text;

                    const referenceSlugExtraction = NoteUtils.extractUniqueSlugFrom(title, NoteType.Reference);
                    if (referenceSlugExtraction.hasError) {
                        console.warn(referenceSlugExtraction.errorMessage); // TODO error handling
                    }

                    if (referenceSlugExtraction.hasSlug) {
                        tocReferenceLink = referencesLiteDataset.find(reference => reference.slug === referenceSlugExtraction.slug);

                        if (tocReferenceLink == null) {
                            console.warn('toc reference is null while slug is existing'); // TODO error handling
                        }
                    }

                    const snippetSlugExtraction = NoteUtils.extractUniqueSlugFrom(title, NoteType.Snippet);
                     if (snippetSlugExtraction.hasError) {
                        console.warn(snippetSlugExtraction.errorMessage); // TODO error handling
                    }

                    if (snippetSlugExtraction.hasSlug) {
                        tocSnippetLink = snippetsLiteDataset.find(snippet => snippet.slug === snippetSlugExtraction.slug);

                        if (tocSnippetLink == null) {
                            console.warn('toc snippet is null while slug is existing'); // TODO error handling
                        }
                    }

                    if (tocReferenceLink == null && tocSnippetLink == null) {
                        tocHeading = new TocHeading(
                            title,
                            tocHeading?.children
                        );
                    }
                }

                if (token.type === LIST_TYPE) {
                    const listToken = token as Tokens.List;

                    tocHeading = new TocHeading(
                        tocHeading?.title,
                        getTocItems(listToken, level + 1, referencesLiteDataset, snippetsLiteDataset)
                    );
                }

                
            });

            const nullPropCount = (tocReferenceLink == null ? 1 : 0)
                + (tocSnippetLink == null ? 1 : 0)
                + (tocHeading == null ? 1 : 0); 

            if (nullPropCount === 3) {
                console.warn('All TOC item properties are null'); // TODO error handling
                return null;
            }

            if (nullPropCount !== 2) {
                console.warn('Invalid TOC item: more than one property is set'); // TODO error handling
                return null;
            }

            if (tocHeading != null) {
                if (tocHeading.title == null) {
                    console.warn('TOC heading title is null'); // TODO error handling

                    tocHeading = new TocHeading(
                        '',
                        tocHeading.children
                    );
                }

                if (tocHeading.children == null) {
                    tocHeading = new TocHeading(
                        tocHeading.title,
                        []
                    );
                }
            }

            return new TocItem(
                level,
                tocReferenceLink,
                tocSnippetLink,
                tocHeading,
            );
        }).filter(tableOfContent => tableOfContent != null);
    }

}