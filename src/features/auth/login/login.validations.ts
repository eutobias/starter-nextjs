import * as Yup from "yup";

export const loginValidations = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Email is required")
    .typeError("Invalid email address"),
  password: Yup.string().required("Password is required"),
});
