/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { AspectRatio } from "./ui/aspect-ratio";
import { AlertTitle } from "./ui/alert";
import { AlertDescription } from "./ui/alert";
import { Alert } from "./ui/alert";
import { Info } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

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
    imageUrl: "https://images.unsplash.com/",
  });
  const [imagePreviewError, setImagePreviewError] = useState(false);

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

    // Reset image preview error when changing the URL
    if (name === "imageUrl") {
      setImagePreviewError(false);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.warning("Nome obrigatório", {
        description: "Por favor, informe o nome do produto.",
      });
      return false;
    }

    if (
      !formData.price ||
      isNaN(Number(formData.price)) ||
      Number(formData.price) <= 0
    ) {
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

    if (imagePreviewError) {
      toast.warning("URL da imagem inválida", {
        description:
          "A URL fornecida não parece ser uma imagem válida. Por favor, verifique e tente novamente.",
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

  const handleImageError = () => {
    setImagePreviewError(true);
  };

  return (
    <>
      <Alert className="mb-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Atenção!</AlertTitle>
        <AlertDescription>
          Dominio de imagens configurado e permitido: https://images.unsplash.com/
          <br />
          <i>Obs: Em produção o dominio seria um blob storage permitido.</i>
        </AlertDescription>
      </Alert>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome do Produto
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome do produto"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Categoria
              </label>
              <Select
                name="category"
                value={formData.category}
                onValueChange={(value) => {
                  handleChange({
                    target: { name: "category", value },
                  } as React.ChangeEvent<HTMLSelectElement>);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Preço
              </label>
              <Input
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
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Descrição
              </label>
              <Textarea
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
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                URL da Imagem
              </label>
              <Input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors"
            >
              {isSubmitting ? "Adicionando..." : "Adicionar Produto"}
            </Button>
          </form>
        </div>

        {/* Preview da imagem */}
        <div className="flex flex-col justify-center">
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Preview do Produto
            </h3>
            <div className="rounded-lg border overflow-hidden bg-white">
              <div className="relative">
                <AspectRatio ratio={4 / 3} className="bg-muted">
                  {formData.imageUrl ? (
                    <Image
                      src={formData.imageUrl}
                      alt="Preview do produto"
                      width={800}
                      height={800}
                      className="object-cover w-full h-full transition-opacity"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                      <Image
                        width={800}
                        height={800}
                        src="/assets/images/g5-odissey.jpg"
                        alt="Preview do produto"
                        className="h-10 w-10 text-gray-400"
                      />
                    </div>
                  )}
                </AspectRatio>
              </div>
              <div className="p-3">
                <h4 className="font-medium truncate">
                  {formData.name || "Nome do produto"}
                </h4>
                <p className="text-sm text-gray-500 truncate mt-1">
                  {formData.category || "Categoria"}
                </p>
                <p className="text-lg font-bold text-blue-600 mt-2">
                  {formData.price
                    ? `R$ ${Number(formData.price).toFixed(2)}`
                    : "R$ 0,00"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
