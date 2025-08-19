"use client";

import React from "react";
// import HeroSection from "./components/HeroSection";
// import NarrativeSection from "./components/NarrativeSection";
import SpeechBubblesSection from "./components/SpeechBubblesSection";
import ScatteredBubblesSection from "./components/ScatteredBubblesSection";
import PresentSection from "./components/PresentSection";
import HowItWorksSection from "./components/HowItWorksSection";
import HeroSlideshowBackground from "./components/HeroSlideshowBackground";
// import TornPaperTransition from "./components/TornPaperTransition";
import { useScrollAnimations } from "./hooks/useScrollAnimations";

// Hero slide interface (for future use)
// interface HeroSlide {
//   id: number;
//   title: string;
//   subtitle?: string;
//   backgroundImage: string;
//   backgroundVideo?: string;
//   overlayOpacity: number;
//   textPosition: 'center' | 'left' | 'right';
// }

export default function HomeV3() {
  // Initialize scroll animations (for future use)
  useScrollAnimations({
    smoothScrolling: true
  });

  return (
    <div className="v3-container" style={{ 
      width: '100%', 
      maxWidth: '100vw', 
      overflowX: 'hidden' 
    }}>
      <style jsx global>{`
        /* V3 Design System - Based on Implementation Plan */
        :root {
          /* Primary Colors */
          --primary-teal: #004542;
          --primary-white: #ffffff;
          
          /* Accent Colors */
          --accent-light-green: #ddf6e6;
          --accent-light-blue: #d6f0ff;
          --accent-purple: #5c47a0;
          --accent-pink: #ffd6db;
          --accent-yellow: #FFD700;
          
          /* Transparency Variants */
          --teal-64: #00454264;
          --black-64: #00000064;
          
          /* Typography */
          --font-size-hero: 150px;
          --font-size-large: 110px;
          --font-size-h1: 48px;
          --font-size-h2: 36px;
          --font-size-h3: 30px;
          --font-size-h4: 28px;
          --font-size-h5: 24px;
          --font-size-body: 18px;
          --font-size-small: 14px;
          
          /* Font Weights */
          --font-weight-light: 300;
          --font-weight-regular: 400;
          --font-weight-medium: 500;
          --font-weight-bold: 700;
          --font-weight-black: 900;
          
          /* Easing Functions */
          --ease-smooth: cubic-bezier(0.56, 0.86, 0.59, 1);
          --ease-standard: ease;
          --ease-in: ease-in;
          --ease-out: ease-out;
          
          /* Transition Durations */
          --duration-fast: 0.15s;
          --duration-medium: 0.3s;
          --duration-slow: 0.6s;
        }

        /* Font Face Declarations */
        @font-face {
          font-family: 'Windsor';
          src: url('/fonts/Windsor Regular.ttf') format('truetype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

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

        @font-face {
          font-family: 'ABC Whyte';
          src: url('/fonts/ABC Whyte/ABCWhyte-Bold-Trial.woff2') format('woff2'),
               url('/fonts/ABC Whyte/ABCWhyte-Bold-Trial.woff') format('woff'),
               url('/fonts/ABC Whyte/ABCWhyte-Bold-Trial.otf') format('opentype');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'ABC Whyte';
          src: url('/fonts/ABC Whyte/ABCWhyte-Regular-Trial.woff2') format('woff2'),
               url('/fonts/ABC Whyte/ABCWhyte-Regular-Trial.woff') format('woff'),
               url('/fonts/ABC Whyte/ABCWhyte-Regular-Trial.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'ABC Whyte';
          src: url('/fonts/ABC Whyte/ABCWhyte-Light-Trial.woff2') format('woff2'),
               url('/fonts/ABC Whyte/ABCWhyte-Light-Trial.woff') format('woff'),
               url('/fonts/ABC Whyte/ABCWhyte-Light-Trial.otf') format('opentype');
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }

        /* Reset and Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'ABC Whyte', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
          position: relative;
          overflow-x: hidden;
          width: 100%;
          max-width: 100vw;
        }

        /* Hero Section Styles */
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
        }

        .hero-slide.active {
          opacity: 1;
        }

        .hero-slide img,
        .hero-slide video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .hero-slide video {
          pointer-events: none;
        }

        /* Iris/Aperture transition styles */
        .current-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
        }

        .next-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 15;
          clip-path: circle(0px at var(--iris-x, 50%) var(--iris-y, 50%));
          transition: none;
        }

        .next-slide.preview {
          clip-path: circle(120px at var(--iris-x, 50%) var(--iris-y, 50%));
          transition: clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .next-slide.expanding {
          clip-path: circle(200% at var(--iris-x, 50%) var(--iris-y, 50%));
          transition: clip-path 2.2s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        /* Navigation arrows */
        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 30;
          transition: all 0.3s ease;
          color: white;
        }

        .nav-arrow:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-50%) scale(1.1);
        }

        .nav-arrow.left {
          left: 30px;
        }

        .nav-arrow.right {
          right: 30px;
        }

        /* V3 Typography */
        .v3-hero-title {
          font-family: "Anton", sans-serif;
          font-size: 4rem;
          font-weight: 400;
          line-height: 1.1em;
          letter-spacing: -0.02em;
          text-align: center;
          max-width: 90vw;
          color: var(--primary-teal);
          margin: 0;
        }
        
        @media screen and (min-width: 30em) {
          .v3-hero-title {
            font-size: 6rem;
            line-height: 5.5rem;
            max-width: 1000px;
          }
        }

        @media screen and (min-width: 48em) {
          .v3-hero-title {
            font-size: 8rem;
            line-height: 7.5rem;
            max-width: 1200px;
          }
        }

        /* Bubble/Pill Style Title */
        .v3-hero-title-bubbles {
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          gap: 0;
          margin: 0 auto;
          overflow-x: hidden;
          overflow-y: visible;
          width: 100%;
          max-width: 100vw;
        }

        .v3-hero-title-bubbles.top-row {
          align-items: flex-end;
          margin-bottom: 0;
        }

        .v3-hero-title-bubbles.bottom-row {
          align-items: flex-start;
          margin-top: 0;
        }

        /* Bubble Animation Delays */
        .v3-title-bubble:nth-child(1) { animation-delay: 0s; }
        .v3-title-bubble:nth-child(2) { animation-delay: 0.1s; }
        .v3-title-bubble:nth-child(3) { animation-delay: 0.2s; }
        .v3-title-bubble:nth-child(4) { animation-delay: 0.3s; }
        .v3-title-bubble:nth-child(5) { animation-delay: 0.4s; }

        .v3-title-bubble {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2rem;
          border-radius: 50px;
          border: 3px solid var(--primary-teal);
          font-family: "Anton", sans-serif;
          font-weight: 400;
          text-align: center;
          text-transform: uppercase;
          transition: all var(--duration-medium) var(--ease-smooth);
          opacity: 0;
          transform: translateY(10px);
          animation: bubbleAppear 0.6s ease-out forwards;
        }
        
        .v3-title-bubble.blue,
        .v3-title-bubble.yellow {
          border-radius: 35px;
        }

        .v3-title-bubble.neutral {
          background-color: transparent;
          color: var(--primary-white);
          border: none;
        }

        .v3-title-bubble.yellow {
          background-color: var(--accent-yellow);
          color: #000000;
          font-weight: 600;
        }

        .v3-title-bubble.blue {
          background-color: #6B73FF;
          color: white;
        }

        @keyframes bubbleAppear {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .v3-title-bubble.large {
          font-size: 3.125rem;
          padding: 1.25rem 2.5rem;
        }

        .v3-title-bubble.medium {
          font-size: 2.5rem;
          padding: 1.09rem 2.19rem;
        }

        .v3-title-bubble.small {
          font-size: 2.19rem;
          padding: 0.94rem 1.88rem;
        }

        /* Mobile border radius adjustments */
        @media screen and (max-width: 30em) {
          .v3-title-bubble {
            border-radius: 30px;
          }
          
          .v3-title-bubble.blue,
          .v3-title-bubble.yellow {
            border-radius: 25px;
          }
        }

        @media screen and (min-width: 30em) {
          .v3-title-bubble.large {
            font-size: 4rem;
            padding: 2rem 4rem;
          }

          .v3-title-bubble.medium {
            font-size: 3.5rem;
            padding: 1.75rem 3.5rem;
          }

          .v3-title-bubble.small {
            font-size: 3rem;
            padding: 1.5rem 3rem;
          }
        }

        @media screen and (min-width: 48em) {
          .v3-title-bubble.large {
            font-size: 5rem;
            padding: 2.5rem 5rem;
          }

          .v3-title-bubble.medium {
            font-size: 4.5rem;
            padding: 2rem 4rem;
          }

          .v3-title-bubble.small {
            font-size: 4rem;
            padding: 1.75rem 3.5rem;
          }
        }

        /* Section Styles */
        .v3-section {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }

        .v3-section-teal {
          background-color: var(--primary-teal);
          color: var(--primary-white);
        }

        .v3-section-light-green {
          background-color: var(--accent-light-green);
          color: var(--primary-teal);
        }

        .v3-section-light-blue {
          background-color: var(--accent-light-blue);
          color: var(--primary-teal);
        }

        .v3-section-purple {
          background-color: #c7b9f6;
          color: var(--primary-teal);
        }

        .v3-section-light-purple {
          background-color: #DEDDFF;
          color: var(--primary-teal);
        }

        .v3-section-pink {
          background-color: var(--accent-pink);
          color: var(--primary-teal);
        }

        /* Hero Section Specific Styles */
        .v3-hero-section {
          background-color: transparent;
          color: var(--primary-white);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding-bottom: 0;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          overflow-y: visible;
        }

        .v3-hero-subtitle {
          font-family: "ABC Whyte", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
          font-size: 1.125rem;
          font-weight: var(--font-weight-regular);
          line-height: 1.5;
          text-align: center;
          max-width: 500px;
          margin: 3rem auto 0 auto;
          opacity: 1;
          color: var(--primary-teal);
          background-color: #DEDDFF;
          padding: 1.5rem 2rem;
          border-radius: 16px;
          border: 2px solid var(--primary-teal);
          backdrop-filter: none;
        }
        
        .v3-hero-subtitle .highlight {
          color: var(--primary-teal);
          font-weight: var(--font-weight-medium);
        }

        /* Simplified Hero Title */
        .v3-hero-title-simple {
          font-family: "Anton", sans-serif;
          font-size: 5rem;
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-align: left;
          color: var(--primary-white);
          margin: 0;
          text-transform: uppercase;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          max-width: 90vw;
          position: relative;
        }

        .v3-hero-title-simple .line-1 {
          display: block;
          margin-bottom: 0.2em;
        }

        .v3-hero-title-simple .line-2 {
          display: block;
          margin-left: 2rem;
        }

        .v3-hero-title-simple .highlight {
          color: #DEDDFF;
        }

        @media screen and (min-width: 30em) {
          .v3-hero-title-simple {
            font-size: 7rem;
            line-height: 1.05;
          }
          
          .v3-hero-title-simple .line-2 {
            margin-left: 2.5rem;
            white-space: nowrap;
          }
        }

        @media screen and (min-width: 48em) {
          .v3-hero-title-simple {
            font-size: 9rem;
            line-height: 1.0;
          }
          
          .v3-hero-title-simple .line-2 {
            margin-left: 3rem;
          }
        }

        @media screen and (min-width: 64em) {
          .v3-hero-title-simple {
            font-size: 11rem;
            line-height: 0.95;
          }
          
          .v3-hero-title-simple .line-2 {
            margin-left: 3.5rem;
          }
        }

        @media screen and (min-width: 80em) {
          .v3-hero-title-simple {
            font-size: 13rem;
            line-height: 0.9;
          }
          
          .v3-hero-title-simple .line-2 {
            margin-left: 4rem;
          }
        }

        @media screen and (min-width: 30em) {
          .v3-hero-subtitle {
            font-size: 1.25rem;
            max-width: 600px;
          }
        }

        @media screen and (min-width: 48em) {
          .v3-hero-subtitle {
            font-size: 1.375rem;
            max-width: 700px;
          }
        }
      `}</style>

      {/* Section 1: Hero Section (Bubble Style with Slideshow Background) */}
      <section className="v3-hero-section" style={{ position: 'relative' }}>
        {/* Hero Slideshow Background */}
        <HeroSlideshowBackground />
        
        {/* Navigation Bar */}
        <nav style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          right: '2rem',
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem'
        }}>
          {/* Left Navigation */}
          <div style={{
            display: 'flex',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <button style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontFamily: 'ABC Whyte, sans-serif',
              fontSize: '1.2rem',
              fontWeight: '400',
              cursor: 'pointer',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              Mission
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontFamily: 'ABC Whyte, sans-serif',
              fontSize: '1.2rem',
              fontWeight: '400',
              cursor: 'pointer',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              Product
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontFamily: 'ABC Whyte, sans-serif',
              fontSize: '1.2rem',
              fontWeight: '400',
              cursor: 'pointer',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              FAQs
            </button>
          </div>

          {/* Center Logo */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            <img 
              src="/images/Collective logo v5 White (2).png" 
              alt="Collective"
              style={{
                height: '40px',
                width: 'auto'
              }}
            />
          </div>

          {/* Right Buttons */}
          <div style={{
            display: 'flex',
            gap: '1.2rem',
            alignItems: 'center'
          }}>
            <button style={{
              background: 'transparent',
              border: '2px solid white',
              color: 'white',
              fontFamily: 'ABC Whyte, sans-serif',
              fontSize: '1.1rem',
              fontWeight: '400',
              cursor: 'pointer',
              padding: '0.75rem 1.5rem',
              borderRadius: '30px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.2s ease'
            }}>
              Log in
            </button>
            <button style={{
              background: '#DEDDFF',
              border: '2px solid var(--primary-teal)',
              color: 'var(--primary-teal)',
              fontFamily: 'ABC Whyte, sans-serif',
              fontSize: '1.1rem',
              fontWeight: '500',
              cursor: 'pointer',
              padding: '0.75rem 1.5rem',
              borderRadius: '30px',
              transition: 'all 0.2s ease'
            }}>
              Get started
            </button>
          </div>
        </nav>
        
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 25
        }}>
          {/* Simplified Hero Title */}
          <h1 className="v3-hero-title-simple">
            <span className="line-1">Give <span className="highlight">back</span></span>
            <span className="line-2">to your donors</span>
          </h1>

          <p className="v3-hero-subtitle">
            Collective is a <span className="highlight">new digital home</span> where nonprofits tell their stories, build community, and grow sustainably.
          </p>
        </div>
      </section>

      {/* Torn Paper Transition - Hidden for now */}
      {/* <div style={{ marginTop: '-45px', position: 'relative', zIndex: 30 }}>
        <TornPaperTransition />
      </div> */}

      {/* Section 2: Speech Bubbles Section (Teal Background) */}
      <div style={{ position: 'relative', zIndex: 5 }}>
        <SpeechBubblesSection />
      </div>

      {/* Section 3: Scattered Bubbles Section (ReadyMag Style) */}
      <div style={{ marginTop: '-4rem', position: 'relative', zIndex: 4 }}>
        <ScatteredBubblesSection />
      </div>

      {/* Section 4: Present-Style Section (Light Purple) */}
      <PresentSection 
        title="Collective deepens your relationships through content and community"
        backgroundColor="light-purple"
      />

      {/* Section 5: How It Works Section (Teal Background) */}
      <HowItWorksSection />

      {/* Section 6: Present1-Style Section (Light Blue) */}
      <PresentSection 
        title="Present1 Section"
        backgroundColor="light-blue"
      />

      {/* Section 7: Present2-Style Section (Light Purple) */}
      <PresentSection 
        title="Present2 Section"
        backgroundColor="purple"
      />

      {/* Section 8: Present3-Style Section (Light Pink) */}
      <PresentSection 
        title="Present3 Section"
        backgroundColor="pink"
      />
    </div>
  );
}
