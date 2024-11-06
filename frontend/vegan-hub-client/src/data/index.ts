import { sampleRecipes } from './sampleRecipes';
import { sampleUsers } from './sampleUsers';
import { 
  categories,
  dietaryRestrictions,
  cookingTimes,
  difficulties 
} from './sampleCategories';

// Re-export everything
export { sampleRecipes } from './sampleRecipes';
export { sampleUsers } from './sampleUsers';
export { 
  categories,
  dietaryRestrictions,
  cookingTimes,
  difficulties 
} from './sampleCategories';

// Export convenience grouping
export const mockData = {
  recipes: sampleRecipes,
  users: sampleUsers,
  categories,
  dietaryRestrictions,
  cookingTimes,
  difficulties
};