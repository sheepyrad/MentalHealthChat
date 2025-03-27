
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type BreathingState = 'inhale' | 'hold' | 'exhale' | 'rest' | 'idle';

interface BreathingExerciseProps {
  className?: string;
  onComplete?: () => void;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ 
  className,
  onComplete
}) => {
  const [breathingState, setBreathingState] = useState<BreathingState>('idle');
  const [timer, setTimer] = useState(0);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  // Exercise settings
  const settings = {
    inhale: 4,
    hold: 7,
    exhale: 8,
    rest: 1,
    cycles: 3
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => {
          const newTime = prev + 1;
          
          // State transitions based on timing
          if (breathingState === 'inhale' && newTime >= settings.inhale) {
            setBreathingState('hold');
            return 0;
          } else if (breathingState === 'hold' && newTime >= settings.hold) {
            setBreathingState('exhale');
            return 0;
          } else if (breathingState === 'exhale' && newTime >= settings.exhale) {
            if (count >= settings.cycles - 1) {
              setIsRunning(false);
              setBreathingState('idle');
              if (onComplete) onComplete();
              return 0;
            }
            setBreathingState('rest');
            return 0;
          } else if (breathingState === 'rest' && newTime >= settings.rest) {
            setBreathingState('inhale');
            setCount(prev => prev + 1);
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, breathingState, count, onComplete, settings]);
  
  const startExercise = () => {
    setIsRunning(true);
    setBreathingState('inhale');
    setTimer(0);
    setCount(0);
  };
  
  const getInstructions = () => {
    switch (breathingState) {
      case 'inhale': return `Inhale (${settings.inhale - timer}s)`;
      case 'hold': return `Hold (${settings.hold - timer}s)`;
      case 'exhale': return `Exhale (${settings.exhale - timer}s)`;
      case 'rest': return 'Rest';
      default: return 'Press start to begin';
    }
  };
  
  const getProgress = () => {
    const total = settings.inhale + settings.hold + settings.exhale + settings.rest;
    let current = 0;
    
    switch (breathingState) {
      case 'inhale': current = timer; break;
      case 'hold': current = settings.inhale + timer; break;
      case 'exhale': current = settings.inhale + settings.hold + timer; break;
      case 'rest': current = settings.inhale + settings.hold + settings.exhale + timer; break;
      default: return 0;
    }
    
    return (current / total) * 100;
  };
  
  return (
    <div className={cn("glass-card p-6 text-center", className)}>
      <h3 className="text-xl font-medium mb-6">4-7-8 Breathing Exercise</h3>
      
      <div className="relative w-48 h-48 mx-auto mb-6">
        <div className={cn(
          "absolute inset-0 rounded-full bg-mental-100",
          breathingState !== 'idle' && "animate-pulse-soft"
        )}></div>
        
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
        )}>
          <div className={cn(
            "w-32 h-32 rounded-full bg-gradient-to-br from-mental-300 to-mental-500 flex items-center justify-center text-white transition-all duration-1000",
            breathingState === 'inhale' && "scale-125 opacity-90",
            breathingState === 'hold' && "scale-110 opacity-80",
            breathingState === 'exhale' && "scale-90 opacity-70",
          )}>
            <span className="text-lg font-medium">{getInstructions()}</span>
          </div>
        </div>
        
        <svg className="absolute inset-0" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="48" 
            fill="none" 
            stroke="#e2e8f0" 
            strokeWidth="2"
          />
          <circle 
            cx="50" 
            cy="50" 
            r="48" 
            fill="none" 
            stroke="#0ea5e9" 
            strokeWidth="3"
            strokeDasharray="302"
            strokeDashoffset={302 - (302 * getProgress() / 100)}
            transform="rotate(-90 50 50)"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      <div className="text-calm-600 mb-6">
        <p>Cycle {count + 1} of {settings.cycles}</p>
      </div>
      
      {!isRunning ? (
        <button 
          onClick={startExercise}
          className="px-6 py-3 bg-mental-500 text-white rounded-full hover:bg-mental-600 transition-colors"
        >
          {count === 0 ? 'Start Exercise' : 'Start Again'}
        </button>
      ) : (
        <button 
          onClick={() => setIsRunning(false)}
          className="px-6 py-3 bg-calm-200 text-calm-700 rounded-full hover:bg-calm-300 transition-colors"
        >
          Stop
        </button>
      )}
    </div>
  );
};

export default BreathingExercise;
