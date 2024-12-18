import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ScrollToTop } from '@/components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRecipe from './pages/CreateRecipe';
import { Toaster } from './components/ui/toaster';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { EmailVerification } from './components/auth/EmailVerification';
import ResetPassword from './pages/ResetPassword';
import { Profile } from '@/pages/Profile';
import Settings from './pages/Settings';
import { ThemeProvider } from '@/contexts/ThemeContext';
import RecipeDetail from './pages/RecipeDetail';
import Privacy from './pages/Privacy.tsx';
import Terms from './pages/Terms.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ScrollToTop />
            <Layout>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Home />} />
                <Route path="/recipes/:slug" element={<RecipeDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email" element={<EmailVerification />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />

                {/* Protected routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/recipes/new"
                  element={
                    <ProtectedRoute>
                      <CreateRecipe />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Toaster />
            </Layout>
        </AuthProvider>
      </ThemeProvider>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
