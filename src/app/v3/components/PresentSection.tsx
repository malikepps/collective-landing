"use client";

import React from "react";

interface PresentSectionProps {
  title: string;
  content: string;
  backgroundColor: 'light-green' | 'light-blue' | 'purple' | 'pink' | 'light-purple';
  children?: React.ReactNode;
}

export default function PresentSection({ 
  title, 
  content, 
  backgroundColor, 
  children 
}: PresentSectionProps) {
  const getSectionClass = () => {
    switch (backgroundColor) {
      case 'light-green':
        return 'v3-section-light-green';
      case 'light-blue':
        return 'v3-section-light-blue';
      case 'purple':
        return 'v3-section-purple';
      case 'pink':
        return 'v3-section-pink';
      case 'light-purple':
        return 'v3-section-light-purple';
      default:
        return 'v3-section-light-green';
    }
  };

  return (
    <section className={`v3-section ${getSectionClass()}`}>
      <style jsx>{`
        @font-face {
          font-family: 'Anton';
          src: url('/fonts/Anton-Regular.woff2') format('woff2'),
               url('/fonts/Anton-Regular.woff') format('woff'),
               url('/fonts/Anton-Regular.ttf') format('truetype'),
               url('/fonts/Anton-Regular.eot') format('embedded-opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        .present-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 2rem;
          width: 100%;
          text-align: center;
        }

        .present-title {
          font-family: 'Anton', sans-serif;
          font-size: 5rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          font-stretch: condensed;
          margin-bottom: 2rem;
          line-height: 1.1;
          color: var(--primary-teal);
        }

        .present-content {
          font-family: 'ABC Whyte', sans-serif;
          font-size: 1.5rem;
          line-height: 1.5;
          font-weight: 300;
          margin-bottom: 2rem;
          color: var(--primary-teal);
        }

        @media screen and (max-width: 768px) {
          .present-container {
            padding: 2rem 1rem;
          }

          .present-title {
            font-size: 3.5rem;
          }

          .present-content {
            font-size: 1.3rem;
            line-height: 1.4;
          }
        }

        @media screen and (max-width: 480px) {
          .present-title {
            font-size: 2.8rem;
          }

          .present-content {
            font-size: 1.2rem;
          }
        }
      `}</style>
      
      <div className="present-container">
        <h2 className="present-title">
          {title}
        </h2>
        <p className="present-content">
          {content}
        </p>
        {children}
      </div>
    </section>
  );
}
