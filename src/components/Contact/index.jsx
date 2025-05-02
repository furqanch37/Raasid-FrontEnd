import React, { lazy, Suspense } from 'react';
import './style.css';

const ReusableBanner = lazy(() => import('./ReusableBanner'));
const Contact = lazy(() => import('./Contact'));
const Newsletter = lazy(() => import('../Home/Newsletter'));

const Index = () => {
  return (
    <div className="contact-wrapper flex-col">
      <Suspense fallback={<div className="loading">Loading Banner...</div>}>
        <ReusableBanner title="CONTACT" />
      </Suspense>

      <Suspense
        fallback={<div className="loading">Loading Contact Form...</div>}
      >
        <Contact />
      </Suspense>

      <Suspense fallback={<div className="loading">Loading Newsletter...</div>}>
        <Newsletter />
      </Suspense>
    </div>
  );
};

export default Index;
