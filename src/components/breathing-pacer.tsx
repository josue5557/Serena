'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw } from 'lucide-react';

const breathingCycle = [
  { text: 'Inhale', duration: 4000, scale: 1.5 },
  { text: 'Hold', duration: 7000, scale: 1.5 },
  { text: 'Exhale', duration: 8000, scale: 1 },
];

export function BreathingPacer() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [cycleIndex, setCycleIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const circleRef = useRef<HTMLDivElement | null>(null);

  const currentCycle = breathingCycle[cycleIndex];

  useEffect(() => {
    if (isAnimating) {
      if (circleRef.current) {
        circleRef.current.style.transitionDuration = `${currentCycle.duration / 1000}s`;
        circleRef.current.style.transform = `scale(${currentCycle.scale})`;
      }
      
      timerRef.current = setTimeout(() => {
        setCycleIndex((prevIndex) => (prevIndex + 1) % breathingCycle.length);
      }, currentCycle.duration);
    } else {
        if(circleRef.current) {
            circleRef.current.style.transform = 'scale(1)';
        }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isAnimating, cycleIndex, currentCycle.duration, currentCycle.scale]);

  const handleToggle = () => {
    setIsAnimating(!isAnimating);
  };

  const handleReset = () => {
    setIsAnimating(false);
    setCycleIndex(0);
    if(timerRef.current) clearTimeout(timerRef.current);
    if(circleRef.current) {
        circleRef.current.style.transitionDuration = '0.3s';
        circleRef.current.style.transform = 'scale(1)';
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="relative w-52 h-52">
        <div 
          ref={circleRef}
          className="breathing-circle"
          style={{ transform: 'scale(1)' }}
        >
          <span className="z-10 font-bold">{isAnimating ? currentCycle.text : 'Ready?'}</span>
        </div>
      </div>
      <div className="flex gap-4">
        <Button onClick={handleToggle} size="lg">
          {isAnimating ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
          {isAnimating ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={handleReset} size="lg" variant="outline">
          <RefreshCw className="mr-2 h-5 w-5" />
          Reset
        </Button>
      </div>
    </div>
  );
}
