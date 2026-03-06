# Multipoles — Site Vitrine V3

Site web professionnel pour **[Multipoles](https://multi-poles.net)**, spécialiste PLV (Publicité sur Lieu de Vente), packaging haut de gamme et structures volumétriques en carton depuis 1985.

---

## Aperçu

| | |
|---|---|
| **Framework** | Next.js 15.5 (App Router + Turbopack) |
| **Langage** | TypeScript |
| **Style** | Tailwind CSS v4 |
| **3D** | Three.js 0.170 (via importmap CDN) |
| **React** | 19 |
| **Port dev** | `3002` |

---

## Installation et démarrage

```bash
# Cloner le repo
git clone https://github.com/jeyiop/sitempv3.git
cd sitempv3

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
# → http://localhost:3002

# Build production
npm run build
npm run start
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Accueil — carousel hero, savoir-faire, vitrine produits |
| `/solutions` | Solutions PLV, packaging carton, imprimerie |
| `/realisations` | Galerie de réalisations clients |
| `/simulateur` | **Studio 3D** PLV & Packaging interactif |
| `/apropos` | Histoire et équipe Multipoles |
| `/blog` | Articles, actualités métier |
| `/contact` | Formulaire de contact |
| `/devis` | Demande de devis en ligne |

---

## Éditeur visuel intégré

Un éditeur no-code embarqué permet de personnaliser le site sans toucher au code.

### Activation
Bouton **✏️ Éditeur** en bas à droite de toutes les pages.

### Fonctionnalités

| Fonction | Description |
|---|---|
| 🖼️ **Images** | Remplacement via galerie interne ou upload local |
| ✏️ **Textes** | Édition inline au clic |
| 🔍 **Zoom/Recadrage** | Ajustement du cadrage de chaque image |
| 📐 **Layout hero** | Ajustement largeur des cartes par slide |
| 💾 **Sauvegarde serveur** | Bouton → écrit dans `src/data/editor-overrides.json` |
| 📤 **Export JSON** | Télécharge toutes les modifications |
| 📥 **Import JSON** | Restaure des modifications exportées |

### API interne éditeur

```
GET  /api/studio/load   → charge les overrides sauvegardés (JSON)
POST /api/studio/save   → sauvegarde les overrides côté serveur
```

Les overrides sont persistés dans `src/data/editor-overrides.json` et chargés automatiquement au démarrage.

---

## Simulateur 3D

Accessible via `/simulateur` — studio 3D interactif basé sur Three.js, servi comme fichier statique (`public/studio-3d.html`) dans une iframe.

### Fonctionnalités
- **Mode PLV de sol** — présentoir carton avec configuration étagères, facing, profondeur, fronton
- **Mode Packaging** — étui tuck-end avec dimensions L×P×H configurables
- **Fiche devis client** intégrée (société, téléphone, description, quantité, délai)
- **8 thèmes visuels** : Warm pro, Tech cobalt, Pharma, Pharma clair, Cosmétique, Tech, Jour neutre, Studio neutre
- **Synthèse automatique** : capacité produits, dimensions totales, surface au sol

---

## Structure du projet

```
sitempv3/
├── src/
│   ├── app/                        # Pages (App Router)
│   │   ├── page.tsx                # Accueil
│   │   ├── layout.tsx              # Layout global
│   │   ├── globals.css             # Styles globaux
│   │   ├── simulateur/page.tsx     # Page studio 3D (iframe)
│   │   ├── realisations/page.tsx   # Galerie réalisations
│   │   ├── solutions/              # Page solutions
│   │   ├── apropos/                # Page à propos
│   │   ├── blog/                   # Blog
│   │   ├── contact/                # Contact
│   │   ├── devis/                  # Devis
│   │   └── api/
│   │       └── studio/
│   │           ├── load/route.ts   # GET — charge overrides
│   │           └── save/route.ts   # POST — sauvegarde overrides
│   ├── components/
│   │   ├── EditorWrapper.tsx       # Contexte éditeur + boutons flottants
│   │   ├── EditableImage.tsx       # Image cliquable + galerie en mode éditeur
│   │   ├── EditableText.tsx        # Texte éditable inline
│   │   ├── Header.tsx              # Navigation principale
│   │   ├── Footer.tsx              # Pied de page
│   │   ├── RealisationCard.tsx     # Carte réalisation
│   │   ├── SolutionCard.tsx        # Carte solution
│   │   └── ...
│   └── data/
│       └── editor-overrides.json   # Overrides éditeur (auto-généré)
│
└── public/
    ├── studio-3d.html              # Studio 3D standalone (Three.js)
    ├── image/
    │   ├── selecta/                # Photos produits sélectionnées
    │   │   ├── hero/               # Images carousel accueil
    │   │   ├── logo/               # Logos
    │   │   └── savoir-faire/       # Visuels savoir-faire
    │   └── slider-live-kraft/      # Photos kraft lifestyle
    └── ...
```

---

## Images et médias

### Inclus dans le repo
- `public/image/selecta/` — 20 photos sélectionnées pour le site
- `public/image/slider-live-kraft/` — slider lifestyle kraft

### Exclus du repo (trop volumineux)
Stockés localement et dans Dropbox : `E:\Dropbox\1💼_MULTIPOLES\Media\`

| Dossier | Taille |
|---|---|
| Base de donnée photo reel | 543 Mo |
| Kraft Style | 85 Mo |
| Classic | 52 Mo |
| CyberTech | 50 Mo |
| Cosmetique | 15 Mo |
| Pharma | 15 Mo |
| Logo & Template | 15 Mo |

Pour les utiliser en local, copier dans `public/image/` :
```bash
cp -r "E:/Dropbox/1💼_MULTIPOLES/Media/Classic" public/image/classic
```

---

## Déploiement VPS

Le VPS Hostinger (`72.60.45.230`) sert le site via Docker + Traefik.

```bash
# Build
npm run build

# Déployer
scp -r .next root@72.60.45.230:/docker/multipoles-v3/
```

> ⚠️ **Note** : Le VPS a été compromis (incident XMRig, fév. 2026). À reconfigurer avant déploiement production.

---

## Entreprise

**Multipoles**  
53 rue des Deux Communes — 93100 Montreuil  
📞 01 43 91 17 71 | ✉️ jeremy@multi-poles.net  
🌐 [multi-poles.net](https://multi-poles.net)

Réseau GIE : Cartoneo (PLV commerciale) · Freller (pharmaceutique/cosmétique)
