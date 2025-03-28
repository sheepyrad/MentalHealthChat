
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatInterface from '@/components/ChatInterface';
import { toast } from '@/components/ui/use-toast';
import SidebarNav from '@/components/SidebarNav';

const Chat = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  React.useEffect(() => {
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

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-background to-mental-50/50 dark:from-gray-900 dark:to-gray-800/50 overflow-hidden">
      {/* Main Chat Area */}
      <div className="flex-1 h-full p-4 flex flex-col overflow-hidden">
        <div className="text-center mb-8 pt-6">
          <h1 className="text-3xl font-bold mb-2">Your Mental Wellness Companion</h1>
          <p className="text-lg text-calm-600 dark:text-calm-400">
            We're here to listen and provide personalized support for your mental wellbeing.
          </p>
        </div>
        
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <ChatInterface className="w-full h-full max-w-4xl mx-auto" />
        </div>
      </div>
      
      {/* Use the shared SidebarNav component */}
      <SidebarNav />
    </div>
  );
};

export default Chat;
