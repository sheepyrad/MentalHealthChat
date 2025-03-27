
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';
import { toast } from '@/components/ui/use-toast';

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

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-mental-50">
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-20 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Your Mental Wellness Companion</h1>
          <p className="text-lg text-calm-600 max-w-2xl mx-auto">
            Chat with our AI companion about your feelings, challenges, or goals. 
            We're here to listen and provide personalized support for your mental wellbeing.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Chat;
