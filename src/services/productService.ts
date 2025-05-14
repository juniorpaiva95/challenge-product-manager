import productsData from "../../db/products.json";
import { Product } from "../types/Product";

const API_URL = "http://localhost:3001/products";
const USE_LOCAL_STORAGE = process.env.NODE_ENV === "production";
const LOCAL_STORAGE_KEY = "products";

function getLocalProducts(): Product[] {
  if (typeof window === "undefined") return [];
  let products = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!products) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(productsData.products));
    products = localStorage.getItem(LOCAL_STORAGE_KEY);
  }
  return products ? JSON.parse(products) : [];
}

function setLocalProducts(products: Product[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
}

export async function getProducts() {
  if (USE_LOCAL_STORAGE && typeof window !== "undefined") {
    return getLocalProducts();
  }
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Erro ao buscar produtos");
    return await res.json();
  } catch (error) {
    throw new Error("Erro ao buscar produtos: " + (error instanceof Error ? error.message : "Erro desconhecido"));
  }
}

export async function getProductById(id: number | string) {
  if (USE_LOCAL_STORAGE && typeof window !== "undefined") {
    const products = getLocalProducts();
    return products.find((p: Product) => p.id.toString() === id.toString());
  }
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Produto não encontrado");
    return await res.json();
  } catch (error) {
    throw new Error("Erro ao buscar produto: " + (error instanceof Error ? error.message : "Erro desconhecido"));
  }
}

export async function createProduct(product: {
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}) {
  if (USE_LOCAL_STORAGE && typeof window !== "undefined") {
    const products = getLocalProducts();
    const newProduct: Product = { ...product, id: Math.random().toString(16).slice(2), createdAt: new Date().toISOString() };
    products.push(newProduct);
    setLocalProducts(products);
    return newProduct;
  }
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Erro ao cadastrar produto");
    return await res.json();
  } catch (error) {
    throw new Error("Erro ao cadastrar produto: " + (error instanceof Error ? error.message : "Erro desconhecido"));
  }
}

export async function updateProduct(id: number | string, product: Partial<{
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}>) {
  if (USE_LOCAL_STORAGE && typeof window !== "undefined") {
    const products = getLocalProducts();
    const idx = products.findIndex((p: Product) => p.id.toString() === id.toString());
    if (idx === -1) throw new Error("Produto não encontrado");
    products[idx] = { ...products[idx], ...product };
    setLocalProducts(products);
    return products[idx];
  }
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Erro ao atualizar produto");
    return await res.json();
  } catch (error) {
    throw new Error("Erro ao atualizar produto: " + (error instanceof Error ? error.message : "Erro desconhecido"));
  }
}

export async function deleteProduct(id: number | string) {
  if (USE_LOCAL_STORAGE && typeof window !== "undefined") {
    let products = getLocalProducts();
    products = products.filter((p: Product) => p.id.toString() !== id.toString());
    setLocalProducts(products);
    return true;
  }
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Erro ao deletar produto");
    return true;
  } catch (error) {
    throw new Error("Erro ao deletar produto: " + (error instanceof Error ? error.message : "Erro desconhecido"));
  }
} 