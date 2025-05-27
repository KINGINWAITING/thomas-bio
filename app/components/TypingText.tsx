'use client'

import { useEffect, useState, useRef, useCallback } from 'react';

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
  speed = 50, // Default to 50ms per character for smooth animation
  delay = 0,
  onComplete,
  startAnimation = true
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const completeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Reset animation when text changes or startAnimation changes
  useEffect(() => {
    // Clear any existing timers
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current);
    if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);
    
    // Reset state
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTyping(false);
    setShowCursor(false);
  }, [text, startAnimation]);
  
  // Handle the typing animation
  useEffect(() => {
    if (!startAnimation) {
      return;
    }
    
    // Start animation after delay
    delayTimeoutRef.current = setTimeout(() => {
      setShowCursor(true);
      setIsTyping(true);
      
      // Use setInterval for consistent timing
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          if (prevIndex >= text.length) {
            // Animation complete

            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setIsTyping(false);
            
            // Hide cursor after a short delay
            completeTimeoutRef.current = setTimeout(() => {
              setShowCursor(false);

              onComplete?.();
            }, 500);
            
            return prevIndex;
          }
          
          // Update displayed text
          const newIndex = prevIndex + 1;
          setDisplayedText(text.slice(0, newIndex));
          return newIndex;
        });
      }, speed);
    }, delay);

    // Cleanup
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (delayTimeoutRef.current) clearTimeout(delayTimeoutRef.current);
      if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);
    };
  }, [text, speed, delay, startAnimation, onComplete]);

  return (
    <span 
      className={`${className}`}
      style={{ 
        display: 'inline',
        wordWrap: 'break-word', 
        overflowWrap: 'break-word',
      }}
    >
      <span style={{ whiteSpace: 'pre-wrap' }}>
        {displayedText}
      </span>
      {showCursor && (
        <span 
          className={`inline-block w-[2px] h-[1.1em] bg-current ml-[1px] ${isTyping ? 'animate-blink' : ''}`}
          style={{ 
            verticalAlign: 'text-bottom',
            opacity: isTyping ? 1 : 0,
            transition: 'opacity 0.3s ease-out'
          }}
          aria-hidden="true"
        />
      )}
      <style jsx>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </span>
  );
}
