import { useState, useCallback } from 'react';
import { RecipeGrid } from '@/components/RecipeGrid';
import { RecipeFilters, FilterOptions } from '@/components/RecipeFilters';
import { RecipeSort } from '@/components/RecipeSort';
import { RecipeWithDifficulty } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { sampleRecipes, mockData } from '@/data';

export default function Home() {
  const [recipes, setRecipes] = useState<RecipeWithDifficulty[]>(sampleRecipes);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState('newest');
  const { toast } = useToast();
  const isLoading = false;

  const applyFilters = useCallback((filters: FilterOptions) => {
    let filtered = [...sampleRecipes];

    try {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        filtered = filtered.filter(recipe => 
          recipe.title.toLowerCase().includes(searchLower) ||
          recipe.description.toLowerCase().includes(searchLower)
        );
      }

      // Category filter using mockData.categories
      if (filters.category) {
        filtered = filtered.filter(recipe => 
          recipe.tags.some(tag => 
            tag.name.toLowerCase() === filters.category?.toLowerCase()
          )
        );
      }

      // Prep time filter using mockData.cookingTimes
      if (filters.prepTime) {
        const cookingTime = mockData.cookingTimes.find(ct => ct.label === filters.prepTime);
        if (cookingTime) {
          filtered = filtered.filter(recipe => 
            parseInt(recipe.prepTime) <= cookingTime.maxMinutes
          );
        }
      }

      // Difficulty filter using mockData.difficulties
      if (filters.difficulty) {
        filtered = filtered.filter(recipe => 
          recipe.difficulty === filters.difficulty
        );
      }

      // Dietary restrictions filter using mockData.dietaryRestrictions
      if (filters.dietaryRestrictions?.length) {
        filtered = filtered.filter(recipe => 
          filters.dietaryRestrictions?.every(restriction =>
            recipe.tags.some(tag => 
              tag.name.toLowerCase() === restriction.toLowerCase()
            )
          )
        );
      }

      setRecipes(filtered);
      setActiveFilters(filters);

      toast({
        title: `Found ${filtered.length} recipes`,
        description: filtered.length === 0 ? 'Try adjusting your filters' : undefined,
      });
    } catch (error) {
      console.error('Error applying filters:', error);
      toast({
        title: 'Error applying filters',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const resetFilters = useCallback(() => {
    setActiveFilters({});
    setRecipes(sampleRecipes);
    toast({
      title: 'Filters reset',
      description: 'Showing all recipes',
    });
  }, [toast]);

  const handleSort = useCallback((option: string) => {
    setSortBy(option);
    const sorted = [...recipes].sort((a, b) => {
      switch (option) {
        case 'popular':
          return b.likes - a.likes;
        case 'quickest':
          return parseInt(a.prepTime) - parseInt(b.prepTime);
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
    setRecipes(sorted);
  }, [recipes]);

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Vegan Recipes</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Discover and share delicious plant-based recipes
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild>
              <Link to="/recipes/new">
                <PlusCircle className="w-4 h-4 mr-2" />
                Create Recipe
              </Link>
            </Button>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="space-y-4 mb-8">
          <RecipeFilters 
            onFilter={applyFilters} 
            onReset={resetFilters}
            activeFilters={activeFilters}
          />
          <div className="flex justify-end">
            <RecipeSort onSort={handleSort} currentSort={sortBy} />
          </div>
        </div>

        {/* Recipe Grid */}
        <RecipeGrid recipes={recipes} isLoading={isLoading} />
      </div>
    </ErrorBoundary>
  );
}