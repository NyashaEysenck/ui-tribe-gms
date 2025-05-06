
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

  // We'll continue using the existing logo paths for fallback
  const defaultLogoPath = `${import.meta.env.BASE_URL}lovable-uploads/b0f20013-323f-412c-afd3-b150af6bfbaf.png`;
  const newLogoPath = `${import.meta.env.BASE_URL}lovable-uploads/7495b097-c81a-4d08-8c19-ff1d6c13c54c.png`;
  
  // Use the newly uploaded Africa University logo (tree logo)
  const auLogoPath = `${import.meta.env.BASE_URL}lovable-uploads/caa20a60-380d-4f2f-9134-ba67b337bd55.png`;
  
  // Choose which logo to display based on the variant
  let logoPath = defaultLogoPath;
  if (variant === 'new') {
    logoPath = newLogoPath;
  } else if (variant === 'clean') {
    logoPath = auLogoPath;
  }

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`relative ${variant === 'clean' ? 'overflow-hidden' : ''}`}>
        <img 
          src={logoPath}
          alt="Africa University Logo" 
          className={`${sizeClasses[size]} w-auto ${fullLogo ? 'object-contain' : ''} ${variant === 'clean' ? 'object-contain' : ''}`}
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
