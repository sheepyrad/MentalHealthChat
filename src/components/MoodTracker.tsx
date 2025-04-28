import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { addMoodEntry } from '@/lib/moodStorage';
import { toast } from '@/components/ui/use-toast';

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
  className?: string;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ className }) => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [note, setNote] = useState('');

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setNote('');
  };

  const handleSaveMood = () => {
    if (selectedMood) {
      try {
        addMoodEntry({
          moodValue: selectedMood.value,
          moodLabel: selectedMood.label,
          note: note.trim() || undefined,
        });
        toast({ title: "Mood saved!", description: `You tracked feeling ${selectedMood.label}.` });
        setSelectedMood(null);
        setNote('');
      } catch (error) {
        console.error("Failed to save mood:", error);
        toast({ title: "Error saving mood", variant: "destructive" });
      }
    }
  };

  return (
    <div className={cn("glass-card p-6", className)}>
      <h3 className="text-xl font-medium mb-4 text-center">How are you feeling today?</h3>

      <div className="flex justify-center space-x-2 sm:space-x-4 mb-6">
        {moods.map(mood => (
          <Button
            variant="outline"
            key={mood.value}
            onClick={() => handleMoodSelect(mood)}
            className={cn(
              "w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl transition-transform border-2",
              selectedMood?.value === mood.value
                ? `ring-2 ring-offset-2 ring-offset-background dark:ring-offset-gray-800 ring-mental-400 border-mental-400 dark:border-mental-500`
                : "border-transparent hover:scale-110 hover:border-gray-300 dark:hover:border-gray-600"
            )}
            aria-label={mood.label}
            title={mood.label}
          >
            {mood.icon}
          </Button>
        ))}
      </div>

      {selectedMood && (
        <div className="animate-fade-in space-y-4">
          <p className="text-center">You're feeling <span className="font-medium">{selectedMood.label}</span>. Add a note? (Optional)</p>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={`What's contributing to feeling ${selectedMood.label.toLowerCase()}?`}
            className="min-h-[80px]"
          />
          <Button
            onClick={handleSaveMood}
            className="w-full bg-mental-500 hover:bg-mental-600 transition-colors"
          >
            Save Entry
          </Button>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
