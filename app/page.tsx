"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Rocket,
  Briefcase,
  Clock,
  ExternalLink,
  Film,
  GraduationCap,
  Lightbulb,
  Sun,
  Moon,
  Sparkles,
  TrendingUp,
  Building,
  Users,
} from "lucide-react"
import { useTheme } from 'next-themes'
import { useState, useEffect } from "react";
import { TypingText } from "./components/TypingText";
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['700']
})

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export default function ThomasBio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([])
  const [currentParagraph, setCurrentParagraph] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadingParticles, setLoadingParticles] = useState<Array<{
    left: string;
    top: string;
    width: string;
    height: string;
    background: string;
    animationDelay: string;
    animationDuration: string;
    transform: string;
  }>>([]);

  const [movingParticles, setMovingParticles] = useState<Array<{
    left: string;
    top: string;
    animation: string;
    animationDelay: string;
  }>>([]);

  // Handle theme mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger page load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Initialize particles
  useEffect(() => {
    const initialParticles: Particle[] = []
    for (let i = 0; i < 100; i++) {
      // Determine if this particle should be gold or silver
      const isGold = i % 3 === 0
      
      initialParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 0.5,
        speedX: (Math.random() - 0.5) * 1.2,
        speedY: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.6 + 0.2,
        color: isGold ? "gold" : "silver"
      })
    }
    setParticles(initialParticles)
  }, [])

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          // Add some gravitational drift and oscillation
          const time = Date.now() * 0.001;
          const oscillationX = Math.sin(time + particle.id * 0.1) * 0.3;
          const oscillationY = Math.cos(time + particle.id * 0.15) * 0.2;
          
          // Apply base movement with oscillation
          const newX = particle.x + particle.speedX + oscillationX;
          const newY = particle.y + particle.speedY + oscillationY;
          
          // Add slight gravitational pull towards center
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          const distanceToCenter = Math.sqrt((newX - centerX) ** 2 + (newY - centerY) ** 2);
          const gravityStrength = 0.0001;
          const gravityX = (centerX - newX) * gravityStrength;
          const gravityY = (centerY - newY) * gravityStrength;
          
          const finalX = newX + gravityX;
          const finalY = newY + gravityY;
          
          return {
            ...particle,
            x: finalX > window.innerWidth ? 0 : finalX < 0 ? window.innerWidth : finalX,
            y: finalY > window.innerHeight ? 0 : finalY < 0 ? window.innerHeight : finalY,
            // Slightly vary the speed over time for more organic movement
            speedX: particle.speedX + (Math.random() - 0.5) * 0.01,
            speedY: particle.speedY + (Math.random() - 0.5) * 0.01,
          };
        })
      );
    };
    
    const interval = setInterval(animateParticles, 30);
    return () => clearInterval(interval);
  }, [])

  // Generate loading particles on client-side only
  useEffect(() => {
    const particles = [...Array(40)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 3 + 1}px`,
      height: `${Math.random() * 3 + 1}px`,
      background: i % 3 === 0 ? '#d4a14a' : i % 3 === 1 ? '#e0b05e' : '#f4d03f',
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${1.5 + Math.random() * 2}s`,
      transform: `translate(${Math.sin(i) * 20}px, ${Math.cos(i) * 20}px)`
    }));
    setLoadingParticles(particles);

    const movingParticles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 3}s`,
    }));
    setMovingParticles(movingParticles);
  }, []);

  const pastVentures = [
    {
      id: "sneaker",
      title: "SneakerConnect",
      description: "The world's first collectable-sneakers trading app",
      icon: Rocket,
      color: "from-gray-600 to-gray-800",
      status: "Sold Successfully",
      year: "2015",
      link: "https://hypebeast.com/2015/8/10-sneaker-apps-you-should-know",
    },
    {
      id: "airdrive",
      title: "airDrive",
      description: "Decentralized storage platform reimagining digital space sharing",
      icon: Code,
      color: "from-gray-600 to-gray-800",
      status: "Launched",
      year: "2016",
      link: "https://www.brown.edu/news/2016-07-29/b-lab",
    },
    {
      id: "smith",
      title: "Smith & Crown",
      description: "A leading crypto research firm",
      link: "https://www.smithandcrown.com/",
      icon: Briefcase,
      color: "from-gray-600 to-gray-800",
      status: "Consulting",
      year: "2020",
    },
  ]

  const currentProjects = [
    {
      id: "ai-crypto",
      title: "MoonSet",
      description: "A decentralized collaborative research platform with AI assistents, powered by blockchain governance and incentivized through crypto-economics",
      icon: Sparkles,
      color: "from-gray-700 to-gray-900",
      status: "Coming Soon",
      link: null,
    },
    {
      id: "analemma",
      title: "Analemma Pictures",
      description: "Film production company developing first feature film",
      icon: Film,
      color: "from-gray-700 to-gray-900",
      status: "Active",
      link: "https://analemma.pictures",
    },
  ]

  const brownActivities = [
    {
      name: "Nelson Center for Entrepreneurship",
      icon: TrendingUp,
      description: "Entrepreneurship program participant",
    },
    {
      name: "Undergraduate Finance Board",
      icon: Users,
      description: "Elected member",
    },
    {
      name: "Brown Investment Group",
      icon: Building,
      description: "Investment club member",
    },
  ]

  const handleCardClick = (link: string | null) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer")
    }
  }

  // Theme toggle button
  const themeToggleButton = mounted ? (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-3 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors duration-200 shadow-lg hover:shadow-xl"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  ) : null;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-muted/50 to-background relative overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Page Load Overlay */}
      <div className={`fixed inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] z-50 flex items-center justify-center transition-all duration-1000 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {loadingParticles.map((particle, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={particle}
            />
          ))}
          {/* Additional moving particles */}
          {movingParticles.map((particle, i) => (
            <div
              key={`moving-${i}`}
              className="absolute w-2 h-2 bg-[#d4a14a]/60 rounded-full"
              style={particle}
            />
          ))}
        </div>
        
        {/* Main loading content */}
        <div className="relative z-10 text-center">
          {/* Animated logo/initials */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto relative">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 border-4 border-transparent border-t-[#d4a14a] border-r-[#d4a14a]/50 rounded-full animate-spin"></div>
              {/* Inner rotating ring - opposite direction */}
              <div className="absolute inset-2 border-3 border-transparent border-b-[#e0b05e] border-l-[#e0b05e]/50 rounded-full animate-reverse-spin"></div>
              {/* Center initials */}
          <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-[#d4a14a] animate-pulse-glow">TA</span>
          </div>
              {/* Orbiting dots */}
              <div className="absolute inset-0">
                <div className="w-2 h-2 bg-[#d4a14a] rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 animate-orbit"></div>
                <div className="w-2 h-2 bg-[#e0b05e] rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-orbit-reverse"></div>
              </div>
            </div>
          </div>
          
          {/* Animated text */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white animate-text-reveal">
              <span className="inline-block animate-letter-drop" style={{ animationDelay: '0.1s' }}>T</span>
              <span className="inline-block animate-letter-drop" style={{ animationDelay: '0.2s' }}>h</span>
              <span className="inline-block animate-letter-drop" style={{ animationDelay: '0.3s' }}>o</span>
              <span className="inline-block animate-letter-drop" style={{ animationDelay: '0.4s' }}>m</span>
              <span className="inline-block animate-letter-drop" style={{ animationDelay: '0.5s' }}>a</span>
              <span className="inline-block animate-letter-drop" style={{ animationDelay: '0.6s' }}>s</span>
              <span className="inline-block mx-2"></span>
              <span className="inline-block animate-letter-drop" style={{ animationDelay: '0.7s' }}>A</span>
              <span className="inline-block animate-letter-drop" style={{ animationDelay: '0.8s' }}>b</span>
              <span className="inline-block animate-letter-drop" style={{ animationDelay: '0.9s' }}>e</span>
              <span className="inline-block animate-letter-drop" style={{ animationDelay: '1.0s' }}>b</span>
              <span className="inline-block animate-letter-drop" style={{ animationDelay: '1.1s' }}>e</span>
            </h1>
            
            {/* Animated subtitle */}
            <p className="text-[#d4a14a] text-lg font-medium animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
              Technologist • Entrepreneur • Innovator
            </p>
            
            {/* Loading progress bar */}
            <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto mt-8 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#d4a14a] to-[#e0b05e] rounded-full animate-loading-bar"></div>
            </div>
            
            {/* Loading text */}
            <p className="text-gray-400 text-sm mt-4 animate-pulse">
              Crafting digital experiences...
            </p>
          </div>
          
          {/* Floating geometric shapes */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-4 h-4 border-2 border-[#d4a14a]/30 rotate-45 animate-float-geometric"></div>
            <div className="absolute top-3/4 right-1/4 w-6 h-6 border-2 border-[#e0b05e]/30 animate-float-geometric-reverse"></div>
            <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-[#d4a14a]/20 rounded-full animate-float-slow"></div>
            <div className="absolute top-1/3 right-1/6 w-5 h-5 bg-[#e0b05e]/20 rounded-full animate-float-slow" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {[...Array(144)].map((_, i) => (
              <div
                key={i}
                className="border border-[#d4a14a]/20 animate-grid-fade"
                style={{
                  animationDelay: `${(i * 0.01)}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Subtle Gradient Corners - All Sides */}
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4a14a]/60 via-[#d4a14a]/30 to-transparent rounded-br-full w-[200%] h-[200%] transform -translate-x-1/2 -translate-y-1/2"></div>
        {/* Additional layer for enhanced blending */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e0b05e]/40 via-[#d4a14a]/20 to-transparent rounded-br-full w-[180%] h-[180%] transform -translate-x-1/2 -translate-y-1/2 blur-sm"></div>
      </div>
      {/* Top Right */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#d4a14a]/10 via-[#d4a14a]/5 to-transparent rounded-bl-full w-[200%] h-[200%] transform translate-x-1/2 -translate-y-1/2"></div>
      </div>
      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#d4a14a]/10 via-[#d4a14a]/5 to-transparent rounded-tr-full w-[200%] h-[200%] transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tl from-[#d4a14a]/10 via-[#d4a14a]/5 to-transparent rounded-tl-full w-[200%] h-[200%] transform translate-x-1/2 translate-y-1/2"></div>
      </div>
      {/* Particles - Gold and Silver */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full ${particle.color === "gold" ? "animate-pulse-gold" : ""}`}
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              background: particle.color === "gold"
                ? `radial-gradient(circle, rgba(224, 176, 94, ${particle.opacity}) 0%, rgba(193, 138, 56, ${particle.opacity * 0.5}) 100%)`
                : `radial-gradient(circle, rgba(255, 255, 255, ${particle.opacity}) 0%, rgba(200, 200, 200, ${particle.opacity * 0.5}) 100%)`,
              boxShadow: particle.color === "gold"
                ? `0 0 ${particle.size * 2}px rgba(224, 176, 94, ${particle.opacity * 0.4})`
                : `0 0 ${particle.size * 2}px rgba(255, 255, 255, ${particle.opacity * 0.3})`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>
      
      {/* Mouse follow effect */}
      <div
        className="absolute inset-0 opacity-20 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.08), transparent 40%)`,
        }}
      />
      
      {/* Golden orbs - fixed position with animations - INCREASED INTENSITY */}
      <div className="golden-orb-container absolute top-[15%] left-[10%] w-[400px] h-[400px] animate-pulse-gold"></div>
      <div className="golden-orb-container absolute bottom-[15%] right-[10%] w-[350px] h-[350px] animate-pulse-gold animation-delay-2000"></div>
      <div className="golden-orb-container absolute top-[40%] right-[5%] w-[300px] h-[300px] animate-pulse-gold animation-delay-1000"></div>
      <div className="golden-orb-container absolute top-[60%] left-[20%] w-[250px] h-[250px] animate-pulse-gold animation-delay-1500"></div>

      <div className="container mx-auto px-4 py-16 mt-16 md:mt-24 relative z-10">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Animated Background Elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 dark:bg-[#d4a14a]/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-primary/5 dark:bg-[#d4a14a]/5 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>

          {/* Header with Two-Column Layout */}
          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start mb-16 animate-fade-in">
            {/* Left Column - Photo */}
            <div className={`w-full lg:w-1/3 flex-shrink-0 content-load-animation ${isLoaded ? 'animate-fadeInUp' : ''}`}>
              <div className="relative group w-full max-w-xs mx-auto">
                {/* Outer glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#d4a14a]/20 via-[#e0b05e]/25 to-[#d4a14a]/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-1000 animate-pulse-slow"></div>
                
                {/* Inner glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-[#d4a14a]/30 via-[#e0b05e]/20 to-[#d4a14a]/30 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-all duration-1000"></div>
                
                {/* Animated gradient ring */}
                <div className="absolute -inset-[2px] bg-gradient-to-r from-[#d4a14a] via-[#e0b05e] to-[#d4a14a] rounded-full opacity-75 group-hover:opacity-100 animate-gradient-rotate"></div>
                
                {/* Radial glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4a14a]/40 via-transparent to-transparent rounded-full blur-2xl transform scale-110 group-hover:scale-125 transition-transform duration-1000"></div>
                
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-400 dark:to-gray-600 rounded-full blur opacity-60 dark:opacity-60 group-hover:opacity-100 dark:group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse shimmer-border"></div>
                <img
                  src="/images/thomas-abebe.png"
                  className="relative w-full rounded-full object-cover border-4 border-gray-200 dark:border-gray-800 group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-all duration-500 transform group-hover:scale-105"
                  alt="Thomas Abebe"
                />

                {/* Corner light accents */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#d4a14a]/20 rounded-full blur-xl animate-pulse-slow"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#d4a14a]/20 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
                
                {/* Rotating gradient border */}
                <div className="absolute -inset-[3px] bg-gradient-to-r from-[#d4a14a]/0 via-[#d4a14a]/50 to-[#d4a14a]/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-rotate-glow"></div>
              </div>
              
              <div className="mt-8 text-center lg:text-left">
                <h1 className={`text-4xl md:text-5xl font-black mb-3 tracking-tight leading-tight text-foreground content-load-animation animate-delay-100 animate-float-slow ${isLoaded ? 'animate-fadeInUp' : ''}`}>
                  <span className="text-foreground font-bold animate-text-shimmer">Thomas Abebe</span>
                </h1>
                <p className={`text-xl text-muted-foreground mb-6 font-medium content-load-animation animate-delay-200 animate-bounce-subtle ${isLoaded ? 'animate-fadeInUp' : ''}`}>
                  Technologist · Entrepreneur · Product Strategist
                </p>
                
                <div className={`flex flex-wrap justify-center lg:justify-start gap-3 mb-6 content-load-animation animate-delay-300 ${isLoaded ? 'animate-fadeInUp' : ''}`}>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-primary/90 to-primary/80 text-primary-foreground border border-border px-4 py-2 text-base font-semibold shadow hover:from-primary/80 hover:to-primary/70 transition-all duration-300 cursor-pointer transform hover:scale-105 shimmer-badge"
                  >
                    <Code className="w-4 h-4 mr-2" /> Software
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-primary/90 to-primary/80 text-primary-foreground border border-border px-4 py-2 text-base font-semibold shadow hover:from-primary/80 hover:to-primary/70 transition-all duration-300 cursor-pointer transform hover:scale-105 shimmer-badge"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" /> Entrepreneur
                  </Badge>
                </div>
                
                <div className={`flex flex-wrap justify-center lg:justify-start gap-3 mb-6 content-load-animation animate-delay-300 ${isLoaded ? 'animate-fadeInUp' : ''}`}>
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-primary/90 to-primary/80 text-primary-foreground border border-border px-4 py-2 text-base font-semibold shadow hover:from-primary/80 hover:to-primary/70 transition-all duration-300 cursor-pointer transform hover:scale-105 shimmer-badge"
                  >
                    <Rocket className="w-4 h-4 mr-2" /> Blockchain & AI
                  </Badge>
                </div>
                
                <div className="w-full flex justify-center lg:justify-start mb-6">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d4a14a]/30 to-[#d4a14a]/10 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <a 
                      href="mailto:thomas@analemma.pictures" 
                      className="relative px-6 py-3 bg-foreground/90 text-background rounded-full leading-none flex items-center text-[#d4a14a] hover:text-background transition-all duration-300 group-hover:bg-foreground text-base font-medium"
                    >
                      thomas@analemma.pictures
                    </a>
                  </div>
                </div>
                
                {/* Theme Toggle */}
                <div className="w-full flex justify-center lg:justify-start mb-6">
                  {themeToggleButton}
                </div>
              </div>
            </div>
            
            {/* Right Column - Bio Text in Futuristic Container */}
            <div className={`w-full lg:w-2/3 content-load-animation animate-delay-400 ${isLoaded ? 'animate-fadeInUp' : ''} max-w-full`}>
              {/* Futuristic Bio Container */}
              <div className="relative group w-full max-w-full">
                {/* Outer glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#d4a14a]/20 via-[#e0b05e]/30 to-[#d4a14a]/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-1000 animate-pulse-slow"></div>
                
                {/* Main container */}
                <div className="relative bg-gradient-to-br from-card/95 via-card/90 to-card/95 backdrop-blur-xl border border-[#d4a14a]/30 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl overflow-hidden w-full max-w-full">
                  {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4a14a]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-out"></div>
                  </div>
                  
                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[#d4a14a]/60 rounded-tl-lg"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-[#d4a14a]/60 rounded-tr-lg"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-[#d4a14a]/60 rounded-bl-lg"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#d4a14a]/60 rounded-br-lg"></div>
                  
                  {/* Floating particles inside container */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-[#d4a14a]/40 rounded-full animate-float-particle"
                        style={{
                          left: `${20 + (i * 10)}%`,
                          top: `${10 + (i * 8)}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: `${3 + (i % 3)}s`,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Content wrapper with proper containment */}
                  <div className="relative z-10 text-foreground/90 space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg max-w-full w-full">
                    {/* Bio header */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#d4a14a]/20 w-full">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#d4a14a] rounded-full animate-pulse flex-shrink-0"></div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#d4a14a] tracking-wide flex-shrink-0">BIOGRAPHICAL DATA</h3>
                      <div className="flex-1 h-px bg-gradient-to-r from-[#d4a14a]/50 to-transparent min-w-0"></div>
                    </div>
                    
                    <div className="typing-text-container w-full">
                      <p className="leading-relaxed break-words hyphens-auto text-justify w-full" style={{ wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '100%', width: '100%' }}>
                        <TypingText 
                          text="Thomas Abebe was born in Addis Abeba, Ethiopia, and moved to the United States at the age of 10. Growing up between two cultures, he developed a deep curiosity about the world and a strong desire to contribute to it in meaningful ways. From a young age, he gravitated toward science and math—not just for their precision, but for their potential to solve real problems and improve lives."
                          speed={12}
                          onComplete={() => setCurrentParagraph(1)}
                          startAnimation={currentParagraph >= 0}
                        />
                      </p>
                    </div>
                    
                    <div className={`typing-text-container transition-all duration-500 w-full ${currentParagraph >= 1 ? 'opacity-100 mt-4 sm:mt-6' : 'opacity-0 h-0 overflow-hidden'}`}>
                      <p className="leading-relaxed break-words hyphens-auto text-justify w-full" style={{ wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '100%', width: '100%' }}>
                        <TypingText 
                          text="That passion guided him to study Computer Science and Economics at Brown University, where he honed both his technical skills and his understanding of systems—economic, digital, and human. His career has since been grounded in technology, spanning roles as a consultant, product manager, and entrepreneur. His work reflects a constant push to bridge innovation with impact, from building and selling apps to conducting crypto research and launching ventures at the frontier of AI and blockchain."
                          speed={12}
                          onComplete={() => setCurrentParagraph(2)}
                          startAnimation={currentParagraph >= 1}
                        />
                      </p>
                    </div>
                    
                    <div className={`typing-text-container transition-all duration-500 w-full ${currentParagraph >= 2 ? 'opacity-100 mt-4 sm:mt-6' : 'opacity-0 h-0 overflow-hidden'}`}>
                      <p className="leading-relaxed break-words hyphens-auto text-justify w-full" style={{ wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '100%', width: '100%' }}>
                        <TypingText 
                          text="Beyond technology, Thomas has a deep love for history, philosophy, art, and religion. These disciplines shape the way he thinks about the future—not just what we build, but why we build it. Today, in addition to leading a new AI-Crypto startup, he's also exploring storytelling through cinema, developing his first feature film under his new production company, Analemma Pictures."
                          speed={12}
                          onComplete={() => setCurrentParagraph(3)}
                          startAnimation={currentParagraph >= 2}
                        />
                      </p>
                    </div>
                    
                    {/* Status indicator */}
                    <div className="flex items-center gap-2 mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-[#d4a14a]/20 w-full">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-muted-foreground font-mono truncate">TRANSMISSION_COMPLETE</span>
                    </div>
                  </div>
                  
                  {/* Holographic overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4a14a]/5 via-transparent to-[#e0b05e]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Education Section (Brown University) */}
          <div className="mb-14">
            <Card className="w-full bg-gradient-to-r from-[#d4a14a]/95 to-[#c18a38]/95 border-[#e0b05e]/70 backdrop-blur-md overflow-hidden relative group shadow-2xl hover:shadow-3xl transition-all duration-700 rounded-3xl">
              {/* Enhanced background overlay with animated gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#e0b05e]/15 to-[#d4a14a]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#f4d03f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl" />
              
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl" />
              
              <CardContent className="p-8 md:p-10 relative z-10">
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                  <div className="relative group/logo">
                    {/* Glow effect behind logo */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-[#e0b05e]/30 to-[#d4a14a]/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                      src="/images/brown-university-logo.gif"
                      alt="Brown University"
                      className="relative w-20 h-20 md:w-24 md:h-24 object-contain group-hover:scale-110 transition-transform duration-500 filter drop-shadow-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-white/95 transition-colors duration-300 tracking-tight">
                      Brown University
                    </h3>
                    <p className="text-lg md:text-xl font-bold text-white/95 mb-2">Computer Science-Economics '17</p>
                    <div className="flex items-center text-base text-white/85 mt-2">
                      <Clock className="w-4 h-4 mr-3 text-white/85" />
                      <span className="font-semibold">2013-2017</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  {brownActivities.map((activity, index) => {
                    const Icon = activity.icon
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-5 bg-[#c18a38]/80 hover:bg-[#b07c30]/90 rounded-2xl group-hover:bg-[#b07c30]/85 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                        style={{
                          animationDelay: `${index * 150}ms`,
                        }}
                      >
                        <div className="relative">
                          {/* Icon glow effect */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-[#e0b05e] to-[#d4a14a] rounded-lg blur opacity-0 hover:opacity-75 transition-opacity duration-300" />
                          <div className="relative w-12 h-12 bg-gradient-to-r from-[#e0b05e] to-[#d4a14a] rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <Icon className="w-6 h-6 text-white drop-shadow-sm" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-lg md:text-xl font-bold mb-1 leading-tight">{activity.name}</p>
                          <p className="text-white/85 text-sm md:text-base font-medium">{activity.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                {/* Enhanced decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-[#e0b05e]/20 to-[#d4a14a]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-tr from-[#f4d03f]/15 to-[#e0b05e]/15 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </CardContent>
            </Card>
          </div>

          {/* Current Projects Section */}
          <div className="mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#d4a14a]/0 via-[#d4a14a]/10 to-[#d4a14a]/0 rounded-lg blur-xl group-hover:via-[#d4a14a]/20 transition-all duration-1000"></div>
              <div className="relative">
                <span className={`${spaceGrotesk.className} bg-clip-text text-transparent bg-gradient-to-r from-[#d4a14a] via-[#e0b05e] to-[#d4a14a] animate-gradient-slow inline-block tracking-wider uppercase`}>
                  Current Projects
                </span>
                {/* Animated underline */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d4a14a]/0 via-[#d4a14a] to-[#d4a14a]/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
              </div>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {currentProjects.map((project, index) => {
                const Icon = project.icon
                return (
                  <Card
                    key={project.id}
                    className={`relative bg-card/80 border-border/60 backdrop-blur-md cursor-pointer transition-all duration-700 hover:scale-[1.02] group shadow-xl overflow-hidden rounded-3xl ${
                      hoveredCard === project.id ? "ring-2 ring-[#d4a14a]/50" : ""
                    } ${project.link ? "hover:ring-2 hover:ring-[#d4a14a]/30" : ""}`}
                    style={{
                      animationDelay: `${index * 200}ms`,
                    }}
                    onMouseEnter={() => setHoveredCard(project.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handleCardClick(project.link)}
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4a14a]/10 via-transparent to-[#d4a14a]/5 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#d4a14a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 rounded-3xl" />
                    
                    {/* Animated border glow */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-[#d4a14a]/30 via-[#e0b05e]/20 to-[#d4a14a]/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
                    
                    <CardContent className="p-8 relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-14 h-14 bg-gradient-to-br from-[#d4a14a]/20 to-[#e0b05e]/20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-gradient-to-br group-hover:from-[#d4a14a]/30 group-hover:to-[#e0b05e]/30`}
                        >
                          <Icon className="w-7 h-7 text-foreground transition-transform duration-500 group-hover:text-[#d4a14a]" />
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge
                            variant="outline"
                            className={`text-sm border-[#d4a14a]/30 text-muted-foreground group-hover:border-[#d4a14a]/50 group-hover:text-[#d4a14a] transition-all duration-300 rounded-full px-4`}
                          >
                            {project.status}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground/80 group-hover:text-[#d4a14a]/80 transition-colors duration-300">
                            <Clock className="w-4 h-4 mr-2" />
                            2024-Present
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-[#d4a14a] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-base leading-relaxed group-hover:text-foreground/90 transition-colors duration-300 mb-4">
                        {project.description}
                      </p>
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <div className="flex items-center text-[#d4a14a]/80 text-sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {project.link ? "Visit Website" : "Learn more"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Past Ventures Section */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#d4a14a]/0 via-[#d4a14a]/10 to-[#d4a14a]/0 rounded-lg blur-xl group-hover:via-[#d4a14a]/20 transition-all duration-1000"></div>
              <div className="relative">
                <span className={`${spaceGrotesk.className} bg-clip-text text-transparent bg-gradient-to-r from-[#d4a14a] via-[#e0b05e] to-[#d4a14a] animate-gradient-slow inline-block tracking-wider uppercase`}>
                  Past Ventures
                </span>
                {/* Animated underline */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#d4a14a]/0 via-[#d4a14a] to-[#d4a14a]/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
              </div>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {pastVentures.map((venture, index) => (
                <Card 
                  key={venture.id}
                  className={`relative overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-[1.02] bg-card/80 border-border/60 backdrop-blur-md rounded-3xl ${hoveredCard === venture.id ? 'ring-2 ring-[#d4a14a]/30' : ''}`}
                  style={{
                    animationDelay: `${(index + 2) * 150}ms`,
                  }}
                  onMouseEnter={() => setHoveredCard(venture.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => venture.link && window.open(venture.link, '_blank', 'noopener,noreferrer')}
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4a14a]/10 via-transparent to-[#d4a14a]/5 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#d4a14a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 rounded-3xl" />
                  
                  {/* Animated border glow */}
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-[#d4a14a]/30 via-[#e0b05e]/20 to-[#d4a14a]/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
                  
                  <CardContent className="p-7 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br from-[#d4a14a]/20 to-[#e0b05e]/20 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-gradient-to-br group-hover:from-[#d4a14a]/30 group-hover:to-[#e0b05e]/30`}>
                        <venture.icon className="w-6 h-6 text-foreground transition-transform duration-500 group-hover:text-[#d4a14a]" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge
                          variant="outline"
                          className="text-sm border-[#d4a14a]/30 text-muted-foreground group-hover:border-[#d4a14a]/50 group-hover:text-[#d4a14a] transition-all duration-300 rounded-full px-4"
                        >
                          {venture.status}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground/80 group-hover:text-[#d4a14a]/80 transition-colors duration-300">
                          <Clock className="w-4 h-4 mr-2" />
                          {venture.year}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground/90 mb-2 group-hover:text-[#d4a14a] transition-colors duration-300">
                      {venture.title}
                    </h3>
                    <p className="text-muted-foreground/80 text-base leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                      {venture.description}
                    </p>
                    {venture.link && (
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 mt-3">
                        <div className="flex items-center text-[#d4a14a]/80 text-sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {venture.id === "sneaker" ? "Featured on Hypebeast" : "Learn more"}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-muted-foreground/80 text-base pt-8 mt-8 border-t border-border/40">
            <span className="inline-flex items-center gap-2">
              <Clock size={18} className="inline-block" />
              Last updated: May 2025
            </span>
            <span className="mx-3">·</span>
            <span className="inline-flex items-center gap-2">
              <Users size={18} className="inline-block" /> Open to Collaboration
            </span>
          </footer>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        
        @keyframes text-shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes shimmer-glow {
          0%, 100% {
            box-shadow: 0 0 5px hsl(var(--foreground) / 0.3);
          }
          50% {
            box-shadow: 0 0 20px hsl(var(--foreground) / 0.6), 0 0 30px hsl(var(--foreground) / 0.4);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse-gold {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }
        
        @keyframes reverse-spin {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            text-shadow: 0 0 5px #d4a14a, 0 0 10px #d4a14a, 0 0 15px #d4a14a;
            transform: scale(1);
          }
          50% {
            text-shadow: 0 0 10px #d4a14a, 0 0 20px #d4a14a, 0 0 30px #d4a14a;
            transform: scale(1.05);
          }
        }
        
        @keyframes letter-drop {
          0% {
            opacity: 0;
            transform: translateY(-50px) rotateX(90deg);
          }
          50% {
            opacity: 0.5;
            transform: translateY(10px) rotateX(45deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }
        
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(48px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(48px) rotate(-360deg);
          }
        }
        
        @keyframes orbit-reverse {
          from {
            transform: rotate(360deg) translateX(48px) rotate(-360deg);
          }
          to {
            transform: rotate(0deg) translateX(48px) rotate(0deg);
          }
        }
        
        @keyframes loading-bar {
          0% {
            width: 0%;
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 0.8;
          }
        }
        
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-geometric {
          from {
            transform: translateY(0px) rotate(0deg);
          }
          to {
            transform: translateY(-15px) rotate(120deg);
          }
        }
        
        @keyframes float-geometric-reverse {
          from {
            transform: translateY(0px) rotate(360deg);
          }
          to {
            transform: translateY(10px) rotate(240deg);
          }
        }
        
        @keyframes grid-fade {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-10px) translateX(5px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-5px) translateX(-3px);
            opacity: 0.5;
          }
          75% {
            transform: translateY(-15px) translateX(8px);
            opacity: 0.8;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 4s ease-in-out infinite;
        }
        
        .animate-text-shimmer {
          background: linear-gradient(
            90deg,
            hsl(var(--foreground)) 0%,
            hsl(var(--muted-foreground)) 25%,
            hsl(var(--foreground)) 50%,
            hsl(var(--muted-foreground)) 75%,
            hsl(var(--foreground)) 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          animation: text-shimmer 3s ease-in-out infinite;
        }
        
        .animate-scale-in {
          animation: scale-in 0.6s ease-out both;
        }
        
        .animate-pulse-gold {
          animation: pulse-gold 4s ease-in-out infinite;
        }
        
        .animate-reverse-spin {
          animation: reverse-spin 2s linear infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-letter-drop {
          animation: letter-drop 0.8s ease-out both;
        }
        
        .animate-orbit {
          animation: orbit 3s linear infinite;
        }
        
        .animate-orbit-reverse {
          animation: orbit-reverse 4s linear infinite;
        }
        
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out both;
        }
        
        .animate-float-geometric {
          animation: float-geometric 6s ease-in-out infinite;
        }
        
        .animate-float-geometric-reverse {
          animation: float-geometric-reverse 8s ease-in-out infinite;
        }
        
        .animate-grid-fade {
          animation: grid-fade 3s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle 4s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .grid > * {
          animation: fade-in 0.8s ease-out both;
        }
        
        .animate-shimmer {
          animation: shimmer-glow 2s ease-in-out infinite;
        }
        
        .shimmer-text {
          background: linear-gradient(
            90deg,
            hsl(var(--foreground)) 0%,
            hsl(var(--muted-foreground)) 25%,
            hsl(var(--foreground)) 50%,
            hsl(var(--muted-foreground)) 75%,
            hsl(var(--foreground)) 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .shimmer-border {
          background: linear-gradient(
            90deg,
            hsl(var(--border)) 0%,
            hsl(var(--foreground) / 0.3) 50%,
            hsl(var(--border)) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .shimmer-badge:hover {
          background: linear-gradient(
            90deg,
            hsl(var(--muted)) 0%,
            hsl(var(--muted-foreground) / 0.3) 50%,
            hsl(var(--muted)) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }
        
        .shimmer-card:hover {
          background: linear-gradient(
            135deg,
            hsl(var(--card) / 0.8) 0%,
            hsl(var(--muted) / 0.3) 50%,
            hsl(var(--card) / 0.8) 100%
          );
          background-size: 200% 200%;
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .shimmer-icon:hover {
          animation: shimmer-glow 1s ease-in-out infinite, float 2s ease-in-out infinite;
        }
        
        .golden-orb-container {
          border-radius: 50%;
          background: radial-gradient(circle, rgba(224, 176, 94, 0.2) 0%, rgba(193, 138, 56, 0.1) 40%, transparent 70%);
          filter: blur(40px);
          z-index: 0;
          pointer-events: none;
        }
        
        @keyframes rotate-glow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes gradient-rotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-rotate-glow {
          animation: rotate-glow 8s linear infinite;
        }
        
        .animate-gradient-rotate {
          animation: gradient-rotate 3s ease infinite;
          background-size: 200% 200%;
        }

        @keyframes gradient-slow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-slow {
          animation: gradient-slow 4s ease infinite;
          background-size: 200% auto;
        }

        @keyframes float-slow-reverse {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(5px);
          }
        }

        .animate-float-slow-reverse {
          animation: float-slow-reverse 4s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}