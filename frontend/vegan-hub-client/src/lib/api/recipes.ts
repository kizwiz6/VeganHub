// src/lib/api/recipes.ts
import { Recipe, RecipeStatus } from '@/types/recipe';
import { api } from './axios';
import { sampleRecipes } from '@/data';

interface ModerationData {
  status: RecipeStatus;
  notes?: string;
}

export const recipesApi = {
    getAll: async (): Promise<Recipe[]> => {
        // Only return approved recipes
        return sampleRecipes.filter(recipe => recipe.status === RecipeStatus.APPROVED);
        },

    getBySlug: async (slug: string): Promise<Recipe> => {
    const recipe = sampleRecipes.find(r => r.slug === slug);
    if (!recipe) {
        throw new Error('Recipe not found');
    }
    return recipe;
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