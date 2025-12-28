'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  lifespan: number;
  createdAt: number;
}

interface ParticleCursorProps {
  color?: string;
  particleCount?: number;
  particleLifespan?: number;
  particleSizeRange?: [number, number];
  trailDelay?: number;
}

const ParticleCursor: React.FC<ParticleCursorProps> = ({
  color = 'var(--primary)',
  particleCount = 15,
  particleLifespan = 1000,
  particleSizeRange = [3, 8],
  trailDelay = 50
}) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const lastEmitTime = useRef<number>(0);
  const particleId = useRef<number>(0);

  const emitParticles = useCallback((x: number, y: number) => {
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const size = particleSizeRange[0] + Math.random() * (particleSizeRange[1] - particleSizeRange[0]);
      const lifespan = particleLifespan * (0.7 + Math.random() * 0.6); // Random lifespan variation
      
      newParticles.push({
        id: particleId.current++,
        x: x + (Math.random() * 20 - 10),
        y: y + (Math.random() * 20 - 10),
        size,
        color,
        lifespan,
        createdAt: Date.now()
      });
    }
    
    setParticles(prevParticles => [...prevParticles, ...newParticles]);
  }, [particleCount, particleSizeRange, particleLifespan, color]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const now = Date.now();
      
      // Only emit particles at a certain interval
      if (now - lastEmitTime.current >= trailDelay) {
        lastEmitTime.current = now;
        emitParticles(e.clientX, e.clientY);
      }
    };

    const removeParticle = () => {
      const now = Date.now();
      
      setParticles(prevParticles => 
        prevParticles.filter(particle => 
          now - particle.createdAt < particle.lifespan
        )
      );
    };

    const intervalId = setInterval(removeParticle, 100);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(intervalId);
    };
  }, [trailDelay, emitParticles]);

  if (!mousePosition) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Custom cursor */}
      <motion.div
        className="absolute w-5 h-5 rounded-full mix-blend-difference"
        style={{
          backgroundColor: 'white',
          transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
      />
      
      {/* Particles */}
      {particles.map(particle => {
        const progress = (Date.now() - particle.createdAt) / particle.lifespan;
        const opacity = 1 - progress;
        
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity,
              top: 0,
              left: 0,
              transform: `translate(${particle.x - particle.size / 2}px, ${particle.y - particle.size / 2}px)`,
            }}
            animate={{
              scale: [1, 0],
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: particle.lifespan / 1000,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default ParticleCursor; 