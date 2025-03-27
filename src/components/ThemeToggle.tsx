
import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 bg-background/10 backdrop-blur-sm hover:bg-background/20 dark:bg-gray-800/30 dark:hover:bg-gray-700/50"
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? (
        <Moon size={18} className="text-gray-700" />
      ) : (
        <Sun size={18} className="text-yellow-300" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
