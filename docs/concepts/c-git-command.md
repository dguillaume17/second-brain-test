---
title: "Commandes GIT"
---
# TOC

* LOW — Bases essentielles
    * Configuration et initialisation
        * Paramétrage de l'identité
            * [[r-git-config-user-name|Définir le nom d'utilisateur avec `git config user.name`]]
            * [[r-git-config-user-email|Définir l'adresse email avec `git config user.email`]]
        * Création de dépôts
            * [[r-git-init|Initialiser un nouveau dépôt local avec `git init`]]
            * [[r-git-clone|Cloner un dépôt distant avec `git clone`]]
    * Cycle de vie des modifications
        * Indexation des fichiers
            * [[r-git-add|Ajouter des fichiers à l'index avec `git add`]]
            * [[r-git-status|Vérifier l'état des fichiers avec `git status`]]
        * Validation des changements
            * [[r-git-commit|Enregistrer les modifications avec `git commit -m`]]
            * [[r-git-commit-amend|Modifier le dernier commit avec `git commit --amend`]]
    * Consultation de l'historique
        * [[r-git-log|Afficher l'historique des commits avec `git log`]]
        * [[r-git-diff|Visualiser les différences avec `git diff`]]
* MEDIUM — Travail en équipe
    * Gestion des branches
        * Navigation et création
            * [[r-git-branch|Lister ou créer des branches avec `git branch`]]
            * [[r-git-checkout|Changer de branche avec `git checkout \<branch>`]]
            * [[r-git-switch|Basculer sur une branche avec `git switch`]]
        * Fusion de code
            * [[r-git-merge|Fusionner une branche avec `git merge`]]
            * [[r-git-branch-d|Supprimer une branche locale avec `git branch -d`]]
    * Synchronisation distante
        * Récupération des données
            * [[r-git-fetch|Récupérer les mises à jour distantes avec `git fetch`]]
            * [[r-git-pull|Récupérer et fusionner les modifications avec `git pull`]]
        * Publication du travail
            * [[r-git-push|Envoyer les commits vers le dépôt distant avec `git push`]]
            * [[r-git-remote-v|Gérer les dépôts distants avec `git remote -v`]]
    * Gestion temporaire
        * [[r-git-stash|Mettre les changements de côté avec `git stash`]]
        * [[r-git-stash-pop|Restaurer les changements mis de côté avec `git stash pop`]]
* HIGH — Usage avancé courant
    * Réécriture d'historique
        * [[r-git-rebase|Réorganiser les commits avec `git rebase`]]
        * [[r-git-rebase-i|Lancer un rebase interactif avec `git rebase -i`]]
        * [[r-git-cherry-pick|Appliquer un commit spécifique avec `git cherry-pick`]]
    * Nettoyage et annulation
        * [[r-git-reset|Réinitialiser l'index ou la tête avec `git reset`]]
        * [[r-git-revert|Annuler un commit par un nouveau commit avec `git revert`]]
        * [[r-git-clean|Supprimer les fichiers non suivis avec `git clean`]]
    * Inspection approfondie
        * [[r-git-blame|Afficher l'auteur de chaque ligne avec `git blame`]]
        * [[r-git-show|Afficher les détails d'un objet avec `git show`]]
        * [[r-git-reflog|Consulter l'historique des actions locales avec `git reflog`]]