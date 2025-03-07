import React, { useEffect, useRef, useState } from 'react';

export const FadeOnScroll = ({ 
  children, 
  threshold = 0.1, 
  delay = 0.1, 
  direction = 'up', 
  className = '',
  fadeOut = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  // Calculate translation based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return 'translate-y-16';
      case 'down': return '-translate-y-16';
      case 'left': return 'translate-x-16';
      case 'right': return '-translate-x-16';
      default: return 'translate-y-16';
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility state based on intersection
        setIsVisible(entry.isIntersecting);
        
        // If we don't want fade-out effect, unobserve after becoming visible
        if (entry.isIntersecting && !fadeOut) {
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, fadeOut]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${className} ${
        isVisible
          ? `opacity-100 translate-y-0 translate-x-0`
          : `opacity-0 ${getInitialTransform()}`
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

export default FadeOnScroll;