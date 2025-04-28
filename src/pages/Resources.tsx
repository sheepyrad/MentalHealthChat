import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { BookOpen, Video, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SidebarNav from '@/components/SidebarNav';
import ResourceViewerCard from '@/components/ResourceViewerCard';
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';

type ResourceCategory = 'all' | 'article' | 'video' | 'exercise';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'article' | 'video' | 'exercise';
  imageUrl: string;
  url?: string;
  readTime?: string;
  videoLength?: string;
  author?: string;
  content: string | { type: 'video', embedUrl: string } | { type: 'exercise', steps: string[] };
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Understanding Anxiety Disorders",
    description: "Learn about the types, symptoms, causes, and treatments for anxiety disorders.",
    type: "article",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    readTime: "~5 min read",
    author: "NIMH Staff",
    content: `Anxiety disorders are characterized by excessive fear and anxiety and related behavioral disturbances. Common types include Generalized Anxiety Disorder (GAD), Panic Disorder, Social Anxiety Disorder, and specific phobias. Symptoms often involve persistent worry, restlessness, difficulty concentrating, irritability, muscle tension, and sleep disturbances. While the exact causes are complex, involving genetic, environmental, and psychological factors, effective treatments like therapy (CBT) and medication are available. It's important to consult a healthcare professional for diagnosis and treatment planning. Mindfulness and stress management techniques can also be beneficial complements to treatment.`
  },
  {
    id: 2,
    title: "10-Minute Guided Meditation for Stress",
    description: "Follow this guided meditation to help reduce stress and find calm.",
    type: "video",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    videoLength: "10:18",
    content: { type: 'video', embedUrl: "https://www.youtube.com/embed/ZToicYcHIOU" }
  },
  {
    id: 3,
    title: "Progressive Muscle Relaxation Technique",
    description: "A step-by-step guide to practicing PMR for physical and mental relaxation.",
    type: "exercise",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a",
    content: {
      type: 'exercise',
      steps: [
        "Find a quiet place where you won't be disturbed.",
        "Sit or lie down comfortably.",
        "Take a few slow, deep breaths.",
        "Start with your feet: Tense the muscles tightly for 5 seconds, then release completely for 10-15 seconds, noticing the difference.",
        "Move up your body, tensing and releasing muscle groups: lower legs, thighs, buttocks, abdomen, chest, arms, hands, neck, and face.",
        "Focus on the feeling of relaxation spreading through your body.",
        "Continue breathing deeply throughout the exercise.",
        "Practice regularly for best results."
      ]
    }
  },
  {
    id: 4,
    title: "6 Steps to Better Sleep",
    description: "Evidence-based strategies to improve your sleep habits.",
    type: "article",
    imageUrl: "https://www.sleepfoundation.org/wp-content/uploads/2009/04/healthy-sleep-tips-1.jpg",
    readTime: "~4 min read",
    author: "Mayo Clinic Staff",
    content: `Improving sleep often involves adjusting habits and environment. Key strategies include: \n1. **Stick to a schedule:** Go to bed and wake up around the same time daily, even on weekends. \n2. **Create a relaxing bedtime routine:** Wind down with activities like reading, a warm bath, or listening to calm music. Avoid screens an hour before bed. \n3. **Optimize your bedroom:** Keep it cool, dark, and quiet. Invest in a comfortable mattress and pillows. \n4. **Watch what you eat and drink:** Avoid large meals, caffeine, and alcohol close to bedtime. \n5. **Include physical activity in your day:** Regular exercise can promote better sleep, but avoid intense workouts near bedtime. \n6. **Manage worries:** If anxious thoughts keep you up, try journaling or relaxation techniques before bed. If sleep problems persist, consult a doctor.`
  },
  {
    id: 5,
    title: "How to Practice Mindful Walking",
    description: "Turn a simple walk into a grounding mindfulness exercise.",
    type: "exercise",
    imageUrl: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3",
    content: {
      type: 'exercise',
      steps: [
        "Begin walking at a natural pace.",
        "Bring your awareness to the physical sensation of walking: notice the feeling of your feet touching the ground, the movement in your legs and body.",
        "Engage your senses: What do you see around you? Notice colors, shapes, movement. What do you hear? Listen to sounds near and far without judgment.",
        "What do you feel? Notice the air on your skin, the sun, or the wind.",
        "Pay attention to your breath as you walk.",
        "If your mind wanders (which it will), gently acknowledge the thought and return your focus to the sensation of walking or your senses.",
        "You can practice for just a few minutes or your entire walk."
      ]
    }
  },
  {
    id: 6,
    title: "Understanding Self-Compassion",
    description: "Learn about the core elements of self-compassion.",
    type: "video",
    imageUrl: "https://images.unsplash.com/photo-1463736932348-4915535cf6f9?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    videoLength: "5:56",
    content: { type: 'video', embedUrl: "https://www.youtube.com/embed/IvtZBUSplr4" }
  },
];

const Resources = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<ResourceCategory>('all');
  const [filteredResources, setFilteredResources] = useState<Resource[]>(resources);
  const [viewingResource, setViewingResource] = useState<Resource | null>(null);

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

  const handleResourceClick = (resource: Resource) => {
    setViewingResource(resource);
  };

  const handleCloseViewer = () => {
    setViewingResource(null);
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-background to-mental-50/50 dark:from-gray-900 dark:to-gray-800/50">
      <div className="flex-1 h-full p-6 overflow-y-auto animate-slide-up opacity-0">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 pt-6">
            <h1 className="text-3xl font-bold mb-2">Educational Resources</h1>
            <p className="text-lg text-calm-600 dark:text-calm-400">
              Explore articles, videos, and exercises to support your mental health journey
            </p>
          </div>
          
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
                    onClick={() => handleResourceClick(resource)}
                  >
                    {resource.type === 'article' ? 'Read Article' : 
                     resource.type === 'video' ? 'Watch Video' : 'Start Exercise'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="glass-card p-6 mb-12">
            <h2 className="text-2xl font-bold mb-4">Weekly Featured Content</h2>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/3">
                <h3 className="text-xl font-semibold mb-2">Featured Video</h3>
                <p className="text-calm-600 mb-4">
                  Check out this week's featured video resource for insights and techniques.
                </p>
              </div>
              <div className="flex-1 w-full mt-4 md:mt-0">
                <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/34cW5Dzykic"
                    title="Weekly Featured Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                  >
                  </iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <SidebarNav />

      <AnimatePresence>
        {viewingResource && (
          <ResourceViewerCard 
            key={viewingResource.id}
            isOpen={true}
            resource={viewingResource}
            onClose={handleCloseViewer}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Resources;
