"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import { createProduct, getProducts } from "@/services/productService";
import { toast } from "sonner";
import ProductForm from "../../components/ProductForm";
import SearchFilters from "../../components/SearchFilters";
import { Product } from "../../types/Product";
import ProductList from "../../components/ProductList";
import { Pagination } from "../../components/ui/pagination";

const PRODUCTS_PER_PAGE = 6;

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const setCurrentPage = useProductStore((state) => state.setCurrentPage);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [sortOption, setSortOption] = useState("name-asc");

  const currentPage = useProductStore((state) => state.currentPage);
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((data) => {
        setProducts(data.products || data);
      })
      .catch((err) => {
        toast.error(err.message || "Erro ao buscar produtos");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filterAndSortProducts = () => {
    // First apply filters
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPriceRange =
        product.price >= priceRange.min && product.price <= priceRange.max;

      return matchesSearch && matchesPriceRange;
    });

    // Then sort the filtered results
    const [field, direction] = sortOption.split("-");
    filtered.sort((a, b) => {
      let comparison = 0;

      if (field === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (field === "price") {
        comparison = a.price - b.price;
      } else if (field === "date") {
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      return direction === "asc" ? comparison : -comparison;
    });

    setFilteredProducts(filtered);
  };

  // Filter and sort products whenever filters or products change
  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, priceRange, sortOption]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddProduct = async (
    newProduct: Omit<Product, "id" | "createdAt">
  ) => {
    try {
      const addedProduct = await createProduct(newProduct);
      setProducts((prev) => [...prev, addedProduct]);
      return Promise.resolve();
    } catch (error) {
      console.error("Error adding product:", error);
      return Promise.reject(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Gerenciamento de Produtos
        </h1>
        <p className="text-gray-600">
          Visualize, filtre e adicione novos produtos ao catálogo
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with filters and form */}
        <div className="lg:col-span-1 space-y-6">
          <SearchFilters
            onSearchChange={setSearchTerm}
            onPriceRangeChange={setPriceRange}
            onSortChange={setSortOption}
          />
          <ProductForm onAddProduct={handleAddProduct} />
        </div>

        {/* Main content with product list */}
        <div className="lg:col-span-3">
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Lista de Produtos
              </h2>
              <span className="text-sm text-gray-600">
                {filteredProducts.length} produto(s) encontrado(s)
              </span>
            </div>
          </div>

          <ProductList products={filteredProducts} isLoading={isLoading} />

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
                className={`px-3 py-1 mx-1 rounded border border-gray-300 ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
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
      </div>
    </div>
  );
}
