import React from 'react';
import { cn } from '@/lib/cn';

interface BoxProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  children?: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  onClick?: (event?: React.MouseEvent) => void;
  style?: React.CSSProperties;
  id?: string;
}

export const Box: React.FC<BoxProps> = ({ 
  direction = 'row', 
  children, 
  className,
  as: Component = 'div',
  onClick,
  style,
  id,
  ...props
}) => {
  const directionClasses = {
    'row': 'flex-row',
    'column': 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse'
  };

  return (
    <Component 
      id={id}
      className={cn(
        'flex',
        directionClasses[direction],
        className
      )}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};