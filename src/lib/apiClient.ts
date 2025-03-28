
import { toast } from '@/components/ui/use-toast';

/**
 * Default chat API implementation - used as a fallback
 */
export const callChatApi = async (
  message: string, 
  systemPrompt: string
): Promise<string> => {
  try {
    console.log("Using default API with:", { message, systemPrompt });
    
    // Simulate a delay and return a placeholder
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `This is a placeholder response. Please set a DeepSeek API key to get real responses. You said: "${message}"`;
    
  } catch (error) {
    console.error("API call failed:", error);
    toast({
      title: "API Error",
      description: "Failed to get a response from the chat API",
      variant: "destructive",
    });
    throw error;
  }
};
