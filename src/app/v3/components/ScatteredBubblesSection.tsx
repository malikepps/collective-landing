'use client';

import { useEffect, useState } from 'react';
import SpeechBubble from './SpeechBubblesSection/SpeechBubble';
import SpeechBubbleMobile from './SpeechBubblesSection/SpeechBubbleMobile';
import { speechBubbles } from './SpeechBubblesSection/speechBubbleData';

export default function ScatteredBubblesSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.scattered-bubbles-section');
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the section is visible
      const visibleTop = Math.max(0, -rect.top);
      const visibleBottom = Math.min(rect.height, windowHeight - rect.top);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibilityRatio = visibleHeight / rect.height;
      
      // Convert to scroll progress (0 = not visible, 1 = fully scrolled through)
      // More sensitive - triggers faster when section comes into view
      const progress = Math.min(1, Math.max(0, visibilityRatio * 3)); // Even quicker transition
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style jsx>{`
        .animation-container {
          transition: all 0.3s ease-out; /* Quick transition for scroll-triggered animation */
        }
      `}</style>
      <section 
        className="v3-section v3-section-teal scattered-bubbles-section"
        style={{
          position: 'relative',
          width: '100%',
                  height: isMobile ? '100vh' : '70vh', // Much taller on mobile
        minHeight: isMobile ? '900px' : '600px', // Higher minimum on mobile
        overflow: 'visible', // Changed to visible to prevent cutoff
        paddingTop: isMobile ? '4rem' : '6rem' // Much more padding on desktop for animation space
        }}
      >
      {/* Content container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxWidth: '1280px',
          margin: '0 auto'
        }}
      >
        {/* Desktop Layout - Allow bubbles to extend beyond viewport like ReadyMag */}
        {!isMobile && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'visible' // Allow bubbles to extend beyond viewport
            }}
          >
            {speechBubbles.map((bubble) => (
              <SpeechBubble key={bubble.id} bubble={bubble} scrollProgress={scrollProgress} />
            ))}
          </div>
        )}

        {/* Mobile Layout - Only show first 6 bubbles - CLEAN STACKED GRID */}
        {isMobile && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // Center the grid
              justifyContent: 'flex-start',
              padding: '20px'
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '380px', // Slightly wider for the larger bubbles
                height: '100%'
              }}
            >
              {speechBubbles.slice(0, 6).map((bubble, index) => (
                <SpeechBubbleMobile key={bubble.id} bubble={bubble} scrollProgress={scrollProgress} bubbleIndex={index} />
              ))}
            </div>
          </div>
        )}
      </div>
      </section>
    </>
  );
}
