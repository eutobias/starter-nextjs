import { Box } from "@/components/box.component";
import { CustomIcon } from "@/components/custom-icon.component";
import { Text } from "@/components/text.component";
import { cn } from "@/lib/cn";
import { IconName } from "lucide-react/dynamic";
import { useId } from "react";

interface TextareaFieldProps {
  label: string;
  name: string;
  value: string;
  icon?: IconName;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  tip?: string;
  labelTip?: string;
  disabled?: boolean;
}

export const TextareaField = ({
  label,
  icon,
  value,
  onChange,
  name,
  className,
  error,
  placeholder,
  rows = 5,
  maxLength,
  tip,
  labelTip,
  disabled,
}: TextareaFieldProps) => {
  const id = useId();

  return (
    <Box className="flex flex-col">
      <label htmlFor={id}>
        <Text className="font-medium">{label}</Text>
        {labelTip && (
          <Text className="text-xs text-gray-400 font-normal">{labelTip}</Text>
        )}
      </label>
      <Box className="relative">
        {icon && (
          <CustomIcon
            name={icon}
            className="absolute left-3 top-3 text-gray-400 w-5 h-5"
          />
        )}
        <textarea
          id={id}
          name={name}
          className={cn(
            "flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm",
            "ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-brand-primary/20 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50 resize-y",
            {
              "pl-10": icon,
              "border-red-500": error,
            },
            className
          )}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          maxLength={maxLength}
        />
      </Box>

      <Box className="flex justify-between items-center">
        <Box className="flex flex-col">
          {tip && <Text className="text-xs text-gray-500 mt-1">{tip}</Text>}
          {error && <Text className="text-xs text-red-500 mt-1">{error}</Text>}
        </Box>
        {maxLength && (
          <Text className="text-xs text-gray-500 mt-1">
            {value.length}/{maxLength}
          </Text>
        )}
      </Box>
    </Box>
  );
};
