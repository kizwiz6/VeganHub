// components/profile/AvatarUpload.tsx
import { useRef } from 'react'; // Change useState to useRef
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AvatarUploadProps {
  username?: string;
  onUpload: (file: File) => Promise<void>;
}

export function AvatarUpload({ username, onUpload }: AvatarUploadProps) {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  console.log('Current avatar URL:', user?.avatar); // Changed from avatarUrl to avatar

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await onUpload(file);
    }
  };

  return (
    <div className="relative">
      <Avatar className="h-24 w-24" key={user?.avatar}>
        <AvatarImage
          src={user?.avatar}
          key={user?.avatar}
          onError={(e) => {
            console.error('Avatar load error:', user?.avatar);
            e.currentTarget.src = '';
          }}
          onLoad={() => {
            console.log('Avatar loaded successfully:', user?.avatar);
          }}
        />
        <AvatarFallback>{username?.[0]}</AvatarFallback>
      </Avatar>
      <Button
        size="icon"
        variant="secondary"
        className="absolute bottom-0 right-0 rounded-full"
        onClick={handleClick}
      >
        <Camera className="h-4 w-4" />
      </Button>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
}