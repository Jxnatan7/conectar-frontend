"use client";
import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import RouterHandler from "@/components/RouterHandler";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        <AuthProvider>
          <RouterHandler />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
