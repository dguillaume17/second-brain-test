import Link from "@docusaurus/Link";
import { ConceptLite } from "../models/note-metadata/base/concept-lite.model";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Slug } from "../models/slug.model";

export function LinkedConceptsComponent({concepts}: {concepts: ConceptLite[]}) {
    if (concepts == null || concepts.length === 0) {
        return <>
            <div>Aucun concept lié</div>
        </>
    }

    const getUrlFromSlug = (slug: Slug) => useBaseUrl('docs' + slug.value);

    return <>
        <div>
            Concepts liés : {concepts.map((concept, index) => {
                const url = getUrlFromSlug(concept.slug);

                return <span key={concept.slug.value}>
                    {index > 0 ? ', ' : <></>}
                    <Link to={url}>{concept.title}</Link>
                </span>;
            })
            }
        </div>
    </>;
}