import React from 'react';
import { cn } from '@/lib/cn';

export type BadgeAvailableColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray' | 'indigo' | 'pink' | 'orange';

export interface BadgeProps {
  color?: BadgeAvailableColor;
  children: React.ReactNode;
  onClick?: (event?: React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({ 
  color = 'blue', 
  children, 
  onClick,
  className,
  style,
  ...props
}) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    purple: 'bg-purple-100 text-purple-800',
    gray: 'bg-gray-100 text-gray-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    pink: 'bg-pink-100 text-pink-800',
    orange: 'bg-orange-100 text-orange-800'
  };

  return (
    <span 
      className={cn(
        'px-2 py-1 rounded text-xs font-bold inline-flex items-center',
        colorClasses[color],
        onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
        className
      )}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </span>
  );
};