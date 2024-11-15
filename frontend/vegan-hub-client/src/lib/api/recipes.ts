// src/lib/api/recipes.ts
import { sampleRecipes } from '@/data';
import { Recipe } from '@/types/recipe';
import { api } from './axios';

export const recipesApi = {
  getBySlug: async (slug: string): Promise<Recipe> => {
    // For development using mock data
    const recipe = sampleRecipes.find((r: Recipe) => 
      r.title.toLowerCase().replace(/\s+/g, '-') === slug
    );
    
    if (!recipe) {
      throw new Error('Recipe not found');
    }

    return recipe;
    
    // For production:
    // const response = await api.get(`/recipes/${slug}`);
    // return response.data;
  }
};