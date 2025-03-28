
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatInterface from '@/components/ChatInterface';
import { toast } from '@/components/ui/use-toast';
import { Calendar, Activity, BarChart, LogOut, Lock, Check, X, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { callChatApi, createDeepSeekApiFunction } from '@/lib/apiClient';

const Chat = () => {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [shouldClearApiKey, setShouldClearApiKey] = useState(false);

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

    // Check if API key exists in localStorage and if we shouldn't clear it
    if (!shouldClearApiKey) {
      const savedApiKey = localStorage.getItem("chatApiKey");
      if (savedApiKey) {
        setApiKey(savedApiKey);
        toast({
          title: "API Key Loaded",
          description: "Your saved API key has been loaded",
        });
      }
    }

    // Set up beforeunload event to clear API key on refresh if option is enabled
    const handleBeforeUnload = () => {
      if (shouldClearApiKey) {
        localStorage.removeItem("chatApiKey");
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate, shouldClearApiKey]);

  const handleSaveApiKey = () => {
    try {
      if (apiKey.trim()) {
        // Save API key to localStorage if not set to clear on refresh
        if (!shouldClearApiKey) {
          localStorage.setItem("chatApiKey", apiKey);
        }
        
        toast({
          title: "API Key Saved",
          description: shouldClearApiKey 
            ? "Your API key has been saved for this session only" 
            : "Your API key has been successfully saved",
          variant: "default",
        });
      } else {
        // Clear API key if empty
        localStorage.removeItem("chatApiKey");
        setApiKey('');
        toast({
          title: "API Key Removed",
          description: "Your API key has been removed",
          variant: "default",
        });
      }
      setShowApiKeyInput(false);
    } catch (error) {
      toast({
        title: "Error Saving API Key",
        description: "There was a problem saving your API key",
        variant: "destructive",
      });
      console.error("Error saving API key:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const toggleClearApiKey = () => {
    setShouldClearApiKey(!shouldClearApiKey);
    toast({
      title: shouldClearApiKey ? "API Key Persistence Enabled" : "API Key Clearing Enabled",
      description: shouldClearApiKey 
        ? "Your API key will be saved between sessions" 
        : "Your API key will be cleared when you refresh the page",
    });
  };

  // Create the API function based on whether we have an API key
  const customApiFunction = apiKey 
    ? createDeepSeekApiFunction(apiKey) 
    : callChatApi;

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-background to-mental-50/50 dark:from-gray-900 dark:to-gray-800/50">
      {/* Main Chat Area */}
      <div className="flex-1 h-full p-4 flex flex-col">
        <div className="text-center mb-8 pt-6 flex items-center justify-between">
          <div className="flex-1"></div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Your Mental Wellness Companion</h1>
            <p className="text-lg text-calm-600 dark:text-calm-400">
              We're here to listen and provide personalized support for your mental wellbeing.
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            {showApiKeyInput ? (
              <div className="flex items-center space-x-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter DeepSeek API Key"
                  className="px-3 py-2 border rounded-md text-sm"
                />
                <Button 
                  size="sm" 
                  onClick={handleSaveApiKey}
                  className="flex items-center gap-1"
                >
                  <Check size={16} />
                  Save
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setShowApiKeyInput(false)}
                  className="flex items-center gap-1"
                >
                  <X size={16} />
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowApiKeyInput(true)}
                  className="flex items-center gap-2"
                >
                  <Lock size={16} />
                  {apiKey ? "Change API Key" : "Set API Key"}
                </Button>
                <Button
                  variant={shouldClearApiKey ? "default" : "outline"}
                  size="sm"
                  onClick={toggleClearApiKey}
                  className="flex items-center gap-2"
                  title={shouldClearApiKey ? "API key will be cleared on refresh" : "API key will be saved between sessions"}
                >
                  <RefreshCcw size={16} />
                  {shouldClearApiKey ? "Clear on Refresh" : "Save Between Sessions"}
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <ChatInterface 
            className="w-full h-full max-w-4xl mx-auto" 
            customApiFunction={apiKey ? customApiFunction : undefined}
            apiKeyStatus={apiKey ? "set" : "not-set"}
            apiProvider="DeepSeek"
          />
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
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white bg-mental-600 dark:bg-gray-700" 
            title="Chat"
            onClick={() => navigate('/chat')}
          >
            <Calendar size={24} />
            <span className="text-xs mt-1">Chat</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white hover:bg-mental-600 dark:hover:bg-gray-700" 
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
            onClick={handleLogout}
          >
            <LogOut size={24} />
            <span className="text-xs mt-1">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
