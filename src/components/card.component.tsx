import { Box } from "@/components/box.component";
import { cn } from "@/lib/cn";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({
  children,
  className,
}: CardProps) => {
  return (
    <Box direction="column" className={cn('bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow', className)}>
      {children}
    </Box>
  );
};