import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import SidebarNav from '@/components/SidebarNav';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { routineItems, RoutineItem } from '@/data/routines.tsx';
import { getUserRoutines, removeUserRoutine } from '@/lib/routineStorage.ts';

// --- Journaling Imports ---
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lock, Unlock, PlusCircle, Edit, Trash2 } from 'lucide-react';
import {
    getJournalEntries,
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    JournalEntry
} from '@/lib/journalStorage.ts';
import MoodTracker from '@/components/MoodTracker'; // Import MoodTracker component

// --- Constants ---
const HARDCODED_PIN = '1234'; // !! INSECURE !! For demonstration only.

const Routine = () => {
  const navigate = useNavigate();
  const [userRoutines, setUserRoutines] = useState<RoutineItem[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // --- Journaling State ---
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isJournalLoading, setIsJournalLoading] = useState(true);
  const [selectedJournalEntry, setSelectedJournalEntry] = useState<JournalEntry | null>(null);
  const [isJournalEditing, setIsJournalEditing] = useState(false);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [unlockedEntryIds, setUnlockedEntryIds] = useState<Set<string>>(new Set());

  // Check if journaling routine is added
  const showJournal = userRoutines.some(routine => routine.id === 'journal');
  const showMoodTracker = userRoutines.some(routine => routine.id === 'notes'); // Check for mood tracking routine

  // --- Data Loading ---
  const loadRoutines = useCallback(() => {
    const routineIds = getUserRoutines();
    const routines = routineItems.filter(item => routineIds.includes(item.id));
    setUserRoutines(routines);
  }, []);

  const loadJournalEntries = useCallback(() => {
    setIsJournalLoading(true);
    const loadedEntries = getJournalEntries();
    setJournalEntries(loadedEntries);
    setIsJournalLoading(false);
  }, []);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to access your routines",
        variant: "destructive",
      });
      navigate("/auth");
    } else {
      loadRoutines();
      loadJournalEntries();
      setHasLoaded(true);
    }
  }, [navigate, loadRoutines, loadJournalEntries]);

  // --- Routine Handlers ---
  const handleRemoveRoutine = (id: string) => {
    removeUserRoutine(id);
    loadRoutines(); // Reload routines
    toast({ title: "Routine item removed" });
  };

  // --- Journal PIN Handling ---
  const handlePinSubmit = () => {
    if (pinInput === HARDCODED_PIN) {
      if (selectedJournalEntry) {
        setUnlockedEntryIds(prev => new Set(prev).add(selectedJournalEntry.id));
        setShowPinPrompt(false);
        setPinInput('');
        setPinError('');
        // Allow view/edit now
      }
    } else {
      setPinError('Incorrect PIN');
    }
  };

  const openPinPrompt = (entry: JournalEntry) => {
    setSelectedJournalEntry(entry);
    setShowPinPrompt(true);
    setPinInput('');
    setPinError('');
  };

  // --- Journal CRUD Handlers ---
  const handleOpenJournalEntry = (entry: JournalEntry) => {
    if (entry.isPrivate && !unlockedEntryIds.has(entry.id)) {
      openPinPrompt(entry);
    } else {
      setSelectedJournalEntry(entry); // Allow view/edit
    }
  };

  const handleNewJournalEntry = () => {
    setSelectedJournalEntry(null); // Clear selection for new entry mode
    setIsJournalEditing(true);
    // Dialog trigger will open the edit dialog
  };

  const handleEditJournalEntry = (entry: JournalEntry) => {
    if (entry.isPrivate && !unlockedEntryIds.has(entry.id)) {
        openPinPrompt(entry);
    } else {
         setSelectedJournalEntry(entry);
         setIsJournalEditing(true);
         // Dialog trigger will open the edit dialog
    }
  };

  const handleDeleteJournalEntry = (id: string) => {
    if (confirm('Are you sure you want to delete this journal entry?')) {
      if (deleteJournalEntry(id)) {
        toast({ title: "Journal entry deleted" });
        loadJournalEntries(); // Refresh list
        setSelectedJournalEntry(null);
      } else {
        toast({ title: "Error deleting journal entry", variant: "destructive" });
      }
    }
  };

  const handleSaveJournalEntry = (formData: { title: string; body: string; isPrivate: boolean }) => {
    try {
      if (isJournalEditing && selectedJournalEntry) {
        updateJournalEntry({ ...selectedJournalEntry, ...formData });
        toast({ title: "Journal entry updated" });
      } else {
        addJournalEntry(formData);
        toast({ title: "Journal entry added" });
      }
      loadJournalEntries(); // Refresh list
      setIsJournalEditing(false);
      setSelectedJournalEntry(null);
      return true; // Indicate success for closing dialog
    } catch (error) {
      console.error("Error saving journal entry:", error);
      toast({ title: "Error saving journal entry", variant: "destructive" });
      return false;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  if (!hasLoaded) return null;

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-background to-mental-50/50 dark:from-gray-900 dark:to-gray-800/50 overflow-hidden">
      {/* Main Content Area - Moved First */}
      <ScrollArea className="flex-1 h-full p-6">
        <div className="max-w-4xl mx-auto">
          {/* --- Routines Section --- */}
          <div className="mb-12 pt-6 animate-slide-up opacity-0" style={{ animationDelay: '100ms' }}>
            <h1 className="text-3xl font-bold mb-2">Your Wellness Routine</h1>
            <p className="text-lg text-calm-600 dark:text-calm-400 mb-6">
              Manage your added wellness activities and exercises.
            </p>
            {userRoutines.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userRoutines.map((item) => (
                  <Card key={item.id} className="border border-mental-100 dark:border-gray-700 hover:shadow-md transition-shadow flex flex-col">
                    <CardHeader className="pb-2 flex-grow">
                      <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-full bg-mental-100 dark:bg-gray-700 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-mental-100 dark:bg-gray-700 text-mental-600 dark:text-mental-400">
                          {item.category}
                        </span>
                      </div>
                      <CardTitle className="text-xl mt-2">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-calm-600 dark:text-calm-400 text-sm">
                        {item.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-stretch gap-2 pt-3 border-t border-mental-100 dark:border-gray-700 mt-auto">
                      {/* Specific actions for certain routines */}
                      {item.id === 'breathing' && (
                        <Button variant="default" className="w-full bg-mental-500 hover:bg-mental-600" onClick={() => navigate('/exercise/breathing')}>
                          Start Exercise
                        </Button>
                      )}
                      {/* Add Journal trigger if it's the journal routine - or keep generic add/remove? */}
                      {/* For now, keep the remove button generic */}
                       <Button 
                         variant="outline" 
                         className="w-full text-red-600 border-red-500 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20"
                         onClick={() => handleRemoveRoutine(item.id)}
                       >
                         Remove
                       </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white/50 dark:bg-gray-800/30 rounded-lg">
                <p className="text-calm-600 dark:text-calm-400">You haven't added any routines yet.</p>
                <Button className="mt-4" onClick={() => navigate('/dashboard')}>Explore Routines</Button>
              </div>
            )}
          </div>

          {/* --- Mood Tracking Section (Conditional) --- */}
          {showMoodTracker && (
            <div className="mb-8 pt-8 border-t border-gray-200 dark:border-gray-700 animate-slide-up opacity-0" style={{ animationDelay: '300ms' }}>
                 <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Track Your Mood</h2>
                 </div>
                 <div className="max-w-lg mx-auto"> {/* Constrain width */} 
                    <MoodTracker />
                 </div>
            </div>
          )}

          {/* --- Journal Section (Conditional) --- */}
          {showJournal && (
            <div className="mb-8 pt-8 border-t border-gray-200 dark:border-gray-700 animate-slide-up opacity-0" style={{ animationDelay: showMoodTracker ? '500ms' : '300ms' }}> {/* Adjust delay based on mood tracker presence */}
              <div className="flex justify-between items-center mb-6">
                  <div>
                      <h2 className="text-2xl font-bold">Your Journal</h2>
                      <p className="text-calm-600 dark:text-calm-400">
                          Reflect on your thoughts and feelings.
                      </p>
                  </div>
                  <Dialog onOpenChange={(open) => !open && setIsJournalEditing(false)}> 
                    <DialogTrigger asChild>
                        <Button onClick={handleNewJournalEntry}>
                            <PlusCircle className="mr-2 h-4 w-4" /> New Journal Entry
                        </Button>
                    </DialogTrigger>
                    <JournalEditDialog
                        entry={isJournalEditing ? selectedJournalEntry : null}
                        onSave={handleSaveJournalEntry}
                    />
                 </Dialog>
              </div>

             {isJournalLoading ? (
                <p>Loading journal entries...</p>
             ) : journalEntries.length > 0 ? (
                <div className="space-y-4 pb-6">
                    {journalEntries.map((entry) => (
                        <Card
                            key={entry.id}
                            className="hover:shadow-md transition-shadow border border-mental-100 dark:border-gray-700"
                        >
                            <CardHeader className="pb-3 cursor-pointer" onClick={() => handleOpenJournalEntry(entry)}>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-xl">{entry.title}</CardTitle>
                                    {entry.isPrivate && (
                                        <Lock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                    )}
                                </div>
                                <CardDescription>{formatDate(entry.createdAt)}</CardDescription>
                            </CardHeader>
                            {/* Show content preview only if not private or unlocked */}
                            {(!entry.isPrivate || unlockedEntryIds.has(entry.id)) && (
                                <CardContent className="text-sm text-calm-600 dark:text-calm-400 pt-0 pb-3 cursor-pointer" onClick={() => handleOpenJournalEntry(entry)}>
                                    {entry.body.substring(0, 100)}{entry.body.length > 100 ? '...' : ''}
                                </CardContent>
                            )}
                            <CardFooter className="flex justify-end gap-2 pt-2 pb-3 border-t border-mental-100 dark:border-gray-700">
                                <Dialog onOpenChange={(open) => {!open && setIsJournalEditing(false); !open && setSelectedJournalEntry(null);}}>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm" onClick={() => handleEditJournalEntry(entry)} title="Edit" disabled={entry.isPrivate && !unlockedEntryIds.has(entry.id)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                     </DialogTrigger>
                                     {/* Only render Dialog Content when editing this specific entry */} 
                                     {isJournalEditing && selectedJournalEntry?.id === entry.id && (
                                        <JournalEditDialog
                                            entry={selectedJournalEntry}
                                            onSave={handleSaveJournalEntry}
                                        />
                                    )}
                                </Dialog>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={() => handleDeleteJournalEntry(entry.id)} title="Delete">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 bg-white/50 dark:bg-gray-800/30 rounded-lg">
                    <p className="text-calm-600 dark:text-calm-400">You haven't written any journal entries yet.</p>
                     <Dialog onOpenChange={(open) => !open && setIsJournalEditing(false)}>
                        <DialogTrigger asChild>
                            <Button className="mt-4" onClick={handleNewJournalEntry}>
                                Write Your First Entry
                            </Button>
                        </DialogTrigger>
                        <JournalEditDialog
                            entry={null} // New entry mode
                            onSave={handleSaveJournalEntry}
                        />
                    </Dialog>
                </div>
             )}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* SidebarNav - Moved Last */}
      <SidebarNav />

      {/* PIN Prompt Dialog - Placed outside the main flex layout for positioning */}
       <Dialog open={showPinPrompt} onOpenChange={setShowPinPrompt}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter PIN</DialogTitle>
                    <DialogDescription>
                        This journal entry is marked as private. Please enter your PIN to view or edit.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pin" className="text-right">PIN</Label>
                            <Input
                            id="pin"
                            type="password"
                            value={pinInput}
                            onChange={(e) => setPinInput(e.target.value)}
                            className="col-span-3"
                            maxLength={4}
                            />
                        </div>
                        {pinError && <p className="text-red-500 text-sm text-center col-span-4">{pinError}</p>}
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowPinPrompt(false)}>Cancel</Button>
                    <Button type="button" onClick={handlePinSubmit}>Unlock</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
};

// --- Journal Edit Dialog Component (Keep embedded or move to src/components) ---
interface JournalEditDialogProps {
    entry: JournalEntry | null;
    onSave: (data: { title: string; body: string; isPrivate: boolean }) => boolean;
}

const JournalEditDialog: React.FC<JournalEditDialogProps> = ({ entry, onSave }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [closeDialog, setCloseDialog] = useState(false);

    useEffect(() => {
        setTitle(entry?.title || '');
        setBody(entry?.body || '');
        setIsPrivate(entry?.isPrivate || false);
        setCloseDialog(false); // Reset close trigger when dialog reopens/entry changes
    }, [entry]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) {
            toast({ title: "Title and body cannot be empty", variant: "destructive" });
            return;
        }
        const success = onSave({ title, body, isPrivate });
        if (success) {
            setCloseDialog(true);
            // Resetting state explicitly might be needed if dialog doesn't fully unmount
             setTitle(''); 
             setBody(''); 
             setIsPrivate(false); 
        }
    };

    // Use key on DialogContent or form to force re-mount on entry change if needed
    // Or rely on useEffect to reset state
    return (
         <DialogContent className="sm:max-w-[525px]">
             <form onSubmit={handleSubmit}>
                <DialogHeader>
                    <DialogTitle>{entry ? 'Edit Entry' : 'New Journal Entry'}</DialogTitle>
                    <DialogDescription>
                        {entry ? 'Modify your journal entry.' : 'Write down your thoughts and feelings.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="body" className="text-right pt-2">Body</Label>
                        <Textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="col-span-3 min-h-[150px]"
                            required
                        />
                    </div>
                     <div className="flex items-center justify-end space-x-2 pt-2">
                         <Label htmlFor="private-mode" className="flex items-center gap-1">
                             <Lock className="h-3 w-3"/>
                             <span>Extra Private</span>
                         </Label>
                         <Switch
                            id="private-mode"
                            checked={isPrivate}
                            onCheckedChange={setIsPrivate}
                         />
                    </div>
                </div>
                <DialogFooter>
                     {/* Combine DialogClose and Button */}                 
                     <DialogClose asChild>
                         <Button type="button" variant="outline">Cancel</Button>
                     </DialogClose>
                    {closeDialog ? (
                        <DialogClose asChild>
                             <Button type="submit">Save Entry</Button>
                         </DialogClose>
                     ) : (
                         <Button type="submit">Save Entry</Button>
                     )}
                </DialogFooter>
             </form>
         </DialogContent>
    );
};

export default Routine; 