import { Button } from "@/components/button.component";
import { CustomIcon } from "@/components/custom-icon.component";
import { Text } from "@/components/text.component";
import { IconName } from "lucide-react/dynamic";
import React from "react";

interface ActionButtonProps {
  icon: IconName;
  label: string;
  iconColor?: string;
  iconSize?: number;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: (event?: React.MouseEvent) => void;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  iconColor = "text-purple-500",
  iconSize = 24,
  variant = "outline",
  size = "md",
  className = "",
  onClick,
  style,
  disabled = false,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={`h-24 flex-col ${className}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
      {...props}
    >
      <CustomIcon name={icon} className={`${iconColor} mb-2`} size={iconSize} />
      <Text className="text-sm font-medium">{label}</Text>
    </Button>
  );
};
