const STORAGE_KEY = 'userRoutines';

// Get the list of routine IDs from localStorage
export const getUserRoutines = (): string[] => {
  const storedRoutines = localStorage.getItem(STORAGE_KEY);
  return storedRoutines ? JSON.parse(storedRoutines) : [];
};

// Add a routine ID to localStorage
export const addUserRoutine = (id: string) => {
  const routines = getUserRoutines();
  if (!routines.includes(id)) {
    routines.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
  }
};

// Remove a routine ID from localStorage
export const removeUserRoutine = (id: string) => {
  let routines = getUserRoutines();
  routines = routines.filter(routineId => routineId !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(routines));
};

// Check if a routine ID is already in localStorage
export const isRoutineAdded = (id: string): boolean => {
  const routines = getUserRoutines();
  return routines.includes(id);
}; 