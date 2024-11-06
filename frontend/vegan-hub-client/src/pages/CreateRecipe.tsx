import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Timer, Users } from 'lucide-react';

// Validation schema
const createRecipeSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  instructions: z.string().min(20, 'Instructions must be at least 20 characters'),
  prepTime: z.string().regex(/^\d+$/, 'Prep time must be a number'),
  cookTime: z.string().regex(/^\d+$/, 'Cook time must be a number'),
  servings: z.string().regex(/^\d+$/, 'Servings must be a number'),
  ingredients: z.array(z.object({
    name: z.string().min(2, 'Ingredient name is required'),
    quantity: z.string().min(1, 'Quantity is required'),
    unit: z.string().min(1, 'Unit is required')
  })).min(1, 'At least one ingredient is required'),
});

type CreateRecipeForm = z.infer<typeof createRecipeSchema>;

export default function CreateRecipe() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateRecipeForm>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      ingredients: [{ name: '', quantity: '', unit: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients"
  });

  const onSubmit = async (data: CreateRecipeForm) => {
    try {
      setIsSubmitting(true);
      console.log('Form data:', data);
      // Here you would typically send the data to your API
    } catch (error) {
      console.error('Error submitting recipe:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Recipe</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Recipe Title</Label>
            <Input
              id="title"
              {...register('title')}
              error={!!errors.title}
              placeholder="e.g., Vegan Chocolate Cake"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              error={!!errors.description}
              placeholder="Brief description of your recipe"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              {...register('instructions')}
              error={!!errors.instructions}
              placeholder="Step-by-step cooking instructions"
              className="h-32"
            />
            {errors.instructions && (
              <p className="mt-1 text-sm text-red-500">{errors.instructions.message}</p>
            )}
          </div>
        </div>

        {/* Time and Servings */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="prepTime">Prep Time (mins)</Label>
            <div className="relative">
              <Timer className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="prepTime"
                {...register('prepTime')}
                error={!!errors.prepTime}
                className="pl-9"
                placeholder="15"
              />
            </div>
            {errors.prepTime && (
              <p className="mt-1 text-sm text-red-500">{errors.prepTime.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="cookTime">Cook Time (mins)</Label>
            <div className="relative">
              <Timer className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="cookTime"
                {...register('cookTime')}
                error={!!errors.cookTime}
                className="pl-9"
                placeholder="30"
              />
            </div>
            {errors.cookTime && (
              <p className="mt-1 text-sm text-red-500">{errors.cookTime.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="servings">Servings</Label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="servings"
                {...register('servings')}
                error={!!errors.servings}
                className="pl-9"
                placeholder="4"
              />
            </div>
            {errors.servings && (
              <p className="mt-1 text-sm text-red-500">{errors.servings.message}</p>
            )}
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <Label>Ingredients</Label>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-start">
                <div className="flex-1">
                  <Input
                    {...register(`ingredients.${index}.name`)}
                    placeholder="Ingredient name"
                    error={!!errors.ingredients?.[index]?.name}
                  />
                  {errors.ingredients?.[index]?.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.ingredients[index]?.name?.message}
                    </p>
                  )}
                </div>
                <div className="w-24">
                  <Input
                    {...register(`ingredients.${index}.quantity`)}
                    placeholder="Amount"
                    error={!!errors.ingredients?.[index]?.quantity}
                  />
                </div>
                <div className="w-24">
                  <Input
                    {...register(`ingredients.${index}.unit`)}
                    placeholder="Unit"
                    error={!!errors.ingredients?.[index]?.unit}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="mt-1"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ name: '', quantity: '', unit: '' })}
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Ingredient
          </Button>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Recipe...' : 'Create Recipe'}
        </Button>
      </form>
    </div>
  );
}