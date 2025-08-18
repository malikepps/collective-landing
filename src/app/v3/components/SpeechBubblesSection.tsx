"use client";

import React from "react";

interface SpeechBubblesSectionProps {
  className?: string;
}

export default function SpeechBubblesSection({ className = "" }: SpeechBubblesSectionProps) {
  return (
    <section className={`v3-section v3-section-teal ${className}`}>
      <style jsx>{`
        .speech-bubbles-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
          position: relative;
          background-color: #004542;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4rem;
        }

        /* First Speech Bubble */
        .speech-bubble-first {
          position: relative;
          max-width: 800px;
          align-self: flex-start;
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
        }

        .second-speech-bubble {
          padding: 2.5rem;
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
            padding: 2rem 1rem;
            gap: 2rem;
          }

          .speech-bubble-first,
          .speech-bubble-second {
            align-self: stretch;
            max-width: 100%;
          }

          .first-speech-bubble,
          .second-speech-bubble {
            padding: 2rem;
          }

          .speech-text {
            font-size: 1.6rem;
            line-height: 1.4;
          }
        }

        @media screen and (max-width: 480px) {
          .speech-bubbles-container {
            padding: 1.5rem 1rem;
          }

          .first-speech-bubble,
          .second-speech-bubble {
            padding: 1.5rem;
          }

          .speech-text {
            font-size: 1.4rem;
          }
        }
      `}</style>
      
      <div className="speech-bubbles-container">
        {/* First Speech Bubble */}
        <div className="speech-bubble-first">
          <div className="first-speech-bubble">
            <p className="speech-text">
              Since the pandemic, creator platforms have given people authentic ways to connect with what they care about. People show up consistently, give monthly, and find belonging.
            </p>
          </div>
        </div>

        {/* Second Speech Bubble */}
        <div className="speech-bubble-second">
          <div className="second-speech-bubble">
            <p className="speech-text">
              We had a hunch that mission-driven organizations deserved the same opportunity. So we spoke to a lot of people to better understand what&apos;s holding nonprofits back from achieving better engagement and growth...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}