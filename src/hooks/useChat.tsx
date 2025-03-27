
import { useState, useEffect, useCallback } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatOptions {
  initialMessages?: Message[];
  systemPrompt?: string;
}

const defaultSystemPrompt = `
You are MentalHealthChat, an AI assistant focused on supporting mental wellbeing. 
Your responses should be empathetic, supportive, and helpful. 
Provide guidance on stress management, emotional wellbeing, and mindfulness.
Suggest practical exercises when appropriate.
If the user seems to be in crisis, gently suggest professional help.
`;

export const useChat = (options: ChatOptions = {}) => {
  const [messages, setMessages] = useState<Message[]>(
    options.initialMessages || [
      {
        id: '1',
        text: "Hi there! I'm MentalHealthChat, your supportive companion. How are you feeling today?",
        isUser: false,
        timestamp: new Date().toISOString()
      }
    ]
  );
  
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((text: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const simulateResponse = useCallback(async (userMessage: string) => {
    setIsLoading(true);
    
    try {
      // This simulates an API call to a model like GPT
      // In a real app, this would be replaced with an actual API call
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // List of predefined responses based on keywords
      const responses: Record<string, string> = {
        stress: "It sounds like you're dealing with stress. Taking deep breaths can help. Would you like to try a quick breathing exercise?",
        anxiety: "Anxiety can be challenging. Remember that focusing on the present moment can help ground you. Would you like to try a mindfulness exercise?",
        sad: "I'm sorry you're feeling sad. Sometimes acknowledging our emotions is the first step toward feeling better. Would you like to journal about what you're experiencing?",
        tired: "Feeling tired is common. Make sure you're getting enough rest and taking breaks when needed. What's your sleep routine like?",
        happy: "I'm so glad you're feeling happy! It's wonderful to celebrate positive emotions. What contributed to this feeling?",
        angry: "It's okay to feel angry sometimes. Processing this emotion in healthy ways is important. Have you tried physical activity to release some tension?",
        default: "Thank you for sharing. How else can I support you today? I'm here to listen and offer guidance on managing your emotional wellbeing."
      };
      
      // Simple keyword matching
      const lowerMessage = userMessage.toLowerCase();
      let responseText = responses.default;
      
      for (const [keyword, response] of Object.entries(responses)) {
        if (lowerMessage.includes(keyword)) {
          responseText = response;
          break;
        }
      }
      
      // Add AI response
      addMessage(responseText, false);
    } catch (error) {
      console.error("Error in chat response:", error);
      addMessage("I'm having trouble responding right now. Please try again in a moment.", false);
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    
    const userMessage = addMessage(text, true);
    simulateResponse(text);
    
    return userMessage;
  }, [addMessage, simulateResponse]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        text: "Hi there! I'm MentalHealthChat, your supportive companion. How are you feeling today?",
        isUser: false,
        timestamp: new Date().toISOString()
      }
    ]);
  }, []);

  return {
    messages,
    sendMessage,
    clearMessages,
    isLoading
  };
};
