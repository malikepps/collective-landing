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

interface HeroSlideshowBackgroundProps {
  className?: string;
}

export default function HeroSlideshowBackground({ className = "" }: HeroSlideshowBackgroundProps) {
  // Hero slideshow state
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [showPreviewBlob, setShowPreviewBlob] = React.useState(false);
  const [isExpandingBlob, setIsExpandingBlob] = React.useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const [slideTimer, setSlideTimer] = React.useState<NodeJS.Timeout | null>(null);
  const [previewTimer, setPreviewTimer] = React.useState<NodeJS.Timeout | null>(null);
  const [irisPosition, setIrisPosition] = React.useState({ x: 85, y: 50 });

  // Hero slides data using splash folder assets
  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      title: "Give back to your supporters",
      subtitle: "Transform your community into a force for good",
      backgroundImage: "/splash/05acb9d4-9bed-4785-8e77-af73c9d22e1b.jpg",
      overlayOpacity: 0,
      textPosition: 'center'
    },
    {
      id: 2,
      title: "Build meaningful connections",
      subtitle: "Create lasting impact with your community",
      backgroundImage: "/splash/1753149175358_d0770dae-1906-4591-a031-45f2b01c0062.webp",
      backgroundVideo: "/splash/1753043057334_b8a29dab-bc3b-4e4d-93fd-b31ccfe152ab.mp4",
      overlayOpacity: 0,
      textPosition: 'center'
    },
    {
      id: 3,
      title: "Empower your supporters",
      subtitle: "Turn passion into positive change",
      backgroundImage: "/splash/1754509929485_188f11af-22ed-4502-8a41-58edb07946b1.webp",
      overlayOpacity: 0,
      textPosition: 'center'
    },
    {
      id: 4,
      title: "Make every contribution count",
      subtitle: "Revolutionary community platform",
      backgroundImage: "/splash/05acb9d4-9bed-4785-8e77-af73c9d22e1b.jpg",
      overlayOpacity: 0,
      textPosition: 'center'
    }
  ];

  // Generate random iris position for cinematic effect
  const generateRandomIrisPosition = () => {
    // Keep it within reasonable bounds for good visual effect
    const x = Math.random() * 60 + 20; // 20% to 80% from left
    const y = Math.random() * 60 + 20; // 20% to 80% from top
    return { x, y };
  };

  // Slideshow navigation functions
  const nextSlide = () => {
    const newPosition = generateRandomIrisPosition();
    setIrisPosition(newPosition);
    // Keep same slide, just change background
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    resetSlideTimers();
  };

  const prevSlide = () => {
    const newPosition = generateRandomIrisPosition();
    setIrisPosition(newPosition);
    // Keep same slide, just change background
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
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
        // Set iris position when showing preview
        const newPosition = generateRandomIrisPosition();
        setIrisPosition(newPosition);
        setShowPreviewBlob(true);
      }, 4000);
      setPreviewTimer(newPreviewTimer);
      
      // Auto advance at 6.5 seconds (with iris expansion)
      const newSlideTimer = setTimeout(() => {
        // Start iris expansion after a brief moment to let users see the preview
        setTimeout(() => {
          setIsExpandingBlob(true);
          
          // Change slide after expansion completes
          setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
            setIsExpandingBlob(false);
            setShowPreviewBlob(false);
          }, 2200); // Match expansion animation duration (2.2s)
        }, 800); // Longer pause to appreciate the iris preview
      }, 6500);
      setSlideTimer(newSlideTimer);
    }
  };

  // Initialize slideshow timers
  React.useEffect(() => {
    resetSlideTimers();
    
    return () => {
      if (slideTimer) clearTimeout(slideTimer);
      if (previewTimer) clearTimeout(previewTimer);
    };
  }, [currentSlide, isAutoPlaying]);

  // Pause auto-play temporarily when user interacts
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10 seconds
  };

  return (
    <div className={`hero-slideshow-background ${className}`}>
      <style jsx>{`
        .hero-slideshow-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          overflow: hidden;
        }

        /* Hero slideshow styles */
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
      `}</style>
      
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
          {heroSlides[(currentSlide + 1) % heroSlides.length]?.backgroundVideo ? (
            <video
              key={`next-${(currentSlide + 1) % heroSlides.length}`}
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
              <source src={heroSlides[(currentSlide + 1) % heroSlides.length].backgroundVideo} type="video/mp4" />
              <img 
                src={heroSlides[(currentSlide + 1) % heroSlides.length].backgroundImage} 
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
              key={`next-img-${(currentSlide + 1) % heroSlides.length}`}
              src={heroSlides[(currentSlide + 1) % heroSlides.length]?.backgroundImage} 
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
          {heroSlides[currentSlide]?.backgroundVideo ? (
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
              <source src={heroSlides[currentSlide].backgroundVideo} type="video/mp4" />
              <img 
                src={heroSlides[currentSlide].backgroundImage} 
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
              src={heroSlides[currentSlide]?.backgroundImage} 
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
        
      {/* Grain overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/noise-light.png)',
        opacity: 0.4,
        mixBlendMode: 'overlay',
        pointerEvents: 'none',
        zIndex: 4
      }} />
      
      {/* Dark overlay for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `rgba(0, 0, 0, 0)`,
        zIndex: 20,
        pointerEvents: 'none'
      }} />

      {/* Navigation Arrows */}
      <button 
        className="nav-arrow left"
        onClick={() => {
          prevSlide();
          pauseAutoPlay();
        }}
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>
      
      <button 
        className="nav-arrow right"
        onClick={() => {
          nextSlide();
          pauseAutoPlay();
        }}
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </button>
    </div>
  );
}
