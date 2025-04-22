
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, Activity, BarChart, MessageCircle, Bookmark, HeartPulse, Coffee, BookOpen, Pill, Clipboard, LogOut } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from '@/components/ThemeToggle';

// Sample data - in a real app this would be loaded from an API/database
const moodChartData = [
  { day: 'Mon', mood: 3 },
  { day: 'Tue', mood: 4 },
  { day: 'Wed', mood: 2 },
  { day: 'Thu', mood: 5 },
  { day: 'Fri', mood: 3 },
  { day: 'Sat', mood: 4 },
  { day: 'Sun', mood: 3 },
];

const sessionHistoryData = [
  { date: '2023-05-07', duration: '15 mins', topic: 'Stress management', completed: true },
  { date: '2023-05-05', duration: '20 mins', topic: 'Sleep issues', completed: true },
  { date: '2023-05-03', duration: '10 mins', topic: 'Work anxiety', completed: false },
  { date: '2023-05-01', duration: '30 mins', topic: 'Personal growth', completed: true },
];

interface RoutineItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'daily' | 'wellness' | 'mental';
}

const Profile = () => {
  const navigate = useNavigate();
  const [hasLoaded, setHasLoaded] = useState(false);

  // Check if user is authenticated
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
    }
  }, [navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

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

  if (!hasLoaded) return null;

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-background to-mental-50/50 dark:from-gray-900 dark:to-gray-800/50 overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 h-full p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 pt-6">
            <h1 className="text-3xl font-bold mb-2">Your Progress Dashboard</h1>
            <p className="text-lg text-calm-600 dark:text-calm-400">
              Track your mental wellness journey
            </p>
          </div>
          
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center mb-4">
                <Calendar className="text-mental-500 mr-3" size={24} />
                <h3 className="text-lg font-medium">Consistency</h3>
              </div>
              <p className="text-3xl font-bold">85%</p>
              <p className="text-sm text-calm-500 mt-2">Weekly check-in rate</p>
              <Progress value={85} className="h-2 mt-4" />
            </div>
            
            <div className="glass-card p-6">
              <div className="flex items-center mb-4">
                <Activity className="text-mental-500 mr-3" size={24} />
                <h3 className="text-lg font-medium">Mood Improvement</h3>
              </div>
              <p className="text-3xl font-bold">+15%</p>
              <p className="text-sm text-calm-500 mt-2">Last 30 days</p>
              <Progress value={65} className="h-2 mt-4" />
            </div>
            
            <div className="glass-card p-6">
              <div className="flex items-center mb-4">
                <Clock className="text-mental-500 mr-3" size={24} />
                <h3 className="text-lg font-medium">Sessions</h3>
              </div>
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-calm-500 mt-2">Total completed</p>
              <Progress value={40} className="h-2 mt-4" />
            </div>
          </div>
          
          {/* Mood Trend Chart */}
          <div className="glass-card p-6 mb-8">
            <h3 className="text-lg font-medium mb-4">Your Mood Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[1, 5]} />
                  <Tooltip 
                    formatter={(value) => [`Mood: ${value}/5`, '']}
                    labelFormatter={(label) => `Day: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#9b87f5" 
                    strokeWidth={2}
                    dot={{ fill: '#9b87f5', strokeWidth: 2, r: 4 }}
                    activeDot={{ fill: '#7E69AB', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Wellness Routines Section (Added from Dashboard) */}
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
          
          {/* Recent Activities */}
          <div className="glass-card p-6 mb-8">
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
        </div>
      </div>
      
      {/* Right Sidebar Navigation */}
      <div className="w-20 h-full bg-mental-500 dark:bg-gray-800 text-white flex flex-col items-center py-8 shadow-xl">
        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center mb-12">
          <span className="text-mental-500 dark:text-gray-800 font-medium text-lg">M</span>
        </div>
        
        <div className="flex-1 flex flex-col items-center space-y-10">
          <Button 
            variant="ghost" 
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white hover:bg-mental-600 dark:hover:bg-gray-700" 
            title="Dashboard"
            onClick={() => navigate('/dashboard')}
          >
            <Calendar size={24} />
            <span className="text-xs mt-1">Home</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white hover:bg-mental-600 dark:hover:bg-gray-700" 
            title="Chat"
            onClick={() => navigate('/chat')}
          >
            <MessageCircle size={24} />
            <span className="text-xs mt-1">Chat</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white bg-mental-600 dark:bg-gray-700" 
            title="Profile"
            onClick={() => navigate('/profile')}
          >
            <Activity size={24} />
            <span className="text-xs mt-1">Profile</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white hover:bg-mental-600 dark:hover:bg-gray-700" 
            title="Resources"
            onClick={() => navigate('/resources')}
          >
            <BarChart size={24} />
            <span className="text-xs mt-1">Learn</span>
          </Button>
        </div>
        
        <div className="mt-auto space-y-4">
          <div className="w-14 h-14 rounded-full flex flex-col items-center justify-center">
            <ThemeToggle />
          </div>
          
          <Button 
            variant="ghost" 
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white hover:bg-mental-600 dark:hover:bg-gray-700" 
            title="Logout"
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              toast({
                title: "Logged out",
                description: "You have been successfully logged out",
              });
              navigate("/");
            }}
          >
            <LogOut size={24} />
            <span className="text-xs mt-1">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
