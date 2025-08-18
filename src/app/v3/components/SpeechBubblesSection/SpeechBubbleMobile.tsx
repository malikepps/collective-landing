'use client';

import { SpeechBubbleData } from './speechBubbleData';

interface SpeechBubbleMobileProps {
  bubble: SpeechBubbleData;
  className?: string;
  scrollProgress?: number;
  bubbleIndex?: number;
}

export default function SpeechBubbleMobile({ bubble, className = '', scrollProgress = 0, bubbleIndex = 0 }: SpeechBubbleMobileProps) {
  // Calculate sequential animation timing - each bubble animates one by one
  const animationDelay = bubbleIndex * 0.15; // 150ms delay between each bubble
  const adjustedProgress = Math.max(0, Math.min(1, (scrollProgress - animationDelay) * 1.5)); // Individual timing, slightly slower
  
  // Mobile animation: slight upward float with rotation using transform
  const mobileAnimationY = adjustedProgress * -20; // Move up 20px
  
  // Give each bubble a unique rotation target based on its index
  const rotationTargets = [-3, 2, -1, 3, -2, 1]; // Different rotation for each bubble
  const targetRotation = rotationTargets[bubbleIndex] || 0;
  const mobileAnimationRotation = adjustedProgress * targetRotation; // Animate from 0 to target rotation
  
  return (
    <div 
      className={`animation-container ${className}`}
      style={{
        position: 'absolute',
        left: `${bubble.position.mobile.left}px`,
        top: `${bubble.position.mobile.top}px`, // Keep original position
        width: '347px',  // Updated to match smaller mobile bubble width
        height: '80px',  // Updated to match smaller mobile bubble height
        zIndex: 1,
        transform: `translateY(${mobileAnimationY}px) rotate(${mobileAnimationRotation}deg) scale(${1 + adjustedProgress * 0.05})`, // Start flat (0deg) and animate to target rotation
        opacity: 1,
        transition: 'transform 0.2s ease-out' // Only animate transform
      }}
    >
      <div
        className="rmwidget widget-shape div-instead-of-svg"
        style={{
          left: '0px',
          top: '0px',
          width: '347px',  // 386px × 0.9 = ~347px (reduced by 10%)
          height: '80px',  // 89px × 0.9 = ~80px (reduced by 10%)
          zIndex: 360,
          backgroundColor: 'rgb(98, 103, 231)',
          borderColor: 'rgb(0, 0, 0)',
          borderRadius: '20px',  // 22px × 0.9 = ~20px
          borderStyle: 'solid',
          borderWidth: '2px',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        {/* Avatar - PUSHED UP AND LEFT to align perfectly with bubble edges */}
        <div
          style={{
            position: 'absolute',
            left: '-2px',   // Push left by 2px to account for border
            top: '-2px',    // Push up by 2px to account for border
            width: '80px',  // 89px × 0.9 = ~80px (reduced by 10%)
            height: '80px', // Same height as bubble
            zIndex: 361,
            borderRadius: '20px',  // 22px × 0.9 = ~20px
            backgroundImage: `url("${bubble.avatar}")`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            boxShadow: 'rgb(0, 0, 0) 0px 0px 0px 2px inset',
            opacity: 1
          }}
        />

        {/* Text Content - CENTERED VERTICALLY */}
        <div
          style={{
            position: 'absolute',
            left: '84px',  // 80px avatar + 4px margin = 84px
            top: '50%',    // Center vertically
            transform: 'translateY(-50%)', // Perfect vertical centering
            width: '248px', // 347 - 84 - 15 = 248px
            height: 'auto', // Auto height for better text flow
            zIndex: 362
          }}
        >
          <div style={{ width: '100%', height: '100%' }}>
            <div>
              <p
                style={{
                  fontFamily: 'inherit',
                  fontWeight: 400,
                  fontSize: '17px',  // Slightly reduced from 19px
                  lineHeight: '20px', // Slightly reduced from 22px
                  color: 'rgba(255, 255, 255, 1)',
                  margin: 0,
                  padding: 0
                }}
              >
                {bubble.message}
              </p>
            </div>
          </div>
        </div>

        {/* Author/Location - HIDDEN ON MOBILE */}
        <div
          style={{
            display: 'none' // Hide speaker names on mobile
          }}
        >
          <div style={{ width: '100%', height: '100%' }}>
            <div>
              <p
                style={{
                  fontFamily: 'inherit',
                  fontWeight: 400,
                  fontSize: '17px',
                  lineHeight: '19px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  margin: 0,
                  padding: 0
                }}
              >
                {bubble.author} from {bubble.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
