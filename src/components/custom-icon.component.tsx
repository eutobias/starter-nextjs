import { DynamicIcon, IconName } from "lucide-react/dynamic";

export interface CustomIconProps {
  name: IconName;
  className?: string;
  size?: number;
  color?: string;
}

export const CustomIcon = ({
  name: name,
  className = "",
  size,
  color,
}: CustomIconProps) => {
  
  return (
    <DynamicIcon name={name} className={className} size={size} color={color} />
  );
};
