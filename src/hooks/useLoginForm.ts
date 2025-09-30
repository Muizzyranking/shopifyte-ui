import { useState } from "react";
import { useToastActions } from "@/context/toast";
import type { BackendLoginResponse, LoginData } from "@/types/auth.types";

export function useLoginForm(
  onSuccess?: (data: LoginData, response?: BackendLoginResponse) => void,
) {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { successToast, errorToast } = useToastActions();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: BackendLoginResponse = await response.json();

      if (!response.ok) {
        errorToast(data.message || "Login failed. Please try again.");
      } else {
        setFormData({
          email: "",
          password: "",
        });
        successToast(data.message || "Login successful!");

        if (onSuccess) {
          onSuccess(formData, data);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      errorToast("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  };
}
