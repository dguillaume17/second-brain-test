import { TocItem } from "./../../models/note-metadata/toc/toc-item.model";
import { JSX } from "react";
import { TocItemComponent } from "./toc-item.component";
import React from "react";

export function TocItemsComponent({tocItems}: {tocItems: TocItem[]}): JSX.Element {
    return <>
        {tocItems.map(tocItem => {
            return <ul key={tocItem.id}>
                <TocItemComponent tocItem={tocItem}></TocItemComponent>
            </ul>;
        })}
    </>;
}