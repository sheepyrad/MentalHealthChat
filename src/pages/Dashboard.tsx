import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, Coffee, BookOpen, Pill, Clipboard, Bookmark, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SidebarNav from '@/components/SidebarNav';

interface RoutineItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'daily' | 'wellness' | 'mental';
}

const Dashboard = () => {
  const navigate = useNavigate();

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

  const routineItems: RoutineItem[] = [
    {
      id: 'breathing',
      title: 'Breathing Exercises',
      description: 'Practice deep breathing for 5 minutes to reduce stress and anxiety.',
      icon: <HeartPulse className="h-6 w-6 text-mental-600" />,
      category: 'daily'
    },
    {
      id: 'journal',
      title: 'Daily Journaling',
      description: 'Write down your thoughts and feelings to gain clarity and perspective.',
      icon: <BookOpen className="h-6 w-6 text-mental-600" />,
      category: 'mental'
    },
    {
      id: 'nosugar',
      title: 'Reduce Sugar Intake',
      description: 'Minimize processed sugar consumption to stabilize mood and energy levels.',
      icon: <Coffee className="h-6 w-6 text-mental-600" />,
      category: 'wellness'
    },
    {
      id: 'medication',
      title: 'Medication Reminder',
      description: 'Take your prescribed medications regularly as directed by your healthcare provider.',
      icon: <Pill className="h-6 w-6 text-mental-600" />,
      category: 'daily'
    },
    {
      id: 'notes',
      title: 'Mood Tracking',
      description: 'Record your mood patterns to identify triggers and improvements.',
      icon: <Clipboard className="h-6 w-6 text-mental-600" />,
      category: 'mental'
    },
    {
      id: 'mindfulness',
      title: 'Mindfulness Practice',
      description: 'Spend 10 minutes being fully present and aware of your surroundings.',
      icon: <Bookmark className="h-6 w-6 text-mental-600" />,
      category: 'mental'
    }
  ];

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-background to-mental-50/50 dark:from-gray-900 dark:to-gray-800/50 overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 h-full p-4 flex flex-col overflow-auto">
        <div className="text-center mb-8 pt-6">
          <h1 className="text-3xl font-bold mb-2">Welcome to Your Wellness Journey</h1>
          <p className="text-lg text-calm-600 dark:text-calm-400">
            Your personalized dashboard for mental wellbeing
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto w-full">
          {/* Chat Button Card */}
          <Card className="mb-8 bg-mental-50/80 dark:bg-gray-800/50 border-mental-100 dark:border-gray-700">
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
          
          {/* Routine List */}
          <div className="mb-8">
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
                    <Button variant="outline" className="w-full">
                      Add to Routine
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Use the shared SidebarNav component */}
      <SidebarNav />
    </div>
  );
};

export default Dashboard;
