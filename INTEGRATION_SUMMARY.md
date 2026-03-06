# Multi-Pôles - Integration Summary

## 📋 Overview

This document provides a comprehensive overview of all integrations, dependencies, and architectural connections in the Multi-Pôles frontend application.

**Project Type**: Next.js 15.5.6 Web Application (App Router)  
**Purpose**: Public website for Multi-Pôles PLV and packaging solutions  
**Architecture**: Frontend-only application with RESTful API backend integration

---

## 🏗️ Tech Stack & Dependencies

### Core Framework
- **Next.js** `15.5.6` - React framework with App Router
- **React** `19.0.0` - UI library
- **React DOM** `19.0.0` - DOM rendering
- **TypeScript** `5.x` - Type safety

### UI & Styling
- **TailwindCSS** `4.x` - Utility-first CSS framework
- **@tailwindcss/postcss** `4.x` - PostCSS plugin
- **Framer Motion** `12.9.1` - Animation library
- **Lucide React** `0.441.0` - Icon library
- **class-variance-authority** `0.7.1` - Component variants
- **clsx** `2.1.1` - Conditional className utility
- **tailwind-merge** `2.6.0` - Tailwind class merging

### Component Libraries
- **@headlessui/react** `2.2.2` - Unstyled accessible UI components
- **@radix-ui/react-navigation-menu** `1.2.14` - Navigation menu primitives

### 3D Graphics
- **Three.js** `0.176.0` - 3D graphics library
- **@react-three/fiber** `9.1.2` - React renderer for Three.js
- **@react-three/drei** `10.0.7` - Useful helpers for react-three-fiber

### Forms
- **react-hook-form** `7.56.1` - Form state management and validation

### Development Tools
- **ESLint** `9.x` - Code linting
- **@eslint/eslintrc** `3.x` - ESLint configuration
- **eslint-config-next** `15.3.1` - Next.js ESLint config

---

## 🔌 Backend API Integration

### Base Configuration
- **API URL**: `http://localhost:3000` (dev) / Configurable via `NEXT_PUBLIC_API_URL`
- **API Client**: Custom `PublicApiClient` class (`src/lib/public-api.ts`)
- **Response Format**: Standardized `ApiResponse<T>` wrapper
- **Error Handling**: Built-in fallback to static data when API unavailable

### API Client Features
```typescript
class PublicApiClient {
  - Centralized HTTP client
  - Automatic JSON serialization
  - Error handling & recovery
  - TypeScript type safety
  - Query parameter building
}
```

---

## 📡 API Endpoints

### Content Endpoints

#### 1. Blog Posts
**Base Path**: `/api/v1/content/blog`

| Method | Endpoint | Parameters | Response Type |
|--------|----------|------------|---------------|
| GET | `/api/v1/content/blog` | page, limit, category, tag, search, locale | `PaginatedResponse<BlogPost>` |
| GET | `/api/v1/content/blog/:slug` | locale | `BlogPost` |

**Features**:
- Pagination support
- Category filtering
- Tag filtering
- Full-text search
- Multi-language (fr/en)

**Hook**: `useBlogPosts()`, `useBlogPost(slug)`

#### 2. Realisations (Projects)
**Base Path**: `/api/v1/content/realisations`

| Method | Endpoint | Parameters | Response Type |
|--------|----------|------------|---------------|
| GET | `/api/v1/content/realisations` | locale | `Realisation[]` |
| GET | `/api/v1/content/realisations/:id` | locale | `Realisation` |

**Features**:
- Project portfolio
- Client information
- Image galleries
- Multi-language

**Hook**: `useRealisations()`, `useRealisation(id)`

#### 3. Carousel Slides
**Base Path**: `/api/v1/content/carousel`

| Method | Endpoint | Parameters | Response Type |
|--------|----------|------------|---------------|
| GET | `/api/v1/content/carousel` | locale | `CarouselSlide[]` |

**Features**:
- Homepage hero carousel
- Video/image support
- CTA buttons
- Ordered slides

**Hook**: `useCarousel()`

#### 4. Solutions/Services
**Base Path**: `/api/v1/content/solutions`

| Method | Endpoint | Parameters | Response Type |
|--------|----------|------------|---------------|
| GET | `/api/v1/content/solutions` | locale | `Solution[]` |

**Features**:
- Service offerings
- Features list
- Icon support
- Ordered display

**Hook**: `useSolutions()`

#### 5. Team Members
**Base Path**: `/api/v1/content/team`

| Method | Endpoint | Parameters | Response Type |
|--------|----------|------------|---------------|
| GET | `/api/v1/content/team` | locale | `TeamMember[]` |

**Features**:
- Staff profiles
- Contact information
- Social links (LinkedIn)
- Ordered display

**Hook**: `useTeamMembers()`

### Form Endpoints

#### 6. Contact Form
**Endpoint**: `POST /api/v1/forms/contact`

**Request Body**:
```typescript
{
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  acceptTerms: boolean;
}
```

**Response**: Success/error with validation messages

**Integration**: `publicApi.submitContactForm(data)`

