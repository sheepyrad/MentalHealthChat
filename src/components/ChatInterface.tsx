
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import ThoughtBubble from './ThoughtBubble';
import { cn } from '@/lib/utils';
import BreathingExercise from './BreathingExercise';
import JournalPrompt from './JournalPrompt';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatInterfaceProps {
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const [inputValue, setInputValue] = useState('');
  const { messages, sendMessage, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [showJournalPrompt, setShowJournalPrompt] = useState(false);
  const [lastMessageIndex, setLastMessageIndex] = useState(-1);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showBreathingExercise, showJournalPrompt]);

  useEffect(() => {
    if (messages.length > 0 && messages.length - 1 > lastMessageIndex) {
      setLastMessageIndex(messages.length - 1);
    }
  }, [messages, lastMessageIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue('');

      const lowercaseInput = inputValue.toLowerCase();
      if (lowercaseInput.includes('stress') || lowercaseInput.includes('anxiety') || lowercaseInput.includes('breath')) {
        setTimeout(() => {
          setShowBreathingExercise(true);
          setShowJournalPrompt(false);
        }, 1500);
      } else if (lowercaseInput.includes('reflect') || lowercaseInput.includes('journal') || lowercaseInput.includes('thought')) {
        setTimeout(() => {
          setShowJournalPrompt(true);
          setShowBreathingExercise(false);
        }, 1500);
      }
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className={cn("glass-card flex flex-col h-full", className)}>
      <div className="px-4 py-3 border-b border-mental-100 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
          <h3 className="font-medium">MentalHealthChat</h3>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ThoughtBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={formatTime(message.timestamp)}
              animateText={!message.isUser && index === lastMessageIndex}
            />
          ))}
          
          {isLoading && (
            <div className="flex items-center space-x-2 ml-2 animate-pulse opacity-70">
              <div className="w-2 h-2 bg-mental-400 rounded-full"></div>
              <div className="w-2 h-2 bg-mental-400 rounded-full animation-delay-200"></div>
              <div className="w-2 h-2 bg-mental-400 rounded-full animation-delay-400"></div>
            </div>
          )}

          {showBreathingExercise && (
            <div className="my-4">
              <ThoughtBubble
                message="I notice you might be feeling stressed. Try this breathing exercise to help calm your mind:"
                isUser={false}
                timestamp={formatTime(new Date().toISOString())}
              />
              <div className="mt-2">
                <BreathingExercise 
                  className="mt-4" 
                  onComplete={() => setShowBreathingExercise(false)}
                />
              </div>
            </div>
          )}

          {showJournalPrompt && (
            <div className="my-4">
              <ThoughtBubble
                message="Journaling can help process your thoughts. Here's a prompt to get you started:"
                isUser={false}
                timestamp={formatTime(new Date().toISOString())}
              />
              <div className="mt-2">
                <JournalPrompt 
                  className="mt-4" 
                  onJournalComplete={() => setShowJournalPrompt(false)}
                />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-mental-100">
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 py-2 px-3 rounded-l-full border border-mental-200 focus:outline-none focus:ring-1 focus:ring-mental-300"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={cn(
              "py-2 px-4 rounded-r-full",
              isLoading || !inputValue.trim()
                ? "bg-calm-200 text-calm-400 cursor-not-allowed"
                : "bg-mental-500 text-white hover:bg-mental-600"
            )}
            disabled={isLoading || !inputValue.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
