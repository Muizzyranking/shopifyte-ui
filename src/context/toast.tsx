"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import type { ToastMessage, ToastType } from "@/components/ui/toast";
import { ToastContainer } from "@/components/ui/toast";
import { MAX_TOASTS, TOAST_DURATION } from "@/constants";

interface ToastContextType {
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  toasts: ToastMessage[];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
  defaultDuration?: number;
  maxToasts?: number;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}

export function ToastProvider({
  children,
  defaultDuration = TOAST_DURATION,
  maxToasts = MAX_TOASTS,
  position = "top-right",
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: ToastType, duration = defaultDuration) => {
    const id = crypto.randomUUID();
    const newToast: ToastMessage = { id, message, type };

    setToasts((prev) => {
      const newToasts = [...prev, newToast];
      return newToasts.slice(-maxToasts);
    });

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const clearToasts = () => {
    setToasts([]);
  };

  const value: ToastContextType = {
    addToast,
    removeToast,
    clearToasts,
    toasts,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} position={position} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}

export function useToastActions() {
  const { addToast } = useToast();

  return {
    successToast: (message: string, duration?: number) => addToast(message, "success", duration),
    errorToast: (message: string, duration?: number) => addToast(message, "error", duration),
    infoToast: (message: string, duration?: number) => addToast(message, "info", duration),
  };
}
