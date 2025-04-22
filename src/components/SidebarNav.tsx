
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Activity, BarChart, MessageCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { toast } from '@/components/ui/use-toast';

export default function SidebarNav() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  // Get current path to highlight the active nav item
  const currentPath = window.location.pathname;

  return (
    <div className="w-20 h-full bg-mental-500 dark:bg-gray-800 text-white flex flex-col items-center py-8 shadow-xl">
      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center mb-12">
        <span className="text-mental-500 dark:text-gray-800 font-medium text-lg">M</span>
      </div>
      
      <div className="flex-1 flex flex-col items-center space-y-10">
        <Button 
          variant="ghost" 
          className={`w-14 h-14 rounded-full flex flex-col items-center justify-center text-white ${
            currentPath === '/dashboard' ? 'bg-mental-600 dark:bg-gray-700' : 'hover:bg-mental-600 dark:hover:bg-gray-700'
          }`}
          title="Dashboard"
          onClick={() => navigate('/dashboard')}
        >
          <Calendar size={24} />
          <span className="text-xs mt-1">Home</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className={`w-14 h-14 rounded-full flex flex-col items-center justify-center text-white ${
            currentPath === '/chat' ? 'bg-mental-600 dark:bg-gray-700' : 'hover:bg-mental-600 dark:hover:bg-gray-700'
          }`}
          title="Chat"
          onClick={() => navigate('/chat')}
        >
          <MessageCircle size={24} />
          <span className="text-xs mt-1">Chat</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className={`w-14 h-14 rounded-full flex flex-col items-center justify-center text-white ${
            currentPath === '/profile' ? 'bg-mental-600 dark:bg-gray-700' : 'hover:bg-mental-600 dark:hover:bg-gray-700'
          }`}
          title="Profile"
          onClick={() => navigate('/profile')}
        >
          <Activity size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className={`w-14 h-14 rounded-full flex flex-col items-center justify-center text-white ${
            currentPath === '/resources' ? 'bg-mental-600 dark:bg-gray-700' : 'hover:bg-mental-600 dark:hover:bg-gray-700'
          }`}
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
  );
}
