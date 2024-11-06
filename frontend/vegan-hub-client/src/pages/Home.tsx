import { useState, useCallback } from 'react';
import { RecipeGrid } from '@/components/RecipeGrid';
import { RecipeFilters, FilterOptions } from '@/components/RecipeFilters';
import { RecipeSort } from '@/components/RecipeSort';
import { Recipe } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Update Recipe type to include difficulty
interface RecipeWithDifficulty extends Recipe {
  difficulty?: string;
}

// Update sample data type
const sampleRecipes: RecipeWithDifficulty[] = [
  {
    id: '1',
    title: 'Vegan Chocolate Cake',
    description: 'Rich and moist chocolate cake that\'s completely plant-based',
    instructions: '1. Mix dry ingredients\n2. Add wet ingredients\n3. Bake at 350°F for 30 minutes',
    prepTime: '20',
    cookTime: '30',
    servings: 8,
    createdById: 'user1',
    createdAt: new Date().toISOString(),
    nutritionalInfo: {
      calories: 350,
      protein: 5,
      carbohydrates: 45,
      fat: 18,
      fiber: 3,
    },
    ingredients: [],
    tags: [
      { id: '1', name: 'dessert' },
      { id: '2', name: 'chocolate' },
    ],
    likes: 42,
    difficulty: 'Medium'
  },
  {
    id: '2',
    title: 'Quinoa Buddha Bowl',
    description: 'A nutritious and filling bowl packed with protein',
    instructions: '1. Cook quinoa\n2. Roast vegetables\n3. Assemble bowl',
    prepTime: '15',
    cookTime: '20',
    servings: 4,
    createdById: 'user1',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    nutritionalInfo: {
      calories: 400,
      protein: 15,
      carbohydrates: 60,
      fat: 12,
      fiber: 8,
    },
    ingredients: [],
    tags: [
      { id: '3', name: 'lunch' },
      { id: '4', name: 'healthy' },
    ],
    likes: 28,
    difficulty: 'Easy'
  },
];

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

      // Category filter
      if (filters.category) {
        filtered = filtered.filter(recipe => 
          recipe.tags.some(tag => 
            tag.name.toLowerCase() === filters.category?.toLowerCase()
          )
        );
      }

      // Prep time filter
      if (filters.prepTime) {
        switch (filters.prepTime) {
          case 'Quick (< 15min)':
            filtered = filtered.filter(recipe => parseInt(recipe.prepTime) < 15);
            break;
          case 'Medium (15-30min)':
            filtered = filtered.filter(recipe => 
              parseInt(recipe.prepTime) >= 15 && parseInt(recipe.prepTime) <= 30
            );
            break;
          case 'Long (> 30min)':
            filtered = filtered.filter(recipe => parseInt(recipe.prepTime) > 30);
            break;
        }
      }

      // Difficulty filter
      if (filters.difficulty) {
        filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty);
      }

      // Dietary restrictions filter
      if (filters.dietaryRestrictions?.length) {
        filtered = filtered.filter(recipe => 
          filters.dietaryRestrictions?.every(restriction =>
            recipe.tags.some(tag => tag.name.toLowerCase() === restriction.toLowerCase())
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

  const resetFilters = () => {
    setActiveFilters({});
    setRecipes(sampleRecipes);
    toast({
      title: 'Filters reset',
      description: 'Showing all recipes',
    });
  };

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
            <h1 className="text-3xl font-bold text-gray-900">Vegan Recipes</h1>
            <p className="mt-1 text-gray-600">
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