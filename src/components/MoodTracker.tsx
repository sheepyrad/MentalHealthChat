
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface Mood {
  value: number;
  label: string;
  color: string;
  icon: string;
}

const moods: Mood[] = [
  { value: 5, label: 'Great', color: 'bg-green-500', icon: '😄' },
  { value: 4, label: 'Good', color: 'bg-teal-500', icon: '🙂' },
  { value: 3, label: 'Okay', color: 'bg-blue-500', icon: '😐' },
  { value: 2, label: 'Low', color: 'bg-purple-500', icon: '😔' },
  { value: 1, label: 'Bad', color: 'bg-red-500', icon: '😞' },
];

interface MoodTrackerProps {
  onMoodSelect?: (mood: Mood) => void;
  className?: string;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ 
  onMoodSelect,
  className
}) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [moodEntries, setMoodEntries] = useState<Array<{ date: Date; mood: Mood }>>([]);
  
  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    
    if (onMoodSelect) {
      onMoodSelect(mood);
    }
  };
  
  const saveMoodEntry = () => {
    if (selectedMood) {
      const newEntry = {
        date: new Date(),
        mood: selectedMood
      };
      
      setMoodEntries(prev => [...prev, newEntry]);
      setSelectedMood(null);
    }
  };
  
  return (
    <div className={cn("glass-card p-6", className)}>
      <h3 className="text-xl font-medium mb-4">How are you feeling today?</h3>
      
      <div className="flex justify-center space-x-4 mb-8">
        {moods.map(mood => (
          <button
            key={mood.value}
            onClick={() => handleMoodSelect(mood)}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-xl transition-transform",
              selectedMood?.value === mood.value
                ? "transform scale-125 ring-2 ring-offset-2 ring-mental-300"
                : "hover:scale-110",
            )}
            aria-label={mood.label}
          >
            {mood.icon}
          </button>
        ))}
      </div>
      
      {selectedMood && (
        <div className="animate-fade-in mb-6">
          <p className="mb-4">You're feeling <span className="font-medium">{selectedMood.label}</span></p>
          
          <button
            onClick={saveMoodEntry}
            className="px-4 py-2 bg-mental-500 text-white rounded-full hover:bg-mental-600 transition-colors"
          >
            Save Entry
          </button>
        </div>
      )}
      
      {moodEntries.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-medium mb-3">Recent Mood Entries</h4>
          <div className="space-y-2">
            {moodEntries.slice(-3).reverse().map((entry, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-3 bg-white/50 rounded-lg"
              >
                <div className="flex items-center">
                  <span className="text-xl mr-3">{entry.mood.icon}</span>
                  <span>{entry.mood.label}</span>
                </div>
                <div className="text-sm text-calm-500">
                  {entry.date.toLocaleDateString()} at {entry.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
