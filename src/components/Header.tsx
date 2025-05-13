"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useProductStore } from "@/store/useProductStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const search = useProductStore((state) => state.search);
  const setSearch = useProductStore((state) => state.setSearch);
  const pathname = usePathname();

  return (
    <header className="w-full min-h-[80px] flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 rounded-none bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg">
      <div className="flex items-center gap-3">
        <Image src="/next.svg" alt="Logo" width={40} height={40} />
        <span className="text-2xl font-bold text-white tracking-tight">TechStore</span>
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
        {pathname === "/products" && (
          <div className="w-full sm:w-96 mr-2">
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              className="bg-white/90 focus:bg-white border border-gray-200 focus:border-blue-500 shadow-sm"
            />
          </div>
        )}
        <nav className="flex gap-2">
          <Link href="/products" className={`px-3 py-1 rounded text-sm font-medium transition ${pathname === "/products" ? "bg-white text-blue-600" : "bg-blue-500 text-white hover:bg-blue-700"}`}>Produtos</Link>
          <Link href="/products/new" className={`px-3 py-1 rounded text-sm font-medium transition ${pathname === "/products/new" ? "bg-white text-blue-600" : "bg-blue-500 text-white hover:bg-blue-700"}`}>Cadastrar Produto</Link>
        </nav>
      </div>
    </header>
  );
} 