import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import ErrorBoundary from '@/components/ErrorBoundary';
import Layout from './layout';

const Home = React.lazy(() => import('./pages/Home'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Layout>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          </main>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
};

export default App;