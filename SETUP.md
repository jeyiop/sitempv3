# Configuration et Installation - Multi-Pôles Frontend

## Prérequis

- Node.js 18+ installé
- Le backend NestJS doit être en cours d'exécution sur `http://localhost:3000`

## Installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Créer le fichier `.env.local`**
   
   Créez un fichier `.env.local` à la racine du projet avec le contenu suivant :
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

   **Important :** Ce fichier contient l'URL de votre API backend. Modifiez-la si votre backend utilise un port différent.

## Lancement en développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3001` (ou le port suivant disponible).

## Build de production

```bash
npm run build
npm start
```

## Vérification du code

```bash
# Linter
npm run lint

# Build (pour vérifier qu'il n'y a pas d'erreurs)
npm run build
```

## Configuration du Backend (à faire côté backend)

Pour que le frontend fonctionne correctement, assurez-vous que votre backend NestJS a les configurations suivantes :

### 1. CORS activé

Dans votre fichier `main.ts` du backend :

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Activer CORS
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'], // Ajouter l'URL du frontend
    credentials: true,
  });
  
  await app.listen(3000);
}
```

### 2. Endpoints requis

Vérifiez que tous ces endpoints sont implémentés dans votre backend :

#### Content Endpoints
- `GET /api/v1/content/blog?page=&limit=&category=&tag=&search=&locale=` - Liste des articles de blog
- `GET /api/v1/content/blog/:slug?locale=` - Détail d'un article par slug
- `GET /api/v1/content/realisations?locale=` - Liste des réalisations
- `GET /api/v1/content/realisations/:id?locale=` - Détail d'une réalisation
- `GET /api/v1/content/carousel?locale=` - Slides du carousel
- `GET /api/v1/content/solutions?locale=` - Liste des solutions
- `GET /api/v1/content/team?locale=` - Membres de l'équipe

#### Form Endpoints
- `POST /api/v1/forms/contact` - Soumission formulaire de contact
- `POST /api/v1/forms/devis` - Soumission formulaire de devis

### 3. Format des réponses API

Toutes les réponses doivent suivre ce format :

```typescript
{
  success: boolean;
  message: string;
  data?: T;  // Les données (optionnel)
  errors?: Record<string, string[]>; // Erreurs de validation (optionnel)
}
```

Pour les listes paginées (blog) :

```typescript
{
  success: true,
  message: "Success",
  data: {
    data: [...], // Les items
    meta: {
      currentPage: 1,
      totalPages: 5,
      totalItems: 50,
      itemsPerPage: 10
    }
  }
}
```

### 4. Validation des formulaires

#### Formulaire de Contact
```typescript
{
  firstName: string;      // Requis, min 2 caractères
  lastName: string;       // Requis, min 2 caractères
  email: string;          // Requis, format email valide
  phone: string;          // Requis
  company?: string;       // Optionnel
  message: string;        // Requis, min 10 caractères
  acceptTerms: boolean;   // Requis, doit être true
}
```

#### Formulaire de Devis
```typescript
{
  firstName: string;      // Requis
  lastName: string;       // Requis
  email: string;          // Requis, format email valide
  phone: string;          // Requis
  company: string;        // Requis
  projectType: string;    // Requis
  description: string;    // Requis
  budget?: string;        // Optionnel
  quantity?: number;      // Optionnel
  dimensions?: {          // Optionnel
    width: number;
    height: number;
    depth: number;
  };
  desiredDeliveryDate?: string;  // Optionnel
  acceptTerms: boolean;   // Requis, doit être true
}
```

### 5. Structure des données

Consultez le fichier `src/types/api.ts` pour voir toutes les interfaces TypeScript des données attendues par le frontend.

## Démarrage complet (Frontend + Backend)

1. **Démarrer le backend NestJS**
   ```bash
   cd /path/to/backend
   npm run start:dev
   ```
   Le backend devrait être accessible sur `http://localhost:3000`

2. **Démarrer le frontend Next.js**
   ```bash
   cd /path/to/multipoles-main
   npm run dev
   ```
   Le frontend sera accessible sur `http://localhost:3001`

3. **Tester la connexion**
   - Ouvrez `http://localhost:3001` dans votre navigateur
   - Vérifiez la console du navigateur pour les erreurs de connexion API
   - Testez les formulaires de contact et devis

## Dépannage

### Erreur CORS
Si vous voyez des erreurs CORS dans la console :
- Vérifiez que le backend a bien activé CORS
- Vérifiez que l'URL du frontend est dans la liste des origines autorisées

### Erreur de connexion à l'API
Si les données ne se chargent pas :
- Vérifiez que le backend est bien démarré sur le port 3000
- Vérifiez la variable `NEXT_PUBLIC_API_URL` dans `.env.local`
- Ouvrez les outils de développement du navigateur (F12) et consultez l'onglet Network

### Données statiques affichées
Si vous voyez des données de démonstration au lieu des données API :
- C'est normal ! Le frontend utilise des données de fallback si l'API ne répond pas
- Vérifiez que vos endpoints backend renvoient des données
- Consultez la console du navigateur pour les messages d'erreur

## Support

Pour toute question ou problème, consultez les fichiers :
- `TESTS.md` - Guide de tests complets
- `src/types/api.ts` - Définition des types TypeScript
- `src/lib/public-api.ts` - Client API
