/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createProduct } from "@/services/productService";

export default function NewProductPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProduct({
        name,
        category,
        price: Number(price),
        description,
        image,
      });
      toast.success("Produto cadastrado com sucesso!");
      setName("");
      setCategory("");
      setPrice("");
      setDescription("");
      setImage("");
    } catch (err: any) {
      toast.error(err.message || "Erro ao cadastrar produto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Cadastrar Novo Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block mb-1 font-medium">Nome</label>
          <Input value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Categoria</label>
          <Input value={category} onChange={e => setCategory(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Preço</label>
          <Input type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Descrição</label>
          <Textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Imagem (URL)</label>
          <Input value={image} onChange={e => setImage(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar Produto"}
        </Button>
      </form>
    </div>
  );
} 