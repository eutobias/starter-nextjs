import { Box } from "@/components/box.component";
import { CustomIcon } from "@/components/custom-icon.component";
import { Text } from "@/components/text.component";
import { cn } from "@/lib/cn";
import { IconName } from "lucide-react/dynamic";
import { useId } from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  icon?: IconName;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  defaultValue?: string;
  tip?: string;
  labelTip?: string;
  disabled?: boolean;
}

export const SelectField = ({
  label,
  icon,
  options,
  onChange,
  name,
  className,
  error,
  defaultValue,
  tip,
  labelTip,
  disabled,
}: SelectFieldProps) => {
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
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
          />
        )}
        <select
          id={id}
          name={name}
          className={cn(
            "flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 pr-10 py-2 text-sm",
            "ring-offset-white file:border-0 placeholder:text-gray-500 focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-brand-primary/20 focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            {
              "pl-10": icon,
              "border-red-500": error,
            },
            className
          )}
          onChange={onChange}
          defaultValue={defaultValue}
          disabled={disabled}
        >
          {options.map((option, index) => (
            <option key={index + option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Box>

      <Box className="flex flex-col">
        {tip && <Text className="text-xs text-gray-500 mt-1">{tip}</Text>}
        {error && <Text className="text-xs text-red-500 mt-1">{error}</Text>}
      </Box>
    </Box>
  );
};
