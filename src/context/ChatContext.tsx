import React, { createContext, useState, useContext, useCallback, ReactNode, useMemo } from 'react';
import { Message } from '@/hooks/useChat'; // Assuming Message type is exported from useChat

interface ChatContextType {
  messages: Message[];
  addMessage: (text: string, isUser: boolean) => Message;
  clearMessages: () => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>; // Allow direct setting if needed
  animatedMessageIds: Set<string>; // Track animated messages
  markAsAnimated: (id: string) => void; // Function to mark as animated
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialMessage: Message = useMemo(() => ({
    id: '1',
    text: "Hi there! I'm BookChat, to chat about A chirstmas carol, the book by Charles Dickens. How can I help you?",
    isUser: false,
    timestamp: new Date().toISOString(),
  }), []);

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [animatedMessageIds, setAnimatedMessageIds] = useState<Set<string>>(() => new Set([initialMessage.id])); // Initialize with initial message ID

  const addMessage = useCallback((text: string, isUser: boolean): Message => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
    // Don't add user messages or initial AI message to animated set here
    return newMessage;
  }, []);

  const markAsAnimated = useCallback((id: string) => {
    setAnimatedMessageIds(prev => new Set(prev).add(id));
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([initialMessage]);
    setAnimatedMessageIds(new Set([initialMessage.id])); // Reset animated set
  }, [initialMessage]);

  const contextValue = useMemo(() => ({
    messages,
    addMessage,
    clearMessages,
    setMessages,
    animatedMessageIds,
    markAsAnimated
  }), [messages, addMessage, clearMessages, animatedMessageIds, markAsAnimated]);

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}; 