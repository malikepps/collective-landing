"use client";

import React from "react";

interface NarrativeSectionProps {
  title: string;
  content: string;
  className?: string;
}

export default function NarrativeSection({ title, content, className = "" }: NarrativeSectionProps) {
  return (
    <section className={`v3-section v3-section-teal ${className}`}>
      <div style={{
        maxWidth: '800px',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 'var(--font-size-h1)',
          fontWeight: 'var(--font-weight-light)',
          marginBottom: '2rem',
          lineHeight: '1.2'
        }}>
          {title}
        </h2>
        <p style={{
          fontSize: 'var(--font-size-body)',
          lineHeight: '1.6',
          opacity: 0.9
        }}>
          {content}
        </p>
      </div>
    </section>
  );
}
