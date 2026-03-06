import { useState, useEffect } from 'react';
import { publicApi } from '@/lib/public-api';
import {
  BlogPost,
  BlogListParams,
  Realisation,
  CarouselSlide,
  Solution,
  TeamMember,
  PaginatedResponse,
} from '@/types/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Hook for blog posts with pagination
export function useBlogPosts(params?: BlogListParams): UseApiState<PaginatedResponse<BlogPost>> {
  const [data, setData] = useState<PaginatedResponse<BlogPost> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await publicApi.getBlogPosts(params);
      
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Erreur lors du chargement des articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params?.page, params?.limit, params?.category, params?.tag, params?.search, params?.locale]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for single blog post by slug
export function useBlogPost(slug: string, locale?: string): UseApiState<BlogPost> {
  const [data, setData] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!slug) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await publicApi.getBlogPostBySlug(slug, locale);
      
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Erreur lors du chargement de l\'article');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug, locale]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for realisations
export function useRealisations(locale?: string): UseApiState<Realisation[]> {
  const [data, setData] = useState<Realisation[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await publicApi.getRealisations(locale);
      
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Erreur lors du chargement des réalisations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [locale]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for single realisation by ID
export function useRealisation(id: string, locale?: string): UseApiState<Realisation> {
  const [data, setData] = useState<Realisation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await publicApi.getRealisationById(id, locale);
      
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Erreur lors du chargement de la réalisation');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, locale]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for carousel slides
export function useCarousel(locale?: string): UseApiState<CarouselSlide[]> {
  const [data, setData] = useState<CarouselSlide[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await publicApi.getCarouselSlides(locale);
      
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Erreur lors du chargement du carousel');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [locale]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for solutions
export function useSolutions(locale?: string): UseApiState<Solution[]> {
  const [data, setData] = useState<Solution[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await publicApi.getSolutions(locale);
      
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Erreur lors du chargement des solutions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [locale]);

  return { data, loading, error, refetch: fetchData };
}

// Hook for team members
export function useTeamMembers(locale?: string): UseApiState<TeamMember[]> {
  const [data, setData] = useState<TeamMember[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await publicApi.getTeamMembers(locale);
      
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Erreur lors du chargement de l\'équipe');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [locale]);

  return { data, loading, error, refetch: fetchData };
}
