import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { AutoFillProvider } from './contexts/AutoFillContext.tsx'
import { NotificationProvider } from './contexts/NotificationContext.tsx'
import { UserProvider } from './contexts/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
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
  </ErrorBoundary>
)