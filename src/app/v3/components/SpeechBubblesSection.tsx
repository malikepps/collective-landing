"use client";

import React from "react";

interface SpeechBubblesSectionProps {
  className?: string;
}

export default function SpeechBubblesSection({ className = "" }: SpeechBubblesSectionProps) {
  const [activeBubble, setActiveBubble] = React.useState<number>(0);
  const sectionRef = React.useRef<HTMLElement>(null);
  const firstBubbleRef = React.useRef<HTMLDivElement>(null);
  const secondBubbleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !firstBubbleRef.current || !secondBubbleRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const firstBubbleRect = firstBubbleRef.current.getBoundingClientRect();
      const secondBubbleRect = secondBubbleRef.current.getBoundingClientRect();
      
      const viewportHeight = window.innerHeight;
      const sectionCenter = sectionRect.top + sectionRect.height / 2;
      const viewportCenter = viewportHeight / 2;

      // Calculate which bubble is closer to the center of the viewport
      const firstBubbleDistance = Math.abs(firstBubbleRect.top + firstBubbleRect.height / 2 - viewportCenter);
      const secondBubbleDistance = Math.abs(secondBubbleRect.top + secondBubbleRect.height / 2 - viewportCenter);

      // Only activate bubbles when the section is in view
      if (sectionRect.bottom > 0 && sectionRect.top < viewportHeight) {
        if (firstBubbleDistance < secondBubbleDistance) {
          setActiveBubble(0);
        } else {
          setActiveBubble(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <section 
      ref={sectionRef} 
      className={`v3-section v3-section-teal ${className}`}
      style={{
        backgroundImage: 'url(/noise-light.png)',
        backgroundSize: '100px 100px',
        backgroundRepeat: 'repeat'
      }}
    >
      <style jsx>{`
        .speech-bubbles-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem 2rem 1rem 2rem;
          position: relative;
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2rem;
        }

        /* First Speech Bubble */
        .speech-bubble-first {
          position: relative;
          max-width: 800px;
          align-self: flex-start;
          z-index: 2;
          opacity: 0.4;
          transform: scale(0.95);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .speech-bubble-first.active {
          opacity: 1;
          transform: scale(1);
        }

        .first-speech-bubble {
          padding: 2.5rem;
          position: relative;
        }

        /* Second Speech Bubble */
        .speech-bubble-second {
          position: relative;
          max-width: 800px;
          align-self: flex-end;
          z-index: 2;
          margin-bottom: 0;
          opacity: 0.4;
          transform: scale(0.95);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .speech-bubble-second.active {
          opacity: 1;
          transform: scale(1);
        }

        .second-speech-bubble {
          padding: 2.5rem 2.5rem 1.5rem 2.5rem;
          position: relative;
        }

        /* Speech Bubble Text */
        .speech-text {
          font-family: 'ABC Whyte', sans-serif;
          font-size: 2rem;
          line-height: 1.5;
          margin: 0;
          font-weight: 300;
        }

        /* First bubble text - light green color */
        .first-speech-bubble .speech-text {
          color: #ddf6e6;
        }

        /* Second bubble text - light purple color */
        .second-speech-bubble .speech-text {
          color: #C8B8F7;
        }

        /* Mobile Responsive */
        @media screen and (max-width: 768px) {
          .speech-bubbles-container {
            padding: 1rem 1rem 0.5rem 1rem;
            gap: 1.5rem;
            min-height: 60vh;
          }

          .speech-bubble-first,
          .speech-bubble-second {
            align-self: stretch;
            max-width: 100%;
          }

          .first-speech-bubble {
            padding: 2rem;
          }
          
          .second-speech-bubble {
            padding: 2rem 2rem 1rem 2rem;
          }

          .speech-text {
            font-size: 1.6rem;
            line-height: 1.4;
          }
        }

        @media screen and (max-width: 480px) {
          .speech-bubbles-container {
            padding: 0.75rem 1rem 0.25rem 1rem;
            min-height: 50vh;
          }

          .first-speech-bubble {
            padding: 1.5rem;
          }
          
          .second-speech-bubble {
            padding: 1.5rem 1.5rem 0.5rem 1.5rem;
          }

          .speech-text {
            font-size: 1.4rem;
          }
        }
      `}</style>
      
      <div className="speech-bubbles-container">
        {/* First Speech Bubble */}
        <div 
          ref={firstBubbleRef}
          className={`speech-bubble-first ${activeBubble === 0 ? 'active' : ''}`}
        >
          <div className="first-speech-bubble">
            <p className="speech-text">
              Since the pandemic, creator platforms have given people authentic ways to connect with what they care about. People show up consistently, give monthly, and find belonging.
            </p>
          </div>
        </div>

        {/* Second Speech Bubble */}
        <div 
          ref={secondBubbleRef}
          className={`speech-bubble-second ${activeBubble === 1 ? 'active' : ''}`}
        >
          <div className="second-speech-bubble">
            <p className="speech-text">
              We had a hunch that mission-driven organizations deserved the same opportunity. So we spoke to a lot of people...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}