import { useState, useEffect } from 'react';
import bannersData from './BannersData';
const BannerSlider = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const displayDuration = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex(
        (prevIndex) => (prevIndex + 1) % bannersData.length
      );
    }, displayDuration);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentBannerIndex(index);
  };
  return (
    <section className="banner-section">
      {bannersData.map((banner, index) => (
        <div
          key={index}
          className={`banner-one ${index === currentBannerIndex ? 'active' : 'hidden fade-out'}`}
          style={{ display: index === currentBannerIndex ? 'flex' : 'none' }}
        >
          {banner.images}
          {banner.text}
        </div>
      ))}
      <div className="slider-dots">
        {bannersData.map((_, i) => (
          <span
            key={i}
            className={i === currentBannerIndex ? 'dot active' : 'dot'}
            onClick={() => handleDotClick(i)}
            style={{ cursor: 'pointer' }}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default BannerSlider;
