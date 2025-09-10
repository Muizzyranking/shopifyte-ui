"use client";
import { Loader2 } from "lucide-react";
import { useId, useState } from "react";
import type { BackendRegisterResponse } from "@/app/api/register/route";
import { PasswordField } from "@/components/ui/passwordField";
import { useToastActions } from "@/context/toast";
import { cn } from "@/lib/utils";
import type { RegisterData } from "@/types/auth";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { FormField } from "./ui/formField";

interface RegisterFormProps {
  onSuccess?: (data: RegisterData) => void;
  className?: string;
}

export default function RegistrationForm({ onSuccess, className }: RegisterFormProps) {
  const emailId = useId();
  const usernameId = useId();
  const firstNameId = useId();
  const lastNameId = useId();
  const phoneNumberId = useId();
  const passwordId = useId();
  const confirmPasswordId = useId();

  const [formData, setFormData] = useState<RegisterData>({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const { successToast, errorToast } = useToastActions();

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
    const fieldLen: number = 3;
    if (!name) {
      errors.push(`${fieldName} is required`);
    } else if (name.length < fieldLen) {
      errors.push(`${fieldName} must be at least ${fieldLen} characters`);
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

  const validateField = (name: string, value: string): string[] => {
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
        return validateConfirmPassword(value, formData.password);
      default:
        return [];
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: [] }));
    }
    if (touchedFields.has(name)) {
      const errors = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errors }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => new Set([...prev, name]));
    const fieldErrors = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors }));
  };

  const handleSubmit = async () => {
    const fieldErrors: { [key: string]: string[] } = {};
    Object.keys(formData).forEach((key) => {
      const errors = validateField(key, formData[key as keyof RegisterData]);
      if (errors.length > 0) fieldErrors[key] = errors;
    });

    if (Object.keys(fieldErrors).length > 0) {
      console.log("Validation Errors: ", fieldErrors);
      setErrors(fieldErrors);
      setTouchedFields(new Set(Object.keys(formData)));
      errorToast("Please fix the errors in the form");
      return;
    }
    setIsSubmitting(true);
    setErrors({});
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data: BackendRegisterResponse = await response.json();
      console.log("Server Response: ", data);
      console.log("Form Data Submitted: ", formData);
      console.log("Response OK: ", response.ok);

      if (!response.ok) {
        console.log("Backend Errors: ", data.errors);
        const backendError = data.errors || {};
        setErrors(backendError);
        Object.entries(backendError || {}).forEach(([field, backErrors]) => {
          backErrors.forEach((errorMsg) => {
            errorToast(`${field}: ${errorMsg}`);
          });
        });
      } else {
        successToast("Account created successfully!");
        setFormData({
          email: "",
          username: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        });
        setTouchedFields(new Set());
        if (onSuccess) {
          onSuccess(formData);
        }
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      errorToast("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: string): string[] => {
    return errors[fieldName] || [];
  };
  const getFieldSuccess = (fieldName: string): boolean => {
    return Boolean(
      touchedFields.has(fieldName) &&
        !errors[fieldName]?.length &&
        formData[fieldName as keyof RegisterData],
    );
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>Sign up with Google or enter your details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex flex-col gap-4">
            <Button type="button" variant="outline" className="w-full" disabled={isSubmitting}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mr-2">
                <title>Google icon</title>
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Sign up with Google
            </Button>
          </div>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <div className="grid gap-6">
            <FormField
              id={emailId}
              name="email"
              label="Email"
              type="email"
              placeholder="johndoe@email.com"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={(_) => {}}
              errors={getFieldError("email")}
              disabled={isSubmitting}
              hasSuccess={getFieldSuccess("email")}
              required
            />
          </div>
          <FormField
            id={usernameId}
            name="username"
            label="Username"
            placeholder="john_doe"
            value={formData.username}
            onChange={handleInputChange}
            onBlur={handleBlur}
            errors={getFieldError("username")}
            hasSuccess={getFieldSuccess("username")}
            disabled={isSubmitting}
            required
          />

          {/* First Name & Last Name */}
          <div className="grid gap-3 sm:grid-cols-2">
            <FormField
              id={firstNameId}
              name="firstName"
              label="First Name"
              placeholder="John"
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              errors={getFieldError("firstName")}
              hasSuccess={getFieldSuccess("firstName")}
              disabled={isSubmitting}
              required
            />
            <FormField
              id={lastNameId}
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              errors={getFieldError("lastName")}
              hasSuccess={getFieldSuccess("lastName")}
              disabled={isSubmitting}
              required
            />
          </div>
          <FormField
            id={phoneNumberId}
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            placeholder="+1234567890"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            onBlur={handleBlur}
            errors={getFieldError("phoneNumber")}
            hasSuccess={getFieldSuccess("phoneNumber")}
            disabled={isSubmitting}
            required
          />
          <PasswordField
            id={passwordId}
            name="password"
            label="password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            errors={getFieldError("password")}
            disabled={isSubmitting}
            required
            showRequirements={true}
          />
          <PasswordField
            id={confirmPasswordId}
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleBlur}
            errors={getFieldError("confirmPassword")}
            disabled={isSubmitting}
            required
            showRequirements={false}
            originalPassword={formData.password}
            isConfirmField={true}
          />
          <Button
            type="button"
            className="w-full"
            // disabled={isLoading || !isFormValid}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
