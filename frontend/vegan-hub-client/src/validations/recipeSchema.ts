// src/validations/recipeSchema.ts
import { z } from 'zod';

const difficultyEnum = ['Easy', 'Medium', 'Hard'] as const;

export const nutritionalInfoSchema = z.object({
  calories: z.number().min(0, 'Calories cannot be negative'),
  protein: z.number().min(0, 'Protein cannot be negative'),
  carbohydrates: z.number().min(0, 'Carbohydrates cannot be negative'),
  fat: z.number().min(0, 'Fat cannot be negative'),
  fiber: z.number().min(0, 'Fiber cannot be negative'),
});

export const ingredientSchema = z.object({
  name: z.string().min(1, 'Ingredient name is required'),
  quantity: z.number().min(0.01, 'Quantity must be greater than 0'),
  unit: z.string().min(1, 'Unit is required'),
  nutritionalInfo: nutritionalInfoSchema,
});

export const createRecipeSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  instructions: z.string()
    .min(20, 'Instructions must be at least 20 characters'),
  prepTime: z.number()
    .min(1, 'Prep time must be at least 1 minute')
    .max(1440, 'Prep time cannot exceed 24 hours'),
  cookTime: z.number()
    .min(0, 'Cook time cannot be negative')
    .max(1440, 'Cook time cannot exceed 24 hours'),
  servings: z.number()
    .min(1, 'Must serve at least 1 person')
    .max(100, 'Servings cannot exceed 100'),
  difficulty: z.enum(difficultyEnum),
  ingredients: z.array(ingredientSchema)
    .min(1, 'At least one ingredient is required'),
  tags: z.array(z.string())
    .min(1, 'Please add at least one tag')
    .max(10, 'Maximum of 10 tags allowed'),
  image: z.any().optional(),
});

export type CreateRecipeFormData = z.infer<typeof createRecipeSchema>;
export type NutritionalInfo = z.infer<typeof nutritionalInfoSchema>;
export type Ingredient = z.infer<typeof ingredientSchema>;