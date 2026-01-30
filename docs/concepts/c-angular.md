---
title: "Angular"
---
# TOC

* LOW — Bases essentielles
  * Installation et configuration
    * Environnement de développement
      * [[r-angular-cli-install|Installation de l'Angular CLI avec `npm install -g @angular/cli`]]
      * [[r-node-npm-setup|Configuration de Node.js et npm pour Angular]]
    * Création d'un projet
      * [[r-ng-new|Création d'un projet Angular avec `ng new <nom-du-projet>`]]
      * [[r-ng-serve|Lancer le serveur de développement avec `ng serve`]]
  * Structure d'un projet Angular
    * Modules
      * [[r-app-module|Comprendre `AppModule` et sa configuration]]
    * Composants
      * [[r-ng-generate-component|Créer un composant avec `ng generate component <nom>`]]
    * Templates et styles
      * [[r-html-binding|Utilisation du data binding dans les templates HTML]]
      * [[r-css-scss-styles|Gestion des styles CSS/SCSS dans Angular]]
  * Routage
    * [[r-angular-routing-setup|Configuration du routage avec `RouterModule.forRoot()`]]
    * [[r-router-link|Navigation entre composants avec `[routerLink]`]]

* MEDIUM — Travail en équipe
  * Gestion des états
    * Services
      * [[r-angular-service-create|Créer et injecter un service Angular avec `ng generate service <nom>`]]
    * RxJS et Observables
      * [[r-observables-usage|Utilisation des `Observables` pour gérer les flux de données]]
      * [[r-subscribe-unsubscribe|Gestion des abonnements avec `subscribe` et `unsubscribe`]]
  * Tests
    * Tests unitaires
      * [[r-jasmine-karma-setup|Configurer Jasmine et Karma pour les tests unitaires]]
      * [[r-component-test|Tester un composant Angular avec `TestBed`]]
    * Tests d'intégration
      * [[r-httpclient-testing|Tester les services HTTP avec `HttpClientTestingModule`]]
  * Intégration continue
    * [[r-ci-angular-build|Automatiser le build Angular dans CI/CD]]
    * [[r-ci-angular-tests|Exécuter les tests unitaires dans CI/CD]]

* HIGH — Usage avancé courant
  * Performance et optimisation
    * Lazy loading
      * [[r-lazy-loading-modules|Chargement paresseux des modules avec `loadChildren`]]
    * Optimisation des bundles
      * [[r-angular-build-prod|Build de production avec `ng build --prod`]]
  * Sécurité
    * Authentification et autorisation
      * [[r-angular-jwt-auth|Gérer les tokens JWT pour sécuriser les routes]]
    * Protection contre XSS et CSRF
      * [[r-angular-sanitization|Sanitisation des entrées avec `DomSanitizer`]]
  * Déploiement
    * [[r-angular-deploy-static|Déploiement d'une application Angular sur un serveur statique]]
    * [[r-angular-deploy-ci-cd|Déploiement automatisé avec CI/CD]]
