export interface User {
    id: string;
    username: string;
    email: string;
    displayName: string;
    avatar?: string;
    bio?: string;
    createdAt: string;
    recipesCount: number;
    followersCount: number;
    followingCount: number;
    favourites: string[]; // Recipe IDs
    dietary?: {
      preferences: string[];
      allergies: string[];
    };
  }