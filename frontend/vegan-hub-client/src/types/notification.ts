// src/types/notification.ts
export interface RecipeNotification {
    type: 'RECIPE_APPROVED' | 'RECIPE_REJECTED';
    recipeId: string;
    recipeTitle: string;
    message: string;
    timestamp: Date;
  }