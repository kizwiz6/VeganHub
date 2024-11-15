// src/components/RecipeCard.tsx
import { Recipe } from '@/types/recipe';
import { Clock, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/recipes/${recipe.title.toLowerCase().replace(/\s+/g, '-')}`}>
        {/* Image Container */}
        <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
          {recipe.imageUrl ? (
            <>
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/recipe-placeholder.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-gray-400 text-4xl">🍽️</div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}

          {/* Recipe Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg font-semibold line-clamp-1 mb-1">
              {recipe.title}
            </h3>
            <p className="text-sm text-gray-100 line-clamp-2">
              {recipe.description}
            </p>
          </div>

          {/* Difficulty Badge */}
          {recipe.difficulty && (
            <span className={cn(
              "absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium",
              {
                'bg-green-500 text-white': recipe.difficulty === 'Easy',
                'bg-yellow-500 text-white': recipe.difficulty === 'Medium',
                'bg-red-500 text-white': recipe.difficulty === 'Hard',
              }
            )}>
              {recipe.difficulty}
            </span>
          )}
        </div>

        {/* Recipe Details */}
        <div className="p-4">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {recipe.prepTime}m
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {recipe.servings}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <Heart className={cn(
                "w-4 h-4 transition-colors",
                recipe.likes > 50 ? "text-red-500" : "text-gray-400"
              )} />
              {recipe.likes}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-block px-2 py-1 text-xs text-green-600 bg-green-50 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
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