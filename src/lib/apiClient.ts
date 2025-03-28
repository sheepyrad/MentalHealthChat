
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
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: apiKey,
    dangerouslyAllowBrowser: true, // Allow browser usage
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
      return `This is a placeholder response. Please set a DeepSeek API key in your .env.local file to get real responses. You said: "${message}"`;
    }
    
    console.log("Calling DeepSeek API with:", { message, systemPrompt });
    
    const response = await openaiClient.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      model: "deepseek/deepseek-chat-v3-0324:free",
      response_format: { type: 'json_object' }
    });
    
    const content = response.choices[0].message.content;
    
    // Parse JSON response if it's valid JSON
    try {
      if (content) {
        // Check if it's a valid JSON string
        const jsonResponse = JSON.parse(content);
        // If there's a 'response' field, use that, otherwise return the whole JSON as string
        if (jsonResponse.response) {
          return jsonResponse.response;
        }
        return content;
      }
      return "No content returned from API";
    } catch (e) {
      // If it's not valid JSON, return as-is
      console.log("Response is not valid JSON, returning as is", content);
      return content || "No content returned from API";
    }
    
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
