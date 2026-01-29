import { TocItem } from "./../../models/note-metadata/toc/toc-item.model";
import { JSX } from "react";
import { TocItemsComponent } from "./toc-items.component";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Slug } from "@site/src/models/slug.model";
import Link from "@docusaurus/Link";

export function TocItemComponent({tocItem}: {tocItem: TocItem}): JSX.Element {
    const getUrlFromSlug = (slug: Slug) => useBaseUrl('docs' + slug.value);

    if (tocItem.tocHeading != null) {
        const children = tocItem.tocHeading.children;

        return <>
            <li><b>{tocItem.tocHeading.title}</b></li>
            {
                children.length > 0
                    ? <TocItemsComponent tocItems={tocItem.tocHeading.children}></TocItemsComponent>
                    : <></>
            }
        </>
    }

    if (tocItem.ghostWikiLink != null) {
        return <>
            <li>{tocItem.ghostWikiLink.displayableLabel}</li>
        </>;
    }

    if (tocItem.referenceLink != null) {
        const url = getUrlFromSlug(tocItem.referenceLink.slug);

        return <>
            <li>{tocItem.referenceLink.title} - <Link to={url}>Lien</Link></li>
        </>
    }

    if (tocItem.snippetLink != null) {
        const url = getUrlFromSlug(tocItem.snippetLink.slug);

        return <><li>{tocItem.snippetLink.title} - <Link to={url}>Lien</Link></li></>;
    }

    return <></>;
}