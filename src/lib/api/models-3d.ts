export interface Model3D {
  id: string;
  name: string;
  description?: string;
  category: string;
  modelUrl: string;
  thumbnailUrl?: string;
  defaultSettings?: {
    colors?: string[];
    dimensions?: {
      width?: number;
      height?: number;
      depth?: number;
    };
    materials?: string[];
    [key: string]: any;
  };
  isActive: boolean;
  order: number;
  locale: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export async function getModels3D(params?: {
  category?: string;
  locale?: string;
}): Promise<Model3D[]> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.locale) searchParams.append('locale', params.locale);

    const url = `${API_URL}/content/models-3d${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error('Failed to fetch 3D models');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching 3D models:', error);
    return [];
  }
}

export async function getModel3DById(id: string): Promise<Model3D | null> {
  try {
    const response = await fetch(`${API_URL}/content/models-3d/${id}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch 3D model');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching 3D model:', error);
    return null;
  }
}
