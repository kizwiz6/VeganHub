// import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface RecipeSortProps {
  onSort: (option: string) => void;
  currentSort: string;
}

export function RecipeSort({ onSort, currentSort }: RecipeSortProps) {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'quickest', label: 'Quickest to Make' },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Sort by:</span>
      <div className="relative">
        <select
          value={currentSort}
          onChange={(e) => onSort(e.target.value)}
          className="appearance-none bg-white border border-gray-200 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}