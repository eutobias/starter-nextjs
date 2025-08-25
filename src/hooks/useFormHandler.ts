import { useState } from "react";
import * as Yup from "yup";

export interface UseFormHandlerParams<T> {
  initialState: T;
}

export interface UseFormHandlerReturn<T> {
  formData: T;
  errors: Record<keyof T, string> | null;
  validate: (
    validation: Yup.ObjectSchema<Yup.Maybe<Yup.AnyObject>>
  ) => Promise<boolean>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleMultiselectChange: (name: keyof T, values: string[]) => void;
}

export const useFormHandler = <T>({
  initialState,
}: UseFormHandlerParams<T>): UseFormHandlerReturn<T> => {
  const [formData, setFormData] = useState<T>(initialState);
  const [errors, setErrors] = useState<Record<keyof T, string> | null>(
    Object.keys(initialState as object).reduce(
      (acc, key) => ({
        ...acc,
        [key]: "",
      }),
      {} as Record<keyof T, string>
    )
  );

  const genericChange = (e: any) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
    setErrors((state) =>
      state
        ? {
            ...state,
            [e.target.name]: "",
          }
        : null
    );
  };

  const validate = async (
    validation: Yup.ObjectSchema<Yup.Maybe<Yup.AnyObject>>
  ): Promise<boolean> => {
    try {
      await validation.validate(formData, {
        abortEarly: false,
      });
      setErrors(null);
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors = err.inner.reduce(
          (acc, error) => ({
            ...acc,
            [error.path as keyof T]: error.message,
          }),
          {} as Record<keyof T, string>
        );
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    genericChange(e);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    genericChange(e);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    genericChange(e);
  };

  const handleMultiselectChange = (name: keyof T, values: string[]) => {
    setFormData((state) => ({
      ...state,
      [name]: values,
    }));
    setErrors((state) =>
      state
        ? {
            ...state,
            [name]: "",
          }
        : null
    );
  };

  return {
    formData,
    errors,
    validate,
    handleInputChange,
    handleSelectChange,
    handleTextareaChange,
    handleMultiselectChange
  };
};
