 
"use client";

import { toast } from "sonner";
import { createProduct } from "@/services/productService";
import ProductForm from "../../../components/ProductForm";
import { useRouter } from "next/navigation";
export default function NewProductPage() {
    const router = useRouter();
  
    const handleAddProduct = async (newProduct: {
      name: string;
      category: string;
      price: number;
      description: string;
      imageUrl: string;
    }) => {
      try {
        await createProduct(newProduct);
        toast.success("Produto adicionado", {
          description: "O produto foi adicionado com sucesso!",
        });
        // router.push("/"); // Redireciona para a página de listagem após adicionar
        return Promise.resolve();
      } catch (error) {
        console.error("Error adding product:", error);
        return Promise.reject(error);
      }
    };

  return (
    <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Adicionar Novo Produto</h1>
          <p className="text-gray-600">
            Preencha o formulário abaixo para adicionar um novo produto ao catálogo
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <ProductForm onAddProduct={handleAddProduct} />
        </div>
      </div>
  );
} 