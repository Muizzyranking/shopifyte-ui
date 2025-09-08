"use client";

import { AlertCircle, CheckCircle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export interface ToastMessage {
  id: string;
  message: string;
  type: "error" | "success";
}

interface ToastProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

export function Toast({ toast, onRemove }: ToastProps) {
  return (
    <Alert
      variant={toast.type === "error" ? "destructive" : "default"}
      className="w-80 animate-in slide-in-from-right-full duration-300"
    >
      {toast.type === "error" ? (
        <AlertCircle className="h-4 w-4" />
      ) : (
        <CheckCircle className="h-4 w-4" />
      )}
      <AlertDescription className="flex justify-between items-center">
        <span>{toast.message}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(toast.id)}
          className="h-auto p-0 ml-2"
        >
          <X className="h-3 w-3" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}

type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
  position?: ToastPosition;
}

const positionClasses: Record<ToastPosition, string> = {
  "top-right": "fixed top-4 right-4 z-50 space-y-2",
  "top-left": "fixed top-4 left-4 z-50 space-y-2",
  "bottom-right": "fixed bottom-4 right-4 z-50 space-y-2",
  "bottom-left": "fixed bottom-4 left-4 z-50 space-y-2",
  "top-center": "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2",
  "bottom-center": "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2",
};

export function ToastContainer({
  toasts,
  removeToast,
  position = "top-right",
}: ToastContainerProps) {
  if (toasts.length === 0) return null;
  const positionClass = positionClasses[position] || positionClasses["top-right"];

  return (
    <div className={positionClass}>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}
