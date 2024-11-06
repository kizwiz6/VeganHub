export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl?: string;
    recipeCount: number;
    featured: boolean;
  }

  export interface DietaryRestriction {
    id: string;
    name: string;
    description: string;
    icon?: string;
  }

  export interface CookingTime {
    id: string;
    label: string;
    maxMinutes: number;
    description: string;
  }

  export interface Difficulty {
    id: string;
    level: string;
    description: string;
    recommendedFor: string;
  }