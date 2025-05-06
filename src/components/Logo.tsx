
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
  fullLogo?: boolean;
  className?: string;
  variant?: 'default' | 'clean' | 'new';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  withText = true, 
  fullLogo = false,
  className = '',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24',
  };

  // We'll continue using the existing logo path - this is the version with the screenshot
  const defaultLogoPath = `${import.meta.env.BASE_URL}lovable-uploads/b0f20013-323f-412c-afd3-b150af6bfbaf.png`;
  
  // For the "clean" variant, we would use just the logo portion
  // Since we don't have a separate clean version, we'll use the same image
  // but with CSS to focus on just the logo portion
  
  // For the new variant, we'll use the newly uploaded logo
  const newLogoPath = `${import.meta.env.BASE_URL}lovable-uploads/7495b097-c81a-4d08-8c19-ff1d6c13c54c.png`;
  
  // Choose which logo to display based on the variant
  let logoPath = defaultLogoPath;
  if (variant === 'new') {
    logoPath = newLogoPath;
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`relative ${variant === 'clean' ? 'overflow-hidden' : ''}`}>
        <img 
          src={logoPath}
          alt="Africa University Logo" 
          className={`${sizeClasses[size]} w-auto ${fullLogo ? 'object-contain' : ''} ${variant === 'clean' ? 'scale-[1.2] object-cover' : ''}`}
        />
      </div>
      {withText && variant !== 'new' && (
        <div className="ml-2">
          <span className={`font-bold ${size === 'xl' ? 'text-2xl' : size === 'lg' ? 'text-xl' : size === 'md' ? 'text-lg' : 'text-base'}`}>
            AU GMS
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
