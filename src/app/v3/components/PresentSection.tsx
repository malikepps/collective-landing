"use client";

import React from "react";


interface PresentSectionProps {
  title: string;
  backgroundColor: 'light-green' | 'light-blue' | 'purple' | 'pink' | 'light-purple';
  children?: React.ReactNode;
}

export default function PresentSection({ 
  title, 
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
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
          width: 100%;
        }

        .content-layout {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          align-items: start;
        }

        .main-content {
          text-align: left;
        }

        .present-title {
          font-family: 'Anton', sans-serif;
          font-size: 4rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin-bottom: 2rem;
          line-height: 1.1;
          color: var(--primary-teal);
        }

        .present-content {
          font-family: 'ABC Whyte', sans-serif;
          font-size: 1.25rem;
          line-height: 1.6;
          font-weight: 300;
          color: var(--primary-teal);
        }

        .present-content p {
          margin: 0;
        }

        .phone-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .phone-mockup {
          width: 350px;
          height: auto;
          border: 10px solid var(--primary-teal);
          border-radius: 35px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          background-color: #000;
        }

        .phone-mockup img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 25px;
        }

        /* Mobile Layout */
        @media screen and (max-width: 768px) {
          .present-container {
            padding: 3rem 1rem;
          }

          .content-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .main-content {
            text-align: center;
            order: 1;
          }

          .phone-container {
            order: 2;
            justify-content: center;
          }

          .present-title {
            font-size: 3rem;
            margin-bottom: 1.5rem;
          }

          .present-content {
            font-size: 1.1rem;
            line-height: 1.5;
          }

          .phone-mockup {
            width: 300px;
            border: 8px solid var(--primary-teal);
            border-radius: 30px;
          }

          .phone-mockup img {
            border-radius: 22px;
          }
        }

        @media screen and (max-width: 480px) {
          .present-container {
            padding: 2rem 1rem;
          }

          .present-title {
            font-size: 2.5rem;
          }

          .present-content {
            font-size: 1rem;
          }

          .phone-mockup {
            width: 250px;
            border: 6px solid var(--primary-teal);
            border-radius: 25px;
          }

          .phone-mockup img {
            border-radius: 19px;
          }
        }
      `}</style>
      
      <div className="present-container">
        <div className="content-layout">
          <div className="phone-container">
            <div className="phone-mockup">
              <img 
                src="/images/IMG_5787.PNG" 
                alt="Collective app screenshot"
              />
            </div>
          </div>
          
          <div className="main-content">
            <h2 className="present-title">
              {title}
            </h2>
            <div className="present-content">
              <p style={{ marginBottom: '1.5rem' }}>
                Asking for donations is hard work. It is a lot easier to invite people into your organization, giving them an opportunity to see themselves as joining a community of others who believe in your mission.
              </p>
              <p>
                Imagine a world where your organization&apos;s hard work to produce content that engages your community actually reached your entire community. We think that is only possible in a space that you own, not big tech companies.
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
