import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// import CreateRecipe from './pages/CreateRecipe';
import { Toaster } from './components/ui/toaster';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { EmailVerification } from './components/auth/EmailVerification';
import ResetPassword from './pages/ResetPassword';
import { Profile } from '@/pages/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;