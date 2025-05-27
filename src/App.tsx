import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'sonner';
import { QueryClient } from 'react-query';

import ConversationManagement from '@/pages/ConversationManagement';

function App() {
  return (
    <AuthProvider>
      <QueryClient>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/user-management" 
              element={
                <ProtectedRoute>
                  <UserManagement />
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
            <Route 
              path="/conversations" 
              element={
                <ProtectedRoute>
                  <ConversationManagement />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Toaster />
        </Router>
      </QueryClient>
    </AuthProvider>
  );
}

export default App;
