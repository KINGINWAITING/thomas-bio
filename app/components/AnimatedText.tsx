'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  waveHeight?: number;
  waveSpeed?: number;
}

export default function AnimatedText({ 
  children, 
  className = '',
  waveHeight = 0.5,
  waveSpeed = 1
}: AnimatedTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const letterSpansRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!textRef.current) return;

    // Only run on client side
    const text = textRef.current.textContent || '';
    const letters = text.split('');
    
    // Clear previous spans
    letterSpansRef.current = [];
    textRef.current.innerHTML = '';

    // Create spans for each letter
    letters.forEach((letter) => {
      const span = document.createElement('span');
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      span.style.display = 'inline-block';
      span.style.position = 'relative';
      span.style.transition = 'transform 0.1s ease-out, opacity 0.1s ease-out';
      textRef.current?.appendChild(span);
      letterSpansRef.current.push(span);
    });

    let animationId: number;
    
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) * 0.001 * waveSpeed;

      letterSpansRef.current.forEach((span, i) => {
        // Create a wave effect with sine wave
        const offset = Math.sin(elapsed * 2 + i * 0.15) * waveHeight;
        const opacity = 0.7 + Math.sin(elapsed * 2 + i * 0.15) * 0.3;
        
        span.style.transform = `translateY(${offset}px)`;
        span.style.opacity = opacity.toString();
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    animationRef.current = animationId;

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [waveHeight, waveSpeed]);

  return (
    <span 
      ref={textRef} 
      className={`inline-block ${className}`}
      suppressHydrationWarning
    >
      {children}
    </span>
  );
}
