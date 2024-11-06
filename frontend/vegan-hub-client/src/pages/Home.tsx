import { useToast } from '@/hooks/use-toast.ts';

export default function Home() {
  const { toast } = useToast();

  const handleWelcomeClick = () => {
    toast({
      title: "Welcome to VeganHub!",
      description: "We're excited to have you here. Start exploring our vegan recipes!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-green-600 mb-6">
        Welcome to VeganHub
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        Discover and share delicious vegan recipes with our community
      </p>
      <button
        onClick={handleWelcomeClick}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        Show Welcome Message
      </button>
    </div>
  );
}