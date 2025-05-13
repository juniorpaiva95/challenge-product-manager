
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface PriceRange {
  min: number;
  max: number;
}

interface SearchFiltersProps {
  onSearchChange: (search: string) => void;
  onPriceRangeChange: (range: PriceRange) => void;
  onSortChange: (sort: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearchChange,
  onPriceRangeChange,
  onSortChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearchChange]);

  // Handle price range changes
  const handlePriceChange = () => {
    const min = minPrice === "" ? 0 : parseFloat(minPrice);
    const max = maxPrice === "" ? Infinity : parseFloat(maxPrice);
    onPriceRangeChange({ min, max });
  };

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    onSortChange(value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtros</h2>
      
      {/* Search input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full pl-10 p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Price range filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Faixa de Preço
        </label>
        <div className="flex space-x-2">
          <div className="w-1/2">
            <input
              type="number"
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Mínimo"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onBlur={handlePriceChange}
            />
          </div>
          <div className="w-1/2">
            <input
              type="number"
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Máximo"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onBlur={handlePriceChange}
            />
          </div>
        </div>
      </div>
      
      {/* Sort filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Ordenar por
        </label>
        <select
          className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="name-asc">Nome (A-Z)</option>
          <option value="name-desc">Nome (Z-A)</option>
          <option value="price-asc">Preço (Menor-Maior)</option>
          <option value="price-desc">Preço (Maior-Menor)</option>
          <option value="date-desc">Mais recentes</option>
          <option value="date-asc">Mais antigos</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;