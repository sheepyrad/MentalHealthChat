import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLayout } from '@/context/LayoutContext';
import { cn } from '@/lib/utils';

const SidebarToggle = () => {
  const { isSidebarOpen, toggleSidebar } = useLayout();

  // Only render if sidebar is closed
  if (isSidebarOpen) {
    return null;
  }

  return (
    <Tooltip>
        <TooltipTrigger asChild>
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                // Position slightly closer to the edge
                className={cn(
                    "fixed top-20 right-2 z-40", // Changed right-4 to right-2
                    "h-10 w-10 rounded-full",
                    "bg-gray-200/50 hover:bg-gray-300/70 dark:bg-gray-700/50 dark:hover:bg-gray-600/70",
                    "text-gray-700 dark:text-gray-300 backdrop-blur-sm"
                )}
                aria-label="Show sidebar"
            >
                 <ChevronLeft size={20} /> {/* Always ChevronLeft to show */}
            </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
            <p>Show Sidebar</p>
        </TooltipContent>
    </Tooltip>
  );
};

export default SidebarToggle; 