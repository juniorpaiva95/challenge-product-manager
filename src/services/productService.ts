const API_URL = "http://localhost:3001/products";

export async function getProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Erro ao buscar produtos");
    return await res.json();
  } catch (error) {
    throw new Error("Erro ao buscar produtos: " + (error instanceof Error ? error.message : "Erro desconhecido"));
  }
}

export async function getProductById(id: number | string) {
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