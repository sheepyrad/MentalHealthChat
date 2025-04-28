export interface MoodEntry {
  id: string;
  moodValue: number; // 1-5
  moodLabel: string; // e.g., 'Good', 'Bad'
  note?: string; // Optional note
  createdAt: number; // Timestamp
}

const STORAGE_KEY = 'moodEntries';

// --- Helper Functions ---

const getStoredEntries = (): MoodEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  try {
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error parsing mood entries:", error);
    return [];
  }
};

const saveEntries = (entries: MoodEntry[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

// --- Public API ---

// Get all mood entries, sorted by creation date (newest first)
export const getMoodEntries = (): MoodEntry[] => {
  return getStoredEntries().sort((a, b) => b.createdAt - a.createdAt);
};

// Add a new mood entry
export const addMoodEntry = (entryData: Omit<MoodEntry, 'id' | 'createdAt'>): MoodEntry => {
  const entries = getStoredEntries();
  const newEntry: MoodEntry = {
    ...entryData,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  entries.push(newEntry);
  saveEntries(entries);
  return newEntry;
};

// --- Dev Helper --- 
// USE WITH CAUTION: Overwrites all entries. For simulating time shifts.
export const saveAllMoodEntries = (entries: MoodEntry[]) => {
  saveEntries(entries);
};

// (Optional: Add update/delete functions if needed later) 