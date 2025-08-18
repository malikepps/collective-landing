"use client";

import { useEffect, useCallback } from 'react';

interface ScrollAnimationOptions {
  onScroll?: (scrollY: number, scrollProgress: number) => void;
  smoothScrolling?: boolean;
  easing?: string;
}

export const useScrollAnimations = ({
  onScroll,
  smoothScrolling = true,
  easing = 'cubic-bezier(0.56, 0.86, 0.59, 1)' // eslint-disable-line @typescript-eslint/no-unused-vars
}: ScrollAnimationOptions = {}) => {
  
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scrollY / documentHeight, 1);
    
    requestAnimationFrame(() => {
      if (onScroll) {
        onScroll(scrollY, scrollProgress);
      }
    });
  }, [onScroll]);

  useEffect(() => {
    if (smoothScrolling) {
      // Apply smooth scrolling behavior
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (smoothScrolling) {
        document.documentElement.style.scrollBehavior = 'auto';
      }
    };
  }, [handleScroll, smoothScrolling]);

  // Utility function for smooth scrolling to element
  const scrollToElement = useCallback((elementId: string, offset: number = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return {
    scrollToElement
  };
};
