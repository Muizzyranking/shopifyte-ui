import type { RegisterData } from "@/types/auth.types";

const validateEmail = (email: string): string[] => {
  const errors: string[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.push("Email is required.");
  } else if (email.length > 255) {
    errors.push("Email must be less than 255 characters.");
  } else if (!emailRegex.test(email)) {
    errors.push("Invalid email format.");
  }
  return errors;
};

const validateUsername = (username: string): string[] => {
  const errors: string[] = [];
  if (!username) {
    errors.push("Username is required");
  } else if (username.length < 3) {
    errors.push("Must be at least 3 characters");
  } else if (username.length > 20) {
    errors.push("Must be no more than 20 characters");
  } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.push("Can only contain letters, numbers, and underscores");
  }
  return errors;
};

const validateName = (name: string, fieldName: string): string[] => {
  const errors: string[] = [];
  if (!name) {
    errors.push(`${fieldName} is required`);
  } else if (name.length < 2) {
    errors.push(`${fieldName} must be at least 2 characters`);
  }
  return errors;
};

const validatePhone = (phone: string): string[] => {
  const errors: string[] = [];
  if (!phone) {
    errors.push("Phone number is required");
  } else if (!/^\+?[\d\s\-()]{10,}$/.test(phone)) {
    errors.push("Please enter a valid phone number");
  }
  return errors;
};

const validatePassword = (password: string): string[] => {
  const errors: string[] = [];
  if (!password) {
    errors.push("Password is required");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  } else if (!/(?=.*[a-z])/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  } else if (!/(?=.*[A-Z])/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  } else if (!/(?=.*\d)/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  return errors;
};

const validateConfirmPassword = (confirmPassword: string, password: string): string[] => {
  const errors: string[] = [];
  if (!confirmPassword) {
    errors.push("Please confirm your password");
  } else if (confirmPassword !== password) {
    errors.push("Passwords do not match");
  }
  return errors;
};

export const validateField = (name: string, value: string, formData?: RegisterData): string[] => {
  switch (name) {
    case "email":
      return validateEmail(value);
    case "username":
      return validateUsername(value);
    case "firstName":
      return validateName(value, "First name");
    case "lastName":
      return validateName(value, "Last name");
    case "phoneNumber":
      return validatePhone(value);
    case "password":
      return validatePassword(value);
    case "confirmPassword":
      return validateConfirmPassword(value, formData?.password || "");
    default:
      return [];
  }
};
