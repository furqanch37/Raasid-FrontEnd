import React, { lazy, Suspense } from 'react';
import './style.css';

const ReusableBanner = lazy(() => import('../Contact/ReusableBanner'));
const Newsletter = lazy(() => import('../Home/Newsletter'));
const BlogWrapper = lazy(() => import('./BlogWrapper'));

const Index = () => {
  return (
    <div className="flex-col">
      <Suspense fallback={<div className="loading">Loading Banner...</div>}>
        <ReusableBanner title="BLOGS" />
      </Suspense>

      <Suspense fallback={<div className="loading">Loading Blogs...</div>}>
        <BlogWrapper />
      </Suspense>

      <Suspense fallback={<div className="loading">Loading Newsletter...</div>}>
        <Newsletter />
      </Suspense>
    </div>
  );
};

export default Index;
