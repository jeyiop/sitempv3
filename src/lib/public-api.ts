import {
  ApiResponse,
  PaginatedResponse,
  BlogPost,
  BlogListParams,
  Realisation,
  CarouselSlide,
  Solution,
  TeamMember,
  ContactFormData,
  DevisFormData,
} from '@/types/api';

type BackendRealisationStatus = 'draft' | 'published' | 'archived';

interface BackendRealisation {
  id: string;
  title: string;
  description: string;
  category?: string;
  images?: string[];
  thumbnail?: string;
  technologies?: string[];
  clientName?: string;
  projectDate?: string;
  status: BackendRealisationStatus;
  featured?: boolean;
  locale: string;
  createdAt: string;
  updatedAt: string;
}

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const INTERNAL_API_URL = process.env.INTERNAL_API_URL || PUBLIC_API_URL;

const API_URL = typeof window === 'undefined' ? INTERNAL_API_URL : PUBLIC_API_URL;

class PublicApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private adaptRealisation(item: BackendRealisation): Realisation {
    const year = item.projectDate
      ? new Date(item.projectDate).getFullYear()
      : new Date(item.createdAt).getFullYear();

    const images = Array.isArray(item.images) && item.images.length > 0
      ? item.images
      : item.thumbnail
        ? [item.thumbnail]
        : [];

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      client: item.clientName ?? '',
      category: item.category ?? 'Autre',
      images,
      featuredImage: item.thumbnail,
      year,
      tags: item.technologies ?? [],
      locale: item.locale,
      isPublished: item.status === 'published',
      createdAt: item.createdAt,
    };
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Une erreur est survenue',
          errors: data.errors,
        };
      }

      return {
        success: true,
        message: 'Success',
        data,
      };
    } catch {
      return {
        success: false,
        message: 'Erreur de connexion au serveur',
      };
    }
  }

  // Blog endpoints
  async getBlogPosts(params?: BlogListParams): Promise<ApiResponse<PaginatedResponse<BlogPost>>> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.tag) queryParams.append('tag', params.tag);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.locale) queryParams.append('locale', params.locale);

    const query = queryParams.toString();
    return this.request<PaginatedResponse<BlogPost>>(
      `/content/blog${query ? `?${query}` : ''}`
    );
  }

  async getBlogPostBySlug(slug: string, locale?: string): Promise<ApiResponse<BlogPost>> {
    const queryParams = locale ? `?locale=${locale}` : '';
    return this.request<BlogPost>(`/content/blog/${slug}${queryParams}`);
  }

  // Realisations endpoints
  async getRealisations(locale?: string): Promise<ApiResponse<Realisation[]>> {
    const queryParams = locale ? `?locale=${locale}` : '';
    const response = await this.request<{ data: BackendRealisation[]; meta: any }>(
      `/content/realisations${queryParams}`,
    );

    if (response.success && response.data?.data && Array.isArray(response.data.data)) {
      return {
        success: true,
        message: response.message,
        data: response.data.data.map((item) => this.adaptRealisation(item)),
      };
    }

    return {
      success: false,
      message: response.message || 'Failed to fetch realisations',
      errors: response.errors,
    };
  }

  async getRealisationById(id: string, locale?: string): Promise<ApiResponse<Realisation>> {
    const queryParams = locale ? `?locale=${locale}` : '';
    const response = await this.request<BackendRealisation>(
      `/content/realisations/${id}${queryParams}`,
    );

    if (response.success && response.data) {
      return {
        ...response,
        data: this.adaptRealisation(response.data),
      };
    }

    return {
      success: false,
      message: response.message,
      errors: response.errors,
    };
  }

  // Carousel endpoints
  async getCarouselSlides(locale?: string): Promise<ApiResponse<CarouselSlide[]>> {
    const queryParams = locale ? `?locale=${locale}` : '';
    return this.request<CarouselSlide[]>(`/content/carousel${queryParams}`);
  }

  // Solutions endpoints
  async getSolutions(locale?: string): Promise<ApiResponse<Solution[]>> {
    const queryParams = locale ? `?locale=${locale}` : '';
    return this.request<Solution[]>(`/content/solutions${queryParams}`);
  }

  // Team endpoints
  async getTeamMembers(locale?: string): Promise<ApiResponse<TeamMember[]>> {
    const queryParams = locale ? `?locale=${locale}` : '';
    return this.request<TeamMember[]>(`/content/team${queryParams}`);
  }

  // Form endpoints
  async submitContactForm(data: ContactFormData): Promise<ApiResponse<void>> {
    return this.request<void>('/forms/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async submitDevisForm(data: DevisFormData): Promise<ApiResponse<void>> {
    return this.request<void>('/forms/devis', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const publicApi = new PublicApiClient(API_URL);
