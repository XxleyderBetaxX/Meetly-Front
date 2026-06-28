import { apiClient } from './api';
import type { LoginCredentials, LoginResponse } from '../types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

    async logout(): Promise<void> {
      await apiClient.post('/auth/logout');
    }
};
