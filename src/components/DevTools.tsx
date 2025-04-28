import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FastForward, Trash2 } from 'lucide-react';

interface DevToolsProps {
  onSimulateDayChange: () => void;
  onClearAllStorage: () => void;
}

const DevTools: React.FC<DevToolsProps> = ({ onSimulateDayChange, onClearAllStorage }) => {
  
  const handleClearClick = () => {
    if (window.confirm("Are you sure you want to clear ALL application data (routines, journal, mood, auth state) from local storage?")) {
      onClearAllStorage();
    }
  };

  return (
    <Card className="mt-10 border-dashed border-yellow-500 dark:border-yellow-600 bg-yellow-50/50 dark:bg-yellow-900/20">
      <CardHeader>
        <CardTitle className="text-lg text-yellow-700 dark:text-yellow-400">🚧 Dev Tools 🚧</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div>
            <Button 
                variant="outline"
                className="border-yellow-600 text-yellow-700 hover:bg-yellow-100 dark:border-yellow-500 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
                onClick={onSimulateDayChange}
            >
                <FastForward className="mr-2 h-4 w-4" />
                Simulate Day Change
            </Button>
            <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-1">
                Shifts mood entries back 24h.
            </p>
        </div>

        <div>
            <Button 
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                onClick={handleClearClick}
            >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All Storage
            </Button>
            <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                Removes routines, journal, mood, auth.
            </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevTools; 