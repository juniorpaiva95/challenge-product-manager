/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { toast } from "sonner";

interface ProductFormProps {
  onAddProduct: (product: {
    name: string;
    category: string;
    price: number;
    description: string;
    imageUrl: string;
  }) => Promise<void>;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Electronics",
    price: "",
    description: "",
    imageUrl: "",
  });

  const categories = [
    "Electronics",
    "Audio",
    "Wearables",
    "Photography",
    "Gaming",
    "Computers",
    "Accessories",
    "Home",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.warning("Nome obrigatório", {
        description: "Por favor, informe o nome do produto.",
      });
      return false;
    }
    
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      toast.warning("Preço inválido", {
        description: "Por favor, informe um preço válido maior que zero.",
      });
      return false;
    }
    
    if (!formData.description.trim()) {
      toast.warning("Descrição obrigatória", {
        description: "Por favor, informe a descrição do produto.",
      });
      return false;
    }
    
    if (!formData.imageUrl.trim()) {
      toast.warning("URL da imagem obrigatória", {
        description: "Por favor, informe a URL da imagem do produto.",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await onAddProduct({
        ...formData,
        price: Number(formData.price),
      });
      
      toast.success("Produto adicionado", {
        description: "O produto foi adicionado com sucesso!",
      });
      
      // Reset form
      setFormData({
        name: "",
        category: "Electronics",
        price: "",
        description: "",
        imageUrl: "",
      });
    } catch (error: any) {
      toast.error("Erro ao adicionar produto", {
        description: "Ocorreu um erro ao adicionar o produto. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Adicionar Novo Produto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Produto
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nome do produto"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Preço
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Descreva o produto"
          />
        </div>
        
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            URL da Imagem
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          {isSubmitting ? "Adicionando..." : "Adicionar Produto"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;