import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

interface LinkButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: 'link' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
  onClick?: (event?: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  href,
  variant = 'link',
  size = 'md',
  className,
  external = false,
  onClick,
  style,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    link: 'text-primary-600 hover:text-primary-700 underline hover:no-underline focus:ring-primary-500',
    primary: 'justify-center rounded-md font-medium bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 no-underline',
    secondary: 'justify-center rounded-md font-medium bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 no-underline',
    outline: 'justify-center rounded-md font-medium border border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 no-underline',
    ghost: 'justify-center rounded-md font-medium text-primary-600 hover:bg-primary-50 focus:ring-primary-500 no-underline',
    destructive: 'justify-center rounded-md font-medium bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 no-underline'
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg'
  };

  const linkClasses = cn(
    baseClasses,
    variantClasses[variant],
    variant !== 'link' ? sizeClasses[size] : '',
    className
  );

  if (external) {
    return (
      <a
        href={href}
        className={linkClasses}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        style={style}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link 
      href={href} 
      className={linkClasses} 
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </Link>
  );
};