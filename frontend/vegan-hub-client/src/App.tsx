import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Home />} />
          <Route path="/recipes/new" element={<CreateRecipe />} />
          {/* Add other routes here */}
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;