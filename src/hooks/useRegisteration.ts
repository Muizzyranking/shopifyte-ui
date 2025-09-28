import { useState } from "react";
import { useToastActions } from "@/context/toast";
import type { BackendRegisterResponse, RegisterData } from "@/types/auth";
import { validateField } from "@/utils/validators";

export function useRegistrationForm(onSuccess?: (data: RegisterData) => void) {
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
  const { errorToast, successToast } = useToastActions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: [] }));
    }

    if (touchedFields.has(name)) {
      const fieldErrors = validateField(name, value, formData);
      setErrors((prev) => ({ ...prev, [name]: fieldErrors }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => new Set([...prev, name]));
    const fieldErrors = validateField(name, value, formData);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldErrors: { [key: string]: string[] } = {};
    Object.keys(formData).forEach((key) => {
      const errors = validateField(key, formData[key as keyof RegisterData], formData);
      if (errors.length > 0) fieldErrors[key] = errors;
    });

    if (Object.keys(fieldErrors).length > 0) {
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

      if (!response.ok) {
        const backendErrors = data.errors || {};
        setErrors(backendErrors);
        errorToast(data.message || "Registration failed. Please try again.");
      } else {
        // Reset form on success
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
        successToast(data.message || "Account created successfully!");

        if (onSuccess) {
          onSuccess(formData);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      errorToast("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const getFieldError = (fieldName: string): string[] => errors[fieldName] || [];
  const getFieldSuccess = (fieldName: string): boolean => {
    return Boolean(
      touchedFields.has(fieldName) &&
        !errors[fieldName]?.length &&
        formData[fieldName as keyof RegisterData],
    );
  };

  return {
    formData,
    errors,
    isSubmitting,
    touchedFields,
    handleInputChange,
    handleBlur,
    handleSubmit,
    getFieldError,
    getFieldSuccess,
  };
}
