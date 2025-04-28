import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, Coffee, BookOpen, Pill, Clipboard, Bookmark, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SidebarNav from '@/components/SidebarNav';
import { routineItems, RoutineItem } from '@/data/routines'; // Import from the new file
import { addUserRoutine, isRoutineAdded, removeUserRoutine } from '@/lib/routineStorage'; // Import storage functions

const Dashboard = () => {
  const navigate = useNavigate();
  // Add state to trigger re-render when routines change
  const [routineUpdateTrigger, setRoutineUpdateTrigger] = useState(0);

  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to access your dashboard",
        variant: "destructive",
      });
      navigate("/auth");
    }
  }, [navigate]);

  const handleToggleRoutine = (id: string) => {
    if (isRoutineAdded(id)) {
      removeUserRoutine(id);
      toast({ title: "Removed from Routine" });
    } else {
      addUserRoutine(id);
      toast({ title: "Added to Routine" });
    }
    // Trigger re-render
    setRoutineUpdateTrigger(prev => prev + 1);
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-background to-mental-50/50 dark:from-gray-900 dark:to-gray-800/50 overflow-hidden">
      {/* Main Content Area - Moved First */}
      <div className="flex-1 h-full p-4 flex flex-col overflow-auto">
        {/* Apply animation to header div */}
        <div className="text-center mb-8 pt-6 animate-slide-up opacity-0" style={{ animationDelay: '100ms' }}>
          <h1 className="text-3xl font-bold mb-2">Welcome to Your Wellness Journey</h1>
          <p className="text-lg text-calm-600 dark:text-calm-400">
            Your personalized dashboard for mental wellbeing
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto w-full">
          {/* Chat Button Card - Apply animation */}
          <Card className="mb-8 bg-mental-50/80 dark:bg-gray-800/50 border-mental-100 dark:border-gray-700 animate-slide-up opacity-0" style={{ animationDelay: '300ms' }}>
            <CardHeader>
              <CardTitle className="text-2xl">Continue Your Conversation</CardTitle>
              <CardDescription>Chat with your mental wellness companion anytime</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button 
                onClick={() => navigate('/chat')} 
                className="bg-mental-500 hover:bg-mental-600 dark:bg-mental-600 dark:hover:bg-mental-700 text-white px-8 py-6 text-lg rounded-xl flex items-center gap-3"
              >
                <MessageCircle size={24} />
                Start Chatting
              </Button>
            </CardContent>
          </Card>
          
          {/* Routine List - Apply animation */}
          <div className="mb-8 animate-slide-up opacity-0" style={{ animationDelay: '500ms' }}>
            <h2 className="text-2xl font-bold mb-4">Your Wellness Routines</h2>
            <p className="text-calm-600 dark:text-calm-400 mb-6">
              Regular routines and healthy habits to help manage your emotions and improve wellbeing.
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
        </div>
      </div>
      
      {/* SidebarNav - Moved Last */}
      <SidebarNav />
    </div>
  );
};

export default Dashboard;
