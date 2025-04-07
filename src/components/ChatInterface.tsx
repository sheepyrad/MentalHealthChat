import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import { useChatContext } from '@/context/ChatContext';
import { cn } from '@/lib/utils';
import ThoughtBubble from './ThoughtBubble';
import BreathingExercise from './BreathingExercise';
import JournalPrompt from './JournalPrompt';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatInterfaceProps {
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const [inputValue, setInputValue] = useState('');
  const { sendMessage, isLoading } = useChat();
  const { messages, animatedMessageIds } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [showJournalPrompt, setShowJournalPrompt] = useState(false);
  const [lastMessageIndex, setLastMessageIndex] = useState(() => messages.length > 0 ? messages.length - 1 : -1);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showBreathingExercise, showJournalPrompt]);

  useEffect(() => {
    setLastMessageIndex(messages.length - 1);
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      const sentMessage = sendMessage(inputValue);
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
    if (!isoString) return '';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error("Error formatting time:", isoString, error);
      return 'Invalid date';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={cn("glass-card flex flex-col h-full", className)}>
      <div className="px-4 py-3 border-b border-mental-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
          <h3 className="font-medium">MentalHealthChat</h3>
        </div>
      </div>
      
      <ScrollArea className="flex-1 overflow-auto">
        <div className="p-4 space-y-4">
          {messages.map((message, index) => (
            <ThoughtBubble
              key={message.id}
              messageId={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={formatTime(message.timestamp)}
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
            <div className="my-4 animate-slide-up opacity-0" style={{animationDelay: '100ms'}}>
              <ThoughtBubble
                messageId={'breathing-intro-' + Date.now()}
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
            <div className="my-4 animate-slide-up opacity-0" style={{animationDelay: '100ms'}}>
              <ThoughtBubble
                messageId={'journal-intro-' + Date.now()}
                message="Reflecting on your thoughts can be helpful. Here's a prompt to get you started:"
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

      <div className="p-4 border-t border-mental-100 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-1"
            onKeyDown={handleKeyDown}
          />
          <Button type="submit" disabled={isLoading || !inputValue.trim()}>
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
