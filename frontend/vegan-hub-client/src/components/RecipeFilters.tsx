import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import debounce from 'lodash/debounce';

export interface FilterOptions {
  category?: string;
  prepTime?: string;
  dietaryRestrictions?: string[];
  difficulty?: string;
  searchTerm?: string;
}

interface RecipeFiltersProps {
  onFilter: (filters: FilterOptions) => void;
  onReset: () => void;
  activeFilters: FilterOptions;
}

export function RecipeFilters({ onFilter, onReset, activeFilters }: RecipeFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterOptions>(activeFilters);

  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'];
  const prepTimes = ['Quick (< 15min)', 'Medium (15-30min)', 'Long (> 30min)'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const dietaryRestrictions = ['Gluten-Free', 'Nut-Free', 'Soy-Free', 'Raw'];

  // Fixed useCallback with proper dependencies and inline function
  const handleSearch = useCallback((term: string) => {
    const newFilters = { ...localFilters, searchTerm: term };
    setLocalFilters(newFilters);
    onFilter(newFilters);
  }, [localFilters, onFilter]);

  // Debounced search handler
  const debouncedSearch = debounce(handleSearch, 300);

  // Fixed type for the value parameter
  const handleFilterChange = (key: keyof FilterOptions, value: string | string[] | undefined) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilter(newFilters);
  };

  const handleReset = () => {
    setLocalFilters({});
    onReset();
    setShowFilters(false);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => 
      value !== undefined && (Array.isArray(value) ? value.length > 0 : true)
    ).length;
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search recipes..."
            className="pl-10"
            onChange={(e) => debouncedSearch(e.target.value)}
            defaultValue={activeFilters.searchTerm}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="relative"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {getActiveFilterCount() > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">
              {getActiveFilterCount()}
            </span>
          )}
        </Button>
        {getActiveFilterCount() > 0 && (
          <Button variant="ghost" onClick={handleReset}>
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="p-4 bg-white rounded-lg shadow space-y-6">
          {/* Categories */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={localFilters.category === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('category', 
                    localFilters.category === category ? undefined : category
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Prep Time */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Prep Time
            </label>
            <div className="flex flex-wrap gap-2">
              {prepTimes.map((time) => (
                <Button
                  key={time}
                  variant={localFilters.prepTime === time ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('prepTime', 
                    localFilters.prepTime === time ? undefined : time
                  )}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Difficulty
            </label>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={localFilters.difficulty === difficulty ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('difficulty', 
                    localFilters.difficulty === difficulty ? undefined : difficulty
                  )}
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>

          {/* Dietary Restrictions */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Dietary Restrictions
            </label>
            <div className="flex flex-wrap gap-2">
              {dietaryRestrictions.map((restriction) => (
                <Button
                  key={restriction}
                  variant={localFilters.dietaryRestrictions?.includes(restriction) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    const current = localFilters.dietaryRestrictions || [];
                    const updated = current.includes(restriction)
                      ? current.filter(r => r !== restriction)
                      : [...current, restriction];
                    handleFilterChange('dietaryRestrictions', updated);
                  }}
                >
                  {restriction}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}