import { apiClient, HATEOASResponse } from './base';

export interface ArtGenerationRequest {
  description: string;
  style?: string;
  size?: string;
}

export interface ArtGenerationResponse {
  id: string;
  imageUrl: string;
  description: string;
  style?: string;
  createdAt: string;
  userId?: string;
}

export interface ArtGenerationError {
  message: string;
  code?: string;
}

export const generateArt = async (request: ArtGenerationRequest): Promise<ArtGenerationResponse> => {
  try {
    const response = await apiClient.post<ArtGenerationResponse>('/api/art/generate/', request);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при генерации арт-объекта');
  }
};

export const getArtHistory = async (): Promise<ArtGenerationResponse[]> => {
  try {
    const response = await apiClient.get<ArtGenerationResponse[]>('/api/art/history/');
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при загрузке истории');
  }
};

export const deleteArt = async (artId: string): Promise<void> => {
  try {
    await apiClient.delete(`/api/art/${artId}/`);
  } catch (error) {
    throw new Error('Ошибка при удалении арт-объекта');
  }
};

export const getUserArt = async (userId: string): Promise<ArtGenerationResponse[]> => {
  try {
    const response = await apiClient.get<ArtGenerationResponse[]>(`/api/art/user/${userId}/`);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при получении арт-объектов пользователя');
  }
};

export const getArtById = async (artId: string): Promise<ArtGenerationResponse> => {
  try {
    const response = await apiClient.get<ArtGenerationResponse>(`/api/art/${artId}/`);
    return response.data;
  } catch (error) {
    throw new Error('Ошибка при загрузке арт-объекта');
  }
};
