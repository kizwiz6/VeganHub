import { useState } from 'react';
import { RecipeGrid } from '@/components/RecipeGrid';
import { RecipeFilters, FilterOptions } from '@/components/RecipeFilters';
import { RecipeSort } from '@/components/RecipeSort';
import { Recipe } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample data with proper typing
const sampleRecipes: Recipe[] = [
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
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
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
  },
];

export default function Home() {
    // Remove searchTerm since it's not used directly
    const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes);
    // Remove filters since it's handled directly in handleFilterChange
    const [sortBy, setSortBy] = useState('newest');
    const { toast } = useToast();
    const isLoading = false;

    const handleSearch = (term: string) => {
      const filtered = sampleRecipes.filter((recipe: Recipe) => 
        recipe.title.toLowerCase().includes(term.toLowerCase()) ||
        recipe.description.toLowerCase().includes(term.toLowerCase())
      );
      setRecipes(filtered);
  
      toast({
        title: `Found ${filtered.length} recipes`,
        description: term ? `Showing results for "${term}"` : 'Showing all recipes',
      });
    };

    const handleFilterChange = (newFilters: FilterOptions) => {
      let filtered = [...sampleRecipes];

      if (newFilters.category) {
        filtered = filtered.filter(recipe => 
          recipe.tags.some(tag => tag.name.toLowerCase() === newFilters.category?.toLowerCase())
        );
      }

      if (newFilters.prepTime) {
        switch (newFilters.prepTime) {
          case 'Quick (< 15min)':
            filtered = filtered.filter(recipe => parseInt(recipe.prepTime) < 15);
            break;
          case 'Medium (15-30min)':
            filtered = filtered.filter(recipe => parseInt(recipe.prepTime) >= 15 && parseInt(recipe.prepTime) <= 30);
            break;
          case 'Long (> 30min)':
            filtered = filtered.filter(recipe => parseInt(recipe.prepTime) > 30);
            break;
        }
      }
  
      setRecipes(filtered);
    };
  
    const handleSort = (option: string) => {
      setSortBy(option);
      const sorted = [...recipes].sort((a: Recipe, b: Recipe) => {
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
    };

  return (
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

      {/* Filters and Sort */}
      <div className="space-y-4 mb-8">
        <RecipeFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />
        <div className="flex justify-end">
          <RecipeSort onSort={handleSort} currentSort={sortBy} />
        </div>
      </div>

      {/* Recipe Grid */}
      <RecipeGrid recipes={recipes} isLoading={isLoading} />
    </div>
  );
}