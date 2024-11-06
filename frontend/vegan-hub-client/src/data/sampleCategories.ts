import { Category, DietaryRestriction, CookingTime, Difficulty } from '@/types/category';

export const categories: Category[] = [
    {
      id: 'cat1',
      name: 'Breakfast',
      slug: 'breakfast',
      description: 'Start your day with these energising vegan breakfast recipes',
      imageUrl: '/categories/breakfast.jpg',
      recipeCount: 25,
      featured: true
    },
    {
      id: 'cat2',
      name: 'Main Dishes',
      slug: 'main-dishes',
      description: 'Satisfying vegan entrees for lunch and dinner',
      imageUrl: '/categories/main-dishes.jpg',
      recipeCount: 45,
      featured: true
    },
    {
      id: 'cat3',
      name: 'Desserts',
      slug: 'desserts',
      description: 'Sweet treats without any animal products',
      imageUrl: '/categories/desserts.jpg',
      recipeCount: 30,
      featured: true
    },
    {
      id: 'cat4',
      name: 'Snacks',
      slug: 'snacks',
      description: 'Healthy vegan snacks for any time of day',
      imageUrl: '/categories/snacks.jpg',
      recipeCount: 20,
      featured: false
    }
  ];

  export const dietaryRestrictions: DietaryRestriction[] = [
    {
      id: 'dr1',
      name: 'Gluten-Free',
      description: 'Recipes without gluten-containing ingredients',
      icon: 'wheat-off'
    },
    {
      id: 'dr2',
      name: 'Nut-Free',
      description: 'Recipes without any nuts or nut products',
      icon: 'nut-off'
    },
    {
      id: 'dr3',
      name: 'Soy-Free',
      description: 'Recipes without soy products',
      icon: 'soy-off'
    },
    {
      id: 'dr4',
      name: 'Raw',
      description: 'No cooking required',
      icon: 'leaf'
    }
  ];

  export const cookingTimes: CookingTime[] = [
    {
      id: 'time1',
      label: 'Quick (< 15min)',
      maxMinutes: 15,
      description: 'Perfect for busy weekdays'
    },
    {
      id: 'time2',
      label: 'Medium (15-30min)',
      maxMinutes: 30,
      description: 'Balanced cooking time'
    },
    {
      id: 'time3',
      label: 'Long (> 30min)',
      maxMinutes: Infinity,
      description: 'For those special occasions'
    }
  ];

  export const difficulties: Difficulty[] = [
    {
      id: 'diff1',
      level: 'Easy',
      description: 'Simple recipes with basic cooking techniques',
      recommendedFor: 'Beginners'
    },
    {
      id: 'diff2',
      level: 'Medium',
      description: 'Intermediate recipes with some cooking experience required',
      recommendedFor: 'Home cooks'
    },
    {
      id: 'diff3',
      level: 'Hard',
      description: 'Complex recipes requiring advanced techniques',
      recommendedFor: 'Experienced cooks'
    }
  ];