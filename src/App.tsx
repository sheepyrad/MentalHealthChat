import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { ChatProvider } from "./context/ChatContext";
import { LayoutProvider } from './context/LayoutContext';
import Index from "./pages/Index";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import Routine from './pages/Routine';
import BreathingExercise from './components/exercises/BreathingExercise.tsx';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LayoutProvider>
        <TooltipProvider>
          <ChatProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/routine" element={<Routine />} />
              <Route path="/exercise/breathing" element={<BreathingExercise />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ChatProvider>
        </TooltipProvider>
      </LayoutProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
