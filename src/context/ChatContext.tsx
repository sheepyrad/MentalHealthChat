import React, { createContext, useState, useContext, useCallback, ReactNode, useMemo } from 'react';
import { Message } from '@/hooks/useChat'; // Assuming Message type is exported from useChat

interface ChatContextType {
  messages: Message[];
  addMessage: (text: string, isUser: boolean) => Message;
  appendAssistantChunk: (chunk: string) => void;
  clearMessages: () => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>; // Allow direct setting if needed
  animatedMessageIds: Set<string>; // Track animated messages
  markAsAnimated: (id: string) => void; // Function to mark as animated
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialMessage: Message = useMemo(() => ({
    id: '1',
    text: "Hi there. I'm Menti, here to talk with you—no pressure, no judgment. Whatever's on your mind, you're welcome to share it at your own pace. This is a safe space just for you, and we can take things one step at a time. 😊",
    isUser: false,
    timestamp: new Date().toISOString(),
  }), []);

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [animatedMessageIds, setAnimatedMessageIds] = useState<Set<string>>(() => new Set([initialMessage.id])); // Initialize with initial message ID

  const addMessage = useCallback((text: string, isUser: boolean): Message => {
    const newMessage: Message = {
      id: Date.now().toString() + (isUser ? '-user' : '-ai'),
      text,
      isUser,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
    // Don't add user messages or initial AI message to animated set here
    return newMessage;
  }, []);

  const appendAssistantChunk = useCallback((chunk: string) => {
    setMessages(prevMessages => {
      if (prevMessages.length === 0) {
        const newMessage: Message = {
          id: Date.now().toString() + '-ai-chunk',
          text: chunk,
          isUser: false,
          timestamp: new Date().toISOString(),
        };
        return [newMessage];
      }

      const lastMessage = prevMessages[prevMessages.length - 1];

      if (!lastMessage.isUser) {
        const updatedLastMessage = {
          ...lastMessage,
          text: lastMessage.text + chunk,
        };
        return [...prevMessages.slice(0, -1), updatedLastMessage];
      } else {
        const newMessage: Message = {
          id: Date.now().toString() + '-ai-chunk',
          text: chunk,
          isUser: false,
          timestamp: new Date().toISOString(),
        };
        return [...prevMessages, newMessage];
      }
    });
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
    appendAssistantChunk,
    clearMessages,
    setMessages,
    animatedMessageIds,
    markAsAnimated
  }), [messages, addMessage, appendAssistantChunk, clearMessages, animatedMessageIds, markAsAnimated]);

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