#### 7. Devis (Quote) Form
**Endpoint**: `POST /api/v1/forms/devis`

**Request Body**:
```typescript
{
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  description: string;
  budget?: string;
  quantity?: number;
  dimensions?: { width, height, depth };
  desiredDeliveryDate?: string;
  acceptTerms: boolean;
}
```

**Response**: Success/error with validation messages

**Integration**: `publicApi.submitDevisForm(data)`

---

## 🎣 Custom Hooks

### API Hooks (`src/hooks/use-api.ts`)

All hooks follow the same pattern:
```typescript
interface UseApiState<T> {
  data: T | null;           // API response data
  loading: boolean;         // Loading state
  error: string | null;     // Error message
  refetch: () => Promise<void>;  // Manual refetch function
}
```

**Available Hooks**:
1. `useBlogPosts(params)` - Paginated blog posts
2. `useBlogPost(slug, locale)` - Single blog post
3. `useRealisations(locale)` - All projects
4. `useRealisation(id, locale)` - Single project
5. `useCarousel(locale)` - Carousel slides
6. `useSolutions(locale)` - Solutions list
7. `useTeamMembers(locale)` - Team members

### Utility Hooks
- `use-mobile.ts` - Responsive design detection

---

## 📂 Architecture & Data Flow

```
┌─────────────────┐
│   Next.js App   │
│   (Frontend)    │
└────────┬────────┘
         │
         │ 1. Component renders
         │ 2. useApi hook called
         │
┌────────▼────────────────┐
│  Custom API Hooks       │
│  (use-api.ts)           │
│  - State management     │
│  - Error handling       │
└────────┬────────────────┘
         │
         │ 3. Calls API client
         │
┌────────▼────────────────┐
│  PublicApiClient        │
│  (public-api.ts)        │
│  - HTTP requests        │
│  - Type safety          │
└────────┬────────────────┘
         │
         │ 4. HTTP Request
         │
┌────────▼────────────────┐
│   NestJS Backend        │
│   http://localhost:3000 │
│  - Content API          │
│  - Forms API            │
└────────┬────────────────┘
         │
         │ 5. Response
         │
┌────────▼────────────────┐
│   Component Update      │
│  - Display data         │
│  - Or show fallback     │
└─────────────────────────┘
```

---

## 🗄️ Type System

### Core Types (`src/types/api.ts`)

#### Response Wrappers
```typescript
ApiResponse<T>           // Generic API response
PaginatedResponse<T>     // Paginated data with meta
PaginationMeta          // Pagination metadata
```

#### Content Types
```typescript
BlogPost                // Blog article
Realisation             // Project/portfolio item
CarouselSlide          // Homepage carousel slide
Solution               // Service/solution offering
TeamMember             // Team member profile
```

#### Form Types
```typescript
ContactFormData        // Contact form submission
DevisFormData          // Quote form submission
```

All types are fully typed with TypeScript for complete type safety across the application.

---

## 🔄 State Management

### API State
- **Pattern**: React hooks with local state
- **Library**: Native React `useState`, `useEffect`
- **Caching**: No caching (fresh data on every mount)
- **Refetch**: Manual via `refetch()` function

### Form State
- **Library**: React Hook Form `7.56.1`
- **Validation**: Built-in validation rules
- **Multi-step**: Custom stepper for Devis form

---

## 🎨 UI Component Integrations

### Animation
- **Framer Motion**: Page transitions, scroll animations, hover effects
- **Usage**: `motion.*` components throughout app

### Icons
- **Lucide React**: All icons (consistent design system)
- **Usage**: Import individual icons as needed

### Headless UI
- **@headlessui/react**: Modals, dropdowns, transitions
- **Purpose**: Accessible unstyled components

### Radix UI
- **Navigation Menu**: Header navigation system
- **Purpose**: Complex navigation with accessibility

### 3D Visualization
- **Three.js + React Three Fiber**: 3D product simulator
- **Component**: `Simulator3D.tsx`
- **Usage**: Interactive 3D display configurator

---

## 🌐 Internationalization

### Current Implementation
- **Languages**: French (fr), English (en)
- **Method**: API-driven via `locale` parameter
- **Default**: French (fr)
- **Status**: Prepared but not fully implemented

### How It Works
All content endpoints accept `?locale=fr` or `?locale=en` parameter to retrieve localized content.

---

## 🔐 Environment Configuration

### Required Variables
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Configuration Files
- `.env.local` - Local development (not in git)
- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

---

## 🚨 Error Handling & Fallbacks

### Strategy
1. **Try API first**: Attempt to fetch from backend
2. **Catch errors**: Handle network/API failures gracefully
3. **Fallback data**: Display static data if API unavailable
4. **User feedback**: Show error messages when appropriate

### Fallback Data
Static data is defined in page components for:
- Blog posts (6 sample articles)
- Other content TBD

---

## 🧪 Testing Strategy

### Current Status
- **Unit Tests**: Not implemented
- **Integration Tests**: Manual testing
- **E2E Tests**: Not implemented

