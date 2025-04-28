export interface JournalEntry {
  id: string;
  title: string;
  body: string;
  createdAt: number; // Store timestamp for easy sorting
  isPrivate: boolean;
}

const STORAGE_KEY = 'journalEntries';

// --- Helper Functions ---

const getStoredEntries = (): JournalEntry[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  try {
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error parsing journal entries:", error);
    return []; // Return empty array on error
  }
};

const saveEntries = (entries: JournalEntry[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

// --- Public API ---

// Get all journal entries, sorted by creation date (newest first)
export const getJournalEntries = (): JournalEntry[] => {
  return getStoredEntries().sort((a, b) => b.createdAt - a.createdAt);
};

// Get a single journal entry by ID
export const getJournalEntryById = (id: string): JournalEntry | undefined => {
  return getStoredEntries().find(entry => entry.id === id);
};

// Add a new journal entry
export const addJournalEntry = (entryData: Omit<JournalEntry, 'id' | 'createdAt'>): JournalEntry => {
  const entries = getStoredEntries();
  const newEntry: JournalEntry = {
    ...entryData,
    id: crypto.randomUUID(), // Generate a unique ID
    createdAt: Date.now(),
  };
  entries.push(newEntry);
  saveEntries(entries);
  return newEntry;
};

// Update an existing journal entry
export const updateJournalEntry = (updatedEntry: JournalEntry): JournalEntry | undefined => {
  const entries = getStoredEntries();
  const index = entries.findIndex(entry => entry.id === updatedEntry.id);
  if (index !== -1) {
    entries[index] = updatedEntry;
    saveEntries(entries);
    return updatedEntry;
  } else {
    console.warn(`Journal entry with id ${updatedEntry.id} not found for update.`);
    return undefined;
  }
};

// Delete a journal entry by ID
export const deleteJournalEntry = (id: string): boolean => {
  const entries = getStoredEntries();
  const initialLength = entries.length;
  const filteredEntries = entries.filter(entry => entry.id !== id);
  if (filteredEntries.length < initialLength) {
    saveEntries(filteredEntries);
    return true; // Deletion successful
  }
  return false; // Entry not found
}; 