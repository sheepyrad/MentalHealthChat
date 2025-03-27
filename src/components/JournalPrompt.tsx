
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const prompts = [
  "What are three things you're grateful for today?",
  "Describe a moment that brought you joy recently.",
  "What's one challenge you're facing, and what might help?",
  "Write about something you're looking forward to.",
  "Reflect on your progress toward a goal this week.",
  "What's one thing you'd like to improve about your day tomorrow?",
  "Describe something that made you smile today.",
  "What has been on your mind lately that you'd like to explore?",
  "Write about someone who has positively impacted your life recently.",
  "What small self-care activity could you practice today?"
];

interface JournalPromptProps {
  className?: string;
  onJournalComplete?: (text: string) => void;
}

const JournalPrompt: React.FC<JournalPromptProps> = ({
  className,
  onJournalComplete
}) => {
  const [prompt, setPrompt] = useState(() => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  });
  
  const [journalEntry, setJournalEntry] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const getNewPrompt = () => {
    let newPrompt;
    do {
      const randomIndex = Math.floor(Math.random() * prompts.length);
      newPrompt = prompts[randomIndex];
    } while (newPrompt === prompt);
    
    setPrompt(newPrompt);
    setJournalEntry('');
    setIsSubmitted(false);
  };
  
  const handleSubmit = () => {
    if (journalEntry.trim().length > 0) {
      setIsSubmitted(true);
      
      if (onJournalComplete) {
        onJournalComplete(journalEntry);
      }
    }
  };
  
  return (
    <div className={cn("glass-card p-6", className)}>
      <h3 className="text-xl font-medium mb-4">Reflection Journal</h3>
      
      <div className="bg-mental-50 text-mental-800 p-4 rounded-lg mb-4 italic">
        "{prompt}"
      </div>
      
      {!isSubmitted ? (
        <>
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full p-3 border border-mental-100 rounded-lg min-h-[120px] mb-4 bg-white/80 focus:ring-1 focus:ring-mental-300 focus:outline-none"
          />
          
          <div className="flex justify-between">
            <button
              onClick={getNewPrompt}
              className="px-4 py-2 bg-calm-200 text-calm-700 rounded-full hover:bg-calm-300 transition-colors"
            >
              Different Prompt
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={journalEntry.trim().length === 0}
              className={cn(
                "px-4 py-2 rounded-full transition-colors",
                journalEntry.trim().length === 0
                  ? "bg-calm-200 text-calm-400 cursor-not-allowed"
                  : "bg-mental-500 text-white hover:bg-mental-600"
              )}
            >
              Save Entry
            </button>
          </div>
        </>
      ) : (
        <div className="animate-fade-in">
          <div className="bg-mental-100 p-4 rounded-lg mb-4 text-calm-800">
            <p className="italic mb-2">Your entry:</p>
            <p>{journalEntry}</p>
          </div>
          
          <div className="bg-mental-50 p-4 rounded-lg mb-6 border-l-4 border-mental-300">
            <p className="font-medium">Thank you for your reflection!</p>
            <p className="text-calm-600 text-sm mt-1">
              Regular journaling can help process emotions and gain perspective.
            </p>
          </div>
          
          <button
            onClick={getNewPrompt}
            className="px-4 py-2 bg-mental-500 text-white rounded-full hover:bg-mental-600 transition-colors"
          >
            New Journal Prompt
          </button>
        </div>
      )}
    </div>
  );
};

export default JournalPrompt;
