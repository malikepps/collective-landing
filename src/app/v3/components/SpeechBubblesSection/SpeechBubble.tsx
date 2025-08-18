'use client';

import { SpeechBubbleData } from './speechBubbleData';

interface SpeechBubbleProps {
  bubble: SpeechBubbleData;
  className?: string;
  scrollProgress?: number;
}

export default function SpeechBubble({ bubble, className = '', scrollProgress = 0 }: SpeechBubbleProps) {
  // Calculate offset-distance and rotation based on scroll progress
  const offsetDistance = bubble.animationPath ? `${scrollProgress * 100}%` : '0px';
  
  // Calculate rotation based on scroll progress and defined path rotation
  const pathRotation = bubble.pathRotation ? scrollProgress * bubble.pathRotation : 0;
  const totalRotation = (bubble.position.desktop.rotation || 0) + pathRotation;
  
  return (
    <div 
      className={`animation-container ${className}`}
      style={{
        position: 'absolute',
        left: `${bubble.position.desktop.left}px`,
        top: `${bubble.position.desktop.top}px`,
        width: '430px',  // Updated to match bubble width
        height: '83px',  // Updated to match bubble height
        zIndex: 1,
        offsetPath: bubble.animationPath ? `path("${bubble.animationPath}")` : undefined,
        offsetRotate: '0deg', // Let CSS handle rotation naturally along path
        offsetDistance: offsetDistance, // Controlled by scroll progress
        transform: `rotate(${totalRotation}deg) scale(1)`,
        opacity: 1,
        transition: 'offset-distance 0.15s ease-out, transform 0.15s ease-out' // Faster, snappier
      }}
    >
      <div
        className="rmwidget widget-shape div-instead-of-svg"
        style={{
          left: '0px',
          top: '0px',
          width: '430px',  // 374px × 1.15 = ~430px
          height: '83px',  // 72px × 1.15 = ~83px
          zIndex: 311,
          backgroundColor: 'rgb(98, 103, 231)',
          borderColor: 'rgb(0, 0, 0)',
          borderRadius: '18px',  // 16px × 1.15 = ~18px
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
            width: '83px',  // 72px × 1.15 = ~83px
            height: '83px', // Same height as bubble
            zIndex: 312,
            borderRadius: '18px',  // 16px × 1.15 = ~18px
            backgroundImage: `url("${bubble.avatar}")`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            boxShadow: 'rgb(0, 0, 0) 0px 0px 0px 2px inset',
            opacity: 1
          }}
        />

        {/* Text Content */}
        <div
          style={{
            position: 'absolute',
            left: '87px',  // 83px avatar + 4px margin = 87px
            top: '16px',   // Scaled proportionally
            width: '327px', // 430 - 87 - 16 = 327px
            height: '46px', // Scaled proportionally
            zIndex: 313
          }}
        >
          <div style={{ width: '100%', height: '100%' }}>
            <div>
              <p
                style={{
                  fontFamily: 'inherit',
                  fontWeight: 400,
                  fontSize: '18px',  // Scaled up from 16px
                  lineHeight: '23px', // Scaled up from 20px
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

        {/* Author/Location */}
        <div
          style={{
            position: 'absolute',
            left: '92px',  // Adjusted for larger bubble
            top: '41px',   // Scaled proportionally
            width: '322px', // Adjusted for larger bubble
            height: '21px', // Scaled proportionally
            zIndex: 314
          }}
        >
          <div style={{ width: '100%', height: '100%' }}>
            <div>
              <p
                style={{
                  fontFamily: 'inherit',
                  fontWeight: 400,
                  fontSize: '16px',  // Scaled up from 14px
                  lineHeight: '21px', // Scaled up from 18px
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
