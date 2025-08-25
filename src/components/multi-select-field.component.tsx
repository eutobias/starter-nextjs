import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@/components/box.component';
import { CustomIcon } from '@/components/custom-icon.component';
import { Text } from '@/components/text.component';
import { cn } from '@/lib/cn';
import { useId } from 'react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label: string;
  name?: string;
  options: Option[];
  value: string[];
  onChange: (value: string[], name?: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
  tip?: string;
  labelTip?: string;
}

export const MultiSelectField = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select options...",
  disabled = false,
  className = "",
  error,
  tip,
  name,
  labelTip
}:MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleOption = (optionValue: string) => {
    if (disabled) return;

    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];

    onChange(newValue, name);
  };

  const handleRemoveTag = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    onChange(value.filter(v => v !== optionValue), name);
  };

  const selectedOptions = options.filter(option => value.includes(option.value));
  const hasOverflow = selectedOptions.length > 2; // Show overflow after 2 items
  const visibleOptions = hasOverflow ? selectedOptions.slice(0, 2) : selectedOptions;
  const overflowCount = hasOverflow ? selectedOptions.length - 2 : 0;

  return (
    <Box className="flex flex-col">
      <label htmlFor={id}>
        <Text className="font-medium">{label}</Text>
        {labelTip && (
          <Text className="text-xs text-gray-400 font-normal">{labelTip}</Text>
        )}
      </label>

      <div className={cn("relative", className)} ref={dropdownRef}>
        {/* Main Input */}
        <Box
          id={id}
          className={cn(
            "h-[40px] w-full rounded-lg border bg-white pl-3 pr-1 py-2 text-sm cursor-pointer overflow-hidden",
            "focus-within:ring-2 focus-within:ring-brand-primary/20 focus-within:ring-offset-2",
            {
              "border-gray-200": !error,
              "border-red-500": error,
              "bg-gray-100 cursor-not-allowed opacity-50": disabled,
              "ring-2 ring-brand-primary/20 border-brand-primary": isOpen && !error,
            }
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <Box className="flex items-center h-full gap-1">
            {/* Selected Tags */}
            <Box className="flex items-center gap-1 flex-1 min-w-0 overflow-x-hidden">
              {visibleOptions.map((option) => (
                <Box
                  key={option.value}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-200 text-gray-900 text-xs rounded-md flex-shrink-0"
                >
                  <Text className="truncate max-w-[100px]">{option.label}</Text>
                  {!disabled && (
                    <button
                      type="button"
                      onClick={(e) => handleRemoveTag(option.value, e)}
                      className="hover:bg-blue-200 rounded-full p-0.5 flex-shrink-0"
                    >
                      <CustomIcon name="x" className="w-3 h-3" />
                    </button>
                  )}
                </Box>
              ))}

              {/* Overflow indicator */}
              {hasOverflow && (
                <Box className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md flex-shrink-0">
                  <Text>+{overflowCount}</Text>
                </Box>
              )}

              {/* Placeholder */}
              {selectedOptions.length === 0 && (
                <Text className="text-gray-500 truncate">{placeholder}</Text>
              )}
            </Box>

            {/* Dropdown Arrow */}
            <Box className="flex-shrink-0 justify-end bg-white">
              <CustomIcon
                name={isOpen ? "chevron-up" : "chevron-down"}
                className="w-4 h-4 text-gray-900"
              />
            </Box>
          </Box>
        </Box>

        {/* Dropdown */}
        {isOpen && (
          <Box className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-auto">
            {options.length === 0 ? (
              <Box className="px-3 py-2">
                <Text className="text-sm text-gray-500">No options available</Text>
              </Box>
            ) : (
              options.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <Box
                    key={option.value}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100",
                      isSelected && "bg-blue-50"
                    )}
                    onClick={() => handleToggleOption(option.value)}
                  >
                    <Box className={cn(
                      "w-4 h-4 border border-gray-300 rounded flex items-center justify-center",
                      isSelected && "bg-blue-500 border-blue-500"
                    )}>
                      {isSelected && (
                        <CustomIcon name="check" className="w-3 h-3 text-white" />
                      )}
                    </Box>
                    <Text className={cn(isSelected && "font-medium")}>
                      {option.label}
                    </Text>
                  </Box>
                );
              })
            )}
          </Box>
        )}
      </div>

      <Box className="flex flex-col">
        {tip && <Text className="text-xs text-gray-500 mt-1">{tip}</Text>}
        {error && <Text className="text-xs text-red-500 mt-1">{error}</Text>}
      </Box>
    </Box>
  );
};
