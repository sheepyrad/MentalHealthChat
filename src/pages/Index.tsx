
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';
import BreathingExercise from '@/components/BreathingExercise';
import MoodTracker from '@/components/MoodTracker';
import JournalPrompt from '@/components/JournalPrompt';
import FeatureCard from '@/components/FeatureCard';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  useEffect(() => {
    // Welcome toast
    setTimeout(() => {
      toast({
        title: "Welcome to MentalHealthChat",
        description: "Your personal mental wellness companion",
        duration: 5000,
      });
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-mental-50/50 dark:from-gray-900 dark:to-gray-800/50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <div className="animate-slide-up opacity-0">
                <div className="inline-block px-3 py-1 bg-mental-100 text-mental-600 dark:bg-gray-800 dark:text-mental-400 rounded-full text-sm font-medium mb-4">
                  AI-Powered Mental Wellness
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Your Companion for<br className="hidden md:block" /> Emotional Wellbeing
                </h1>
                <p className="text-lg text-calm-600 dark:text-calm-400 mb-8 max-w-xl">
                  MentalHealthChat helps you manage stress, cultivate mindfulness, and enhance your emotional wellbeing through personalized guidance and practical exercises.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a 
                    href="#chat"
                    className="px-6 py-3 bg-mental-500 text-white rounded-full hover:bg-mental-600 transition-colors text-center"
                  >
                    Start Chatting
                  </a>
                  <Link 
                    to="/about"
                    className="px-6 py-3 bg-white dark:bg-gray-800 border border-mental-200 dark:border-gray-700 text-mental-700 dark:text-mental-400 rounded-full hover:bg-mental-50 dark:hover:bg-gray-700 transition-colors text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 animate-slide-up opacity-0" style={{ animationDelay: '200ms' }}>
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-mental-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-mental-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="relative z-10">
                  <ChatInterface className="shadow-medium" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-white/50 dark:bg-gray-800/20">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up opacity-0">
            <div className="inline-block px-3 py-1 bg-mental-100 text-mental-600 dark:bg-gray-800 dark:text-mental-400 rounded-full text-sm font-medium mb-4">
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tools for Your Mental Wellness Journey
            </h2>
            <p className="text-lg text-calm-600 dark:text-calm-400 max-w-2xl mx-auto">
              Discover a suite of carefully designed features to support your emotional wellbeing and help you develop healthy mental habits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div id="chat" className="animate-slide-up opacity-0" style={{ animationDelay: '100ms' }}>
              <FeatureCard
                title="AI Chat Companion"
                description="Have supportive conversations about your feelings, challenges, and goals with our empathetic AI companion."
                icon={<span className="text-xl">💬</span>}
              >
                <a href="#chat-section" className="text-mental-600 dark:text-mental-400 hover:text-mental-700 dark:hover:text-mental-300 font-medium">Chat now →</a>
              </FeatureCard>
            </div>
            
            <div className="animate-slide-up opacity-0" style={{ animationDelay: '200ms' }}>
              <FeatureCard
                title="Breathing Exercises"
                description="Practice guided breathing techniques to reduce stress, improve focus, and promote relaxation."
                icon={<span className="text-xl">🧘</span>}
              >
                <a href="#breathing-section" className="text-mental-600 dark:text-mental-400 hover:text-mental-700 dark:hover:text-mental-300 font-medium">Try an exercise →</a>
              </FeatureCard>
            </div>
            
            <div className="animate-slide-up opacity-0" style={{ animationDelay: '300ms' }}>
              <FeatureCard
                title="Mood Tracking"
                description="Monitor your emotional patterns over time to gain insights into your mental wellbeing journey."
                icon={<span className="text-xl">📊</span>}
              >
                <a href="#mood-section" className="text-mental-600 dark:text-mental-400 hover:text-mental-700 dark:hover:text-mental-300 font-medium">Track your mood →</a>
              </FeatureCard>
            </div>
            
            <div className="animate-slide-up opacity-0" style={{ animationDelay: '400ms' }}>
              <FeatureCard
                title="Journaling"
                description="Practice reflective writing with guided prompts to process emotions and gain perspective."
                icon={<span className="text-xl">✏️</span>}
              >
                <a href="#journal-section" className="text-mental-600 dark:text-mental-400 hover:text-mental-700 dark:hover:text-mental-300 font-medium">Start journaling →</a>
              </FeatureCard>
            </div>
            
            <div className="animate-slide-up opacity-0" style={{ animationDelay: '500ms' }}>
              <FeatureCard
                title="Mindfulness Sessions"
                description="Build present-moment awareness through guided mindfulness practices tailored to your needs."
                icon={<span className="text-xl">🌿</span>}
              >
                <p className="text-mental-500 dark:text-mental-400 opacity-60 text-sm">Coming soon</p>
              </FeatureCard>
            </div>
            
            <div className="animate-slide-up opacity-0" style={{ animationDelay: '600ms' }}>
              <FeatureCard
                title="Progress Insights"
                description="View personalized insights about your wellbeing journey and track your improvement over time."
                icon={<span className="text-xl">📈</span>}
              >
                <p className="text-mental-500 dark:text-mental-400 opacity-60 text-sm">Coming soon</p>
              </FeatureCard>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tools Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto">
          {/* Chat Section */}
          <div id="chat-section" className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 bg-mental-100 text-mental-600 dark:bg-gray-800 dark:text-mental-400 rounded-full text-sm font-medium mb-4">
                AI Chat
              </div>
              <h2 className="text-3xl font-bold mb-4">Talk About What's On Your Mind</h2>
              <p className="text-lg text-calm-600 dark:text-calm-400 max-w-2xl mx-auto">
                Have a supportive conversation with our AI companion about your feelings, challenges, or anything else on your mind.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <ChatInterface />
            </div>
          </div>
          
          {/* Breathing Section */}
          <div id="breathing-section" className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 bg-mental-100 text-mental-600 dark:bg-gray-800 dark:text-mental-400 rounded-full text-sm font-medium mb-4">
                Breathing Exercise
              </div>
              <h2 className="text-3xl font-bold mb-4">Find Calm Through Breathing</h2>
              <p className="text-lg text-calm-600 dark:text-calm-400 max-w-2xl mx-auto">
                Practice the 4-7-8 breathing technique to reduce stress and promote relaxation. This powerful exercise can help calm your nervous system.
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <BreathingExercise />
            </div>
          </div>
          
          {/* Two Column Layout for Mood and Journal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mood Tracking */}
            <div id="mood-section">
              <div className="text-center mb-8">
                <div className="inline-block px-3 py-1 bg-mental-100 text-mental-600 dark:bg-gray-800 dark:text-mental-400 rounded-full text-sm font-medium mb-4">
                  Mood Tracking
                </div>
                <h2 className="text-2xl font-bold mb-4">Track How You Feel</h2>
                <p className="text-calm-600 dark:text-calm-400 max-w-md mx-auto">
                  Record your mood to gain insights into your emotional patterns over time.
                </p>
              </div>
              
              <MoodTracker />
            </div>
            
            {/* Journal */}
            <div id="journal-section">
              <div className="text-center mb-8">
                <div className="inline-block px-3 py-1 bg-mental-100 text-mental-600 dark:bg-gray-800 dark:text-mental-400 rounded-full text-sm font-medium mb-4">
                  Journal
                </div>
                <h2 className="text-2xl font-bold mb-4">Reflect and Process</h2>
                <p className="text-calm-600 dark:text-calm-400 max-w-md mx-auto">
                  Use guided prompts to practice reflective writing and gain perspective on your experiences.
                </p>
              </div>
              
              <JournalPrompt />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 md:px-8 bg-white/50 dark:bg-gray-800/20 border-t border-mental-100 dark:border-gray-700 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-mental-400 to-mental-600 flex items-center justify-center">
                  <span className="text-white font-medium text-lg">M</span>
                </div>
                <span className="font-medium text-lg">MentalHealthChat</span>
              </div>
              <p className="text-calm-500 dark:text-calm-400 mt-2 text-sm">Your companion for emotional wellbeing</p>
            </div>
            
            <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 items-center">
              <Link to="/" className="text-calm-600 dark:text-calm-300 hover:text-mental-600 dark:hover:text-mental-400">Home</Link>
              <Link to="/about" className="text-calm-600 dark:text-calm-300 hover:text-mental-600 dark:hover:text-mental-400">About</Link>
              <a href="#chat-section" className="text-calm-600 dark:text-calm-300 hover:text-mental-600 dark:hover:text-mental-400">Chat</a>
              <a href="#breathing-section" className="text-calm-600 dark:text-calm-300 hover:text-mental-600 dark:hover:text-mental-400">Breathing</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-mental-100 dark:border-gray-700 text-center">
            <p className="text-calm-500 dark:text-calm-400 text-sm">
              &copy; {new Date().getFullYear()} MentalHealthChat. All rights reserved.
            </p>
            <p className="text-calm-400 dark:text-calm-500 text-xs mt-1">
              This is an educational project and not a substitute for professional mental health support.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
