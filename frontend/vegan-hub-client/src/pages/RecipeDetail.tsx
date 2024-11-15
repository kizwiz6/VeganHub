// src/pages/RecipeDetail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { recipesApi } from '@/lib/api/recipes';
import { Clock, Users, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { type Recipe } from '@/types/recipe';

export default function RecipeDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: recipe, isLoading, error } = useQuery<Recipe>({
    queryKey: ['recipe', slug],
    queryFn: () => recipesApi.getBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Recipe not found
          </h2>
          <Button onClick={() => navigate('/recipes')}>
            Back to Recipes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Recipe Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {recipe.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {recipe.description}
          </p>
          
          {/* Recipe Meta */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4" />
              <span>Prep: {recipe.prepTime}m</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4" />
              <span>Cook: {recipe.cookTime}m</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Users className="w-4 h-4" />
              <span>Serves {recipe.servings}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Heart className="w-4 h-4" />
              <span>{recipe.likes} likes</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recipe Image */}
        {recipe.imageUrl && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Ingredients */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ingredients
          </h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient) => (
              <li 
                key={ingredient.id}
                className="flex justify-between items-center text-gray-700 dark:text-gray-300"
              >
                <span>{ingredient.name}</span>
                <span>{ingredient.quantity} {ingredient.unit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Instructions
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            {recipe.instructions.split('\n').map((step, index) => (
              <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                {step}
              </p>
            ))}
          </div>
        </div>

        {/* Nutritional Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Nutritional Information
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Calories</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {recipe.nutritionalInfo.calories}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {recipe.nutritionalInfo.protein}g
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Carbs</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {recipe.nutritionalInfo.carbohydrates}g
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Fat</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {recipe.nutritionalInfo.fat}g
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">Fiber</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {recipe.nutritionalInfo.fiber}g
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}