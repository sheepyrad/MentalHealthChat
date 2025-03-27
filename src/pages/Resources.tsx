
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { BookOpen, Video, Calendar, Activity, BarChart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ResourceCategory = 'all' | 'article' | 'video' | 'exercise';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'article' | 'video' | 'exercise';
  imageUrl: string;
  url: string;
  readTime?: string;
  videoLength?: string;
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Understanding Anxiety",
    description: "Learn about the causes, symptoms, and management techniques for anxiety.",
    type: "article",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    url: "#",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Guided Meditation for Stress Relief",
    description: "A 10-minute guided meditation to help reduce stress and promote relaxation.",
    type: "video",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    url: "#",
    videoLength: "10:32"
  },
  {
    id: 3,
    title: "Progressive Muscle Relaxation",
    description: "Learn how to systematically relax your body and release tension.",
    type: "exercise",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a",
    url: "#"
  },
  {
    id: 4,
    title: "Improving Sleep Quality",
    description: "Evidence-based strategies to improve your sleep and wake up refreshed.",
    type: "article",
    imageUrl: "https://images.unsplash.com/photo-1585646794738-73404d3aa24f",
    url: "#",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "Mindful Walking Practice",
    description: "Transform an everyday activity into a powerful mindfulness practice.",
    type: "exercise",
    imageUrl: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3",
    url: "#"
  },
  {
    id: 6,
    title: "Understanding Self-Compassion",
    description: "Why being kind to yourself is essential for mental health.",
    type: "video",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-b53601020a8f",
    url: "#",
    videoLength: "15:45"
  },
];

const Resources = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<ResourceCategory>('all');
  const [filteredResources, setFilteredResources] = useState<Resource[]>(resources);

  // Check if user is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to access resources",
        variant: "destructive",
      });
      navigate("/auth");
    }
  }, [navigate]);

  // Filter resources when category changes
  useEffect(() => {
    if (category === 'all') {
      setFilteredResources(resources);
    } else {
      setFilteredResources(resources.filter(resource => resource.type === category));
    }
  }, [category]);

  const getResourceIcon = (type: string) => {
    switch(type) {
      case 'article': return <BookOpen className="h-5 w-5 text-mental-500" />;
      case 'video': return <Video className="h-5 w-5 text-mental-500" />;
      case 'exercise': return <Activity className="h-5 w-5 text-mental-500" />;
      default: return <BookOpen className="h-5 w-5 text-mental-500" />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-background to-mental-50">
      {/* Main Content Area */}
      <div className="flex-1 h-full p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 pt-6">
            <h1 className="text-3xl font-bold mb-2">Educational Resources</h1>
            <p className="text-lg text-calm-600">
              Explore articles, videos, and exercises to support your mental health journey
            </p>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button 
              variant={category === 'all' ? 'default' : 'outline'}
              onClick={() => setCategory('all')}
              className="rounded-full"
            >
              All Resources
            </Button>
            
            <Button 
              variant={category === 'article' ? 'default' : 'outline'}
              onClick={() => setCategory('article')}
              className="rounded-full"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Articles
            </Button>
            
            <Button 
              variant={category === 'video' ? 'default' : 'outline'}
              onClick={() => setCategory('video')}
              className="rounded-full"
            >
              <Video className="mr-2 h-4 w-4" />
              Videos
            </Button>
            
            <Button 
              variant={category === 'exercise' ? 'default' : 'outline'}
              onClick={() => setCategory('exercise')}
              className="rounded-full"
            >
              <Activity className="mr-2 h-4 w-4" />
              Exercises
            </Button>
          </div>
          
          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="glass-card overflow-hidden flex flex-col h-full">
                <div 
                  className="h-40 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${resource.imageUrl})` }}
                />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center mb-2">
                    {getResourceIcon(resource.type)}
                    <span className="text-sm font-medium text-mental-600 ml-2 uppercase">
                      {resource.type}
                    </span>
                    {resource.readTime && (
                      <span className="ml-auto text-xs text-calm-500">{resource.readTime}</span>
                    )}
                    {resource.videoLength && (
                      <span className="ml-auto text-xs text-calm-500">{resource.videoLength}</span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                  <p className="text-calm-600 mb-4 flex-1">{resource.description}</p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-center mt-auto"
                    onClick={() => window.open(resource.url, '_blank')}
                  >
                    {resource.type === 'article' ? 'Read Article' : 
                     resource.type === 'video' ? 'Watch Video' : 'Start Exercise'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Featured Content */}
          <div className="glass-card p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4">Weekly Featured Content</h2>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 pr-6">
                <h3 className="text-xl font-semibold mb-2">Building Resilience</h3>
                <p className="text-calm-600 mb-4">
                  Explore strategies to build emotional resilience and cope with life's challenges more effectively.
                </p>
                <Button>Explore Series</Button>
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <div className="aspect-video bg-mental-100 rounded-lg flex items-center justify-center">
                  <Video className="h-12 w-12 text-mental-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Sidebar Navigation - Same as in Chat.tsx and Profile.tsx */}
      <div className="w-20 h-full bg-mental-500 text-white flex flex-col items-center py-8 shadow-xl">
        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center mb-12">
          <span className="text-mental-500 font-medium text-lg">M</span>
        </div>
        
        <div className="flex-1 flex flex-col items-center space-y-10">
          <Button 
            variant="ghost" 
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white hover:bg-mental-600" 
            title="Chat"
            onClick={() => navigate('/chat')}
          >
            <Calendar size={24} />
            <span className="text-xs mt-1">Chat</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white hover:bg-mental-600" 
            title="Profile"
            onClick={() => navigate('/profile')}
          >
            <Activity size={24} />
            <span className="text-xs mt-1">Profile</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white bg-mental-600" 
            title="Resources"
            onClick={() => navigate('/resources')}
          >
            <BarChart size={24} />
            <span className="text-xs mt-1">Learn</span>
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-14 h-14 rounded-full flex flex-col items-center justify-center text-white hover:bg-mental-600 mt-auto" 
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
          <Clock size={24} />
          <span className="text-xs mt-1">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Resources;
