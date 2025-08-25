import React from "react";
import { cn } from "../lib/cn";

interface ListContainerProps {
  children?: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
  [key: string]: any;
}

interface ListItemProps {
  children?: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
  [key: string]: any;
}

const ListContainer: React.FC<ListContainerProps> = ({
  children,
  className = "",
  as = "ul",
  onClick,
  style,
  ...props
}) => {
  const Component = as as any;

  return (
    <Component
      className={cn(
        "list-none",
        "[&>*]:py-2 [&>*]:border-b [&>*]:border-gray-200 [&>*:last-child]:border-b-0 [&>*]:hover:bg-gray-50",
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

const ListItem: React.FC<ListItemProps> = ({
  children,
  className = "",
  as = "li",
  onClick,
  style,
  ...props
}) => {
  const Component = as as any;

  return (
    <Component
      className={cn("list-none flex flex-col", className)}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};

export const List = {
  Container: ListContainer,
  Item: ListItem,
};
