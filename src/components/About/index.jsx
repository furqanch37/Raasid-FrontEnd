import React, { lazy, Suspense } from 'react';
import './style.css';

const ReusableBanner = lazy(() => import('../Contact/ReusableBanner'));
const AboutSection = lazy(() => import('../Home/about'));
const Certifications = lazy(() => import('./Certificate/Certifications'));
const SixthSection = lazy(() => import('../Home/SixthSection'));

const Index = () => {
  return (
    <div className="contact-wrapper">
      <Suspense fallback={<div className="loading">Loading Banner...</div>}>
        <ReusableBanner title="ABOUT" />
      </Suspense>

      <Suspense
        fallback={<div className="loading">Loading About Section...</div>}
      >
        <AboutSection />
      </Suspense>

      <Suspense
        fallback={<div className="loading">Loading Certifications...</div>}
      >
        <Certifications />
      </Suspense>

      <Suspense
        fallback={<div className="loading">Loading Sixth Section...</div>}
      >
        <SixthSection />
      </Suspense>
    </div>
  );
};

export default Index;
