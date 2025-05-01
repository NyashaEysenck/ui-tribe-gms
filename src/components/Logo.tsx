
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <div className="flex items-center">
      <img 
        src="/lovable-uploads/b0f20013-323f-412c-afd3-b150af6bfbaf.png" 
        alt="Africa University Logo" 
        className={`${sizeClasses[size]} w-auto`}
      />
      {withText && (
        <div className="ml-2">
          <span className={`font-bold ${size === 'lg' ? 'text-xl' : size === 'md' ? 'text-lg' : 'text-base'}`}>
            AU GMS
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
