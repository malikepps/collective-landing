"use client";

import React from "react";

interface HowItWorksSectionProps {
  className?: string;
}

export default function HowItWorksSection({ className = "" }: HowItWorksSectionProps) {
  return (
    <section className={`v3-section v3-section-teal ${className}`}>
      <style jsx>{`
        .how-it-works-container {
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

        /* Main Title */
        .how-it-works-title {
          font-family: "Anton", sans-serif;
          font-size: 4rem;
          font-weight: 400;
          line-height: 1.1em;
          letter-spacing: -0.02em;
          text-align: center;
          color: #ddf6e6;
          margin: 0 0 3rem 0;
          text-transform: uppercase;
        }

        @media screen and (min-width: 30em) {
          .how-it-works-title {
            font-size: 5rem;
            line-height: 4.5rem;
          }
        }

        @media screen and (min-width: 48em) {
          .how-it-works-title {
            font-size: 6rem;
            line-height: 5.5rem;
          }
        }

        /* Content Container */
        .content-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }

        @media screen and (min-width: 768px) {
          .content-container {
            flex-direction: row;
            align-items: flex-start;
            gap: 4rem;
          }
        }

        /* Phone Mockup */
        .phone-container {
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .phone-mockup {
          width: 280px;
          height: auto;
          border: 8px solid #ddf6e6;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          background-color: #000;
        }

        .phone-mockup img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 22px;
        }

        @media screen and (min-width: 48em) {
          .phone-mockup {
            width: 320px;
            border: 10px solid #ddf6e6;
            border-radius: 35px;
          }

          .phone-mockup img {
            border-radius: 25px;
          }
        }

        /* Text Content */
        .text-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 600px;
        }

        @media screen and (max-width: 767px) {
          .text-content {
            max-width: 100%;
            align-items: center;
            text-align: center;
          }
        }

        /* Text Bubbles */
        .text-bubble {
          position: relative;
          padding: 2rem;
        }

        .text-bubble p {
          font-family: 'ABC Whyte', sans-serif;
          font-size: 1.5rem;
          line-height: 1.5;
          margin: 0;
          font-weight: 300;
          color: #ddf6e6;
        }

        .text-bubble:first-child p {
          font-size: 1.8rem;
          font-weight: 400;
        }

        /* Mobile Responsive */
        @media screen and (max-width: 768px) {
          .how-it-works-container {
            padding: 3rem 1rem;
            gap: 3rem;
          }

          .how-it-works-title {
            margin-bottom: 2rem;
          }

          .content-container {
            gap: 2.5rem;
          }

          .phone-mockup {
            width: 240px;
            border: 6px solid #ddf6e6;
            border-radius: 25px;
          }

          .phone-mockup img {
            border-radius: 19px;
          }

          .text-bubble {
            padding: 1.5rem;
          }

          .text-bubble p {
            font-size: 1.3rem;
          }

          .text-bubble:first-child p {
            font-size: 1.5rem;
          }
        }

        @media screen and (max-width: 480px) {
          .how-it-works-container {
            padding: 2rem 1rem;
          }

          .how-it-works-title {
            font-size: 3rem;
            line-height: 2.8rem;
          }

          .phone-mockup {
            width: 200px;
            border: 5px solid #ddf6e6;
            border-radius: 20px;
          }

          .phone-mockup img {
            border-radius: 15px;
          }

          .text-bubble {
            padding: 1rem;
          }

          .text-bubble p {
            font-size: 1.2rem;
          }

          .text-bubble:first-child p {
            font-size: 1.4rem;
          }
        }
      `}</style>
      
      <div className="how-it-works-container">
        {/* Main Title */}
        <h2 className="how-it-works-title">How it works</h2>

        {/* Content Container */}
        <div className="content-container">
          {/* Phone Mockup */}
          <div className="phone-container">
            <div className="phone-mockup">
              <img 
                src="/images/IMG_5787.PNG" 
                alt="Collective app screenshot"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-content">
            {/* First Text Bubble */}
            <div className="text-bubble">
              <p>
                Collective is your space to tell your story, build community, and receive recurring donations
              </p>
            </div>

            {/* Second Text Bubble */}
            <div className="text-bubble">
              <p>
                We want to help you build a thriving community of supporters, quickly. Here&apos;s how:
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
