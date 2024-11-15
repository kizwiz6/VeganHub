// src/pages/admin/RecipeModeration.tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { recipesApi } from '@/lib/api/recipes';
import { Recipe, RecipeStatus, RecipeIngredient } from '@/types/recipe';  // Import type from recipe.ts
import { Button } from '@/components/ui/button';

export function RecipeModeration() {
  const { data: pendingRecipes } = useQuery<Recipe[]>({
    queryKey: ['recipes', 'pending'],
    queryFn: () => recipesApi.getPendingRecipes(),
  });

  const handleApprove = async (recipeId: string, notes?: string) => {
    await recipesApi.moderateRecipe(recipeId, {
      status: RecipeStatus.APPROVED,
      notes
    });
  };

  const handleReject = async (recipeId: string, notes: string) => {
    await recipesApi.moderateRecipe(recipeId, {
      status: RecipeStatus.REJECTED,
      notes
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Recipe Moderation</h1>
      
      {pendingRecipes?.map((recipe: Recipe) => (
        <div key={recipe.id} className="border p-4 mb-4 rounded-lg">
          <h2 className="text-xl font-semibold">{recipe.title}</h2>
          <p className="text-gray-600">{recipe.description}</p>
          
          <div className="mt-4">
            <h3 className="font-medium">Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient: RecipeIngredient) => (
                <li key={ingredient.id || `temp-${ingredient.name}`}>{ingredient.name}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex gap-4">
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => handleApprove(recipe.id)}
            >
              Approve
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                const notes = window.prompt('Rejection reason:');
                if (notes) handleReject(recipe.id, notes);
              }}
            >
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}