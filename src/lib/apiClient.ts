import { toast } from '@/components/ui/use-toast';
import { z } from 'zod'; // Import Zod
import axios, { AxiosError, AxiosResponse } from 'axios'; // Import axios
// zodToJsonSchema is no longer needed as we don't pass a schema
// import { zodToJsonSchema } from 'zod-to-json-schema'; // Import schema converter

// Define the structure for conversation history entries (matching official UI)
export interface Message {
  role: 'user' | 'assistant'; // Keep role consistent
  content: string;
}

// Define the structure for the request body matching official UI fields
export interface LightragQueryRequest {
  query: string;
  conversation_history?: Message[];
  mode?: 'naive' | 'local' | 'global' | 'hybrid' | 'mix';
  response_type?: string; // e.g., "Multiple Paragraphs"
  top_k?: number;
  max_token_for_text_unit?: number;
  max_token_for_global_context?: number;
  max_token_for_local_context?: number;
  history_turns?: number;
  only_need_prompt?: boolean; // Add optional only_need_prompt field
  // system_prompt?: string; // Removed system_prompt field
  // Add other fields like hl_keywords, ll_keywords etc. if needed
}

const LightragResponseSchema = z.object({
  response: z.string().describe("The main text response from the RAG system.")
});

// Infer the TypeScript type from the Zod schema for the response
export type LightragQueryResponse = z.infer<typeof LightragResponseSchema>;


const backendBaseUrl = import.meta.env.VITE_LIGHTRAG_BASE_URL || 'http://localhost:9621'; 

const axiosInstance = axios.create({
  baseURL: backendBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});



/**
 * Call the local LightRAG Server native /query endpoint using Axios.
 * Accepts a request object similar to the official WebUI's QueryRequest.
 */
export const callLightragQueryApi = async (
  request: LightragQueryRequest,
): Promise<LightragQueryResponse> => { 
  try {
    // Ensure history is at least an empty array if not provided
    const payload = {
        ...request,
        conversation_history: request.conversation_history ?? []
    };
    console.log("Calling LightRAG Server (/query) via Axios with payload:", payload);

    // Use axiosInstance to make the POST request
    const response = await axiosInstance.post<LightragQueryResponse>('/query', payload);

    // Axios automatically parses JSON response, access via response.data
    const data = response.data; 
    console.log("Raw LightRAG /query response (from Axios):", data);

    // Validate the response structure directly using Zod
    try {
      const structuredContent = LightragResponseSchema.parse(data); 
      console.log("LightRAG /query schema-validated response received:", structuredContent);
      return structuredContent;
    } catch (validationError) {
      console.error("Failed to validate LightRAG /query response:", validationError);
      // Fallback if the structure is not { response: string }
      // If data is already an object, stringify might not be ideal, but needed for consistency
      return { response: typeof data === 'string' ? data : JSON.stringify(data) }; 
    }

  } catch (error) {
    // Axios interceptor might handle some errors, but catch others here
    const errorMessageStr = error instanceof Error ? error.message : String(error);
    console.error("LightRAG API (/query) call failed (Axios):", errorMessageStr);
    toast({
      title: "LightRAG API Error",
      description: `Failed to get response from the LightRAG /query endpoint. Details: ${errorMessageStr}`,
      variant: "destructive",
    });
    // Ensure the fallback matches the expected return type
    return { response: "Sorry, I couldn't connect to the LightRAG service or process its response correctly. Please ensure LightRAG is running and accessible." };
  }
};

export const callOllamaApi = callLightragQueryApi;
