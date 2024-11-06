import { User } from '@/types/user';

export const sampleUsers: User[] = [
  {
    id: 'user1',
    username: 'kizwiz',
    email: 'kizwiz@hotmail.co.uk',
    displayName: 'Kieran Emery',
    avatar: '/avatars/kieran.jpg',
    bio: 'Home cook exploring the world of plant-based cuisine',
    createdAt: '2024-11-06T00:00:00Z',
    recipesCount: 12,
    followersCount: 350,
    followingCount: 250,
    favourites: ['1', '4', '8'],
    dietary: {
      preferences: ['whole-food', 'organic'],
      allergies: []
    }
  },
  {
    id: 'user2',
    username: 'greencooking',
    email: 'mike@veganhub.com',
    displayName: 'Mike Green',
    bio: 'Professional vegan chef with a passion for creating delicious plant-based meals',
    createdAt: '2024-11-06T00:00:00Z',
    recipesCount: 45,
    followersCount: 1200,
    followingCount: 350,
    favourites: ['2', '5'],
    dietary: {
      preferences: ['gluten-free', 'raw'],
      allergies: ['nuts']
    }
  },
  {
    id: 'user3',
    username: 'healthyeats',
    email: 'emily@veganhub.com',
    displayName: 'Emily Health',
    avatar: '/avatars/emily.jpg',
    bio: 'Nutritionist sharing healthy vegan recipes',
    createdAt: '2024-01-15T00:00:00Z',
    recipesCount: 28,
    followersCount: 890,
    followingCount: 120,
    favourites: ['3', '7'],
    dietary: {
      preferences: ['oil-free', 'sugar-free'],
      allergies: ['soy']
    }
  }
];