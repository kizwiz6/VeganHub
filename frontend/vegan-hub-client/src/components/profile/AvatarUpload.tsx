// src/components/profile/AvatarUpload.tsx
import { useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

interface AvatarUploadProps {
  avatarUrl?: string;
  username?: string;
  onUpload: (file: File) => Promise<void>;
}

export function AvatarUpload({ avatarUrl, username, onUpload }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

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
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarUrl} />
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