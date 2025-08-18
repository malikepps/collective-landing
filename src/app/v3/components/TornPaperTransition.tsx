"use client";

import React from "react";

interface TornPaperTransitionProps {
  className?: string;
}

export default function TornPaperTransition({ className = "" }: TornPaperTransitionProps) {
  return (
    <>
      <style jsx>{`
        .torn-paper-transition {
          position: relative;
          height: 90px;
          width: 100%;
          background: url('/images/torn-paper-texture.png') repeat-x;
          background-size: 2880px 90px;
          mask-image: url('/images/torn-paper-texture.png');
          mask-repeat: repeat-x;
          mask-size: 2880px 90px;
          transition: opacity var(--duration-slow) var(--ease-smooth);
          z-index: 10;
        }
      `}</style>
      
      <div className={`torn-paper-transition ${className}`} />
    </>
  );
}
