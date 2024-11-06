export interface Recipe {
  id: string;
  title: string;
  description: string;
  instructions: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  createdById: string;
  createdAt: string;
  nutritionalInfo: NutritionalInfo;
  ingredients: RecipeIngredient[];
  tags: RecipeTag[];
  likes: number;
  imageUrl?: string;
  difficulty?: string;
}

export interface RecipeWithDifficulty extends Recipe {
  difficulty?: string;
  imageUrl?: string;
}

  export interface NutritionalInfo {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    fiber: number;
  }

  export interface RecipeIngredient {
    id?: string;
    name: string;
    quantity: number;
    unit: string;
    nutritionalInfo?: NutritionalInfo;
  }

  export interface RecipeTag {
    id: string;
    name: string;
  }