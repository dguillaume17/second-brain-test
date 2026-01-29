import { TocItem } from "./../../models/note-metadata/toc/toc-item.model";
import { JSX } from "react";

export function TocItemsComponent({tocItems}: {tocItems: TocItem[]}): JSX.Element {
    return <>
        {tocItems.map((child, index) => {
            const Tag = `h${child.level}` as keyof JSX.IntrinsicElements;

            return <>
                {
                    child.tocHeading != null
                        ? <>
                            <Tag key={index}>
                                H{child.level} - {child.tocHeading?.title}
                            </Tag>
                            {
                                child.tocHeading.children.length > 0
                                    ? <TocItemsComponent tocItems={child.tocHeading?.children}></TocItemsComponent>
                                    : <></>
                            }
                        </>
                        : <></>
                }
                {
                    child.ghostWikiLink != null
                        ? <><p>Ghost Wiki Link : {child.ghostWikiLink.content}</p></>
                        : <></>
                }
                {
                    child.referenceLink != null
                        ? <><p>Reference : {child.referenceLink.title}</p></>
                        : <></>
                }
                {
                    child.snippetLink != null
                        ? <><p>Snippet : {child.snippetLink.title}</p></>
                        : <></>
                }
                
            </>;
        })}
    </>;
}