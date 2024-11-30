import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Layout from './layout';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Auth/Login'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <ErrorBoundary>
            <Layout>
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute>
                          <Home />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
            </Layout>
          </ErrorBoundary>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};
