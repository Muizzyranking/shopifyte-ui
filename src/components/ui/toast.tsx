"use client";

import { AlertCircle, CheckCircle, Info, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export interface ToastMessage {
  id: string;
  message: string;
  type: "error" | "success" | "info";
}

interface ToastProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

interface VariantProps {
  variant?: "default" | "destructive" | "info";
  icon?: React.ReactNode;
}
export type ToastType = "error" | "info" | "success";

const variantMap: Record<ToastType, VariantProps> = {
  error: { variant: "destructive", icon: <AlertCircle className="h-4 w-4" /> },
  info: { variant: "info", icon: <Info className="h-4 w-4" /> },
  success: { variant: "default", icon: <CheckCircle className="h-4 w-4" /> },
};

const getVariant = (toast_type: ToastType): VariantProps => {
  return variantMap[toast_type] || variantMap.info;
};

export function Toast({ toast, onRemove }: ToastProps) {
  const { variant, icon } = getVariant(toast.type);
  return (
    <Alert variant={variant} className="w-80 animate-in slide-in-from-right-full duration-300">
      {icon}
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
