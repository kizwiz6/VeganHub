import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRecipeSchema, type CreateRecipeFormData } from '@/validations/recipeSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormField } from '@/components/ui/form-field';
import { FormProgress } from '@/components/ui/form-progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

export default function CreateRecipe() {
  const [formProgress, setFormProgress] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, dirtyFields, isSubmitting, isValid }
  } = useForm<CreateRecipeFormData>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      ingredients: [{ 
        name: '', 
        quantity: 0, 
        unit: '', 
        nutritionalInfo: { calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0 } 
      }],
      tags: [],
      difficulty: 'Medium'
    },
    mode: 'onChange'
  });

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control,
    name: 'ingredients'
  });

  // Watch all fields for progress calculation
  const watchedFields = watch();

  // Calculate form progress
  useEffect(() => {
    const requiredFields = [
      'title',
      'description',
      'instructions',
      'prepTime',
      'cookTime',
      'servings',
      'difficulty'
    ];

    const completedFields = requiredFields.filter(
      field => dirtyFields[field as keyof CreateRecipeFormData]
    );

    const progress = Math.round((completedFields.length / requiredFields.length) * 100);
    setFormProgress(progress);
  }, [dirtyFields, watchedFields]);

  const onSubmit = async (data: CreateRecipeFormData) => {
    try {
      console.log('Form data:', data);
      
      toast({
        title: 'Recipe created!',
        description: 'Your recipe has been successfully created.',
      });

      navigate('/recipes');
    } catch (err) {
      console.error('Error creating recipe:', err);

      const errorMessage = err instanceof Error
        ? err.message
        : 'Failed to create recipe. Please try again.';

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const handleAddIngredient = () => {
    appendIngredient({ 
      name: '', 
      quantity: 0, 
      unit: '', 
      nutritionalInfo: { calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0 } 
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Create New Recipe</h1>
          <FormProgress progress={formProgress} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            label="Title"
            error={errors.title}
            isValid={dirtyFields.title && !errors.title}
            helpText="Give your recipe a descriptive title"
          >
            <Input
              {...register('title')}
              placeholder="E.g., Creamy Vegan Mushroom Risotto"
              className={cn(
                errors.title && 'border-red-500',
                dirtyFields.title && !errors.title && 'border-green-500'
              )}
            />
          </FormField>

          <FormField
            label="Description"
            error={errors.description}
            isValid={dirtyFields.description && !errors.description}
            helpText="Briefly describe your recipe"
          >
            <Textarea
              {...register('description')}
              placeholder="A delicious and creamy risotto made with..."
              className={cn(
                errors.description && 'border-red-500',
                dirtyFields.description && !errors.description && 'border-green-500'
              )}
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField
              label="Prep Time (mins)"
              error={errors.prepTime}
              isValid={dirtyFields.prepTime && !errors.prepTime}
            >
              <Input
                {...register('prepTime', { valueAsNumber: true })}
                type="number"
                placeholder="15"
                className={cn(
                  errors.prepTime && 'border-red-500',
                  dirtyFields.prepTime && !errors.prepTime && 'border-green-500'
                )}
              />
            </FormField>

            <FormField
              label="Cook Time (mins)"
              error={errors.cookTime}
              isValid={dirtyFields.cookTime && !errors.cookTime}
            >
              <Input
                {...register('cookTime', { valueAsNumber: true })}
                type="number"
                placeholder="30"
                className={cn(
                  errors.cookTime && 'border-red-500',
                  dirtyFields.cookTime && !errors.cookTime && 'border-green-500'
                )}
              />
            </FormField>

            <FormField
              label="Servings"
              error={errors.servings}
              isValid={dirtyFields.servings && !errors.servings}
            >
              <Input
                {...register('servings', { valueAsNumber: true })}
                type="number"
                placeholder="4"
                className={cn(
                  errors.servings && 'border-red-500',
                  dirtyFields.servings && !errors.servings && 'border-green-500'
                )}
              />
            </FormField>

            <FormField
              label="Difficulty"
              error={errors.difficulty}
              isValid={dirtyFields.difficulty && !errors.difficulty}
            >
            <Select
              onValueChange={(value: 'Easy' | 'Medium' | 'Hard') => setValue('difficulty', value)}
              defaultValue={watch('difficulty')}
            >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Ingredients</h3>
              <Button
                type="button"
                variant="outline"
                onClick={handleAddIngredient}
              >
                Add Ingredient
              </Button>
            </div>

            <div className="space-y-4">
              {ingredientFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg">
                  <FormField
                    label="Name"
                    error={errors.ingredients?.[index]?.name}
                  >
                    <Input
                      {...register(`ingredients.${index}.name`)}
                      placeholder="Ingredient name"
                    />
                  </FormField>

                  <FormField
                    label="Quantity"
                    error={errors.ingredients?.[index]?.quantity}
                  >
                    <Input
                      {...register(`ingredients.${index}.quantity`, { valueAsNumber: true })}
                      type="number"
                      step="0.01"
                      placeholder="Amount"
                    />
                  </FormField>

                  <FormField
                    label="Unit"
                    error={errors.ingredients?.[index]?.unit}
                  >
                    <Input
                      {...register(`ingredients.${index}.unit`)}
                      placeholder="g, ml, cups, etc."
                    />
                  </FormField>

                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeIngredient(index)}
                      className="w-full"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <FormField
            label="Instructions"
            error={errors.instructions}
            isValid={dirtyFields.instructions && !errors.instructions}
            helpText="Add step-by-step instructions"
          >
            <Textarea
              {...register('instructions')}
              placeholder="1. Begin by..."
              className={cn(
                'min-h-[200px]',
                errors.instructions && 'border-red-500',
                dirtyFields.instructions && !errors.instructions && 'border-green-500'
              )}
            />
          </FormField>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/recipes')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? 'Creating...' : 'Create Recipe'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}