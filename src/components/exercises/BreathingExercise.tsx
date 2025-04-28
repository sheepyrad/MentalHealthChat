import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind, Play, Pause, RotateCcw, CheckCircle2 } from 'lucide-react';

// Define the breathing cycle phases and durations (in seconds)
const CYCLE = {
  inhale: 4,
  hold: 4,
  exhale: 6,
  pause: 2,
};

const PHASES = ['inhale', 'hold', 'exhale', 'pause'] as const;
type Phase = typeof PHASES[number];

const INSTRUCTIONS: Record<Phase, string> = {
  inhale: 'Breathe In...',
  hold: 'Hold...',
  exhale: 'Breathe Out...',
  pause: 'Pause...',
};

const TOTAL_CYCLES = 1;

const BreathingExercise = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('inhale');
  const [timeLeft, setTimeLeft] = useState(CYCLE.inhale);
  const [isRunning, setIsRunning] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseIndexRef = useRef(0);

  const nextPhase = useCallback(() => {
    if (PHASES[phaseIndexRef.current] === 'pause') {
      const newCompletedCount = completedCycles + 1;
      setCompletedCycles(newCompletedCount);
      if (newCompletedCount >= TOTAL_CYCLES) {
        setIsCompleted(true);
        setIsRunning(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
    }

    phaseIndexRef.current = (phaseIndexRef.current + 1) % PHASES.length;
    const nextPhaseName = PHASES[phaseIndexRef.current];
    setPhase(nextPhaseName);
    setTimeLeft(CYCLE[nextPhaseName]);
  }, [completedCycles]);

  useEffect(() => {
    if (!isRunning || isCompleted) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          nextPhase();
          return CYCLE[PHASES[phaseIndexRef.current]];
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, nextPhase, isCompleted]);

  const handleStartPause = () => {
    if (isCompleted) return;
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setCompletedCycles(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    phaseIndexRef.current = 0;
    setPhase('inhale');
    setTimeLeft(CYCLE.inhale);
  };

  const handleFinish = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    navigate(-1);
  };

  const getIndicatorStyle = () => {
    const duration = CYCLE[phase];
    const progress = (duration - timeLeft + 1) / duration;
    switch (phase) {
      case 'inhale':
        return { transform: `scale(${1 + progress * 0.2})`, backgroundColor: 'rgba(59, 130, 246, 0.3)' };
      case 'hold':
        return { transform: 'scale(1.2)', backgroundColor: 'rgba(250, 204, 21, 0.3)' };
      case 'exhale':
        return { transform: `scale(${1.2 - progress * 0.2})`, backgroundColor: 'rgba(16, 185, 129, 0.3)' };
      case 'pause':
        return { transform: 'scale(1)', backgroundColor: 'rgba(107, 114, 128, 0.3)' };
      default:
        return {};
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-indigo-900 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <Wind className="mx-auto h-10 w-10 text-blue-500 mb-2" />
          <CardTitle className="text-2xl font-bold">Guided Breathing ({TOTAL_CYCLES} Cycles)</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {isCompleted ? (
            <div className="flex flex-col items-center justify-center h-48 space-y-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">Well Done!</p>
              <p className="text-calm-600 dark:text-calm-400">You completed {TOTAL_CYCLES} breathing cycles.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-center items-center h-48">
                <div
                  className="w-40 h-40 rounded-full transition-transform duration-1000 ease-in-out flex flex-col items-center justify-center shadow-inner"
                  style={getIndicatorStyle()}
                >
                  <p className="text-3xl font-semibold text-gray-700 dark:text-gray-200">{timeLeft}</p>
                  <p className="text-lg text-calm-600 dark:text-calm-400 mt-1">{INSTRUCTIONS[phase]}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Cycle {completedCycles + 1} of {TOTAL_CYCLES}</p>
            </>
          )}

          <div className="flex justify-center gap-4">
            <Button onClick={handleStartPause} variant="secondary" size="icon" aria-label={isRunning ? 'Pause' : 'Start'} disabled={isCompleted}>
              {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button onClick={handleReset} variant="outline" size="icon" aria-label="Reset">
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>

          <Button
            onClick={handleFinish}
            variant="outline"
            className="w-full"
          >
            {isCompleted ? 'Finish' : 'Finish Early'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreathingExercise; 