import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AutoFillProvider } from './contexts/AutoFillContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import PreviousWorkouts from './pages/PreviousWorkouts';
import Pricing from './pages/Pricing';
import Account from './pages/Account';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <AutoFillProvider>
            <NotificationProvider>
              <div className="min-h-screen bg-gray-900 text-white">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                  <Route path="/recommendations" element={<Layout><Recommendations /></Layout>} />
                  <Route path="/workouts" element={<Layout><PreviousWorkouts /></Layout>} />
                  <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
                  <Route path="/account" element={<Layout><Account /></Layout>} />
                </Routes>
              </div>
            </NotificationProvider>
          </AutoFillProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;