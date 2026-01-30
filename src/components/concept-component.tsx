import React, { JSX } from 'react';
import { ButtonComponent } from './button.component';
import { Toc } from '../models/note-metadata/toc/toc.model';
import { TocComponent } from './toc/toc.component';

function getPromptForCreation(title: string): string {
  return `
Tu es expert DevOps. Ton objectif est de m'aider à rédiger un fichier markdown que je vais copier/coller dans mon second cerveau.

Le fichier markdown doit contenir une table des matières (TOC) pour le sujet DevOps suivant : ${title}.

Contraintes obligatoires :

- Le titre principal doit être exactement : # TOC
- Toute la structure doit être uniquement en listes à puce avec des * (pas de -)
- Le premier niveau doit toujours être la difficulté :
  * LOW — Bases essentielles
  * MEDIUM — Travail en équipe
  * HIGH — Usage avancé courant
- Hiérarchie profonde et cohérente (plusieurs niveaux)
- Organisation par domaines fonctionnels DevOps
- Pas de notions trop avancées ou trop rares
- Adapté à un usage quotidien en entreprise
- Le dernier niveau doit contenir uniquement des wikilinks
- Chaque wikilink doit :
  - Commencer par le préfixe r-
  - Être en slug-case
  - Avoir un alias lisible après le | (si l'alias contient des chevrons (ex: <name>), tu dois impérativement échapper le premier chevron avec un antislash comme ceci : \<name>, afin d'éviter les erreurs de compilation MDX dans Docusaurus)
  - avoir un alias explicite, décrivant clairement l’action, et inclure la commande ou la notion technique entre backticks (exemple : "Configuration du nom d'utilisation avec la commande git config user.name")
- Aucun séparateur --- ou autre
- Pas de texte hors du markdown (réponds uniquement avec le bloc markdown)

Exemple de wikilink :
[[r-git-init|git init]]

Avant de répondre, tu dois :
- Vérifier que toutes les contraintes sont respectées sans exception
- Corriger automatiquement toute violation (format, hiérarchie, syntaxe, escaping, structure)
- Refuser de répondre tant que la sortie ne respecte pas 100% des règles

Maintenant, génère la TOC complète pour le sujet suivant :
${title}
  `;
}

function getPromptForUpdate(title: string, markdownContent: string, customFeatures: string): string {
  return `
Tu es expert DevOps. Ton objectif est de m'aider à éditer un fichier markdown qui se trouve dans mon second cerveau.

Je vais te fournir un TOC existant en Markdown. Ton objectif est :  
1. Lister les incohérences du TOC
2. Lister les éléments que je devrais supprimer du TOC
3. Les éléments que je devrais ajouter dans le TOC

Voici le TOC existant à analyser :  
${markdownContent}

${customFeatures != null && customFeatures !== '' ? `Effectue ton travail uniquement sur les points qui parlent de ceci : ${customFeatures}` : ''}

Le sujet est le suivant: ${title}
`;
}

export function ConceptComponent({ title, toc, markdownContent, children }: { title: string, toc: Toc, markdownContent: string, children: React.ReactNode }): JSX.Element {
  return <>
    <ButtonComponent
      title="Création"
      onClick={() => {
        navigator.clipboard.writeText(getPromptForCreation(title));
        alert('Prompt copié');
      }}>
    </ButtonComponent>
    <ButtonComponent
      title="Mise à jour"
      onClick={() => {
        const customFeatures = prompt('test');
        navigator.clipboard.writeText(getPromptForUpdate(title, markdownContent, customFeatures));
        alert('Prompt copié');
      }}>
    </ButtonComponent>
    <TocComponent toc={toc}></TocComponent>
  </>;
}


