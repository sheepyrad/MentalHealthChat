import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, Activity, BarChart, MessageCircle, Bookmark, HeartPulse, Coffee, BookOpen, Pill, Clipboard, LogOut } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from '@/components/ThemeToggle';
import { routineItems, RoutineItem } from '@/data/routines'; // Import from the new file
import { addUserRoutine, isRoutineAdded, removeUserRoutine } from '@/lib/routineStorage'; // Import storage functions
import SidebarNav from '@/components/SidebarNav'; // Import shared sidebar
import { getMoodEntries, MoodEntry, saveAllMoodEntries } from '@/lib/moodStorage'; // Import mood storage functions
import DevTools from '@/components/DevTools'; // Import DevTools
import { useLayout } from '@/context/LayoutContext'; // Import useLayout
import { cn } from '@/lib/utils'; // Import cn
import SidebarToggle from '@/components/SidebarToggle'; // Import toggle button

// Sample data - in a real app this would be loaded from an API/database
const sessionHistoryData = [
  { date: '2023-05-07', duration: '15 mins', topic: 'Stress management', completed: true },
  { date: '2023-05-05', duration: '20 mins', topic: 'Sleep issues', completed: true },
  { date: '2023-05-03', duration: '10 mins', topic: 'Work anxiety', completed: false },
  { date: '2023-05-01', duration: '30 mins', topic: 'Personal growth', completed: true },
];

