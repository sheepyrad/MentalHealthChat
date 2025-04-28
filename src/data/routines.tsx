import React from 'react';
import { HeartPulse, Coffee, BookOpen, Pill, Clipboard, Bookmark } from 'lucide-react';

export interface RoutineItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'daily' | 'wellness' | 'mental';
}

export const routineItems: RoutineItem[] = [
    {
      id: 'breathing',
      title: 'Breathing Exercises',
      description: 'Practice deep breathing for 5 minutes to reduce stress and anxiety.',
      icon: <HeartPulse className="h-6 w-6 text-mental-600" />,
      category: 'daily'
    },
    {
      id: 'journal',
      title: 'Daily Journaling',
      description: 'Write down your thoughts and feelings to gain clarity and perspective.',
      icon: <BookOpen className="h-6 w-6 text-mental-600" />,
      category: 'mental'
    },
    {
      id: 'nosugar',
      title: 'Reduce Sugar Intake',
      description: 'Minimize processed sugar consumption to stabilize mood and energy levels.',
      icon: <Coffee className="h-6 w-6 text-mental-600" />,
      category: 'wellness'
    },
    {
      id: 'medication',
      title: 'Medication Reminder',
      description: 'Take your prescribed medications regularly as directed by your healthcare provider.',
      icon: <Pill className="h-6 w-6 text-mental-600" />,
      category: 'daily'
    },
    {
      id: 'notes',
      title: 'Mood Tracking',
      description: 'Record your mood patterns to identify triggers and improvements.',
      icon: <Clipboard className="h-6 w-6 text-mental-600" />,
      category: 'mental'
    },
    {
      id: 'mindfulness',
      title: 'Mindfulness Practice',
      description: 'Spend 10 minutes being fully present and aware of your surroundings.',
      icon: <Bookmark className="h-6 w-6 text-mental-600" />,
      category: 'mental'
    }
]; 