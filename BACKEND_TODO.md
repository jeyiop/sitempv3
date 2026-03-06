# TODO Backend - Liste Complète

## 🚨 Configuration Essentielle

### 1. CORS (main.ts)
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS - OBLIGATOIRE
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    credentials: true,
  });
  
  await app.listen(3000);
}
bootstrap();
```

## 📦 Modules à Créer

### ContentModule

**Controllers à créer:**
- `BlogController`
- `RealisationsController`
- `CarouselController`
- `SolutionsController`
- `TeamController`

**Structure:**
```
src/
├── content/
│   ├── content.module.ts
│   ├── blog/
│   │   ├── blog.controller.ts
│   │   ├── blog.service.ts
│   │   ├── entities/blog.entity.ts
│   │   └── dto/create-blog.dto.ts
│   ├── realisations/
│   ├── carousel/
│   ├── solutions/
│   └── team/
```

### FormsModule

**Controllers à créer:**
- `ContactController`
- `DevisController`

**Structure:**
```
src/
├── forms/
│   ├── forms.module.ts
│   ├── contact/
│   │   ├── contact.controller.ts
│   │   ├── contact.service.ts
│   │   ├── entities/contact.entity.ts
│   │   └── dto/contact-form.dto.ts
│   └── devis/
│       ├── devis.controller.ts
│       ├── devis.service.ts
│       ├── entities/devis.entity.ts
│       └── dto/devis-form.dto.ts
```

## 🔍 Endpoints Détaillés

### 1. Blog

#### GET /api/v1/content/blog
**Query Parameters:**
- `page` (number, optionnel, default: 1)
- `limit` (number, optionnel, default: 10)
- `category` (string, optionnel)
- `tag` (string, optionnel)
- `search` (string, optionnel)
- `locale` (string, optionnel, default: 'fr')

**Réponse:**
```json
{
  "success": true,
  "message": "Blog posts retrieved successfully",
  "data": {
    "data": [
      {
        "id": "uuid",
        "slug": "article-slug",
        "title": "Titre de l'article",
        "excerpt": "Court résumé...",
        "content": "<p>Contenu HTML...</p>",
        "featuredImage": "https://...",
        "category": "Tendances",
        "tags": ["PLV", "Innovation"],
        "author": {
          "name": "Jean Dupont",
          "avatar": "https://..."
        },
        "publishedAt": "2025-01-15T10:00:00Z",
        "readTime": 5,
        "locale": "fr",
        "isPublished": true
      }
    ],
    "meta": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100,
      "itemsPerPage": 10
    }
  }
}
```

#### GET /api/v1/content/blog/:slug
**Path Parameters:**
- `slug` (string)

**Query Parameters:**
- `locale` (string, optionnel)

**Réponse:** Même structure qu'un article dans la liste

### 2. Réalisations

#### GET /api/v1/content/realisations
**Query Parameters:**
- `locale` (string, optionnel)

**Réponse:**
```json
{
  "success": true,
  "message": "Realisations retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "title": "Présentoir Cosmétique",
      "description": "Description complète...",
      "client": "Brand Cosmetics",
      "category": "PLV",
      "images": ["url1", "url2", "url3"],
      "featuredImage": "url1",
      "year": 2024,
      "tags": ["Cosmétiques", "Luxury"],
      "locale": "fr",
      "isPublished": true,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### GET /api/v1/content/realisations/:id
**Path Parameters:**
- `id` (string)

**Query Parameters:**
- `locale` (string, optionnel)

### 3. Carousel

#### GET /api/v1/content/carousel
**Query Parameters:**
- `locale` (string, optionnel)

**Réponse:**
```json
{
  "success": true,
  "message": "Carousel slides retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "title": "Solutions PLV innovantes",
      "subtitle": "Valorisez votre marque",
      "imageUrl": "https://...",
      "videoUrl": "https://...",  // optionnel
      "ctaText": "Découvrir",
      "ctaLink": "/solutions",
      "order": 1,
      "isActive": true,
      "locale": "fr"
    }
  ]
}
```

### 4. Solutions

#### GET /api/v1/content/solutions
**Query Parameters:**
- `locale` (string, optionnel)

**Réponse:**
```json
{
  "success": true,
  "message": "Solutions retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "title": "PLV",
      "description": "Description de la solution...",
      "icon": "💡",  // emoji ou icône
      "slug": "plv",
      "features": ["Feature 1", "Feature 2"],
      "order": 1,
      "isActive": true,
      "locale": "fr"
    }
  ]
}
```

### 5. Team

#### GET /api/v1/content/team
**Query Parameters:**
- `locale` (string, optionnel)

**Réponse:**
```json
{
  "success": true,
  "message": "Team members retrieved successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Jean Dupont",
      "position": "Directeur Technique",
      "bio": "Biographie...",
      "photo": "https://...",
      "email": "jean@multipoles.com",
      "phone": "+33123456789",
      "linkedin": "https://linkedin.com/in/...",
      "order": 1,
      "isActive": true,
      "locale": "fr"
    }
  ]
}
```

### 6. Contact Form

#### POST /api/v1/forms/contact
**Body:**
```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean@example.com",
  "phone": "0612345678",
  "company": "ACME Corp",  // optionnel
  "message": "Message de contact...",
  "acceptTerms": true
}
```

**Validation:**
- `firstName`: string, min 2 caractères
- `lastName`: string, min 2 caractères
- `email`: format email valide
- `phone`: requis
- `message`: string, min 10 caractères
- `acceptTerms`: boolean, doit être true

**Réponse Succès:**
```json
{
  "success": true,
  "message": "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais."
}
```

**Réponse Erreur:**
```json
{
  "success": false,
  "message": "Erreur de validation",
  "errors": {
    "email": ["L'email n'est pas valide"],
    "message": ["Le message doit contenir au moins 10 caractères"]
  }
}
```

### 7. Devis Form

#### POST /api/v1/forms/devis
**Body:**
```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean@example.com",
  "phone": "0612345678",
  "company": "ACME Corp",
  "projectType": "PLV",
  "description": "Description détaillée du projet...",
  "budget": "5000-10000",  // optionnel
  "quantity": 10,  // optionnel
  "dimensions": {  // optionnel
    "width": 50,
    "height": 120,
    "depth": 30
  },
  "desiredDeliveryDate": "2025-06-15",  // optionnel
  "acceptTerms": true
}
```

**Validation:**
- `firstName`, `lastName`, `email`, `phone`: requis
- `company`: requis
- `projectType`: requis
- `description`: requis
- `dimensions`: si fourni, width, height, depth doivent être numériques
- `acceptTerms`: boolean, doit être true

## 🗄️ Modèles Base de Données

### Blog Post
```typescript
@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column('text')
  excerpt: string;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  featuredImage: string;

  @Column()
  category: string;

  @Column('simple-array')
  tags: string[];

  @Column('json')
  author: { name: string; avatar?: string };

  @Column()
  publishedAt: Date;

  @Column({ nullable: true })
  readTime: number;

  @Column({ default: 'fr' })
  locale: string;

  @Column({ default: true })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### Contact Submission
```typescript
@Entity()
export class ContactSubmission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  company: string;

  @Column('text')
  message: string;

  @Column({ default: false })
  isProcessed: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
```

### Devis Submission
```typescript
@Entity()
export class DevisSubmission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  company: string;

  @Column()
  projectType: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  budget: string;

  @Column({ nullable: true })
  quantity: number;

  @Column('json', { nullable: true })
  dimensions: { width: number; height: number; depth: number };

  @Column({ nullable: true })
  desiredDeliveryDate: string;

  @Column({ default: false })
  isProcessed: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
```

## ✅ Checklist Implémentation

### Phase 1: Configuration
- [ ] Activer CORS dans main.ts
- [ ] Installer class-validator et class-transformer
- [ ] Configurer la connexion base de données

### Phase 2: Content Module
- [ ] Créer les entities (Blog, Realisation, Carousel, Solution, Team)
- [ ] Créer les DTOs
- [ ] Implémenter BlogController et BlogService
- [ ] Implémenter RealisationsController et Service
- [ ] Implémenter CarouselController et Service
- [ ] Implémenter SolutionsController et Service
- [ ] Implémenter TeamController et Service
- [ ] Ajouter support pagination pour le blog
- [ ] Ajouter support locale (fr/en)

### Phase 3: Forms Module
- [ ] Créer ContactFormDto avec validation
- [ ] Créer DevisFormDto avec validation
- [ ] Implémenter ContactController et Service
- [ ] Implémenter DevisController et Service
- [ ] Sauvegarder les soumissions en base de données
- [ ] Optionnel: Envoyer des emails de notification

### Phase 4: Tests
- [ ] Tester tous les endpoints avec Postman/Insomnia
- [ ] Vérifier le format des réponses
- [ ] Tester la validation des formulaires
- [ ] Tester avec le frontend

## 📧 Email Notifications (Optionnel)

Ajoutez un service d'envoi d'emails pour:
- Notification admin lors d'une soumission de contact
- Notification admin lors d'une demande de devis
- Email de confirmation à l'utilisateur

```typescript
// Exemple avec nodemailer
async sendContactNotification(data: ContactFormDto) {
  await this.mailer.sendMail({
    to: 'contact@multipoles.com',
    subject: 'Nouveau message de contact',
    template: 'contact-notification',
    context: data,
  });
}
```

## 🔐 Sécurité

- [ ] Ajouter rate limiting sur les endpoints de formulaires
- [ ] Valider et sanitiser toutes les entrées
- [ ] Ajouter CAPTCHA si nécessaire
- [ ] Logger les soumissions suspectes

## 📊 Monitoring

- [ ] Logger les erreurs
- [ ] Monitorer les temps de réponse
- [ ] Tracker les soumissions de formulaires
- [ ] Alertes pour les erreurs critiques

---

## 🚀 Démarrage Rapide

1. Cloner le backend
2. Installer les dépendances: `npm install`
3. Configurer `.env` avec les infos de BDD
4. Suivre cette checklist
5. Lancer: `npm run start:dev`
6. Tester avec le frontend
