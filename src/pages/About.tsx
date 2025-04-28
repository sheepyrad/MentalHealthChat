import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FeatureCard from '@/components/FeatureCard';

// Define the hotline data (place before the component or import from separate file)
const hotlines = [
  {
    name: "Mental Health Support Hotline",
    description: "24-hour emotional support hotline for general public (co-ordinates about 20 related organisations to provide comprehensive mental support services to the public.)",
    hours: "24-hour",
    languages: "Cantonese, English",
    phone: "+852 18111"
  },
  {
    name: "Mental Health Direct (Hospital Authority)",
    description: "24-hour psychiatric health consultation to assist with crisis management or emergency assistance",
    hours: "24-hour",
    languages: "Cantonese",
    phone: "+852 2466 7350"
  },
  {
    name: "Suicide prevention hotline (The Samaritans)",
    description: "24-hour suicide prevention hotline and emotional support",
    hours: "24-hour",
    languages: "Cantonese, English, French, German, Hindi, Malay, Mandarin, Panjabi, Spanish, Tagalog and Urdu",
    phone: "+852 2896 0000"
  },
  {
    name: "Emotional support hotline (The Samaritans Befrienders Hong Kong)",
    description: "24-hour suicide prevention hotline and emotional support",
    hours: "24-hour",
    languages: "Cantonese",
    phone: "+852 2389 2222"
  },
  {
    name: "Suicide prevention hotline (Suicide Prevention Services)",
    description: "24-hour suicide prevention hotline with emotional support",
    hours: "24-hour",
    languages: "Cantonese",
    phone: "+852 2382 0000"
  },
  {
    name: "24-hour Family crisis hotline (Caritas Family Crisis Support Centre)",
    description: "24-hour family crisis hotline answered by social workers",
    hours: "24-hour",
    languages: "Cantonese",
    phone: "+852 18288"
  },
  {
    name: "24-hour youth hotline service (Youth Outreach)",
    description: "24-hour emotional support hotline for youth",
    hours: "24-hour",
    languages: "Cantonese",
    phone: "+852 9088 1023"
  },
  {
    name: "Hotline for Carer Support",
    description: "24-hour support hotline manned by professional social workers",
    hours: "24-hour",
    languages: "Cantonese",
    phone: "+852 182183"
  },
  {
    name: "Elderly suicide prevention hotline (Suicide Prevention Services)",
    description: "24-hour suicide prevention hotline with emotional support for elderly",
    hours: "24-hour",
    languages: "Cantonese",
    phone: "+852 2382 0881"
  },
  {
    name: "Pride Line (Tung Wah Group of Hospitals)",
    description: "Supports LGBT+ community support, providing emotional support, professional referrals, group activities and follow-up services handled by a professional social worker",
    hours: "24-hour",
    languages: "Cantonese",
    phone: "+852 2217 5959"
  },
  {
    name: "Mental Health Enquiry hotline (Baptist Oi Kwan Social Service)",
    description: "Mental health information and emotional support, with enquires answered by social workers",
    hours: "24-hour info / SW: Mon-Fri 10am-1230pm, 2pm-5pm, Tue 7pm-9pm",
    languages: "Cantonese",
    phone: "+852 2535 4135"
  },
  {
    name: "24-hour enquiries hotline (Social Welfare Department)",
    description: "24-hour information support hotline and emotional support service during office hours",
    hours: "24-hour info / SW: Mon-Fri 9am-5pm, Sat 9am-12pm",
    languages: "Cantonese, English",
    phone: "+852 2343 2255"
  }
];

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
            
            <div className="bg-mental-50 dark:bg-gray-800 p-4 rounded-md">
              <p className="font-medium text-mental-800 dark:text-mental-200">Resources for Immediate Support (Hong Kong):</p>
              <ul className="mt-3 space-y-4 text-sm text-mental-700 dark:text-mental-300">
                {
                  hotlines.map((hotline, index) => (
                    <li key={index}>
                      <strong className="block font-semibold text-mental-800 dark:text-mental-100">{hotline.name}</strong>
                      <p className="text-xs text-calm-600 dark:text-calm-400 mb-1">{hotline.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                        <span className="whitespace-nowrap">🕒 {hotline.hours}</span>
                        <span className="whitespace-nowrap">🗣️ {hotline.languages}</span>
                        <a href={`tel:${hotline.phone.replace(/\s/g, '')}`} className="font-medium text-mental-600 hover:text-mental-800 dark:text-mental-400 dark:hover:text-mental-200 whitespace-nowrap">📞 {hotline.phone}</a>
                      </div>
                    </li>
                  ))
                }
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
