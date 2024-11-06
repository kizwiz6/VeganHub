import { Recipe } from '@/types/recipe';

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Vegan Chocolate Cake',
    description: 'Rich and moist chocolate cake that\'s completely plant-based',
    instructions: 'Mix dry ingredients...',
    prepTime: '20 mins',
    cookTime: '30 mins',
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
  // Add more sample recipes as needed
];