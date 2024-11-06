import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes/new" element={<CreateRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;