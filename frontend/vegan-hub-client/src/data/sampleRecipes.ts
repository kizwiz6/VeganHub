import { RecipeWithDifficulty } from '@/types/recipe';

// Update sample data type
export const sampleRecipes: RecipeWithDifficulty[] = [
    {
      id: '1',
      title: 'Vegan Chocolate Cake',
      description: 'Rich and moist chocolate cake that\'s completely plant-based',
      instructions: '1. Mix dry ingredients\n2. Add wet ingredients\n3. Bake at 350°F for 30 minutes',
      prepTime: '20',
      cookTime: '30',
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
        { id: '2', name: 'chocolate' }
      ],
      likes: 42,
      difficulty: 'Medium'
    },
    {
      id: '2',
      title: 'Quinoa Buddha Bowl',
      description: 'A nutritious and filling bowl packed with protein',
      instructions: '1. Cook quinoa\n2. Roast vegetables\n3. Assemble bowl',
      prepTime: '15',
      cookTime: '20',
      servings: 4,
      createdById: 'user1',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      nutritionalInfo: {
        calories: 400,
        protein: 15,
        carbohydrates: 60,
        fat: 12,
        fiber: 8,
      },
      ingredients: [],
      tags: [
        { id: '3', name: 'lunch' },
        { id: '4', name: 'healthy' }
      ],
      likes: 28,
      difficulty: 'Easy'
    },
    {
      id: '3',
      title: 'Overnight Oats with Berries',
      description: 'Creamy overnight oats topped with fresh berries and nuts',
      instructions: '1. Mix oats with plant milk\n2. Add toppings\n3. Refrigerate overnight',
      prepTime: '10',
      cookTime: '0',
      servings: 1,
      createdById: 'user2',
      createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      nutritionalInfo: {
        calories: 320,
        protein: 12,
        carbohydrates: 45,
        fat: 14,
        fiber: 8,
      },
      ingredients: [],
      tags: [
        { id: '5', name: 'breakfast' },
        { id: '6', name: 'quick' },
        { id: '7', name: 'gluten-free' }
      ],
      likes: 56,
      difficulty: 'Easy'
    },
    {
      id: '4',
      title: 'Spicy Thai Green Curry',
      description: 'Aromatic and spicy Thai curry with coconut milk and vegetables',
      instructions: '1. Prepare curry paste\n2. Cook vegetables\n3. Simmer with coconut milk',
      prepTime: '30',
      cookTime: '25',
      servings: 6,
      createdById: 'user3',
      createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      nutritionalInfo: {
        calories: 380,
        protein: 10,
        carbohydrates: 35,
        fat: 22,
        fiber: 6,
      },
      ingredients: [],
      tags: [
        { id: '8', name: 'dinner' },
        { id: '9', name: 'spicy' },
        { id: '10', name: 'gluten-free' }
      ],
      likes: 89,
      difficulty: 'Hard'
    },
    {
      id: '5',
      title: 'Raw Vegan Energy Balls',
      description: 'No-bake energy balls perfect for a healthy snack',
      instructions: '1. Blend dates and nuts\n2. Form balls\n3. Roll in coconut',
      prepTime: '12',
      cookTime: '0',
      servings: 12,
      createdById: 'user1',
      createdAt: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
      nutritionalInfo: {
        calories: 120,
        protein: 3,
        carbohydrates: 15,
        fat: 7,
        fiber: 2,
      },
      ingredients: [],
      tags: [
        { id: '11', name: 'snack' },
        { id: '12', name: 'raw' },
        { id: '13', name: 'gluten-free' }
      ],
      likes: 45,
      difficulty: 'Easy'
    },
    {
      id: '6',
      title: 'Homemade Vegan Pizza',
      description: 'Crispy crust topped with fresh vegetables and dairy-free cheese',
      instructions: '1. Make dough\n2. Prepare toppings\n3. Bake until crispy',
      prepTime: '40',
      cookTime: '20',
      servings: 4,
      createdById: 'user2',
      createdAt: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
      nutritionalInfo: {
        calories: 450,
        protein: 12,
        carbohydrates: 65,
        fat: 15,
        fiber: 4,
      },
      ingredients: [],
      tags: [
        { id: '14', name: 'dinner' },
        { id: '15', name: 'italian' }
      ],
      likes: 76,
      difficulty: 'Medium'
    },
    {
      id: '7',
      title: 'Green Smoothie Bowl',
      description: 'Nutrient-packed smoothie bowl with tropical fruits',
      instructions: '1. Blend ingredients\n2. Add toppings\n3. Serve immediately',
      prepTime: '8',
      cookTime: '0',
      servings: 1,
      createdById: 'user3',
      createdAt: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
      nutritionalInfo: {
        calories: 280,
        protein: 8,
        carbohydrates: 42,
        fat: 10,
        fiber: 7,
      },
      ingredients: [],
      tags: [
        { id: '16', name: 'breakfast' },
        { id: '17', name: 'healthy' },
        { id: '18', name: 'quick' }
      ],
      likes: 63,
      difficulty: 'Easy'
    },
    {
      id: '8',
      title: 'Mushroom Wellington',
      description: 'Elegant pastry-wrapped mushroom roast perfect for special occasions',
      instructions: '1. Prepare filling\n2. Wrap in pastry\n3. Bake until golden',
      prepTime: '45',
      cookTime: '35',
      servings: 6,
      createdById: 'user1',
      createdAt: new Date(Date.now() - 691200000).toISOString(), // 8 days ago
      nutritionalInfo: {
        calories: 520,
        protein: 15,
        carbohydrates: 48,
        fat: 28,
        fiber: 5,
      },
      ingredients: [],
      tags: [
        { id: '19', name: 'dinner' },
        { id: '20', name: 'special occasion' }
      ],
      likes: 94,
      difficulty: 'Hard'
    }
  ];