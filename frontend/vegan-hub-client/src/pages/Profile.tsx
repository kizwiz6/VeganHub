// src/pages/Profile.tsx
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { profileSchema, type ProfileFormData } from '@/types/profile';
import { AvatarUpload } from '@/components/profile/AvatarUpload';
import { authApi } from '@/lib/api/auth';


export function Profile() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      bio: user?.bio || '',
      email: user?.email || '',
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile(data);
      setIsEditing(false);
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update profile',
        variant: 'destructive',
      });
    }
  };

  const handleAvatarUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await authApi.updateAvatar(formData);
      toast({
        title: 'Success',
        description: 'Avatar updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update avatar',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-6 mb-8">
        <AvatarUpload
            avatarUrl={user?.avatar}
            username={user?.username}
            onUpload={handleAvatarUpload}
          />
          <div>
            <h1 className="text-2xl font-bold">
              {user?.displayName || user?.username}
            </h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Display Name
              </label>
              <Input
                {...register('displayName')}
                error={errors.displayName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <Textarea
                {...register('bio')}
                error={errors.bio}
                className="h-32"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                {...register('email')}
                error={errors.email}
                type="email"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">About</h3>
              <p className="mt-2 text-gray-600">{user?.bio || 'No bio added yet.'}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Stats</h3>
              <div className="mt-2 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold">{user?.recipesCount || 0}</p>
                  <p className="text-gray-600">Recipes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{user?.followersCount || 0}</p>
                  <p className="text-gray-600">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{user?.followingCount || 0}</p>
                  <p className="text-gray-600">Following</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="mt-4"
            >
              Edit Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}