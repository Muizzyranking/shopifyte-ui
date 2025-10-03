"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";

export default function LogoutPage() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900">
          {<Loader2 className="h-8 w-8 text-blue-600 dark:text-blue-400 animate-spin" />}
        </div>
      </div>
    </div>
  );
}
