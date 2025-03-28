
import { toast } from '@/components/ui/use-toast';
import OpenAI from 'openai';

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

/**
 * Creates a function that uses the DeepSeek API with OpenAI SDK format
 */
export const createDeepSeekApiFunction = (apiKey: string) => {
  return async (message: string, systemPrompt: string): Promise<string> => {
    try {
      console.log("Calling DeepSeek API with message:", message.substring(0, 50) + "...");
      
      const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: apiKey,
      });

      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        model: "deepseek-chat",
      });

      const response = completion.choices[0].message.content;
      return response || "No response received";
      
    } catch (error: any) {
      console.error("DeepSeek API call failed:", error);
      
      let errorMessage = "Failed to get a response from DeepSeek API";
      if (error.status === 401) {
        errorMessage = "Invalid API key. Please check your DeepSeek API key.";
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      toast({
        title: "API Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      // Return a user-friendly error message
      return `I encountered an error: ${errorMessage}. Please try again or check your API key.`;
    }
  };
};

