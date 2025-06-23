// src/components/Header.tsx
"use client";
import { useRouter } from "next/navigation";
import { User as UserIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/Button";

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

export function Header({ title, showBack = false }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="px-6 py-4 bg-white shadow flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {showBack && (
          <Button
            onClick={() => router.back()}
            className="p-2 rounded hover:bg-gray-100 cursor-pointer"
            aria-label="Voltar"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </Button>
        )}
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
      <Button
        onClick={() => router.push("/profile")}
        className="p-2 rounded hover:bg-gray-100 cursor-pointer"
        aria-label="Perfil"
      >
        <UserIcon size={24} className="text-gray-700" />
      </Button>
    </header>
  );
}
