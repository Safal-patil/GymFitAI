import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { AutoFillProvider } from './contexts/AutoFillContext.tsx'
import { NotificationProvider } from './contexts/NotificationContext.tsx'
import { UserProvider } from './contexts/UserContext.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <NotificationProvider>
          <AuthProvider>
            <UserProvider>
              <AutoFillProvider>
    <App />
    </AutoFillProvider>
                </UserProvider>
              </AuthProvider>
            </NotificationProvider>
          </Router>
  </GoogleOAuthProvider>
        </ErrorBoundary>
  
)