import { useState, useEffect, useCallback } from 'react';
import { callLightragQueryApi, LightragQueryResponse, LightragQueryRequest, Message as ApiMessage } from '@/lib/apiClient';
import { useChatContext } from '@/context/ChatContext'; // Import the context hook

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export interface ChatOptions {
  initialMessages?: Message[]; // This will likely be unused now, but kept for interface consistency
  systemPrompt?: string;
  apiFunction?: (request: LightragQueryRequest) => Promise<LightragQueryResponse>;
}


export const useChat = (options: ChatOptions = {}) => {
  // Get state and functions from context
  const { messages, addMessage, clearMessages } = useChatContext();
  
  const [isLoading, setIsLoading] = useState(false);
  // Remove systemPrompt state if it's only used for the API call
  // const [systemPrompt, setSystemPrompt] = useState(options.systemPrompt || defaultSystemPrompt);
  
  // Initialize apiFunction with callLightragQueryApi as the default
  const [apiFunction, setApiFunction] = useState< (request: LightragQueryRequest) => Promise<LightragQueryResponse> >(
    () => options.apiFunction || callLightragQueryApi // Default to callLightragQueryApi
  );

  // Update API function if provided in options
  useEffect(() => {
    if (options.apiFunction) {
      setApiFunction(() => options.apiFunction! );
    } else {
      setApiFunction(() => callLightragQueryApi); // Default to callLightragQueryApi
    }
  }, [options.apiFunction]);

  // Remove effect for systemPrompt if state is removed
  // useEffect(() => { ... }, [options.systemPrompt]);

  const callApiWithRetry = useCallback(async (
    userMessageText: string, 
    retryCount = 0, 
    maxRetries = 3
  ): Promise<LightragQueryResponse> => {
    try {
      if (typeof apiFunction !== 'function') {
        console.error('API function is not properly initialized:', apiFunction);
        return { response: "I'm having trouble connecting to my brain right now. Please try again in a moment." };
      }
      
      // Format current messages for history
      const formattedHistory: ApiMessage[] = messages.map(msg => ({
          role: msg.isUser ? 'user' : 'assistant',
          content: msg.text
      }));

      // Construct the request object, adding only_need_prompt: true
      const requestPayload: LightragQueryRequest = {
        query: userMessageText,
        conversation_history: formattedHistory,
        mode: "naive", 
        response_type: "Multiple Paragraphs",
        top_k: 60,
        max_token_for_text_unit: 4000,
        max_token_for_global_context: 4000,
        max_token_for_local_context: 4000,
        history_turns: 3,
        only_need_prompt: false // Request the prompt instead of the response
      };
      
      // Pass the request object to the apiFunction
      console.log("Sending payload requesting prompt only:", requestPayload);
      const result = await apiFunction(requestPayload); 
      // The result.response field will contain the prompt text
      console.log("Received prompt in response field:", result.response);
      return result; 
    } catch (error) {
      console.error("API call error during retry attempt:", error);
      if (retryCount < maxRetries) {
        console.log(`Retrying API call (${retryCount + 1}/${maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
        // Pass only userMessageText in recursive call (history will be recalculated)
        return callApiWithRetry(userMessageText, retryCount + 1, maxRetries);
      }
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during the API call.";
      return { response: errorMessage };
    }
  }, [apiFunction, messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message *before* calling API so it's part of the history calculation
    const userMessage = addMessage(text, true); // Use addMessage from context
    setIsLoading(true);
    
    try {
      // callApiWithRetry constructs the request object internally now
      const structuredResponse = await callApiWithRetry(text);
      
      addMessage(structuredResponse.response, false); // Use addMessage from context
      
    } catch (error) { 
      console.error("Failed to get response in sendMessage:", error);
      const errorText = (error as LightragQueryResponse)?.response || "I'm having trouble responding right now. Please try again in a moment.";
      addMessage(errorText, false);
    } finally {
      setIsLoading(false);
    }
    
    return userMessage;
  }, [addMessage, callApiWithRetry]);

  // Function to update the API (remains local to the hook usage)
  const updateApiFunction = useCallback((newApiFunction: (request: LightragQueryRequest) => Promise<LightragQueryResponse>) => {
    if (typeof newApiFunction === 'function') {
      setApiFunction(() => newApiFunction);
    } else {
      console.error('Attempted to update apiFunction with a non-function value:', newApiFunction);
    }
  }, []);

  return {
    messages, // From context
    sendMessage,
    clearMessages, // From context
    isLoading,
    updateApiFunction,
    // setSystemPrompt 
  };
};
