import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),

  type: Yup.string()
    .oneOf(
      ["Individual", "Business"],
      "Type must be either Individual or Business"
    )
    .required("Type is required"),

  fullname: Yup.string()
    .min(3, "Fullname must be at least 3 characters long")
    .max(100, "Full name cannot be longer than 100 characters")
    .required("Full name is required"),

  accepted: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("Acceptance of terms is required"),
});

export const signinSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});

export const supportrequestSchema = Yup.object().shape({
  issue: Yup.string()
    .required("Issue is required")
    .min(10, "Issue must be at least 10 characters"),
});

export const repairSchema = Yup.object().shape({
  description: Yup.string()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters")
    .max(255, "Description must be at most 255 characters"),
  scheduleAt: Yup.date()
    .required("Schedule date is required")
    .typeError("Schedule date must be a valid date"),
});

export const createSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be a positive number"),
  quantity: Yup.number()
    .required("Quantity is required")
    .min(0, "Quantity must be a positive number"),
  weight: Yup.number()
    .required("Weight is required")
    .min(0, "Weight must be a positive number"),
  inStock: Yup.boolean().required("Stock status is required"),
});

export const RepairEditSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  status: Yup.string()
    .oneOf(
      ["SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELED"],
      "Invalid status"
    )
    .required("Status is required"),
  quote: Yup.number().when("status", {
    is: "COMPLETED",
    then: Yup.number()
      .required("Quote is required when status is COMPLETED")
      .positive("Quote must be a positive number"),
    otherwise: Yup.number().notRequired(),
  }),
});
