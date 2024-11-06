import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';

interface RecipeFiltersProps {
  onSearch: (term: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  prepTime?: string;
  category?: string;
  servings?: number;
}

export function RecipeFilters({ onSearch, onFilterChange }: RecipeFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

  const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'];
  const prepTimes = ['Quick (< 15min)', 'Medium (15-30min)', 'Long (> 30min)'];

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {showFilters && (
        <div className="p-4 bg-white rounded-lg shadow space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Category</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filters.category === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange({ category })}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Prep Time</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {prepTimes.map((time) => (
                <Button
                  key={time}
                  variant={filters.prepTime === time ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange({ prepTime: time })}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}