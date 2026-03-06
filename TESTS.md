# Guide de Tests - Multi-Pôles Frontend

## Tests à effectuer

### 1. Page d'accueil (/)

#### Carousel
- [ ] Le carousel affiche les slides de l'API ou les données de fallback
- [ ] Les boutons précédent/suivant fonctionnent
- [ ] Le carousel avance automatiquement toutes les 5 secondes
- [ ] Les indicateurs de position en bas sont fonctionnels
- [ ] Les liens CTA redirigent vers les bonnes pages

#### Section Solutions
- [ ] Les solutions s'affichent depuis l'API ou en fallback
- [ ] Les 4 cartes de solutions sont affichées
- [ ] L'animation au survol fonctionne
- [ ] Les liens "En savoir plus" fonctionnent

#### Loading States
- [ ] Un skeleton loader s'affiche pendant le chargement des solutions
- [ ] Pas d'erreur dans la console si l'API ne répond pas

### 2. Page Blog (/blog)

#### Liste des articles
- [ ] Les articles de blog s'affichent (API ou fallback)
- [ ] La barre de recherche permet de filtrer les articles
- [ ] Les filtres de catégorie fonctionnent correctement
- [ ] Cliquer sur une catégorie réinitialise la page à 1
- [ ] Les cartes d'articles affichent : titre, extrait, catégorie, date, auteur

#### Pagination
- [ ] Les boutons de pagination s'affichent si totalPages > 1
- [ ] Le bouton "Précédent" est désactivé sur la page 1
- [ ] Le bouton "Suivant" est désactivé sur la dernière page
- [ ] Cliquer sur un numéro de page charge les bons articles
- [ ] La page scroll vers le haut lors du changement de page

#### Loading & Error States
- [ ] Un spinner s'affiche pendant le chargement
- [ ] Un message d'erreur s'affiche si l'API échoue
- [ ] Les données de fallback sont affichées en cas d'erreur

### 3. Page Article (/blog/[slug])

#### Affichage
- [ ] L'article complet s'affiche avec tous ses détails
- [ ] La catégorie, date et auteur sont affichés
- [ ] Le contenu HTML est rendu correctement
- [ ] L'image featured s'affiche si présente
- [ ] Les tags sont cliquables et redirigent vers le blog filtré

#### Erreurs
- [ ] Une page 404 s'affiche si l'article n'existe pas
- [ ] Le bouton "Retour au blog" fonctionne

### 4. Page Réalisations (/realisations)

#### Liste
- [ ] Les réalisations s'affichent depuis l'API
- [ ] Les filtres par catégorie fonctionnent
- [ ] Les cartes affichent : image, titre, client, catégorie

#### Modal de détail
- [ ] Cliquer sur "Voir le projet" ouvre la modal
- [ ] La modal affiche toutes les informations
- [ ] Le carousel d'images fonctionne dans la modal
- [ ] Les liens "Demander un devis" et "Nous contacter" fonctionnent
- [ ] Le bouton de fermeture ferme la modal
- [ ] Cliquer en dehors de la modal la ferme

### 5. Page Équipe (/equipe)

#### Affichage
- [ ] Les membres de l'équipe s'affichent depuis l'API
- [ ] Chaque carte affiche : photo, nom, poste, bio
- [ ] Les informations de contact (email, téléphone, LinkedIn) sont cliquables
- [ ] Les membres sont triés par ordre (champ `order`)
- [ ] Seuls les membres actifs (`isActive: true`) sont affichés

#### States
- [ ] Un spinner s'affiche pendant le chargement
- [ ] Un message s'affiche si aucun membre n'est trouvé

### 6. Formulaire de Contact (/contact)

#### Validation
- [ ] Prénom : requis, min 2 caractères
- [ ] Nom : requis, min 2 caractères
- [ ] Email : requis, format email valide
- [ ] Téléphone : requis, format valide
- [ ] Entreprise : optionnel
- [ ] Sujet : optionnel
- [ ] Message : requis, min 10 caractères
- [ ] Acceptation des CGU : requis

#### Soumission
- [ ] Le formulaire affiche les erreurs de validation en temps réel
- [ ] Le bouton "Envoyer" est désactivé pendant l'envoi
- [ ] Un spinner s'affiche pendant l'envoi
- [ ] En cas de succès : message de confirmation vert
- [ ] En cas d'erreur : message d'erreur rouge avec détails
- [ ] Le formulaire est réinitialisé après un envoi réussi

#### Test manuel de soumission
```bash
# Avec le backend démarré, remplir le formulaire :
- Prénom : Jean
- Nom : Dupont
- Email : jean.dupont@example.com
- Téléphone : 0612345678
- Entreprise : Test Corp
- Sujet : Test de contact
- Message : Ceci est un message de test pour vérifier la soumission du formulaire.
- Cocher "J'accepte les CGU"
- Cliquer sur "Envoyer"

# Vérifier :
- Le backend reçoit bien la requête POST /api/v1/forms/contact
- Un message de succès s'affiche
- Les données sont bien enregistrées dans la base de données backend
```

