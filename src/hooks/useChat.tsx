import { useState, useEffect, useCallback } from 'react';
import { useChatContext } from '@/context/ChatContext';
import { loadContextFromDocs, streamOpenRouterResponse } from '@/lib/openRouterClient';

// Keep Message interface consistent with ChatContext
export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export const useChat = () => {
  // Get state and functions from context
  const { messages, addMessage, appendAssistantChunk, clearMessages } = useChatContext();
  
  const [isLoading, setIsLoading] = useState(false);
  const [docContext, setDocContext] = useState<string | null>(null);
  const [contextLoading, setContextLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load document context on mount using the imported function
  useEffect(() => {
    const loadContext = async () => {
      setContextLoading(true);
      setError(null);
      try {
        const context = await loadContextFromDocs();
        // Check if the context loader returned an error message
        if (context.startsWith('Error loading context:')) {
            throw new Error(context); // Throw to handle in catch block
        }
        setDocContext(context);
      } catch (err) { // Catch potential errors from loadContextFromDocs 
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.error("Failed to load doc context in hook:", errorMsg);
        setError(`Failed to load background information: ${errorMsg}`);
        // Optionally set docContext to null or a specific error indicator
        setDocContext(null); 
      } finally {
        setContextLoading(false);
      }
    };
    loadContext();
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return; // Don't send empty messages
    
    if (contextLoading) {
      console.warn("Context is still loading. Please wait.");
      // Optionally provide feedback to user, e.g., via toast or message
      appendAssistantChunk("\n*(Still loading background information...)*\n");
      return;
    }
    if (docContext === null) {
      console.error("Document context failed to load or wasn't set properly. Cannot send message.");
      appendAssistantChunk("\n*(Error: Background information missing. Cannot send message.)*\n");
      setError("Background information failed to load. Please try refreshing.");
      return;
    }

    // Add user message optimistically to the UI
    addMessage(text, true);
    setIsLoading(true);
    setError(null);

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error("OpenRouter API key is not set in .env file (VITE_OPENROUTER_API_KEY).");
      appendAssistantChunk("\n*(Configuration error: Missing API Key. Cannot connect.)*\n");
      setError("Configuration error: Missing API Key.")
      setIsLoading(false);
      return;
    }

    // Prepare the message history for the API call
    const currentMessagesForApi = [ 
        ...messages.map(msg => ({
            role: msg.isUser ? 'user' : 'assistant' as 'user' | 'assistant',
            content: msg.text,
        })), 
        { role: 'user' as const, content: text } 
    ];

    try {
        await streamOpenRouterResponse(
            apiKey, 
            currentMessagesForApi as Array<{ role: 'system' | 'user' | 'assistant', content: string }>, 
            docContext!, 
            {
                onChunk: appendAssistantChunk,
                onError: (err) => {
                    console.error("Streaming error reported by client:", err);
                    setError(`Sorry, I encountered an issue: ${err.message}`);
                    appendAssistantChunk(`\n*(Error: ${err.message})*\n`);
                }
            }
        );
    } catch (err) { // Catch unexpected errors from the client function itself
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("Unexpected error calling streamOpenRouterResponse:", errorMsg);
      setError(`An unexpected error occurred: ${errorMsg}`);
      appendAssistantChunk(`\n*(Unexpected error occurred during request.)*\n`);
    } finally {
        // Always ensure loading state is reset
        setIsLoading(false); 
    }
    
  }, [addMessage, appendAssistantChunk, messages, docContext, contextLoading]); // Dependencies updated

  return {
    messages, // from context
    sendMessage,
    clearMessages, // from context
    isLoading, // local state
    contextLoading, // local state 
    error, // local state
  };
};
