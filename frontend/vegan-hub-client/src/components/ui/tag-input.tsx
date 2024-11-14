// src/components/ui/tag-input.tsx
import ReactSelect, { MultiValue } from 'react-select';
import { cn } from '@/lib/utils';

interface Option {
  label: string;
  value: string;
}

interface TagInputProps {
  value?: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function TagInput({ value, onChange, placeholder, className }: TagInputProps) {
  // Convert string[] to Option[]
  const selectedOptions = value?.map(v => ({ label: v, value: v })) || [];

  // Common vegan recipe tags
  const defaultOptions = [
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'high-protein', label: 'High Protein' },
    { value: 'low-carb', label: 'Low Carb' },
    { value: 'nut-free', label: 'Nut Free' },
    { value: 'soy-free', label: 'Soy Free' },
    { value: 'raw', label: 'Raw' },
    { value: 'quick', label: 'Quick' },
    { value: 'beginner-friendly', label: 'Beginner Friendly' },
    { value: 'budget-friendly', label: 'Budget Friendly' },
    { value: 'oil-free', label: 'Oil Free' },
  ];

  const handleChange = (newValue: MultiValue<Option>) => {
    onChange(newValue.map(v => v.value));
  };

  return (
    <ReactSelect
      isMulti
      options={defaultOptions}
      value={selectedOptions}
      onChange={handleChange}
      placeholder={placeholder}
      className={cn("w-full", className)}
      classNames={{
        control: (state) => 
          `border rounded-md bg-white dark:bg-gray-800 ${state.isFocused ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200 dark:border-gray-700'}`,
        multiValue: () => 'bg-green-100 dark:bg-green-900 rounded-md',
        multiValueLabel: () => 'text-green-800 dark:text-green-100 px-2 py-1',
        multiValueRemove: () => 'text-green-800 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-800 hover:text-green-900 rounded-r-md px-2 py-1',
        menu: () => 'bg-white dark:bg-gray-800 dark:border-gray-700',
        option: (state) => cn(
          'cursor-default px-3 py-2',
          state.isFocused ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800',
          state.isSelected ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' : 'text-gray-900 dark:text-gray-100'
        ),
        input: () => 'text-gray-900 dark:text-gray-100',
        placeholder: () => 'text-gray-500 dark:text-gray-400',
      }}
    />
  );
}