### 7. Formulaire de Devis (/devis)

#### Navigation multi-étapes
- [ ] La barre de progression affiche l'étape actuelle (1-4)
- [ ] Le bouton "Précédent" est désactivé à l'étape 1
- [ ] Le bouton "Suivant" valide les champs de l'étape courante
- [ ] Impossible de passer à l'étape suivante si validation échoue
- [ ] Le scroll remonte en haut à chaque changement d'étape

#### Étape 1 - Type de projet
- [ ] Type de projet : requis
- [ ] Description : requis, min 10 caractères

#### Étape 2 - Spécifications
- [ ] Dimensions (largeur, hauteur, profondeur) : doivent être numériques
- [ ] Quantité : requis, nombre positif

#### Étape 3 - Timeline & Budget
- [ ] Date limite : optionnel
- [ ] Budget : optionnel

#### Étape 4 - Informations de contact
- [ ] Prénom, Nom, Email, Téléphone : requis
- [ ] Entreprise : requis
- [ ] Message : optionnel
- [ ] Acceptation des CGU : requis

#### Soumission
- [ ] À l'étape 4, le bouton affiche "Envoyer" au lieu de "Suivant"
- [ ] Un spinner s'affiche pendant l'envoi
- [ ] En cas de succès : écran de confirmation (SuccessScreen)
- [ ] En cas d'erreur : message d'erreur détaillé

#### Test manuel de soumission
```bash
# Remplir le formulaire complet :

Étape 1:
- Type de projet : PLV
- Description : Présentoir sur-mesure pour cosmétiques

Étape 2:
- Largeur : 50
- Hauteur : 120
- Profondeur : 30
- Quantité : 10

Étape 3:
- Date limite : (sélectionner une date future)
- Budget : 5000-10000€

Étape 4:
- Prénom : Marie
- Nom : Martin
- Email : marie.martin@example.com
- Téléphone : 0623456789
- Entreprise : Beauty Corp
- Cocher "J'accepte les CGU"

# Vérifier :
- Le backend reçoit POST /api/v1/forms/devis
- Un écran de succès s'affiche
- Les données incluent toutes les informations des 4 étapes
```

### 8. Tests de Localisation (FR/EN)

Si votre backend supporte plusieurs langues :

- [ ] Passer le paramètre `locale=en` dans les hooks
- [ ] Vérifier que les données retournées sont en anglais
- [ ] Tester sur : blog, réalisations, carousel, solutions, équipe

### 9. Tests de Performance

#### Chargement
- [ ] La page d'accueil se charge en moins de 2 secondes
- [ ] Les images sont optimisées (Next.js Image)
- [ ] Les animations sont fluides

#### Responsive
- [ ] Tester sur mobile (< 768px)
- [ ] Tester sur tablette (768-1024px)
- [ ] Tester sur desktop (> 1024px)
- [ ] Le menu mobile fonctionne correctement
- [ ] Les formulaires sont utilisables sur mobile

### 10. Tests de Fallback

#### Sans API
```bash
# Arrêter le backend et vérifier :
- [ ] La page d'accueil affiche les slides de fallback
- [ ] La page d'accueil affiche les 4 solutions statiques
- [ ] La page blog affiche les articles statiques
- [ ] Les formulaires affichent un message d'erreur clair
- [ ] Aucune erreur JavaScript ne bloque l'application
```

## Tests Navigateurs

Tester sur :
- [ ] Chrome/Edge (dernière version)
- [ ] Firefox (dernière version)
- [ ] Safari (si disponible)

## Checklist finale avant déploiement

- [ ] `npm run lint` : aucune erreur
- [ ] `npm run build` : build réussi
- [ ] Toutes les variables d'environnement sont configurées
- [ ] Le fichier `.env.local` est documenté (mais pas commité)
- [ ] Les formulaires de contact et devis fonctionnent en production
- [ ] Les données API se chargent correctement
- [ ] Les fallbacks fonctionnent si l'API est indisponible
- [ ] Les erreurs sont gérées gracieusement
- [ ] Le site est responsive sur tous les appareils

## Rapports de Bugs

Si vous trouvez un bug :
1. Noter l'URL de la page
2. Noter les étapes pour reproduire
3. Noter le message d'erreur (console navigateur)
4. Noter le navigateur et la version
5. Vérifier si l'API backend fonctionne
6. Vérifier les logs du backend

## Logs utiles

### Frontend (Console navigateur)
```javascript
// Activer les logs de debug
localStorage.setItem('debug', 'true');
```

### Backend
Vérifier les logs du serveur NestJS pour voir :
- Les requêtes reçues
- Les erreurs de validation
- Les erreurs de base de données
