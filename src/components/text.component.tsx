import React from 'react';
import { cn } from '@/lib/cn';

interface TextProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  onClick?: (event?: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export const Text: React.FC<TextProps> = ({
  children,
  className,
  as: Component = 'p',
  onClick,
  style,
  ...props
}) => {
  return (
    <Component 
      className={cn(className)}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};