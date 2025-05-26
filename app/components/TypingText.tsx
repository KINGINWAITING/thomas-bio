'use client'

import { useEffect, useState } from 'react';

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
  const [showCursor, setShowCursor] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Reset display text when text prop changes
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);
  
  // Create animated characters with wave effect
  const renderAnimatedText = (content: string) => {
    return content.split('').map((char, i) => {
      const isVisible = i < displayText.length;
      
      return (
        <span 
          key={i}
          style={{
            animation: isVisible ? 'wave 2s ease-in-out infinite' : 'none',
            animationDelay: isVisible ? `${i * 0.03}s` : '0s',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.1s ease-out',
            verticalAlign: 'top', // Prevent layout shifts
          }}
        >
          {char}
        </span>
      );
    });
  };

  // Set mounted state after component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle animation start with delay
  useEffect(() => {
    if (!isMounted || !startAnimation) return;
    
    const timer = setTimeout(() => {
      setIsAnimating(true);
      setShowCursor(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, isMounted, startAnimation]);

  // Handle typing animation
  useEffect(() => {
    if (!isAnimating || !isMounted || !startAnimation) return;

    let timeout: NodeJS.Timeout;
    
    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
    } else if (onComplete && showCursor) {
      // Remove the cursor immediately and trigger completion
      setShowCursor(false);
      onComplete();
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [currentIndex, text, speed, isAnimating, isMounted, onComplete, showCursor, startAnimation]);

  // On initial render, show nothing (will be replaced by client-side render)
  if (!isMounted) {
    return <span className={`opacity-0 ${className}`}>{text}</span>;
  }

  return (
    <span 
      className={`inline-block w-full ${className}`}
      style={{ 
        wordWrap: 'break-word', 
        overflowWrap: 'break-word',
      }}
    >
      {renderAnimatedText(displayText)}
      {showCursor && <span className="animate-pulse">|</span>}
    </span>
  );
}
