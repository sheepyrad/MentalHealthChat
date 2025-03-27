
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  onClick,
  className,
  children
}) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "glass-card p-6 transition-all duration-300 cursor-pointer",
        "hover:shadow-medium hover:translate-y-[-2px]",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className="bg-gradient-to-br from-mental-400 to-mental-600 h-12 w-12 rounded-full flex items-center justify-center mb-4 text-white">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-calm-600 mb-4">{description}</p>
      {children}
    </div>
  );
};

export default FeatureCard;
