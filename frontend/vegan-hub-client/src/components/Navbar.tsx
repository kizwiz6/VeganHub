import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 justify-between items-center">
          <Link to="/" className="text-xl font-bold text-green-600">
            VeganHub
          </Link>
          <div className="flex gap-4">
            <Link
              to="/recipes"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Recipes
            </Link>
            <Link
              to="/recipes/new"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Create Recipe
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}