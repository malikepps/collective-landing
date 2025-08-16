"use client";

import React from "react";
import Image from "next/image";

  // Clubhouse-style Avatar Animation Interface
  interface Avatar {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    initialDelay: number;
    bounceDelay: number;
    destinationDelay: number;
    bounceDirection: 'left' | 'right';
    bounceOffset: { x: number; y: number; rotate: number };
    finalPosition: { x: number; y: number };
    phase: 'waiting' | 'bouncing' | 'settling' | 'complete' | 'fading';
    groupIndex: number;
    opacity: number;
    transform: string;
  }

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

export default function HomeV2() {
  const [showAvatars] = React.useState(true);
  const [avatars, setAvatars] = React.useState<Avatar[]>([]);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 50, y: 50 });
  
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

  // Helper functions for animation
  const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;
  
  const getCubicBezier = () => {
    const p1 = randomBetween(0.2, 0.3);
    const p2 = randomBetween(0.62, 0.72);
    const p3 = randomBetween(0.51, 0.61);
    return `cubic-bezier(${p1}, ${p2}, ${p3}, 1)`;
  };

  // Stock avatar image URLs (young people)
  const avatarImages: string[] = [
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/65.jpg',
    'https://randomuser.me/api/portraits/men/12.jpg',
    'https://randomuser.me/api/portraits/women/29.jpg',
    'https://randomuser.me/api/portraits/men/28.jpg',
    'https://randomuser.me/api/portraits/women/19.jpg',
    'https://randomuser.me/api/portraits/men/53.jpg',
    'https://randomuser.me/api/portraits/women/15.jpg',
    'https://randomuser.me/api/portraits/men/45.jpg',
    'https://randomuser.me/api/portraits/women/31.jpg',
    'https://randomuser.me/api/portraits/men/21.jpg',
    'https://randomuser.me/api/portraits/women/24.jpg',
    'https://randomuser.me/api/portraits/men/40.jpg',
    'https://randomuser.me/api/portraits/women/52.jpg',
    'https://randomuser.me/api/portraits/men/35.jpg'
  ];

  // Helper function to determine if an avatar should have a metallic border
  const shouldHaveMetallicBorder = (avatarId: number, groupIndex: number) => {
    // Give the first avatar in each group a metallic border
    return avatarId === groupIndex;
  };

  // Window size state for responsive behavior
  const [windowWidth, setWindowWidth] = React.useState(1024);
  const [isClient, setIsClient] = React.useState(false);

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

  // Client-side initialization and event listeners
  React.useEffect(() => {
    // Set client-side flag and initial window width
    setIsClient(true);
    setWindowWidth(window.innerWidth);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close mobile menu when resizing to desktop
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    let animationFrameId: number | null = null;
    // eslint-disable-next-line prefer-const
    let targetPosition = { x: 50, y: 50 };
    // eslint-disable-next-line prefer-const
    let currentPosition = { x: 50, y: 50 };

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate target mouse position as percentage
      targetPosition.x = (e.clientX / window.innerWidth) * 100;
      targetPosition.y = (e.clientY / window.innerHeight) * 100;
    };

    // Smooth animation loop for fluid movement
    const animateGradient = () => {
      // Lerp (linear interpolation) for smooth following
      const lerpFactor = 0.04; // Very smooth liquid-like movement
      currentPosition.x += (targetPosition.x - currentPosition.x) * lerpFactor;
      currentPosition.y += (targetPosition.y - currentPosition.y) * lerpFactor;
      
      setMousePosition({ x: currentPosition.x, y: currentPosition.y });
      animationFrameId = requestAnimationFrame(animateGradient);
    };

    // Start animation loop
    animationFrameId = requestAnimationFrame(animateGradient);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

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

  // Continuous overlapping avatar animation waves
  React.useEffect(() => {
    if (!showAvatars) return;

    const animationIntervals: NodeJS.Timeout[] = [];
    let avatarIdCounter = 0;
    let occupiedAreas: { groupId: number; x1: number; y1: number; x2: number; y2: number }[] = [];

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const baseAvatarSize = Math.max(48, Math.min(96, 64 + (windowWidth / 1920) * 32));
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
    

    const getBounceOffset = (bounceDirection: 'left' | 'right', size: number) => {
      const edgeMargin = Math.max(12, Math.min(50, windowWidth * 0.04));
      const rightEdge = windowWidth - size - edgeMargin;
      const leftEdge = edgeMargin;
      const yPosition = randomBetween(0.4 * windowHeight, 0.6 * windowHeight);
      const rotation = randomBetween(-90, 90);
      
      return {
        x: bounceDirection === 'right' ? rightEdge : leftEdge,
        y: yPosition,
        rotate: rotation
      };
    };

    // Generate random settling point in the bottom third of the screen, avoiding text area and existing groups
    const getRandomSettlingPoint = (groupWidth: number, groupHeight: number) => {
      const isMobile = windowWidth <= 768;
      const margin = Math.max(16, Math.min(150, windowWidth * 0.08));
      const padding = isMobile ? 8 : 16; // smaller gap between groups on mobile

      const minCenterX = margin + groupWidth / 2;
      const maxCenterX = (windowWidth - margin) - groupWidth / 2;

      const bottomThirdMin = windowHeight * (2 / 3);
      const bottomThirdMax = windowHeight - margin;
      const minCenterY = Math.max(bottomThirdMin + groupHeight / 2, margin + groupHeight / 2);
      const maxCenterY = bottomThirdMax - groupHeight / 2;

      // Define text area to avoid (center of screen)
      const textAreaCenterX = windowWidth / 2;
      const textAreaCenterY = windowHeight / 2;
      const textAvoidRadius = isMobile ? Math.min(200, windowHeight * 0.15) : Math.min(300, windowHeight * 0.22);

      let attempts = 0;
      let centerX = minCenterX;
      let centerY = minCenterY;

      const intersects = (
        a: { x1: number; y1: number; x2: number; y2: number },
        b: { x1: number; y1: number; x2: number; y2: number }
      ) => {
        return !(
          a.x2 + padding < b.x1 ||
          a.x1 - padding > b.x2 ||
          a.y2 + padding < b.y1 ||
          a.y1 - padding > b.y2
        );
      };

      // If the space is too tight horizontally/vertically, clamp centers within screen bounds
      const safeMinCenterX = Math.min(minCenterX, Math.max(minCenterX, windowWidth / 2));
      const safeMaxCenterX = Math.max(maxCenterX, Math.min(maxCenterX, windowWidth / 2));
      const safeMinCenterY = Math.min(minCenterY, Math.max(minCenterY, windowHeight * 0.8));
      const safeMaxCenterY = Math.max(maxCenterY, Math.min(maxCenterY, windowHeight * 0.9));

      while (attempts < (isMobile ? 200 : 120)) {
        const minCX = minCenterX <= maxCenterX ? minCenterX : safeMinCenterX;
        const maxCX = minCenterX <= maxCenterX ? maxCenterX : safeMaxCenterX;
        const minCY = minCenterY <= maxCenterY ? minCenterY : safeMinCenterY;
        const maxCY = minCenterY <= maxCenterY ? maxCenterY : safeMaxCenterY;

        centerX = randomBetween(minCX, maxCX);
        centerY = randomBetween(minCY, maxCY);

        const distanceFromText = Math.sqrt(
          Math.pow(centerX - textAreaCenterX, 2) +
          Math.pow(centerY - textAreaCenterY, 2)
        );

        const candidate = {
          x1: centerX - (groupWidth - 0) / 2,
          y1: centerY - (groupHeight - 0) / 2,
          x2: centerX - (groupWidth - 0) / 2 + groupWidth,
          y2: centerY - (groupHeight - 0) / 2 + groupHeight,
        };

        const overlapsExisting = occupiedAreas.some((area) => intersects(candidate, area));

        if (distanceFromText >= textAvoidRadius && !overlapsExisting) break;
        attempts++;
      }

      if (attempts >= (isMobile ? 200 : 120)) return null;
      return { centerX, centerY };
    };

    // Create a single group of avatars
    const createAvatarGroup = (): Avatar[] | null => {
      const isMobile = windowWidth <= 768;
      const avatarsPerGroup = isMobile ? 9 : 5;
      const groupId = avatarIdCounter;
      avatarIdCounter += avatarsPerGroup;

      // Grid formation (precompute to choose a valid center)
      let groupAvatarSize = baseAvatarSize;
      let spacing = groupAvatarSize;
      const gridCols = Math.ceil(Math.sqrt(avatarsPerGroup));
      const gridRows = Math.ceil(avatarsPerGroup / gridCols);
      let gridWidth = (gridCols - 1) * spacing + groupAvatarSize; // include avatar size for full width
      let gridHeight = (gridRows - 1) * spacing + groupAvatarSize; // include avatar size for full height

      // Adjust group size to fit available bottom third area if needed
      const margin = Math.max(16, Math.min(150, windowWidth * 0.08));
      const allowedWidth = (windowWidth - margin * 2);
      const allowedHeight = (windowHeight - margin) - (windowHeight * (2 / 3));
      const scaleFactor = Math.min(
        allowedWidth / gridWidth,
        allowedHeight / gridHeight,
        1
      );
      if (scaleFactor < 1) {
        groupAvatarSize = Math.max(36, groupAvatarSize * scaleFactor);
        spacing = groupAvatarSize;
        gridWidth = (gridCols - 1) * spacing + groupAvatarSize;
        gridHeight = (gridRows - 1) * spacing + groupAvatarSize;
      }

      const settlingPoint = getRandomSettlingPoint(gridWidth, gridHeight);
      if (!settlingPoint) {
        return null; // No valid non-overlapping position found
      }
      const { centerX, centerY } = settlingPoint;
      
      const groupAvatars = Array.from({ length: avatarsPerGroup }, (_, i) => {
        const startX = randomBetween(groupAvatarSize, Math.max(groupAvatarSize + 1, windowWidth - groupAvatarSize));
        const startY = -groupAvatarSize - 50;
        
        const col = i % gridCols;
        const row = Math.floor(i / gridCols);

        const innerGridWidth = (gridCols - 1) * spacing;
        const innerGridHeight = (gridRows - 1) * spacing;
        const finalX = centerX - innerGridWidth / 2 + col * spacing;
        const finalY = centerY - innerGridHeight / 2 + row * spacing;
        
        const initialDelay = randomBetween(0.25, 1) * 1000;
        const bounceDelay = randomBetween(1.5, 4.25) * 1000;
        const destinationDelay = 1.5 * bounceDelay;
        const bounceDirection: 'left' | 'right' = Math.random() > 0.5 ? 'right' : 'left';
        const bounceOffset = getBounceOffset(bounceDirection, groupAvatarSize);

        return {
          id: groupId + i,
          x: startX,
          y: startY,
          size: groupAvatarSize,
          color: colors[(groupId + i) % colors.length],
          initialDelay,
          bounceDelay,
          destinationDelay,
          bounceDirection,
          bounceOffset,
          finalPosition: { x: finalX, y: finalY },
          phase: 'waiting' as const,
          groupIndex: groupId,
          opacity: 1,
          transform: `translate(${startX}px, ${startY}px) rotate(0deg)`
        };
      });

      // Register occupied area for this group to avoid overlaps with future groups
      const area = {
        groupId,
        x1: Math.max(0, centerX - gridWidth / 2),
        y1: Math.max(0, centerY - gridHeight / 2),
        x2: Math.min(windowWidth, centerX - gridWidth / 2 + gridWidth),
        y2: Math.min(windowHeight, centerY - gridHeight / 2 + gridHeight),
      };
      occupiedAreas.push(area);

      return groupAvatars;
    };

    // Animate a single group using React state only
    const animateGroup = (groupAvatars: typeof avatars) => {
      // Add avatars to state
      setAvatars(prev => [...prev, ...groupAvatars]);

      // Start individual avatar animations using state updates
      groupAvatars.forEach((avatar) => {
        // Phase 1: Start bounce after initial delay
        setTimeout(() => {
          setAvatars(prev => prev.map(a => 
            a.id === avatar.id ? { 
              ...a, 
              phase: 'bouncing',
              transform: `translate(${avatar.bounceOffset.x}px, ${avatar.bounceOffset.y}px) rotate(${avatar.bounceOffset.rotate}deg)`
            } : a
          ));

          // Phase 2: Settle to final position
          setTimeout(() => {
            setAvatars(prev => prev.map(a => 
              a.id === avatar.id ? { 
                ...a, 
                phase: 'settling',
                transform: `translate(${avatar.finalPosition.x}px, ${avatar.finalPosition.y}px) rotate(0deg)`
              } : a
            ));

            // Phase 3: Mark as complete
            setTimeout(() => {
              setAvatars(prev => prev.map(a => 
                a.id === avatar.id ? { ...a, phase: 'complete' } : a
              ));
            }, avatar.destinationDelay);
          }, avatar.bounceDelay);
        }, avatar.initialDelay);
      });

      // Set up group fade out using state
      const maxSettleTime = Math.max(...groupAvatars.map(a => 
        a.initialDelay + a.bounceDelay + a.destinationDelay
      ));
      
      setTimeout(() => {
        // Start fade
        setAvatars(prev => prev.map(a => 
          groupAvatars.some(ga => ga.id === a.id) ? { ...a, phase: 'fading', opacity: 0 } : a
        ));
        
        // Remove from state after fade completes
        setTimeout(() => {
          setAvatars(prev => prev.filter(a => !groupAvatars.some(ga => ga.id === a.id)));
          // Free up occupied area for this group
          const groupId = groupAvatars[0]?.groupIndex;
          occupiedAreas = occupiedAreas.filter(area => area.groupId !== groupId);
        }, 1000);
      }, maxSettleTime + 3000);
    };

    // Start continuous animation waves
    const startContinuousAnimation = () => {
      const isMobile = windowWidth <= 768;
      let groupsCreated = 0;

      const createAndAnimateGroup = () => {
        const newGroup = createAvatarGroup();
        if (newGroup) {
          groupsCreated++;
          animateGroup(newGroup);
          console.log(`Mobile group ${groupsCreated} created with ${newGroup.length} avatars`);
        } else {
          console.log(`Failed to create group ${groupsCreated + 1} - no valid position found`);
        }
      };

      // Create initial groups more aggressively on mobile
      if (isMobile) {
        // Create 3 groups with staggered timing
        createAndAnimateGroup(); // First group immediately
        setTimeout(() => createAndAnimateGroup(), 1000); // Second group after 1s
        setTimeout(() => createAndAnimateGroup(), 2000); // Third group after 2s
        
        // Then continue with regular interval
        setTimeout(() => {
          const groupInterval = setInterval(createAndAnimateGroup, 4000);
          animationIntervals.push(groupInterval);
        }, 3000);
      } else {
        // Desktop behavior - start immediately and continue
        createAndAnimateGroup();
        const groupInterval = setInterval(createAndAnimateGroup, 4000);
        animationIntervals.push(groupInterval);
      }
    };

    startContinuousAnimation();

    // Cleanup function
    return () => {
      animationIntervals.forEach(interval => clearInterval(interval));
    };
  }, [showAvatars]);

  return (
    <>
      {/* Patreon-style gradient background */}
      <div 
        className="gradient-background" 
        style={{
          '--mouse-x': mousePosition.x - 50, // Centered at 50%
          '--mouse-y': mousePosition.y - 50  // Centered at 50%
        } as React.CSSProperties}
      />
      
      {/* Header on Top of Hero */}
      <header 
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          right: '20px',
          zIndex: 50,
          transition: 'all 0.3s ease',
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '12px 24px',
          boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : '0 4px 16px rgba(0, 0, 0, 0.05)',
          height: 'auto',
          overflow: 'hidden'
        }}
      >
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          flexDirection: isClient && isMobileMenuOpen && windowWidth <= 768 ? 'column' : 'row',
          gap: isClient && isMobileMenuOpen && windowWidth <= 768 ? '20px' : '0'
        }}>
          {/* Top row - Logo and Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}>
            {/* Left side - Logo */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src="/images/Collective logo v5 White (2).png"
                alt="Collective logo"
                width={120}
                height={32}
                style={{
                  height: '32px',
                  width: 'auto',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
            
            {/* Desktop Navigation - Hidden on mobile */}
            <div style={{ 
              display: isClient && windowWidth <= 768 ? 'none' : 'flex', 
              alignItems: 'center', 
              gap: '32px'
            }}>
              <button style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontFamily: 'inherit',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                opacity: 0.9
              }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.opacity = '1'}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.opacity = '0.9'}
              >
                Nonprofits
              </button>
              <button style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontFamily: 'inherit',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                opacity: 0.9
              }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.opacity = '1'}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.opacity = '0.9'}
              >
                Community
              </button>
              <button style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontFamily: 'inherit',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                opacity: 0.9
              }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.opacity = '1'}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.opacity = '0.9'}
              >
                Contact
              </button>
              
              {/* Get Early Access Button */}
              <a href="#" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#374151',
                cursor: 'pointer'
              }}>
                Get early access
              </a>
            </div>

            {/* Mobile Menu Toggle - Only visible on mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: isClient && windowWidth <= 768 ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                opacity: 0.9
              }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.opacity = '1'}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.opacity = '0.9'}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: isMobileMenuOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              >
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu - Only visible when expanded */}
          {isClient && isMobileMenuOpen && windowWidth <= 768 && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              width: '100%',
              paddingTop: '8px',
              animation: 'slideDown 0.3s ease-out'
            }}>
              <button style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontFamily: 'inherit',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                opacity: 0.9,
                padding: '8px 16px'
              }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.opacity = '1'}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.opacity = '0.9'}
              onClick={() => setIsMobileMenuOpen(false)}
              >
                Nonprofits
              </button>
              <button style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontFamily: 'inherit',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                opacity: 0.9,
                padding: '8px 16px'
              }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.opacity = '1'}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.opacity = '0.9'}
              onClick={() => setIsMobileMenuOpen(false)}
              >
                Community
              </button>
              <button style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontFamily: 'inherit',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                opacity: 0.9,
                padding: '8px 16px'
              }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.opacity = '1'}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.opacity = '0.9'}
              onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </button>
              
              {/* Mobile Get Early Access Button */}
              <a href="#" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontWeight: '600',
                fontSize: '16px',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#374151',
                cursor: 'pointer',
                marginTop: '8px'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
              >
                Get early access
              </a>
            </div>
          )}
        </nav>
      </header>
      
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
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
        
        body, html {
          margin: 0;
          padding: 0;
          background: #0f766e; /* Exact color from original page "Build your community" section */
          position: relative;
          overflow-x: hidden;
        }
        
        /* Liquid-like moving gradient background */
        .gradient-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
          background: 
            radial-gradient(ellipse at 20% 80%, rgba(15, 118, 110, 0.6) 0%, rgba(13, 148, 136, 0.4) 35%, transparent 65%),
            radial-gradient(circle at 80% 20%, rgba(5, 150, 105, 0.5) 0%, rgba(17, 94, 89, 0.6) 40%, transparent 70%),
            radial-gradient(ellipse at 40% 40%, rgba(20, 184, 166, 0.4) 0%, rgba(15, 118, 110, 0.5) 30%, transparent 60%),
            linear-gradient(135deg, #0f766e 0%, #134e4a 100%);
          background-size: 250% 250%, 200% 200%, 220% 220%, 100% 100%;
          animation: liquidFlow 18s ease-in-out infinite;
        }
        
        .gradient-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url(/noise-light.png);
          background-size: 100px 100px;
          background-repeat: repeat;
          opacity: 0.4;
          mix-blend-mode: overlay;
        }
        
        .gradient-background::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(ellipse at var(--mouse-x, 50)% var(--mouse-y, 50)%, rgba(255, 255, 255, 0.03) 0%, transparent 60%),
            radial-gradient(circle at calc(var(--mouse-x, 50)% + 30%) calc(var(--mouse-y, 50)% - 20%), rgba(15, 118, 110, 0.4) 0%, transparent 40%);
          background-size: 100% 100%, 80% 80%;
          transition: background-position 0.8s cubic-bezier(0.23, 1, 0.320, 1);
        }
        
        @keyframes liquidFlow {
          0%, 100% {
            background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%;
            background-size: 250% 250%, 200% 200%, 220% 220%, 100% 100%;
          }
          33% {
            background-position: 70% 30%, 20% 80%, 80% 20%, 0% 0%;
            background-size: 280% 220%, 240% 180%, 200% 250%, 100% 100%;
          }
          66% {
            background-position: 100% 100%, 0% 0%, 30% 70%, 0% 0%;
            background-size: 220% 280%, 180% 240%, 250% 200%, 100% 100%;
          }
        }
        
        @keyframes gradientShift_old {
          0%, 100% {
            background-size: 200% 200%;
            background-position: 0% 50%;
          }
          50% {
            background-size: 250% 250%;
            background-position: 100% 50%;
          }
        }
        
        .arc-hero-title {
          font-family: "ABC Whyte", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif !important;
          font-size: 3rem !important;
          font-weight: 300 !important;
          line-height: 0.975em !important;
          letter-spacing: -0.05em !important;
          text-align: center !important;
          max-width: 90vw !important;
          color: white !important;
        }
        
        @media screen and (min-width: 30em) {
          .arc-hero-title {
            font-size: 5rem !important;
            line-height: 4.5rem !important;
            max-width: 800px !important;
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .glow-text {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 
                       0 0 20px rgba(255, 255, 255, 0.6), 
                       0 0 30px rgba(255, 255, 255, 0.4);
        }
        
        /* Metallic border for special avatars */
        .avatar-metallic-border {
          position: relative;
        }
        
        .avatar-metallic-border::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 24%;
          background: linear-gradient(135deg, #ea580c 0%, #fb923c 50%, #ea580c 100%);
          z-index: 1;
          pointer-events: none;
        }
        
        .avatar-metallic-border img {
          position: relative;
          z-index: 2;
          width: calc(100% - 8px) !important;
          height: calc(100% - 8px) !important;
          margin: 4px;
          border-radius: 20%;
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

        /* Hero frame styles */
        .hero-frame {
          overflow: hidden;
          margin: 0;
        }

        @media screen and (max-width: 767px) {
          .hero-frame {
            margin: 0;
          }
          /* Position hero content at 1/3 down on mobile */
          .hero-content {
            justify-content: flex-start !important;
            padding-top: calc(33vh - 4rem) !important;
            padding-bottom: 2rem !important;
            min-height: 100vh !important;
          }
        }
      `}</style>
      
      <main style={{ 
        margin: 0, 
        padding: '0', 
        backgroundColor: 'transparent', /* Transparent to show gradient */
        minHeight: '100vh',
        position: 'relative',
        zIndex: 10
      }}>

      {/* Page 1 - Hero Section with Full Viewport */}
      <section id="page-1" className="page-section" style={{
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
        <div className="hero-frame" style={{
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
            
          {/* Enhanced Noise overlay - Sonido inspired */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/noise-light.png)',
            opacity: 0.6, /* Increased opacity for more Sonido-like effect */
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
            background: `rgba(0, 0, 0, 0.1)`, /* Slight dark overlay */
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

          <div className="hero-content" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            padding: '0',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            minHeight: '100%',
            position: 'relative',
            zIndex: 30
          }}>
          {/* Give back to TOP LEFT corner - positioned relative to hero section */}
          <div style={{
            position: 'absolute',
            top: isClient && windowWidth <= 768 ? 'auto' : '120px',
            bottom: isClient && windowWidth <= 768 ? '200px' : 'auto',
            left: isClient && windowWidth <= 768 ? '20px' : '40px',
            zIndex: 100
          }}>
            <h1 style={{
              fontFamily: '"ABC Whyte", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
              fontSize: 'clamp(4.5rem, 11vw, 12rem)',
              fontWeight: '300',
              lineHeight: '0.8',
              letterSpacing: '-0.03em',
              color: 'white',
              margin: 0,
              whiteSpace: 'nowrap',
              textAlign: 'left'
            }}>
              Give <span style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 255, 255, 0.6), 0 0 90px rgba(255, 255, 255, 0.4)'
              }}>back</span>
            </h1>
          </div>

          {/* to your supporters to BOTTOM RIGHT corner - positioned relative to hero section */}
          <div style={{
            position: 'absolute',
            bottom: isClient && windowWidth <= 768 ? '60px' : '80px',
            right: isClient && windowWidth <= 768 ? '20px' : '40px',
            zIndex: 100
          }}>
            <h1 style={{
              fontFamily: '"ABC Whyte", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
              fontSize: 'clamp(4.5rem, 11vw, 12rem)',
              fontWeight: '300',
              lineHeight: '0.8',
              letterSpacing: '-0.03em',
              color: 'white',
              margin: 0,
              textAlign: 'right'
            }}>
              to your donors
            </h1>
          </div>
        </div>
        </div>

      </section>

      {/* Benefits Section - Collective is for... - Updated with gradient background */}
      <section className="benefits-section" style={{
        position: 'relative',
        backgroundColor: 'transparent', /* Transparent to show gradient */
        backgroundImage: 'none',
        minHeight: '300vh', // 3 full viewport heights for 3 benefits
        scrollSnapType: 'y mandatory',
        overflowY: 'scroll',
        padding: '0'
      }}>
        {/* Benefit 1: Storytelling - Hero-inspired design */}
        <div style={{
          height: isClient && windowWidth <= 768 ? 'auto' : '100vh',
          minHeight: isClient && windowWidth <= 768 ? 'auto' : 'auto',
          display: isClient && windowWidth <= 768 ? 'block' : 'flex',
          position: 'relative',
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
          overflow: 'hidden',
          paddingTop: isClient && windowWidth <= 768 ? '60px' : '0',
          paddingBottom: isClient && windowWidth <= 768 ? '40px' : '0'
        }}>
          {/* Desktop layout - "Collective is for storytelling" - Top Left Corner */}
          <div style={{
            position: 'absolute',
            top: isClient && windowWidth <= 768 ? '40px' : '80px',
            left: isClient && windowWidth <= 768 ? '20px' : '40px',
            zIndex: 30,
            display: isClient && windowWidth <= 768 ? 'none' : 'block'
          }}>
            <h2 style={{
              fontFamily: '"ABC Whyte", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              fontWeight: '300',
              lineHeight: '0.9',
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: 0,
              textAlign: 'left'
            }}>
              Collective is for<br />
              <span style={{
                background: 'linear-gradient(135deg, #f4e4c2 0%, #e6d3ab 25%, #f7e9c7 50%, #e8d5ae 75%, #f4e4c2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 2px 4px rgba(212, 184, 150, 0.3)'
              }}>
                storytelling
              </span>
            </h2>
          </div>

          {/* Desktop layout - Subtext in the middle */}
          <div style={{
            position: 'absolute',
            left: isClient && windowWidth <= 768 ? '20px' : '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 35,
            maxWidth: isClient && windowWidth <= 768 ? '280px' : '350px',
            display: isClient && windowWidth <= 768 ? 'none' : 'block'
          }}>
            <p style={{
              fontFamily: '"ABC Whyte", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: '400',
              color: '#ffffff',
              margin: 0,
              lineHeight: '1.5'
            }}>
              Use your existing content to deliver your story to the correct audience, every time.
            </p>
          </div>

          {/* Mobile layout - Full width title and subtext */}
          <div style={{
            position: 'relative',
            left: '20px',
            right: '20px',
            zIndex: 30,
            display: isClient && windowWidth <= 768 ? 'block' : 'none',
            marginBottom: '40px',
            marginLeft: '20px',
            marginRight: '20px'
          }}>
            <h2 style={{
              fontFamily: '"ABC Whyte", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
              fontSize: 'clamp(3rem, 12vw, 5rem)',
              fontWeight: '300',
              lineHeight: '0.9',
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: 0,
              marginBottom: '1.5rem',
              textAlign: 'left'
            }}>
              Collective is for<br />
              <span style={{
                background: 'linear-gradient(135deg, #f4e4c2 0%, #e6d3ab 25%, #f7e9c7 50%, #e8d5ae 75%, #f4e4c2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 2px 4px rgba(212, 184, 150, 0.3)'
              }}>
                storytelling
              </span>
            </h2>
            
            <p style={{
              fontFamily: '"ABC Whyte", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
              fontSize: '1.25rem',
              fontWeight: '400',
              color: '#ffffff',
              margin: 0,
              lineHeight: '1.5'
            }}>
              Use your existing content to deliver your story to the correct audience, every time.
            </p>
          </div>
          
          {/* Video placeholder - responsive sizing */}
          <div style={{
            position: isClient && windowWidth <= 768 ? 'relative' : 'absolute',
            right: isClient && windowWidth <= 768 ? 'auto' : '-10%',
            top: isClient && windowWidth <= 768 ? 'auto' : '60%',
            transform: isClient && windowWidth <= 768 ? 'none' : 'translateY(-50%)',
            width: isClient && windowWidth <= 768 ? 'calc(100% - 40px)' : '75%',
            maxWidth: 'none',
            aspectRatio: '16/9',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: isClient && windowWidth <= 768 ? '1.5rem' : '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.7)',
            fontFamily: '"ABC Whyte", sans-serif',
            fontWeight: '400',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            zIndex: 20,
            marginLeft: isClient && windowWidth <= 768 ? '20px' : 'auto',
            marginRight: isClient && windowWidth <= 768 ? '20px' : 'auto'
          }}>
            Video Placeholder - Storytelling Demo
          </div>
        </div>

        {/* Benefit 2: Connection - Photo background with editorial layout */}
        <div style={{
          height: isClient && windowWidth <= 768 ? 'auto' : '100vh',
          minHeight: isClient && windowWidth <= 768 ? 'auto' : 'auto',
          display: isClient && windowWidth <= 768 ? 'block' : 'flex',
          position: 'relative',
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
          overflow: 'hidden',
          backgroundImage: `url(/images/backgrounds/1753042972770_292dcb70-c0f1-4708-a908-1eb76c1c4673.jpeg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          paddingTop: isClient && windowWidth <= 768 ? '60px' : '0',
          paddingBottom: isClient && windowWidth <= 768 ? '40px' : '0'
        }}>
          {/* Dark overlay for text readability */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.4)',
            zIndex: 10
          }} />
          
          {/* Desktop layout - Large phone on the left side */}
          <div style={{
            position: 'absolute',
            left: isClient && windowWidth <= 768 ? '40px' : '80px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: isClient && windowWidth <= 768 ? '250px' : '400px',
            height: isClient && windowWidth <= 768 ? '500px' : '800px',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderRadius: '4rem',
            display: isClient && windowWidth <= 768 ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.7)',
            fontFamily: '"ABC Whyte", sans-serif',
            fontWeight: '400',
            boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
            border: '6px solid #333',
            zIndex: 20,
            flexDirection: 'column',
            gap: '1rem',
            textAlign: 'center',
            padding: '3rem 2rem'
          }}>
            {/* Phone screen bezel */}
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '8px',
              backgroundColor: '#555',
              borderRadius: '4px'
            }} />
            
            {/* Phone screen content */}
            <div style={{
              width: '100%',
              height: '85%',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              📱 Connection Demo
            </div>
          </div>

          {/* Desktop layout - Text content on the right side, bottom half */}
          <div style={{
            position: 'absolute',
            right: isClient && windowWidth <= 768 ? '20px' : '40px',
            bottom: isClient && windowWidth <= 768 ? '60px' : '80px',
            zIndex: 30,
            maxWidth: isClient && windowWidth <= 768 ? 'calc(100vw - 290px)' : 'calc(100vw - 520px)',
            width: isClient && windowWidth <= 768 ? 'calc(100vw - 290px)' : 'calc(100vw - 520px)',
            textAlign: 'right',
            display: isClient && windowWidth <= 768 ? 'none' : 'block'
          }}>
            <h2 style={{
              fontFamily: '"ABC Whyte", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              fontWeight: '300',
              lineHeight: '0.9',
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: 0,
              marginBottom: '1.5rem'
            }}>
              Collective is for<br />
              <span style={{
                background: 'linear-gradient(135deg, #f4e4c2 0%, #e6d3ab 25%, #f7e9c7 50%, #e8d5ae 75%, #f4e4c2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 2px 4px rgba(212, 184, 150, 0.3)'
              }}>
                connection
              </span>
            </h2>
            
            <p style={{
              fontFamily: '"ABC Whyte", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: '400',
              color: '#ffffff',
              margin: 0,
              lineHeight: '1.5'
            }}>
              Build meaningful relationships and foster genuine community engagement through direct connection.
            </p>
          </div>

          {/* Mobile layout - Full width title and subtext */}
          <div style={{
            position: 'relative',
            left: '20px',
            right: '20px',
            zIndex: 30,
            display: isClient && windowWidth <= 768 ? 'block' : 'none',
            marginBottom: '40px',
            marginLeft: '20px',
            marginRight: '20px'
          }}>
            <h2 style={{
              fontFamily: '"ABC Whyte", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
              fontSize: 'clamp(3rem, 12vw, 5rem)',
              fontWeight: '300',
              lineHeight: '0.9',
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: 0,
              marginBottom: '1.5rem',
              textAlign: 'left'
            }}>
              Collective is for<br />
              <span style={{
                background: 'linear-gradient(135deg, #f4e4c2 0%, #e6d3ab 25%, #f7e9c7 50%, #e8d5ae 75%, #f4e4c2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 2px 4px rgba(212, 184, 150, 0.3)'
              }}>
                connection
              </span>
            </h2>
            
            <p style={{
              fontFamily: '"ABC Whyte", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
              fontSize: '1.25rem',
              fontWeight: '400',
              color: '#ffffff',
              margin: 0,
              lineHeight: '1.5'
            }}>
              Build meaningful relationships and foster genuine community engagement through direct connection.
            </p>
          </div>

          {/* Mobile layout - Larger phone centered */}
          <div style={{
            position: isClient && windowWidth <= 768 ? 'relative' : 'absolute',
            left: isClient && windowWidth <= 768 ? 'auto' : '50%',
            bottom: isClient && windowWidth <= 768 ? 'auto' : '60px',
            transform: isClient && windowWidth <= 768 ? 'none' : 'translateX(-50%)',
            width: '280px',
            height: '560px',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderRadius: '4rem',
            display: isClient && windowWidth <= 768 ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.7)',
            fontFamily: '"ABC Whyte", sans-serif',
            fontWeight: '400',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            border: '6px solid #333',
            zIndex: 20,
            flexDirection: 'column',
            gap: '1rem',
            textAlign: 'center',
            padding: '3rem 2rem',
            margin: isClient && windowWidth <= 768 ? '0 auto' : '0'
          }}>
            {/* Phone screen bezel */}
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '8px',
              backgroundColor: '#555',
              borderRadius: '4px'
            }} />
            
            {/* Phone screen content */}
            <div style={{
              width: '100%',
              height: '85%',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              📱 Connection Demo
            </div>
          </div>
        </div>

        {/* Benefit 3: Growth */}
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always'
        }}>
          <div style={{
            maxWidth: '900px',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontFamily: '"ABC Whyte", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: '500',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              color: '#ffffff',
              margin: 0,
              marginBottom: '1rem'
            }}>
              Collective is for<br />Growth
            </h2>
            <p style={{
              fontFamily: '"ABC Whyte", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0,
              lineHeight: '1.5'
            }}>
              Scale your impact and grow your community with data-driven insights
            </p>
          </div>
          
          {/* Video placeholder with squircle corners */}
          <div style={{
            width: '90%',
            maxWidth: '1100px',
            aspectRatio: '16/9',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: '#64748b',
            fontFamily: '"ABC Whyte", sans-serif',
            fontWeight: '500',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            Video Placeholder - Growth Demo
          </div>
        </div>
      </section>

      {/* Page 2 - Build Your Community with Avatar Animation - Updated with gradient background */}
      <section id="page-2" className="page-section" style={{
        backgroundColor: 'transparent', /* Transparent to show gradient */
        backgroundImage: 'none',
        color: '#FFFADD',
        overflow: 'hidden',
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        WebkitFontSmoothing: 'antialiased',
        position: 'relative',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <h1 style={{
            fontFamily: '"ABC Whyte", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
            fontSize: '3rem',
            fontWeight: '700',
            lineHeight: '0.975em',
            letterSpacing: '-0.05em',
            textAlign: 'center',
            maxWidth: '90vw',
            marginBottom: '2rem',
            color: '#2d3748'
          }}>
            Build Your Community
          </h1>
          <p style={{
            fontSize: '1.25rem',
            opacity: 0.8,
            maxWidth: '600px',
            lineHeight: '1.6'
          }}>
            Create meaningful connections and give back to your supporters with Collective&apos;s powerful community tools.
          </p>
        </div>

        {/* Clubhouse-style Avatar Animation */}
        {showAvatars && avatars.map(avatar => {
          let transition = 'none';
          if (avatar.phase === 'bouncing') {
            transition = `transform ${avatar.bounceDelay / 1000}s linear`;
          } else if (avatar.phase === 'settling') {
            transition = `transform ${avatar.destinationDelay / 1000}s ${getCubicBezier()}`;
          } else if (avatar.phase === 'fading') {
            transition = 'opacity 1s ease-out';
          }

          const hasMetallicBorder = shouldHaveMetallicBorder(avatar.id, avatar.groupIndex);

          return (
            <div
              key={avatar.id}
              className={hasMetallicBorder ? 'avatar-metallic-border' : ''}
              style={{
                position: 'absolute',
                left: '0px',
                top: '0px',
                width: `${avatar.size}px`,
                height: `${avatar.size}px`,
                overflow: 'hidden',
                borderRadius: '24%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ddd',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                zIndex: 10,
                transform: avatar.transform,
                opacity: avatar.opacity,
                transition,
                willChange: 'transform, opacity',
                pointerEvents: 'none'
              }}
            >
              <Image
                src={avatarImages[avatar.id % avatarImages.length]}
                alt="avatar"
                fill
                style={{ objectFit: 'cover' }}
                loading="eager"
                unoptimized
              />
            </div>
          );
        })}
      </section>
    </main>
    </>
  );
}
