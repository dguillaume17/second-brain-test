import { TocItem } from "./../../models/note-metadata/toc/toc-item.model";
import { JSX } from "react";
import { TocItemsComponent } from "./toc-items.component";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Slug } from "@site/src/models/slug.model";
import Link from "@docusaurus/Link";
import { ButtonComponent } from "../button.component";
import { WikiLink } from "@site/src/models/wiki-link.model";
import { PowerShellUtils } from "@site/src/utils/power-shell.utils";

function getPromptForCreation(title: string): string {
  return `
Tu es expert DevOps. Ton objectif est de m'aider à rédiger un fichier markdown que je vais copier/coller dans mon second cerveau.

Réponds moi uniquement le contenu du fichier markdown sans introduction ni conclusion.
Ce contenu ne doit pas se trouver dans un bloc de code markdown afin de permettre aux éventuels blocs de code à l'intérieur de la note de s'afficher correctement.

Le fichier markdown doit être une note de référence sur le sujet : ${title}.
  `;
}

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
        const fileName = WikiLink.getRelativeFileName(tocItem.ghostWikiLink);
        const label = tocItem.ghostWikiLink.displayableLabel;

        return <>
            <li>
                {label}
                <ButtonComponent
                    title="Création"
                    onClick={async () => {
                        await PowerShellUtils.copyCommandLineForFileCreation(fileName);
                        alert(`Nom de fichier copié: ${fileName}`);
                        console.log('ok')
                        await navigator.clipboard.writeText(getPromptForCreation(label));
                        alert('Prompt copié');
                    }}>
                </ButtonComponent>
            </li>
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