const Profile = () => {
  const navigate = useNavigate();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [routineUpdateTrigger, setRoutineUpdateTrigger] = useState(0);
  // State for processed mood data
  const [processedMoodData, setProcessedMoodData] = useState<Array<{ day: string; mood: number | null }>>([]);
  const [averageMood, setAverageMood] = useState<number | null>(null);
  const [averageMoodProgress, setAverageMoodProgress] = useState(0); // For the progress bar (0-100)
  // State for check-in consistency
  const [checkInConsistency, setCheckInConsistency] = useState(0);
  // Add state to track if mood tracking routine is added
  const [showMoodSection, setShowMoodSection] = useState(false); 
  const { isSidebarOpen } = useLayout(); // Use layout context

  // --- Data Processing Logic (extracted for reuse) ---
  const processMoodData = useCallback(() => {
    const moodEntries = getMoodEntries();
    const today = new Date();
    const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const last7DaysData: Array<{ day: string; mood: number | null }> = [];
    const moodValuesLast7Days: number[] = [];
    const checkedInDays = new Set<string>(); // Use Set to track unique check-in days (YYYY-MM-DD format)

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        date.setHours(0, 0, 0, 0);
        const dayStart = date.getTime();
        const dayEnd = dayStart + 24 * 60 * 60 * 1000 - 1;
        const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format

        const entriesForDay = moodEntries.filter(
            entry => entry.createdAt >= dayStart && entry.createdAt <= dayEnd
        );

        let dailyAverage: number | null = null;
        if (entriesForDay.length > 0) {
            const sum = entriesForDay.reduce((acc, entry) => acc + entry.moodValue, 0);
            dailyAverage = sum / entriesForDay.length;
            moodValuesLast7Days.push(dailyAverage);
            checkedInDays.add(dateString); // Mark this day as checked-in
        }

        last7DaysData.push({ day: dayMap[date.getDay()], mood: dailyAverage });
    }

    setProcessedMoodData(last7DaysData);

    if (moodValuesLast7Days.length > 0) {
        const totalSum = moodValuesLast7Days.reduce((acc, val) => acc + val, 0);
        const avg = totalSum / moodValuesLast7Days.length;
        setAverageMood(avg);
        setAverageMoodProgress(((avg - 1) / 4) * 100);
    } else {
        setAverageMood(null);
        setAverageMoodProgress(0);
    }

    // Calculate check-in consistency
    const consistencyPercentage = (checkedInDays.size / 7) * 100;
    setCheckInConsistency(consistencyPercentage);
  }, []); // Dependencies removed as it reads directly now, called manually

  // --- Initial Load and Routine Check ---
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to access your profile",
        variant: "destructive",
      });
      navigate("/auth");
    } else {
      setHasLoaded(true);
      processMoodData(); // Process initial mood data
      // Check if mood tracking routine is added
      setShowMoodSection(isRoutineAdded('notes')); 
    }
  }, [navigate, processMoodData]); 

  // --- Routine Toggle Handler ---
  const handleToggleRoutine = (id: string) => {
    if (isRoutineAdded(id)) {
      removeUserRoutine(id);
      toast({ title: "Removed from Routine" });
    } else {
      addUserRoutine(id);
      toast({ title: "Added to Routine" });
    }
    // Re-check if mood tracking routine is added after change
    setShowMoodSection(isRoutineAdded('notes')); 
    setRoutineUpdateTrigger(prev => prev + 1); // Existing trigger for UI update
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // --- Dev Tool Simulation Logic ---
  const simulateDayChange = () => {
    console.log("Simulating day change...");
    const currentEntries = getMoodEntries();
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    const shiftedEntries = currentEntries.map(entry => ({
      ...entry,
      createdAt: entry.createdAt - oneDayInMillis // Shift timestamp back by 24 hours
    }));
    saveAllMoodEntries(shiftedEntries);
    console.log("Shifted entries saved. Reprocessing data...");
    processMoodData(); // Re-process data immediately
    toast({ title: "Dev: Day Simulated", description: "Mood entries shifted back 24h." });
  };

  // --- Dev Tool Clear Logic ---
  const clearAllStorage = () => {
    console.log("Clearing all application storage...");
    localStorage.removeItem('userRoutines');
    localStorage.removeItem('journalEntries');
    localStorage.removeItem('moodEntries');
    localStorage.removeItem('isAuthenticated'); // Also clear auth state
    toast({ title: "Dev: Storage Cleared", description: "All app data removed. Reloading...", duration: 2000 });
    // Reload the page to reset state and force potential redirect to auth
    setTimeout(() => window.location.reload(), 1500);
  };

  if (!hasLoaded) return null;

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-background to-mental-50/50 dark:from-gray-900 dark:to-gray-800/50 overflow-hidden">
      {/* Main Content Area - Remove conditional padding */}
      <div className="flex-1 h-full p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 pt-6">
            <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
            <p className="text-lg text-calm-600 dark:text-calm-400">
              Manage routines and track your wellness journey
            </p>
          </div>

          {/* Section 1: Wellness Routines */}
          <div className="mb-12 animate-slide-up opacity-0" style={{ animationDelay: '100ms' }}>
            <h2 className="text-2xl font-bold mb-4">Your Wellness Routines</h2>
            <p className="text-calm-600 dark:text-calm-400 mb-6">
              Add or remove routines to customize your wellness plan.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {routineItems.map((item) => (
                <Card key={item.id} className="border border-mental-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
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
                  <CardContent>
                    <p className="text-calm-600 dark:text-calm-400 text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                       variant={isRoutineAdded(item.id) ? "outline" : "default"}
                       className={`w-full ${
                        isRoutineAdded(item.id)
                          ? 'text-red-600 border-red-500 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                      onClick={() => handleToggleRoutine(item.id)}
                    >
                      {isRoutineAdded(item.id) ? 'Remove from Routine' : 'Add to Routine'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Section 2: Mood Tracking Dashboard (Conditional) */}
          {showMoodSection ? (
            <div className="mb-12 animate-slide-up opacity-0" style={{ animationDelay: '300ms' }}>
              <h2 className="text-2xl font-bold mb-6 text-center">Mood Dashboard</h2>
              {/* Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Consistency Card */}
                  <div className="glass-card p-6">
                      <div className="flex items-center mb-4">
                        <Calendar className="text-mental-500 mr-3" size={24} />
                        <h3 className="text-lg font-medium">Consistency</h3>
                      </div>
                      <p className="text-3xl font-bold">{checkInConsistency.toFixed(0)}%</p>
                      <p className="text-sm text-calm-500 mt-2">Weekly mood check-in rate</p>
                      <Progress value={checkInConsistency} className="h-2 mt-4" />
                  </div>
                  {/* Average Mood Card */}
                  <div className="glass-card p-6">
                      <div className="flex items-center mb-4">
                        <Activity className="text-mental-500 mr-3" size={24} />
                        <h3 className="text-lg font-medium">Avg Mood (7 Days)</h3>
                      </div>
                      <p className="text-3xl font-bold">{averageMood !== null ? averageMood.toFixed(1) + '/5' : 'N/A'}</p>
                      <p className="text-sm text-calm-500 mt-2">Based on tracked entries</p>
                      <Progress value={averageMoodProgress} className="h-2 mt-4" />
                  </div>
              </div>
              {/* Mood Trend Chart */}
              <div className="glass-card p-6 mb-8">
                  <h3 className="text-lg font-medium mb-4">Your Mood Trends (Last 7 Days)</h3>
                  <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={processedMoodData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="day" />
                              <YAxis 
                                domain={[1, 5]} 
                                tickFormatter={(value) => value.toFixed(1)}
                              />
                              <Tooltip 
                                formatter={(value, name, props) => {
                                   if (value === null || value === undefined) return ['No data', ''];
                                   return [`Avg Mood: ${Number(value).toFixed(1)}/5`, '']; 
                                }}
                                labelFormatter={(label) => `Day: ${label}`}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="mood" 
                                stroke="#9b87f5" 
                                strokeWidth={2}
                                dot={{ fill: '#9b87f5', strokeWidth: 2, r: 4 }}
                                activeDot={{ fill: '#7E69AB', strokeWidth: 2, r: 6 }}
                                connectNulls
                              />
                          </LineChart>
                      </ResponsiveContainer>
                  </div>
              </div>
            </div>
          ) : (
            // Reminder if mood tracking is not added
            <div className="mb-12 p-6 bg-blue-50 dark:bg-blue-900/30 border border-dashed border-blue-300 dark:border-blue-700 rounded-lg text-center animate-slide-up opacity-0" style={{ animationDelay: '300ms' }}>
                <p className="text-blue-700 dark:text-blue-300 font-medium mb-2">Want to see your mood dashboard?</p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">Add the "Mood Tracking" routine to your plan above to unlock insights and visualize your trends.</p>
                {/* Optional: Could add a button here to directly add it, but requires more state management */}
            </div>
          )}

          {/* Section 3: Recent Activities */}
          <div className="glass-card p-6 mb-8 animate-slide-up opacity-0" style={{ animationDelay: showMoodSection ? '500ms' : '300ms' }}>
            <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {sessionHistoryData.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/20 rounded-lg">
                  <div>
                    <p className="font-medium">{session.topic}</p>
                    <p className="text-sm text-calm-500">{formatDate(session.date)} · {session.duration}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs ${
                    session.completed ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {session.completed ? 'Completed' : 'In Progress'}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* DevTools Section */}
          <div className="animate-slide-up opacity-0" style={{ animationDelay: showMoodSection ? '700ms' : '500ms' }}>
            <DevTools 
              onSimulateDayChange={simulateDayChange} 
              onClearAllStorage={clearAllStorage}
            />
          </div>
          
        </div>
      </div>
      
      {/* SidebarNav */}
      <SidebarNav />
      {/* Add Toggle Button outside */}
      <SidebarToggle />
    </div>
  );
};

export default Profile;
