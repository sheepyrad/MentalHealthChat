// --- Constants --- 

const DOC_FILENAMES = [
  'common_mental_disorder.md',
  'MentakHealthAI_guidebook.md',
  'ISASmeasure.md',
  'interviewer_manual.md',
  'CDI-patient-version.md'
];

const PRIMARY_MODEL = 'google/gemini-2.0-flash-lite-001';
const FALLBACK_MODEL = 'meta-llama/llama-4-maverick';

// Define the expected structure for API messages
interface ApiMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// --- Context Loading (remains the same) --- 

/**
 * Fetches context strings from Markdown files in the public/docs directory.
 * @returns A promise that resolves to a single string containing all concatenated document contexts, or an error message string.
 */
export async function loadContextFromDocs(): Promise<string> {
  try {
    const fetchPromises = DOC_FILENAMES.map(filename =>
      fetch(`/docs/${filename}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} for ${filename}`);
          }
          return response.text();
        })
    );
    const contents = await Promise.all(fetchPromises);
    console.log(`Loaded context from ${contents.length} documents.`);
    return contents.join('\n\n---\n\n'); // Join with separator
  } catch (error) {
    console.error("Error loading context from documents:", error);
    // Rethrow or return specific error structure if needed downstream
    // Returning error message string for now
    return `Error loading context: ${error instanceof Error ? error.message : String(error)}`; 
  }
}

// --- Streaming Chat Response (using fetch, SSE, and OpenRouter routing) --- 

interface StreamCallbacks {
  onChunk: (chunk: string) => void;
  // onFallbackStart is removed as OpenRouter handles routing internally
  onError: (error: Error) => void;
}

/**
 * Streams a chat response directly from OpenRouter API using fetch and SSE,
 * leveraging OpenRouter's internal model routing/fallback.
 */
export async function streamOpenRouterResponse(
  apiKey: string,
  currentMessages: ApiMessage[], 
  docContext: string,
  callbacks: StreamCallbacks
): Promise<void> {

  // --- Construct Request --- 
  const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
  };

  const messagesToSend: ApiMessage[] = [
      {
        role: 'system',
      content: `You are Menti, an AI companion whose mission is to provide a psychologically safe, empathetic, and culturally sensitive conversational space—especially for users in Hong Kong—to explore feelings, 
                reflect, and discover self‑support strategies. Menti is not a licensed therapist and never offers medical advice or diagnoses. Speaking in warm, gentle, Cantonese‑friendly English (and switching 
                languages when the user does), Menti paraphrases rather than repeats users’ feelings, uses short jargon‑free sentences, and keeps a calm, even tone.
                
                Guided by five core principles—empathy before efficiency, user autonomy, cultural sensitivity, confidentiality and respect, and full transparency about being an AI— Menti practises active listening, labels emotions tentatively,
                and suggests grounding or coping ideas only after genuine validation, slowing the pace whenever distress is high and continually encouraging self‑compassion.
                Menti does not diagnose, prescribe medication, or guarantee outcomes. If a user mentions self‑harm or harm to others, Menti remains calm and empathic, validates the pain, and—only if appropriate— gently suggests professional help 
                such as Samaritans Hong Kong (2896 0000) or Open Up (openup.hk), always asking permission before sharing more resources; if the user discloses an imminent plan, Menti repeats these steps once and encourages contacting emergency services (dial 999 in HK) while staying present.

                A typical exchange begins with a welcome that emphasises psychological safety and anonymity, invites the user’s story, deepens understanding through open questions and strength‑affirming reflections, and ends by summarising key points, reinforcing autonomy, and inviting the user to return.
                Menti must never judge, lecture, minimise feelings, mention internal policies or developer instructions, collect data beyond the conversation, or claim professional credentials. The overarching aim is simple: help every user feel seen, heard, and a little less alone—one gentle, authentic exchange at a time.  

                Last but not least, there are some important things to note, I have provided you below as some context.
          
                Use the following context... 
                Context:\n---\n${docContext}\n---\n`,
      },
      ...currentMessages, 
  ];

  const body = JSON.stringify({
      // Provide models in preferred order for OpenRouter routing
      models: [PRIMARY_MODEL, FALLBACK_MODEL], 
      messages: messagesToSend,
      stream: true, 
  });

  // --- Execute Fetch and Process Stream --- 
  let response;
  try {
      console.log(`Attempting to stream via fetch with models: [${PRIMARY_MODEL}, ${FALLBACK_MODEL}]...`);
      response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: headers,
          body: body,
      });

      if (!response.ok) {
          let errorBody = 'Unknown error';
          try {
              errorBody = await response.text();
          } catch { /* Ignore */ }
          throw new Error(`HTTP error! status: ${response.status} ${response.statusText}. Body: ${errorBody}`);
      }

      if (!response.body) {
          throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let streamProcessed = false; // Track if we got any valid data or DONE

      while (true) {
          const { done, value } = await reader.read();
          if (done) {
              console.log('Stream finished.');
              if (!streamProcessed) {
                 // This case might happen if the stream ends abruptly *before* [DONE]
                 // or yielding any data, potentially indicating an upstream issue.
                 console.warn('Stream finished, but no [DONE] signal or data chunks were processed.');
                 // We might trigger onError here, depending on desired behavior.
                 // callbacks.onError(new Error('Stream ended unexpectedly without completion signal or data.'));
              }
              break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; 

          for (const line of lines) {
              if (line.startsWith('data: ')) {
                  const dataContent = line.substring(6).trim();
                  if (dataContent === '[DONE]') {
                      console.log('Received [DONE] signal.');
                      streamProcessed = true; // Mark as processed
                      // No need to break here, let the reader finish naturally if more empty packets come
                  } else {
                      try {
                          const parsed = JSON.parse(dataContent);
                          const delta = parsed.choices?.[0]?.delta?.content;
                          if (delta) {
                              callbacks.onChunk(delta);
                              streamProcessed = true; // Mark as processed
                          }
                      } catch (e) {
                          console.error('Error parsing SSE data line:', dataContent, e);
                          // Trigger error callback for fatal parsing errors
                          callbacks.onError(new Error(`Failed to parse streaming data: ${e instanceof Error ? e.message : String(e)}`));
                          // Optionally try to cancel the reader/stream here
                          return; // Stop processing on parsing error
                      }
                  }
              }
          }
      }
      
      if (!streamProcessed) {
          // If the loop finished (done=true) but we never processed a chunk or DONE
          console.warn('Stream completed, but no valid data or DONE signal was received.');
          // Depending on strictness, could be an error:
          // callbacks.onError(new Error('Stream finished without providing data or a completion signal.'));
      }

  } catch (err) {
      console.error(`Error fetching/streaming from OpenRouter:`, err);
      // Pass the caught error to the callback
      callbacks.onError(err instanceof Error ? err : new Error(String(err))); 
  }
  // Function completes (void promise)
} 