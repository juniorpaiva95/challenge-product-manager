"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Pagination } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/useProductStore";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
};

const PRODUCTS_PER_PAGE = 8;

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const search = useProductStore((s) => s.search);
  const currentPage = useProductStore((s) => s.currentPage);
  const setCurrentPage = useProductStore((s) => s.setCurrentPage);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Carregando...</div>;
  }

  // Filtro de busca
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Paginação
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {paginatedProducts.map((product) => (
          <Card key={product.id} className="flex flex-col h-full shadow-md hover:shadow-xl transition border border-gray-100">
            <div className="h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden rounded-t">
              <Image
                src={product.image}
                alt={product.name}
                className="object-cover h-full w-full"
                loading="lazy"
                width={300} height={200}
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold line-clamp-1">{product.name}</CardTitle>
              <Badge variant="outline">{product.category}</Badge>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 justify-between gap-2">
              <p className="text-gray-700 text-sm line-clamp-2 mb-2">{product.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-blue-600 text-lg">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                <Button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm transition">Comprar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Paginação */}
      <Pagination className="mt-10">
        <button
          className="px-3 py-1 mx-1 rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-3 py-1 mx-1 rounded border border-gray-300 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 mx-1 rounded border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </Pagination>
    </div>
  );
}