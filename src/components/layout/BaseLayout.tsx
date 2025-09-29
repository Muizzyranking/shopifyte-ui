"use client";

import Navbar from "@/components/navbar/NavBar";

export default function BaseLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mainClassName = className ? ` ${className}` : "";
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar isLoggedIn={true} />
      <main className={mainClassName}>{children}</main>
    </div>
  );
}
