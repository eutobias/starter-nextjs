import { cn } from "@/lib/utils";
import { useId } from "react";

interface SwitchFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  error?: string;
  disabled?: boolean;
}

export const SwitchField = ({
  label,
  checked,
  onChange,
  name,
  className,
  error,
  disabled,
}: SwitchFieldProps) => {
  const id = useId();

  return (
    <div>
      <div className="flex gap-2">
        <div className="relative">
          <button
            type="button"
            id={id}
            name={name}
            role="switch"
            aria-checked={checked}
            onClick={() => !disabled && onChange(!checked)}
            disabled={disabled}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/20 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              {
                "bg-brand-primary": checked && !error,
                "bg-gray-200": !checked && !error,
                "bg-red-500": checked && error,
                "bg-red-200": !checked && error,
              },
              className
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                {
                  "translate-x-6": checked,
                  "translate-x-1": !checked,
                }
              )}
            />
          </button>
        </div>

        <label
          htmlFor={id}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
        >
          <span>{label}</span>
        </label>
      </div>

      <div className="flex flex-col">
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  );
};
