import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Activity, BarChart, MessageCircle, LogOut, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { toast } from '@/components/ui/use-toast';
import { useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const SidebarNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: Calendar, label: 'Home', title: 'Dashboard' },
    { path: '/chat', icon: MessageCircle, label: 'Chat', title: 'Chat' },
    { path: '/routine', icon: ListChecks, label: 'Routine', title: 'Your Routine' },
    { path: '/profile', icon: Activity, label: 'Profile', title: 'Profile' },
    { path: '/resources', icon: BarChart, label: 'Learn', title: 'Resources' },
  ];

  return (
    <div className="w-20 h-full bg-mental-500 dark:bg-gray-800 text-white flex flex-col items-center py-8 shadow-xl">
      <Tooltip>
        <TooltipTrigger asChild>
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center mb-12 cursor-default">
                <span className="text-mental-500 dark:text-gray-800 font-medium text-lg">S</span>
            </div>
        </TooltipTrigger>
        <TooltipContent side="right">
            <p>StressWise</p>
        </TooltipContent>
      </Tooltip>

      <div className="flex-1 flex flex-col items-center space-y-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        className={`w-14 h-14 rounded-full flex flex-col items-center justify-center text-white ${active ? 'bg-mental-600 dark:bg-gray-700' : 'hover:bg-mental-600 dark:hover:bg-gray-700'}`}
                        title={item.title}
                        onClick={() => navigate(item.path)}
                    >
                        <Icon size={24} />
                        <span className="text-xs mt-1">{item.label}</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>{item.title}</p>
                </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      <div className="mt-auto space-y-4">
         <Tooltip>
            <TooltipTrigger asChild>
                 <div className="w-14 h-14 rounded-full flex flex-col items-center justify-center">
                    <ThemeToggle />
                </div>
            </TooltipTrigger>
            <TooltipContent side="right">
                <p>Toggle Theme</p>
            </TooltipContent>
         </Tooltip>

         <Tooltip>
            <TooltipTrigger asChild>
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
             </TooltipTrigger>
            <TooltipContent side="right">
                <p>Logout</p>
            </TooltipContent>
         </Tooltip>
      </div>
    </div>
  );
};

export default SidebarNav;
