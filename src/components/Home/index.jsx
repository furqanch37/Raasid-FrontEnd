import React, { lazy, Suspense } from 'react';
import './style.css';
import '../../Styles/bannerone.css';

const BannerSlider = lazy(() => import('./BannerSlider'));
const AboutSection = lazy(() => import('./about'));
const Products = lazy(() => import('./Products'));
const WhyChooseRaasid = lazy(() => import('./WhyChooseRaasid'));
const CustomerReviews = lazy(() => import('./CustomerReviews'));
const SixthSection = lazy(() => import('./SixthSection'));

const Home = () => {
  return (
    <main>
      <Suspense fallback={<div className="loading">Loading Banner...</div>}>
        <BannerSlider />
      </Suspense>

      <Suspense
        fallback={<div className="loading">Loading About Section...</div>}
      >
        <AboutSection />
      </Suspense>

      <Suspense fallback={<div className="loading">Loading Products...</div>}>
        <Products />
      </Suspense>

      <Suspense
        fallback={<div className="loading">Loading Why Choose Us...</div>}
      >
        <WhyChooseRaasid />
      </Suspense>

      <Suspense
        fallback={<div className="loading">Loading Customer Reviews...</div>}
      >
        <CustomerReviews />
      </Suspense>

      <Suspense
        fallback={<div className="loading">Loading More Content...</div>}
      >
        <SixthSection />
      </Suspense>
    </main>
  );
};

export default Home;
