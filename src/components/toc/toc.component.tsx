import { Toc } from "./../../models/note-metadata/toc/toc.model";
import { JSX } from "react";
import { TocItemsComponent } from "./toc-items.component";

export function TocComponent({toc}: {toc: Toc}): JSX.Element {
    return <>
        TOC
        <TocItemsComponent tocItems={toc.children}></TocItemsComponent>
    </>;
}