// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// Blog types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime?: number;
  locale: string;
  isPublished: boolean;
}

export interface BlogListParams {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  search?: string;
  locale?: string;
}

// Realisation types
export interface Realisation {
  id: string;
  title: string;
  description: string;
  client: string;
  category: string;
  images: string[];
  featuredImage?: string;
  year: number;
  tags: string[];
  locale: string;
  isPublished: boolean;
  createdAt: string;
}

// Carousel types
export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  videoUrl?: string;
  ctaText: string;
  ctaLink: string;
  order: number;
  isActive: boolean;
  locale: string;
}

// Solution types
export interface Solution {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
  features: string[];
  order: number;
  isActive: boolean;
  locale: string;
}

// Team types
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  photo?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  order: number;
  active: boolean;
  locale: string;
}

// Form types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  acceptTerms: boolean;
}

export interface DevisFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  description: string;
  budget?: string;
  quantity?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  desiredDeliveryDate?: string;
  acceptTerms: boolean;
}
