"use client";

import React from "react";

// Hero slide interface
interface HeroSlide {
  id: number;
  title: string;
  subtitle?: string;
  backgroundImage: string;
  backgroundVideo?: string;
  overlayOpacity: number;
  textPosition: 'center' | 'left' | 'right';
}

interface HeroSectionProps {
  slides: HeroSlide[];
}

export default function HeroSection({ slides }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [showPreviewBlob, setShowPreviewBlob] = React.useState(false);
  const [isExpandingBlob, setIsExpandingBlob] = React.useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const [slideTimer, setSlideTimer] = React.useState<NodeJS.Timeout | null>(null);
  const [previewTimer, setPreviewTimer] = React.useState<NodeJS.Timeout | null>(null);
  const [irisPosition, setIrisPosition] = React.useState({ x: 85, y: 50 });

  // Generate random iris position for slideshow transitions
  const generateRandomIrisPosition = () => {
    const x = 20 + Math.random() * 60; // 20% to 80% from left
    const y = 20 + Math.random() * 60; // 20% to 80% from top
    return { x, y };
  };

  // Slideshow navigation functions
  const nextSlide = () => {
    const newPosition = generateRandomIrisPosition();
    setIrisPosition(newPosition);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetSlideTimers();
  };

  const prevSlide = () => {
    const newPosition = generateRandomIrisPosition();
    setIrisPosition(newPosition);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetSlideTimers();
  };

  const resetSlideTimers = () => {
    if (slideTimer) clearTimeout(slideTimer);
    if (previewTimer) clearTimeout(previewTimer);
    setShowPreviewBlob(false);
    setIsExpandingBlob(false);
    
    if (isAutoPlaying) {
      // Show preview blob at 4 seconds
      const newPreviewTimer = setTimeout(() => {
        const newPosition = generateRandomIrisPosition();
        setIrisPosition(newPosition);
        setShowPreviewBlob(true);
      }, 4000);
      setPreviewTimer(newPreviewTimer);
      
      // Auto advance at 6.5 seconds
      const newSlideTimer = setTimeout(() => {
        setTimeout(() => {
          setIsExpandingBlob(true);
          
          setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setIsExpandingBlob(false);
            setShowPreviewBlob(false);
          }, 2200);
        }, 800);
      }, 6500);
      setSlideTimer(newSlideTimer);
    }
  };

  // Initialize slideshow
  React.useEffect(() => {
    resetSlideTimers();
    return () => {
      if (slideTimer) clearTimeout(slideTimer);
      if (previewTimer) clearTimeout(previewTimer);
    };
  }, [isAutoPlaying]);

  return (
    <section className="v3-section" style={{
      color: '#FFFADD',
      overflow: 'hidden',
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      WebkitFontSmoothing: 'antialiased',
      position: 'relative'
    }}>
      {/* Hero Frame Container */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        margin: 0
      }}>
        {/* Hero Background Slideshow */}
        <div className="hero-background">
          {/* Next slide positioned behind (shows through iris) */}
          <div 
            className={`next-slide ${showPreviewBlob ? 'preview' : ''} ${isExpandingBlob ? 'expanding' : ''}`}
            style={{
              '--iris-x': `${irisPosition.x}%`,
              '--iris-y': `${irisPosition.y}%`
            } as React.CSSProperties}
          >
            {slides[(currentSlide + 1) % slides.length]?.backgroundVideo ? (
              <video
                key={`next-${(currentSlide + 1) % slides.length}`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }}
              >
                <source src={slides[(currentSlide + 1) % slides.length].backgroundVideo} type="video/mp4" />
                <img 
                  src={slides[(currentSlide + 1) % slides.length].backgroundImage} 
                  alt=""
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                />
              </video>
            ) : (
              <img 
                key={`next-img-${(currentSlide + 1) % slides.length}`}
                src={slides[(currentSlide + 1) % slides.length]?.backgroundImage} 
                alt=""
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }}
              />
            )}
          </div>

          {/* Current slide */}
          <div className="current-slide">
            {slides[currentSlide]?.backgroundVideo ? (
              <video
                key={`current-${currentSlide}`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }}
              >
                <source src={slides[currentSlide].backgroundVideo} type="video/mp4" />
                <img 
                  src={slides[currentSlide].backgroundImage} 
                  alt=""
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                />
              </video>
            ) : (
              <img 
                key={`current-img-${currentSlide}`}
                src={slides[currentSlide]?.backgroundImage} 
                alt=""
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }}
              />
            )}
          </div>
        </div>

        {/* Navigation arrows */}
        <button 
          className="nav-arrow left"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          ←
        </button>
        <button 
          className="nav-arrow right"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          →
        </button>
      </div>

      {/* Hero Content Overlay */}
      <div style={{
        position: 'relative',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem'
      }}>
        <h1 className="v3-hero-title">
          {slides[currentSlide]?.title}
        </h1>
        {slides[currentSlide]?.subtitle && (
          <p style={{
            fontSize: '1.5rem',
            fontWeight: 'var(--font-weight-regular)',
            marginTop: '1rem',
            opacity: 0.9
          }}>
            {slides[currentSlide].subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
