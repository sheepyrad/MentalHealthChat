import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  messageId: string;
  text: string;
  delay?: number;
  onComplete?: (id: string) => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  messageId,
  text, 
  delay = 30,
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) {
      if (!isComplete) {
        setIsComplete(true);
        onComplete?.(messageId);
      }
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.(messageId);
    }
  }, [currentIndex, delay, text, isComplete, onComplete, messageId]);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  return <>{displayedText}</>;
};

export default TypewriterText;
