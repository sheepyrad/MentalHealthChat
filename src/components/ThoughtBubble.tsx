import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface ThoughtBubbleProps {
  messageId: string;
  message: string;
  isUser: boolean;
  timestamp?: string;
  className?: string;
  animationDelay?: string;
}

const ThoughtBubble: React.FC<ThoughtBubbleProps> = ({ 
  messageId,
  message, 
  isUser, 
  timestamp,
  className,
  animationDelay = '0s',
}) => {
  return (
    <div 
      className={cn(
        "animate-slide-up-fade opacity-0",
        isUser ? "ml-auto" : "mr-auto",
        className
      )}
      style={{ animationDelay }}
    >
      <div className={cn(
        "max-w-[85%] px-5 py-3 rounded-2xl shadow-soft prose prose-sm dark:prose-invert",
        "prose-p:my-1 prose-li:my-0.5",
        isUser 
          ? "bg-mental-500 text-white rounded-tr-sm ml-auto" 
          : "glass rounded-tl-sm mr-auto"
      )}>
        <ReactMarkdown
          components={{
          }}
        >
          {message} 
        </ReactMarkdown>
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
