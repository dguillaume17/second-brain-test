import { CodeBlock } from "../models/code-block.model";

export namespace CodePenUtils {

    export function openCodePen(
        title: string,
        codeBlockItems: CodeBlock[]
    ) {
        // 1. Définir les données du projet
        const data = {
            title: title,
            description: "Test d'ouverture via API",
            html: codeBlockItems.find(codeBlock => codeBlock.langage === 'html')?.code ?? '',
            css: codeBlockItems.find(codeBlock => codeBlock.langage === 'css')?.code ?? '',
            js: codeBlockItems.find(codeBlock => codeBlock.langage === 'js')?.code ?? '',
        };

        // 2. Convertir les données en JSON
        // Attention : CodePen exige que le JSON soit converti en chaîne de caractères
        const JSONstring = JSON.stringify(data)
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;");

        // 3. Créer un formulaire temporaire
        const form = document.createElement('form');
        form.action = 'https://codepen.io/pen/define';
        form.method = 'POST';
        form.target = '_blank'; // Ouvre dans un nouvel onglet

        // 4. Ajouter le champ caché "data"
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'data';
        input.value = JSONstring;

        form.appendChild(input);
        document.body.appendChild(form);

        // 5. Envoyer et nettoyer
        form.submit();
        document.body.removeChild(form);
    }

}