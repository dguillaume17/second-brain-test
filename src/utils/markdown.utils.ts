import { lexer, Tokens } from 'marked';
import { Toc } from '../models/note-metadata/toc/toc.model';
import { TocItem } from '../models/note-metadata/toc/toc-item.model';
import { TocHeading } from '../models/note-metadata/toc/toc-heading.model';
import { ReferenceLite } from '../models/note-metadata/base/reference-lite.model';
import { SnippetLite } from '../models/note-metadata/base/snippet-lite.model';
import { NoteType } from '../enums/note-type.enum';
import { WikiLink, WikiLinkNoMatchError } from '../models/wiki-link.model';
import { Slug } from '../models/slug.model';

export namespace MarkdownUtils {

    const HEADING_TYPE = 'heading';
    const HEADING_TEXT = 'TOC';
    const LIST_TYPE = 'list';
    const TEXT_TYPE = 'text';

    export function extractTocFrom(content: string, referencesLiteDataset: ReferenceLite[], snippetsLiteDataset: SnippetLite[]): Toc {
        const emptyTableOfContent = new Toc([]);

        const tokens = lexer(content);

        const tocHeadingTokenIndex = tokens.findIndex(token => {
            return token.type === HEADING_TYPE && token.text === HEADING_TEXT;
        });

        if (tocHeadingTokenIndex === -1 || tocHeadingTokenIndex + 1 >= tokens.length) {
            console.warn('No TOC found'); // TODO error handling 
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
            let tocGhostWikiLink: WikiLink;
            let tocReferenceLink: ReferenceLite;
            let tocSnippetLink: SnippetLite;
            let tocHeading: TocHeading;

            item.tokens.forEach(token => {
                if (token.type === TEXT_TYPE) {
                    const textToken = token as Tokens.Text;
                    const title = textToken.text;

                    let wikiLink: WikiLink;

                    try {
                        wikiLink = new WikiLink(title);
                    } catch (error) {
                        if (error instanceof WikiLinkNoMatchError) {}
                        else if (error instanceof Error) console.warn(`getTocItems(): ${error.message}`); // TODO error handling

                        wikiLink = null;
                    }

                    if (wikiLink == null) {
                        tocHeading = new TocHeading(
                            title,
                            tocHeading?.children ?? []
                        );
                    } else {
                        const slug = wikiLink.castToSlug();

                        if (slug.noteType === NoteType.Reference) {
                            tocReferenceLink = referencesLiteDataset.find(reference => Slug.isEqualToSlug(reference.slug, slug));

                            if (tocReferenceLink == null) {
                                console.warn(`reference is null while slug is existing in TOC: ${slug.value}`); // TODO error handling
                            }
                        }

                        if (slug.noteType === NoteType.Snippet) {
                            tocSnippetLink = snippetsLiteDataset.find(snippet => Slug.isEqualToSlug(snippet.slug, slug));

                            if (tocSnippetLink == null) {
                                console.warn(`snippet is null while slug is existing in TOC: ${slug.value}`); // TODO error handling
                            }
                        }

                        if (tocReferenceLink == null && tocSnippetLink == null) {
                            tocGhostWikiLink = wikiLink;
                        }
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

            const nullPropCount = (tocGhostWikiLink == null ? 1 : 0)
                + (tocReferenceLink == null ? 1 : 0)
                + (tocSnippetLink == null ? 1 : 0)
                + (tocHeading == null ? 1 : 0); 

            if (nullPropCount === 4) {
                console.warn('All TOC item properties are null'); // TODO error handling
                return null;
            }

            if (nullPropCount !== 3) {
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
                tocGhostWikiLink,
                level,
                tocReferenceLink,
                tocSnippetLink,
                tocHeading,
            );
        }).filter(tableOfContent => tableOfContent != null);
    }

}