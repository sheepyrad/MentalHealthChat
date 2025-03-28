
import { toast } from '@/components/ui/use-toast';
import OpenAI from "openai";

// Initialize OpenAI client with DeepSeek API configuration
const createOpenAIClient = () => {
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
  
  if (!apiKey) {
    console.warn("DeepSeek API key not found. Using fallback response mode.");
    return null;
  }
  
  return new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: apiKey,
  });
};

/**
 * Call the DeepSeek API using OpenAI SDK
 */
export const callChatApi = async (
  message: string, 
  systemPrompt: string
): Promise<string> => {
  try {
    const openaiClient = createOpenAIClient();
    
    if (!openaiClient) {
      // Fallback to default mock response if no API key
      await new Promise(resolve => setTimeout(resolve, 1000));
      return `This is a placeholder response. Please set a DeepSeek API key in your .env file to get real responses. You said: "${message}"`;
    }
    
    console.log("Calling DeepSeek API with:", { message, systemPrompt });
    
    const completion = await openaiClient.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      model: "deepseek-chat",
    });
    
    return completion.choices[0].message.content || "No response from API";
    
  } catch (error) {
    console.error("API call failed:", error);
    toast({
      title: "API Error",
      description: "Failed to get a response from the DeepSeek API",
      variant: "destructive",
    });
    throw error;
  }
};