### Testing Checklist (from TESTS.md)
- ✅ All pages load correctly
- ✅ Forms submit successfully
- ✅ API integration works
- ✅ Fallback data displays
- ✅ Responsive design
- ✅ Navigation works

---

## 📦 Build & Deployment

### Development
```bash
npm run dev          # Start dev server (Turbopack)
```

### Production
```bash
npm run build        # Build for production
npm start           # Start production server
```

### Output
- **Type**: Static Site Generation (SSG) + Server-Side Rendering (SSR)
- **Output Dir**: `.next/`
- **Static Assets**: `public/`

---

## 🔗 Key Integration Points

### 1. Homepage (`/`)
- **Carousel**: `useCarousel()` → Dynamic hero slides
- **Solutions**: `useSolutions()` → Service offerings
- **Realisations**: `useRealisations()` → Portfolio preview

### 2. Blog (`/blog`, `/blog/[slug]`)
- **List**: `useBlogPosts()` → Paginated articles
- **Detail**: `useBlogPost(slug)` → Single article
- **Features**: Search, filtering, pagination

### 3. Realisations (`/realisations`)
- **Gallery**: `useRealisations()` → All projects
- **Modal**: Project detail viewer with image carousel

### 4. Team (`/equipe`)
- **List**: `useTeamMembers()` → Staff profiles
- **Display**: Cards with contact info

### 5. Contact (`/contact`)
- **Form**: React Hook Form → `submitContactForm()`
- **Validation**: Client-side + server-side

### 6. Devis (`/devis`)
- **Form**: Multi-step wizard → `submitDevisForm()`
- **Steps**: 4-step process with validation

### 7. 3D Simulator (`/simulateur`)
- **Engine**: Three.js + React Three Fiber
- **Component**: `Simulator3D.tsx`
- **Purpose**: Interactive product configuration

---

## 🔧 Backend Requirements

For full functionality, the NestJS backend must:

1. **Enable CORS** for `http://localhost:3001`
2. **Implement all content endpoints** (blog, realisations, etc.)
3. **Implement form endpoints** (contact, devis)
4. **Return proper response format**:
   ```typescript
   {
     success: boolean;
     message: string;
     data?: T;
     errors?: Record<string, string[]>;
   }
   ```
5. **Support locale parameter** for i18n
6. **Validate form submissions** with proper error messages

Detailed backend requirements: See `BACKEND_TODO.md`

---

## 📊 Performance Considerations

### Optimization Strategies
- **Image Optimization**: Next.js `<Image>` component
- **Code Splitting**: Automatic via Next.js App Router
- **Lazy Loading**: Components loaded on demand
- **Turbopack**: Fast development builds
- **Static Generation**: Pages pre-rendered when possible

### Bundle Size
- **Framework**: Next.js (minimal overhead)
- **UI Libraries**: Tree-shakeable (Lucide, TailwindCSS)
- **3D**: Three.js (~600KB) - loaded only on simulator page

---

## 🐛 Known Issues & Limitations

1. **API Dependency**: Full functionality requires backend
2. **No Caching**: API calls repeated on every mount
3. **No Auth**: Public API, no authentication
4. **Limited i18n**: Locale support prepared but not complete
5. **No Analytics**: No tracking integration yet

---

## 🚀 Future Integration Opportunities

### Potential Additions
- **Analytics**: Google Analytics / Plausible
- **CMS**: Headless CMS integration (Strapi, Contentful)
- **Search**: Algolia for advanced search
- **Email**: Transactional emails (SendGrid, Mailgun)
- **Storage**: Cloud storage for images (Cloudinary, S3)
- **Auth**: User authentication (if needed)
- **CRM**: Form submissions to CRM (HubSpot, Salesforce)
- **Chat**: Live chat widget (Intercom, Crisp)

---

## 📞 Support & Documentation

### Related Documentation
- **README.md** - Project overview and quick start
- **SETUP.md** - Detailed setup instructions
- **TESTS.md** - Testing guide and checklist
- **BACKEND_TODO.md** - Backend implementation guide
- **FICHIERS_MODIFIES.md** - Change log

### API Documentation
- API types: `src/types/api.ts`
- API client: `src/lib/public-api.ts`
- API hooks: `src/hooks/use-api.ts`

---

## ✅ Integration Checklist

### Frontend Setup
- [x] Next.js 15 with App Router
- [x] TypeScript configuration
- [x] TailwindCSS 4 setup
- [x] API client implementation
- [x] Custom hooks for data fetching
- [x] Type definitions
- [x] Error handling & fallbacks
- [x] Form validation
- [x] 3D simulator integration
- [x] Responsive design
- [x] Animation system

### Backend Integration
- [ ] CORS enabled
- [ ] Content endpoints implemented
- [ ] Form endpoints implemented
- [ ] Database models created
- [ ] Validation rules applied
- [ ] Error responses standardized
- [ ] Locale support added

### Testing
- [ ] All pages tested
- [ ] Forms tested
- [ ] API integration tested
- [ ] Responsive tested
- [ ] Cross-browser tested

---

**Last Updated**: 2024  
**Document Version**: 1.0  
**Project**: Multi-Pôles Frontend
