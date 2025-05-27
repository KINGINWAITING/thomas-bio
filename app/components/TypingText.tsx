'use client'

import { useEffect, useState, useCallback, useMemo } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  startAnimation?: boolean;
}

export function TypingText({ 
  text, 
  className = '', 
  speed = 20, 
  delay = 0,
  onComplete,
  startAnimation = true
}: TypingTextProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  // Memoize the final text to avoid recalculations
  const finalText = useMemo(() => text, [text]);
  
  // Reset when text changes
  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
  }, [finalText]);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Optimized typing animation using requestAnimationFrame for better performance
  useEffect(() => {
    if (!isMounted || !startAnimation || isComplete) return;
    
    let timeoutId: NodeJS.Timeout;
    let rafId: number;
    let startTime: number;
    let currentIndex = 0;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const targetIndex = Math.min(Math.floor(elapsed / speed), finalText.length);
      
      if (targetIndex > currentIndex) {
        currentIndex = targetIndex;
        setDisplayText(finalText.slice(0, currentIndex));
      }
      
      if (currentIndex < finalText.length) {
        rafId = requestAnimationFrame(animate);
      } else {
        setIsComplete(true);
        onComplete?.();
      }
    };
    
    // Start animation after delay
    timeoutId = setTimeout(() => {
      startTime = Date.now();
      rafId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [finalText, speed, delay, isMounted, startAnimation, onComplete, isComplete]);

  // Show nothing during SSR
  if (!isMounted) {
    return <span className={`opacity-0 ${className}`} aria-hidden="true">{finalText}</span>;
  }

  return (
    <span 
      className={`inline-block w-full ${className}`}
      style={{ 
        wordWrap: 'break-word', 
        overflowWrap: 'break-word',
      }}
    >
      {displayText}
      {!isComplete && (
        <span 
          className="inline-block w-[2px] h-[1em] bg-current ml-[1px] animate-pulse"
          style={{ verticalAlign: 'baseline' }}
          aria-hidden="true"
        >
          |
        </span>
      )}
    </span>
  );
}
