import React from 'react';
import { cn } from '@/lib/cn';

interface GridProps {
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  onClick?: (event?: React.MouseEvent) => void;
  style?: React.CSSProperties;
  id?: string;
}

export const Grid: React.FC<GridProps> = ({ 
  columns = 1, 
  children, 
  className,
  as: Component = 'div',
  onClick,
  style,
  id,
  ...props
}) => {
  const columnClasses = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
    7: 'lg:grid-cols-7',
    8: 'lg:grid-cols-8',
    9: 'lg:grid-cols-9',
    10: 'lg:grid-cols-10',
    11: 'lg:grid-cols-11',
    12: 'lg:grid-cols-12'
  };

  return (
    <Component 
      id={id}
      className={cn(
        'grid',
        'grid-cols-1',
        columnClasses[columns],
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