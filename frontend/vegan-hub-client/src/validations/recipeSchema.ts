import * as z from 'zod';

export const createRecipeSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),

  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),

  instructions: z.string()
    .min(20, 'Instructions must be at least 20 characters')
    .max(2000, 'Instructions must be less than 2000 characters'),

  prepTime: z.string()
    .min(1, 'Prep time is required')
    .refine((val) => !isNaN(Number(val)), 'Must be a number')
    .refine((val) => Number(val) > 0, 'Must be greater than 0')
    .refine((val) => Number(val) < 1440, 'Must be less than 24 hours'),

  cookTime: z.string()
    .min(1, 'Cook time is required')
    .refine((val) => !isNaN(Number(val)), 'Must be a number')
    .refine((val) => Number(val) >= 0, 'Must be 0 or greater')
    .refine((val) => Number(val) < 1440, 'Must be less than 24 hours'),

  servings: z.string()
    .min(1, 'Number of servings is required')
    .refine((val) => !isNaN(Number(val)), 'Must be a number')
    .refine((val) => Number(val) > 0, 'Must be greater than 0')
    .refine((val) => Number(val) <= 50, 'Must be 50 or less'),

  difficulty: z.enum(['Easy', 'Medium', 'Hard'], {
    required_error: 'Please select a difficulty level'
  }),

  image: z.any()
    .optional()
    .refine(
      (file) => !file || (file instanceof File && file.size <= 5 * 1024 * 1024),
      'Image must be less than 5MB'
    ),
});

export type CreateRecipeFormData = z.infer<typeof createRecipeSchema>;