import React from 'react';
import bannersData from '../Home/BannersData';

const ReusableBanner = ({ title }) => {
  const selectedBanner = bannersData[0];
  return (
    <section className="banner-section">
      <div className="banner-one active">
        {selectedBanner.images}
        <div class="banner-text">
          <div class="text-upper-border"></div>
          <h2 className="contact-heading">{title}</h2>
          <div class="text-lower-border"></div>
        </div>
      </div>
    </section>
  );
};

export default ReusableBanner;
