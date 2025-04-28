import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Activity, BarChart, MessageCircle, LogOut, ListChecks, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { toast } from '@/components/ui/use-toast';
import { useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLayout } from '@/context/LayoutContext';
import { cn } from '@/lib/utils';

const SidebarNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSidebarOpen, toggleSidebar } = useLayout();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: Calendar, label: 'Home', title: 'Dashboard' },
    { path: '/chat', icon: MessageCircle, label: 'Chat', title: 'Chat' },
    { path: '/routine', icon: ListChecks, label: 'Routine', title: 'Your Routine' },
    { path: '/profile', icon: Activity, label: 'Profile', title: 'Profile' },
    { path: '/resources', icon: BarChart, label: 'Learn', title: 'Resources' },
  ];

  return (
    <div className={cn(
        "fixed top-0 bottom-0 right-0 z-30",
        "h-full bg-mental-500 dark:bg-gray-800 text-white flex flex-col items-center py-8 shadow-xl",
        "transition-transform duration-300 ease-in-out w-20",
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
    )}>
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
                        className={cn(
                            "w-14 h-14 rounded-full flex flex-col items-center justify-center text-white hover:bg-mental-600 dark:hover:bg-gray-700",
                            active ? 'bg-mental-600 dark:bg-gray-700' : ''
                        )}
                        title={item.title}
                        onClick={() => navigate(item.path)}
                    >
                        <Icon size={24} />
                        {isSidebarOpen && <span className="text-xs mt-1">{item.label}</span>}
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>{item.title}</p>
                </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col items-center space-y-4">
         <Tooltip>
            <TooltipTrigger asChild>
                 <div className="w-14 h-14 flex items-center justify-center">
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
                    className={cn(
                        "w-14 h-14 rounded-full flex flex-col items-center justify-center text-white hover:bg-mental-600 dark:hover:bg-gray-700"
                    )}
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
                    {isSidebarOpen && <span className="text-xs mt-1">Logout</span>}
                </Button>
             </TooltipTrigger>
            <TooltipContent side="right">
                <p>Logout</p>
            </TooltipContent>
         </Tooltip>

         {/* --- Internal Sidebar Toggle Button (Only when open) --- */}
         {isSidebarOpen && (
             <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-10 h-10 text-white/80 hover:text-white hover:bg-white/10"
                        onClick={toggleSidebar}
                        aria-label="Hide sidebar"
                    >
                        <ChevronRight size={18} /> {/* Always ChevronRight to hide */}
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>Hide</p>
                </TooltipContent>
             </Tooltip>
         )}
      </div>
    </div>
  );
};

export default SidebarNav;
