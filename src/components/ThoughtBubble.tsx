
import React from 'react';
import { cn } from '@/lib/utils';

interface ThoughtBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  className?: string;
}

const ThoughtBubble: React.FC<ThoughtBubbleProps> = ({ 
  message, 
  isUser, 
  timestamp,
  className
}) => {
  return (
    <div className={cn(
      "animate-slide-up opacity-0",
      isUser ? "ml-auto" : "mr-auto",
      className
    )}>
      <div className={cn(
        "max-w-[85%] px-5 py-3 rounded-2xl shadow-soft",
        isUser 
          ? "bg-mental-500 text-white rounded-tr-sm ml-auto" 
          : "glass rounded-tl-sm mr-auto"
      )}>
        <p className="text-balance">{message}</p>
      </div>
      {timestamp && (
        <p className={cn(
          "text-xs mt-1 opacity-60",
          isUser ? "text-right" : "text-left"
        )}>
          {timestamp}
        </p>
      )}
    </div>
  );
};

export default ThoughtBubble;
