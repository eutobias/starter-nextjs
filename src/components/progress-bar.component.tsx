import React from 'react';
import { cn } from '@/lib/cn';
import { Box } from '@/components/box.component';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray' | 'indigo' | 'pink' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: (event?: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value,
  max = 100,
  color = 'blue',
  size = 'sm',
  className,
  onClick,
  style,
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    gray: 'bg-gray-500',
    indigo: 'bg-indigo-500',
    pink: 'bg-pink-500',
    orange: 'bg-orange-500'
  };

  const sizeClasses = {
    sm: 'h-3',
    md: 'h-6',
    lg: 'h-9'
  };

  return (
    <Box 
      className={cn(
        'w-full bg-gray-200 rounded-full h-',
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      style={style}
      {...props}
    >
      <Box
        className={cn(
          'rounded-full transition-all duration-300 ease-in-out',
          colorClasses[color],
          sizeClasses[size]
        )}
        style={{ width: `${percentage}%` }}
      />
    </Box>
  );
};