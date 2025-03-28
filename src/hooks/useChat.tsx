
import { useState, useEffect, useCallback } from 'react';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export interface ChatOptions {
  initialMessages?: Message[];
  systemPrompt?: string;
  apiFunction?: (message: string, systemPrompt: string) => Promise<string>;
}

const defaultSystemPrompt = `
You are MentalHealthChat, an AI assistant focused on supporting mental wellbeing. 
Your responses should be empathetic, supportive, and helpful. 
Provide guidance on stress management, emotional wellbeing, and mindfulness.
Suggest practical exercises when appropriate.
If the user seems to be in crisis, gently suggest professional help.
`;

// Default mock API implementation
const mockApiResponse = async (message: string, systemPrompt: string): Promise<string> => {
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
  const lowerMessage = message.toLowerCase();
  let responseText = responses.default;
  
  for (const [keyword, response] of Object.entries(responses)) {
    if (lowerMessage.includes(keyword)) {
      responseText = response;
      break;
    }
  }
  
  return responseText;
};

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
  const [systemPrompt, setSystemPrompt] = useState(options.systemPrompt || defaultSystemPrompt);
  const [apiFunction, setApiFunction] = useState<(message: string, systemPrompt: string) => Promise<string>>(
    options.apiFunction || mockApiResponse
  );

  // Update API function if provided in options
  useEffect(() => {
    if (options.apiFunction) {
      setApiFunction(() => options.apiFunction!);
    }
  }, [options.apiFunction]);

  // Update system prompt if provided in options
  useEffect(() => {
    if (options.systemPrompt) {
      setSystemPrompt(options.systemPrompt);
    }
  }, [options.systemPrompt]);

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

  const callApiWithRetry = useCallback(async (
    userMessage: string, 
    retryCount = 0, 
    maxRetries = 3
  ): Promise<string> => {
    try {
      return await apiFunction(userMessage, systemPrompt);
    } catch (error) {
      console.error("API call error:", error);
      if (retryCount < maxRetries) {
        console.log(`Retrying API call (${retryCount + 1}/${maxRetries})...`);
        // Exponential backoff: 1s, 2s, 4s...
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
        return callApiWithRetry(userMessage, retryCount + 1, maxRetries);
      }
      throw error;
    }
  }, [apiFunction, systemPrompt]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    const userMessage = addMessage(text, true);
    setIsLoading(true);
    
    try {
      const response = await callApiWithRetry(text);
      addMessage(response, false);
    } catch (error) {
      console.error("Failed to get response:", error);
      addMessage("I'm having trouble responding right now. Please try again in a moment.", false);
    } finally {
      setIsLoading(false);
    }
    
    return userMessage;
  }, [addMessage, callApiWithRetry]);

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

  // Function to update the API
  const updateApiFunction = useCallback((newApiFunction: (message: string, systemPrompt: string) => Promise<string>) => {
    setApiFunction(() => newApiFunction);
  }, []);

  return {
    messages,
    sendMessage,
    clearMessages,
    isLoading,
    updateApiFunction,
    setSystemPrompt
  };
};
