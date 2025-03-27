
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatInterface from '@/components/ChatInterface';
import { toast } from '@/components/ui/use-toast';
import { Calendar, Activity, BarChart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Chat = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to access the chat",
        variant: "destructive",
      });
      navigate("/auth");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-background to-mental-50">
      {/* Main Chat Area */}
      <div className="flex-1 h-full p-4 flex flex-col">
        <div className="text-center mb-8 pt-6">
          <h1 className="text-3xl font-bold mb-2">Your Mental Wellness Companion</h1>
          <p className="text-lg text-calm-600">
            We're here to listen and provide personalized support for your mental wellbeing.
          </p>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <ChatInterface className="w-full h-full max-w-4xl mx-auto" />
        </div>
      </div>
      
      {/* Right Sidebar Navigation */}
      <div className="w-20 h-full bg-mental-500 text-white flex flex-col items-center py-8 shadow-xl">
        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center mb-12">
          <span className="text-mental-500 font-medium text-lg">M</span>
        </div>
        
        <div className="flex-1 flex flex-col items-center space-y-10">
          <Button 
            variant="ghost" 
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white bg-mental-600" 
            title="Chat"
            onClick={() => navigate('/chat')}
          >
            <Calendar size={24} />
            <span className="text-xs mt-1">Chat</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white hover:bg-mental-600" 
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
          onClick={handleLogout}
        >
          <Clock size={24} />
          <span className="text-xs mt-1">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Chat;
