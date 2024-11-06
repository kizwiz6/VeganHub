import { Recipe } from '@/types/recipe';
import { Clock, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/recipes/${recipe.id}`}>
        {/* Image placeholder - replace with actual image when available */}
        <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-lg font-semibold text-white truncate">{recipe.title}</h3>
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {recipe.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {recipe.prepTime}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {recipe.servings}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {recipe.likes}
            </span>
          </div>

          {recipe.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-block px-2 py-1 text-xs text-green-600 bg-green-50 rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export function RecipeCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
        </div>
        <div className="mt-4 flex gap-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}