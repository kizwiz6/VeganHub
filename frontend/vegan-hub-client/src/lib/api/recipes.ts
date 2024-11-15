// src/lib/api/recipes.ts
import { Recipe, RecipeStatus } from '@/types/recipe';
import { api } from './axios';

interface ModerationData {
  status: RecipeStatus;
  notes?: string;
}

export const recipesApi = {
  getBySlug: async (slug: string): Promise<Recipe> => {
    const response = await api.get(`/recipes/${slug}`);
    return response.data;
  },

  getPendingRecipes: async (): Promise<Recipe[]> => {
    const response = await api.get('/recipes/pending');
    return response.data;
  },

  moderateRecipe: async (recipeId: string, data: ModerationData): Promise<Recipe> => {
    const response = await api.patch(`/recipes/${recipeId}/moderate`, data);
    return response.data;
  }
};