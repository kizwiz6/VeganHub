// src/types/profile.ts
import { z } from 'zod'; // Import Zod for schema validation

export const profileSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  bio: z.string().max(500, 'Bio must be less than 500 characters'),
  email: z.string().email('Invalid email address'),
  avatar: z.string().optional(), // optional field - not required
});

export type ProfileFormData = z.infer<typeof profileSchema>;