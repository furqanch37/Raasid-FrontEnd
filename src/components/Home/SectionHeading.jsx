import React, { useEffect, useRef, useState } from 'react';
import './style.css'; // Ensure this file contains the necessary animations

const SectionHeading = ({
  title,
  subtitle,
  className = '',
  style = {},
  children,
}) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing after animation triggers
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`section-heading ${className} ${isVisible ? 'animate' : ''}`}
      style={style}
    >
      <div className="line line-left"></div>
      <div className="heading-text">
        {children ? (
          children
        ) : (
          <>
            {title && <h1>{title}</h1>}
            {subtitle && <h2>{subtitle}</h2>}
          </>
        )}
      </div>
      <div className="line line-right"></div>
    </div>
  );
};

export default SectionHeading;
