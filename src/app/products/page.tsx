"use client";

import { useEffect, useState } from "react";
import { createProduct, getProducts } from "@/services/productService";
import { toast } from "sonner";
import ProductForm from "@/components/ProductForm";
import SearchFilters from "@/components/SearchFilters";
import { Product } from "@/types/Product";
import ProductList from "@/components/ProductList";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { usePagination } from "@/hooks/use-pagination";

const PRODUCTS_PER_PAGE = 6;

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [sortOption, setSortOption] = useState("name-asc");

  // Paginação
  const { currentPage, totalPages, goToPage, startIdx, endIdx } = usePagination(
    filteredProducts.length,
    PRODUCTS_PER_PAGE
  );
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx);

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

          <ProductList products={paginatedProducts} isLoading={isLoading} />

          {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => goToPage(Math.max(1, currentPage - 1))}
                  className={
                    currentPage === 1
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer text-blue-600 hover:text-blue-700'
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => {
                const isActive = pageNumber === currentPage;
                return (
                  <PaginationItem key={`page-${pageNumber}`}>
                    <PaginationLink 
                      isActive={isActive}
                      onClick={() => goToPage(pageNumber as number)}
                      className={
                        `cursor-pointer px-3 py-1 rounded transition ` +
                        (isActive
                          ? 'bg-blue-600 text-white border border-blue-600 shadow'
                          : 'bg-white text-blue-600 border border-blue-100 hover:bg-blue-50 hover:border-blue-300')
                      }
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                  className={
                    currentPage === totalPages
                      ? 'pointer-events-none opacity-50'
                      : 'cursor-pointer text-blue-600 hover:text-blue-700'
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}  
        </div>
      </div>
    </div>
  );
}
