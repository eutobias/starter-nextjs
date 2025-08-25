import { ValidationError } from "yup";

export function handleValidationErrors(error: ValidationError) {
  if (!(error instanceof ValidationError)) return;

  const errors = error.inner.reduce(
    (acc: Record<string, string>, curr: any) => {
      acc[curr.path] = curr.message;
      return acc;
    },
    {}
  );

  return errors;
}
