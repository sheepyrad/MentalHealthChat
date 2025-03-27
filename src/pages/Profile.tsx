
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, Activity, BarChart } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MoodTracker from '@/components/MoodTracker';
import { Button } from '@/components/ui/button';

// Sample data - in a real app this would be loaded from an API/database
const moodHistoryData = [
  { date: '2023-05-01', mood: 3, note: 'Feeling okay today' },
  { date: '2023-05-02', mood: 4, note: 'Had a good day at work' },
  { date: '2023-05-03', mood: 2, note: 'Stressed about deadline' },
  { date: '2023-05-04', mood: 5, note: 'Great day! Spent time with family' },
  { date: '2023-05-05', mood: 3, note: 'Regular day' },
  { date: '2023-05-06', mood: 4, note: 'Relaxing weekend' },
  { date: '2023-05-07', mood: 3, note: 'Preparing for the week ahead' },
];

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
  { date: '2023-05-07', duration: '15 mins', topic: 'Stress management' },
  { date: '2023-05-05', duration: '20 mins', topic: 'Sleep issues' },
  { date: '2023-05-03', duration: '10 mins', topic: 'Work anxiety' },
  { date: '2023-05-01', duration: '30 mins', topic: 'Personal growth' },
];

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Check if user is authenticated
  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to access your profile",
        variant: "destructive",
      });
      navigate("/auth");
    }
  }, [navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getMoodEmoji = (mood: number) => {
    switch(mood) {
      case 1: return '😞';
      case 2: return '😔';
      case 3: return '😐';
      case 4: return '🙂';
      case 5: return '😄';
      default: return '😐';
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-background to-mental-50">
      {/* Main Content Area */}
      <div className="flex-1 h-full p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 pt-6">
            <h1 className="text-3xl font-bold mb-2">Your Mental Health Dashboard</h1>
            <p className="text-lg text-calm-600">
              Track your journey and see your progress over time
            </p>
          </div>
          
          {/* Dashboard Tabs */}
          <div className="flex space-x-4 mb-6 border-b border-mental-100">
            <button
              className={`py-2 px-4 ${activeTab === 'overview' ? 'border-b-2 border-mental-500 font-medium text-mental-700' : 'text-mental-400 hover:text-mental-600'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'mood' ? 'border-b-2 border-mental-500 font-medium text-mental-700' : 'text-mental-400 hover:text-mental-600'}`}
              onClick={() => setActiveTab('mood')}
            >
              Mood History
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'sessions' ? 'border-b-2 border-mental-500 font-medium text-mental-700' : 'text-mental-400 hover:text-mental-600'}`}
              onClick={() => setActiveTab('sessions')}
            >
              Chat Sessions
            </button>
          </div>
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="text-mental-500 mr-3" size={24} />
                    <h3 className="text-lg font-medium">Weekly Check-ins</h3>
                  </div>
                  <p className="text-3xl font-bold">5</p>
                  <p className="text-sm text-calm-500 mt-2">Last week: 3</p>
                </div>
                
                <div className="glass-card p-6">
                  <div className="flex items-center mb-4">
                    <Clock className="text-mental-500 mr-3" size={24} />
                    <h3 className="text-lg font-medium">Total Chat Time</h3>
                  </div>
                  <p className="text-3xl font-bold">75 mins</p>
                  <p className="text-sm text-calm-500 mt-2">Last 30 days</p>
                </div>
                
                <div className="glass-card p-6">
                  <div className="flex items-center mb-4">
                    <Activity className="text-mental-500 mr-3" size={24} />
                    <h3 className="text-lg font-medium">Mood Trend</h3>
                  </div>
                  <p className="text-3xl font-bold">+15%</p>
                  <p className="text-sm text-calm-500 mt-2">Improvement this month</p>
                </div>
              </div>
              
              {/* Mood Chart */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium mb-4">Recent Mood Trends</h3>
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
              
              {/* Current Mood Tracker */}
              <MoodTracker className="w-full" />
            </div>
          )}
          
          {/* Mood History Tab */}
          {activeTab === 'mood' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-medium mb-4">Your Mood History</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Mood</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {moodHistoryData.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>{formatDate(entry.date)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="text-xl mr-2">{getMoodEmoji(entry.mood)}</span>
                            <span>{entry.mood}/5</span>
                          </div>
                        </TableCell>
                        <TableCell>{entry.note}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          
          {/* Chat Sessions Tab */}
          {activeTab === 'sessions' && (
            <div className="glass-card p-6">
              <h3 className="text-lg font-medium mb-4">Your Chat History</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Topic</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessionHistoryData.map((session, index) => (
                      <TableRow key={index}>
                        <TableCell>{formatDate(session.date)}</TableCell>
                        <TableCell>{session.duration}</TableCell>
                        <TableCell>{session.topic}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Right Sidebar Navigation - Same as in Chat.tsx */}
      <div className="w-20 h-full bg-mental-500 text-white flex flex-col items-center py-8 shadow-xl">
        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center mb-12">
          <span className="text-mental-500 font-medium text-lg">M</span>
        </div>
        
        <div className="flex-1 flex flex-col items-center space-y-10">
          <Button 
            variant="ghost" 
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white hover:bg-mental-600" 
            title="Chat"
            onClick={() => navigate('/chat')}
          >
            <Calendar size={24} />
            <span className="text-xs mt-1">Chat</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white bg-mental-600" 
            title="Profile"
            onClick={() => navigate('/profile')}
          >
            <Activity size={24} />
            <span className="text-xs mt-1">Profile</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white hover:bg-mental-600" 
            title="Resources"
            onClick={() => navigate('/resources')}
          >
            <BarChart size={24} />
            <span className="text-xs mt-1">Learn</span>
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white hover:bg-mental-600 mt-auto" 
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
          <Clock size={24} />
          <span className="text-xs mt-1">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Profile;
