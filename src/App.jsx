import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import './assets/theme.css';
import 'aos/dist/aos.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/home/Home'));
const Event = lazy(() => import('./pages/event/Event'));
const Gallery = lazy(() => import('./pages/gallery/Gallery'));
const Sponsor = lazy(() => import('./pages/sponsor/Sponsor'));
const Contact = lazy(() => import('./pages/contact/Contact'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const SegmentDetails = lazy(() => import('./pages/segment-details/SegmentDetails'));

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <div className="app">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/event" element={<Event />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/sponsor" element={<Sponsor />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/segment/:id" element={<SegmentDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--color-secondary-dark)',
                color: 'var(--color-text-light)',
                border: '1px solid var(--color-accent-bright)',
              },
            }}
          />
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
