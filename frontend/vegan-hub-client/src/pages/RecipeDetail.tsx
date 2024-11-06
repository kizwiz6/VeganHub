import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/axios';
import { Recipe } from '@/types/recipe';

export default function RecipeDetail() {
  const { id } = useParams();
  const { data: recipe, isLoading, error } = useQuery<Recipe>({
    queryKey: ['recipe', id],
    queryFn: async () => {
      const response = await api.get(`/recipes/${id}`);
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipe</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold">{recipe.title}</h1>
      <p className="mt-4 text-gray-600">{recipe.description}</p>
      {/* More recipe details will go here */}
    </div>
  );
}