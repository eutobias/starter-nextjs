import React from 'react';
import { cn } from '@/lib/cn';

interface TitleProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  onClick?: (event?: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export const Title: React.FC<TitleProps> = ({
  level = 1,
  children,
  className,
  onClick,
  style,
  ...props
}) => {
  const Component = `h${level}` as keyof React.JSX.IntrinsicElements;

  const levelClasses = {
    1: 'text-4xl font-bold',
    2: 'text-3xl font-semibold',
    3: 'text-2xl font-semibold',
    4: 'text-xl font-medium',
    5: 'text-lg font-medium',
    6: 'text-base font-medium'
  };

  return (
    <Component 
      className={cn(levelClasses[level], className)}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};