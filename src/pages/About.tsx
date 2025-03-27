
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FeatureCard from '@/components/FeatureCard';

const About = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-mental-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center animate-slide-up opacity-0">
            <div className="inline-block px-3 py-1 bg-mental-100 text-mental-600 rounded-full text-sm font-medium mb-4">
              About Us
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Supporting Your Mental Wellness Journey
            </h1>
            <p className="text-lg text-calm-600 mb-8">
              MentalHealthChat is an AI-powered platform designed to provide emotional support, stress management tools, and mindfulness practices to enhance your mental wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-4 md:px-8 bg-white/50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            
            <div className="glass-card p-8 mb-12">
              <p className="text-lg mb-6">
                At MentalHealthChat, we believe that everyone deserves access to tools and resources that support mental wellbeing. Our mission is to combine advances in artificial intelligence with evidence-based mental health practices to create a supportive, accessible companion for your emotional health journey.
              </p>
              
              <p className="text-lg mb-6">
                We aim to reduce barriers to mental health support by providing:
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-mental-100 flex items-center justify-center text-mental-600 mr-3 mt-0.5">✓</div>
                  <span>24/7 access to supportive conversations</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-mental-100 flex items-center justify-center text-mental-600 mr-3 mt-0.5">✓</div>
                  <span>Practical tools for stress management and emotional regulation</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-mental-100 flex items-center justify-center text-mental-600 mr-3 mt-0.5">✓</div>
                  <span>Guidance for developing mindfulness and self-reflection practices</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-mental-100 flex items-center justify-center text-mental-600 mr-3 mt-0.5">✓</div>
                  <span>Resources to complement professional mental health care</span>
                </li>
              </ul>
              
              <p className="text-lg italic text-calm-600 border-l-4 border-mental-300 pl-4">
                "Our vision is a world where everyone has the tools they need to nurture their mental wellbeing, just as they would their physical health."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How MentalHealthChat Works</h2>
            <p className="text-lg text-calm-600 max-w-2xl mx-auto">
              Our platform combines advanced AI technology with evidence-based mental health practices to provide personalized support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="animate-slide-up opacity-0" style={{ animationDelay: '100ms' }}>
              <FeatureCard
                title="Conversational Support"
                description="Our AI chatbot provides empathetic, non-judgmental conversations to help you explore your thoughts and feelings."
                icon={<span className="text-xl">💬</span>}
              />
            </div>
            
            <div className="animate-slide-up opacity-0" style={{ animationDelay: '200ms' }}>
              <FeatureCard
                title="Practical Techniques"
                description="Learn and practice evidence-based techniques for stress management, emotional regulation, and mindfulness."
                icon={<span className="text-xl">🧠</span>}
              />
            </div>
            
            <div className="animate-slide-up opacity-0" style={{ animationDelay: '300ms' }}>
              <FeatureCard
                title="Progress Tracking"
                description="Monitor your emotional wellbeing journey with mood tracking and journaling to gain insights into patterns and progress."
                icon={<span className="text-xl">📈</span>}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Important Note Section */}
      <section className="py-16 px-4 md:px-8 bg-white/50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto glass-card p-8 border-l-4 border-mental-400">
            <h3 className="text-xl font-bold mb-4">Important Note About Our Service</h3>
            
            <p className="mb-4">
              MentalHealthChat is designed to be a supportive tool for mental wellbeing, but it is not a replacement for professional mental health care.
            </p>
            
            <p className="mb-4">
              If you're experiencing a mental health crisis or need immediate support, please contact a mental health professional, visit your local emergency department, or call a crisis helpline immediately.
            </p>
            
            <div className="bg-mental-50 p-4 rounded-md">
              <p className="font-medium">Resources for immediate support:</p>
              <ul className="mt-2 space-y-1">
                <li>National Suicide Prevention Lifeline: 988 or 1-800-273-8255</li>
                <li>Crisis Text Line: Text HOME to 741741</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Wellbeing Journey?</h2>
            
            <p className="text-lg text-calm-600 mb-8">
              Begin exploring the tools and resources MentalHealthChat offers to support your mental wellbeing.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/"
                className="px-6 py-3 bg-mental-500 text-white rounded-full hover:bg-mental-600 transition-colors text-center"
              >
                Start Chatting Now
              </Link>
              <a 
                href="/#breathing-section"
                className="px-6 py-3 bg-white border border-mental-200 text-mental-700 rounded-full hover:bg-mental-50 transition-colors text-center"
              >
                Try a Breathing Exercise
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 md:px-8 bg-white/50 border-t border-mental-100">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-mental-400 to-mental-600 flex items-center justify-center">
                  <span className="text-white font-medium text-lg">M</span>
                </div>
                <span className="font-medium text-lg">MentalHealthChat</span>
              </div>
              <p className="text-calm-500 mt-2 text-sm">Your companion for emotional wellbeing</p>
            </div>
            
            <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 items-center">
              <Link to="/" className="text-calm-600 hover:text-mental-600">Home</Link>
              <Link to="/about" className="text-calm-600 hover:text-mental-600">About</Link>
              <a href="/#chat-section" className="text-calm-600 hover:text-mental-600">Chat</a>
              <a href="/#breathing-section" className="text-calm-600 hover:text-mental-600">Breathing</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-mental-100 text-center">
            <p className="text-calm-500 text-sm">
              &copy; {new Date().getFullYear()} MentalHealthChat. All rights reserved.
            </p>
            <p className="text-calm-400 text-xs mt-1">
              This is an educational project and not a substitute for professional mental health support.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
