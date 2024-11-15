import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  console.log('Current user:', user);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState({
    newFollower: true,
    recipeComments: true,
    recipeLikes: true,
    newsletter: false,
  });
  const { theme, toggleTheme } = useTheme();

  const [dietaryPreferences, setDietaryPreferences] = useState({
    glutenFree: false,
    nutFree: false,
    soyFree: false,
    rawOnly: false,
  });

  const handleSaveNotifications = async () => {
    setIsLoading(true);
    try {
      // API call to save notification preferences
      toast({
        title: 'Success',
        description: 'Notification preferences updated successfully',
      });
    } catch (err) {
        console.error('Failed to update notification preferences:', err);
        toast({
            title: 'Error',
            description: 'Failed to update notification preferences',
            variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDietary = async () => {
    setIsLoading(true);
    try {
      // API call to save dietary preferences
      toast({
        title: 'Success',
        description: 'Dietary preferences updated successfully',
      });
    } catch (err) {
        console.error('Failed to update dietary preferences:', err);
      toast({
        title: 'Error',
        description: 'Failed to update dietary preferences',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="dietary">Dietary Preferences</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
        </TabsList>

        {/* Account Settings */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Username</p>
                <p className="text-gray-600">@{user?.username}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Email</p>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <Button variant="outline" className="mt-4">
                Change Password
              </Button>
              <Button variant="destructive" className="mt-2">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customise how VegWiz looks on your device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Dark Mode</label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Switch between light and dark themes
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleTheme}
                  className="h-8 w-8"
                >
                  {theme === 'dark' ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose when and how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">New Follower</label>
                    <p className="text-sm text-gray-500">
                      Receive notifications when someone follows you
                    </p>
                  </div>
                  <Checkbox
                    checked={emailNotifications.newFollower}
                    onCheckedChange={(checked) =>
                      setEmailNotifications(prev => ({ ...prev, newFollower: !!checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Recipe Comments</label>
                    <p className="text-sm text-gray-500">
                      Get notified when someone comments on your recipes
                    </p>
                  </div>
                  <Checkbox
                    checked={emailNotifications.recipeComments}
                    onCheckedChange={(checked) =>
                      setEmailNotifications(prev => ({ ...prev, recipeComments: !!checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Recipe Likes</label>
                    <p className="text-sm text-gray-500">
                      Get notified when someone likes your recipes
                    </p>
                  </div>
                  <Checkbox
                    checked={emailNotifications.recipeLikes}
                    onCheckedChange={(checked) =>
                      setEmailNotifications(prev => ({ ...prev, recipeLikes: !!checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Newsletter</label>
                    <p className="text-sm text-gray-500">
                      Receive our weekly newsletter with the best vegan recipes
                    </p>
                  </div>
                  <Checkbox
                    checked={emailNotifications.newsletter}
                    onCheckedChange={(checked) =>
                      setEmailNotifications(prev => ({ ...prev, newsletter: !!checked }))
                    }
                  />
                </div>
              </div>
              <Button 
                onClick={handleSaveNotifications} 
                disabled={isLoading}
                className="mt-4"
              >
                Save Notification Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dietary Preferences */}
        <TabsContent value="dietary">
          <Card>
            <CardHeader>
              <CardTitle>Dietary Preferences</CardTitle>
              <CardDescription>
                Set your dietary preferences to get personalised recipe recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Gluten Free</label>
                    <p className="text-sm text-gray-500">
                      Only show gluten-free recipes
                    </p>
                  </div>
                  <Checkbox
                    checked={dietaryPreferences.glutenFree}
                    onCheckedChange={(checked) =>
                      setDietaryPreferences(prev => ({ ...prev, glutenFree: !!checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Nut Free</label>
                    <p className="text-sm text-gray-500">
                      Exclude recipes containing nuts
                    </p>
                  </div>
                  <Checkbox
                    checked={dietaryPreferences.nutFree}
                    onCheckedChange={(checked) =>
                      setDietaryPreferences(prev => ({ ...prev, nutFree: !!checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Soy Free</label>
                    <p className="text-sm text-gray-500">
                      Exclude recipes containing soy
                    </p>
                  </div>
                  <Checkbox
                    checked={dietaryPreferences.soyFree}
                    onCheckedChange={(checked) =>
                      setDietaryPreferences(prev => ({ ...prev, soyFree: !!checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Raw Only</label>
                    <p className="text-sm text-gray-500">
                      Only show raw vegan recipes
                    </p>
                  </div>
                  <Checkbox
                    checked={dietaryPreferences.rawOnly}
                    onCheckedChange={(checked) =>
                      setDietaryPreferences(prev => ({ ...prev, rawOnly: !!checked }))
                    }
                  />
                </div>
              </div>
              <Button 
                onClick={handleSaveDietary} 
                disabled={isLoading}
                className="mt-4"
              >
                Save Dietary Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>
                Manage your privacy and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Profile Visibility</label>
                    <p className="text-sm text-gray-500">
                      Make your profile visible to everyone
                    </p>
                  </div>
                  <Checkbox defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Two-Factor Authentication</label>
                    <p className="text-sm text-gray-500">
                      Enable two-factor authentication for added security
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}