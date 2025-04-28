import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ThoughtBubble from './ThoughtBubble';

interface MockChatWindowProps {
  className?: string;
}

const MockChatWindow: React.FC<MockChatWindowProps> = ({ className }) => {
  return (
    <div className={cn("glass-card flex flex-col h-[500px] shadow-lg rounded-lg overflow-hidden", className)}>
      {/* Header */}
      <div className="px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
          <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">MentalHealthChat</h3>
        </div>
        <div className="flex space-x-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Mock Message Area */}
      <div className="flex-1 overflow-auto p-4 space-y-4 bg-white dark:bg-gray-900">
        {/* AI Message */}
        <ThoughtBubble 
          messageId="mock-ai-1"
          message="Hi there! How are you feeling today?"
          isUser={false}
          timestamp="10:30 AM"
          className="opacity-100 animate-none"
        />
        {/* User Message */}
        <ThoughtBubble 
          messageId="mock-user-1"
          message="Feeling a bit stressed..."
          isUser={true}
          timestamp="10:31 AM"
          className="opacity-100 animate-none"
        />
         {/* AI Message */}
        <ThoughtBubble 
          messageId="mock-ai-2"
          message="I'm here to listen. Tell me more about it."
          isUser={false}
          timestamp="10:31 AM"
          className="opacity-100 animate-none"
        />
        {/* Typing Indicator */}
        <div className="flex items-center space-x-1 ml-2 opacity-50 pt-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>

      {/* Mock Input Area */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            disabled // Make it non-interactive
            className="flex-1 bg-white dark:bg-gray-700"
          />
          <Button disabled>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default MockChatWindow; 