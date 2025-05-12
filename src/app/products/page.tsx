"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

// Novo tipo de produto com todos os campos
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || data); // Suporta ambos formatos
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Carregando...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Produtos de Tecnologia</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
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
              <span className="text-xs text-gray-500 mt-1">{product.category}</span>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 justify-between gap-2">
              <p className="text-gray-700 text-sm line-clamp-2 mb-2">{product.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-blue-600 text-lg">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm transition">Comprar</button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}