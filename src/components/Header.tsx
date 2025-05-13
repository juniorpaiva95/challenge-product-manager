"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useProductStore } from "@/store/useProductStore";

export function Header() {
  const search = useProductStore((s) => s.search);
  const setSearch = useProductStore((s) => s.setSearch);

  return (
    <header className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 rounded-none bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg">
      <div className="flex items-center gap-3">
        <Image src="/next.svg" alt="Logo" width={40} height={40} />
        <span className="text-2xl font-bold text-white tracking-tight">TechStore</span>
      </div>
      <div className="w-full sm:w-96">
        <Input
          type="text"
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          className="bg-white/90 focus:bg-white border border-gray-200 focus:border-blue-500 shadow-sm"
        />
      </div>
    </header>
  );
} 