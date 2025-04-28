import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Re-define Resource interface here or import from Resources.tsx if exported
interface Resource {
  id: number;
  title: string;
  description?: string; // Description can be optional in the card itself
  type: 'article' | 'video' | 'exercise';
  imageUrl?: string; // ImageUrl optional here
  readTime?: string;
  videoLength?: string;
  author?: string;
  content: string | { type: 'video', embedUrl: string } | { type: 'exercise', steps: string[] };
}

interface ResourceViewerCardProps {
  isOpen: boolean;
  resource: Resource | null;
  onClose: () => void;
}

// Define animation variants
const cardVariants = {
  hidden: {
    y: "100%", // Start fully below the viewport
    opacity: 0.8, // Slightly fade in too
  },
  visible: {
    y: 0, // End at the normal position
    opacity: 1,
  },
};

const ResourceViewerCard: React.FC<ResourceViewerCardProps> = ({ isOpen, resource, onClose }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={cardVariants}
      transition={{ type: "spring", damping: 30, stiffness: 250 }}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 bg-background border-t border-border shadow-lg',
        'h-screen flex flex-col'
      )}
    >
      {/* Header with Close Button */}
      <div className="flex justify-between items-center p-4 border-b border-border flex-shrink-0">
        <h2 className="text-xl md:text-2xl font-semibold truncate pr-4">{resource?.title}</h2>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close resource viewer">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Content Area */}
      <ScrollArea className="flex-1 overflow-y-auto">
        {resource && (
          <div className="p-6 md:p-8">
            {resource.type === 'article' && resource.author && (
              <p className="text-sm text-muted-foreground mb-4">By {resource.author}</p>
            )}
            
            {/* Render content based on type */}
            {typeof resource.content === 'string' && (
              <article className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                {resource.content}
              </article>
            )}
            
            {typeof resource.content === 'object' && resource.content.type === 'video' && (
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={resource.content.embedUrl}
                  title={resource.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className='rounded-md'
                >
                </iframe>
              </div>
            )}

            {typeof resource.content === 'object' && resource.content.type === 'exercise' && (
              <div>
                  <h3 className="text-lg font-semibold mb-3">Steps:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                      {resource.content.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                      ))}
                  </ol>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </motion.div>
  );
};

export default ResourceViewerCard; 