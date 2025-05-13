
import React from "react";
import { Product } from "@/types/Product";
import Image from "next/image";
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
          width={300}
          height={300}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {product.category}
          </span>
        </div>
        <p className="text-lg font-bold text-blue-600 mb-2">{formatPrice(product.price)}</p>
        <p className="text-gray-600 text-sm line-clamp-3 mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {new Date(product.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;