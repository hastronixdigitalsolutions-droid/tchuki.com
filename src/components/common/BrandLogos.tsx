import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export const TchukiGroupLogo: React.FC<LogoProps> = ({ className = 'h-10 w-auto' }) => {
  return (
    <img
      src="/assets/aistudio/Tchuki_Group_Eco-Tech_Logo_b371a75d.png"
      alt="Tchuki Group"
      className={`object-contain ${className}`}
      onError={(e) => {
        // Fallback to text lockup if image path fails
        e.currentTarget.style.display = 'none';
      }}
    />
  );
};

export const TchukiFarmsLogo: React.FC<LogoProps> = ({ className = 'h-12 w-auto' }) => {
  return (
    <img
      src="/assets/tchuki_farms_logo.jpg"
      alt="Tchuki Farms - Cultivating Crops, Cultivating Wealth"
      className={`object-contain ${className}`}
    />
  );
};

export const TchukiDigitalLogo: React.FC<LogoProps> = ({ className = 'h-12 w-auto' }) => {
  return (
    <img
      src="/assets/tchuki_digital_logo.png"
      alt="Tchuki Digital - Turning Ideas Into Digital Solutions"
      className={`object-contain ${className}`}
    />
  );
};
