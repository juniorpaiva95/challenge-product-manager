import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";

interface PriceRange {
  min: number;
  max: number;
}

interface SearchFiltersProps {
  onSearchChange: (search: string) => void;
  onPriceRangeChange: (range: PriceRange) => void;
  onSortChange: (sort: string) => void;
  onPageChange: (page: number) => void;
}

const MIN_PRICE = 0;
const MAX_PRICE = 10000;

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearchChange,
  onPriceRangeChange,
  onSortChange,
  onPageChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [sortBy, setSortBy] = useState("name-asc");
  const [loading, setLoading] = useState(false);

  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  // Handle apply filters
  const handleApply = () => {
    onPageChange(1);
    setLoading(true);
    setTimeout(() => {
      onSearchChange(searchTerm);
      onPriceRangeChange({ min: priceRange[0], max: priceRange[1] });
      onSortChange(sortBy);
      setLoading(false);
    }, 2000);
  };

  // Sync input min/max with slider
  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let min = Number(e.target.value);
    if (isNaN(min) || min < MIN_PRICE) min = MIN_PRICE;
    if (min > priceRange[1]) min = priceRange[1];
    setPriceRange([min, priceRange[1]]);
  };
  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let max = Number(e.target.value);
    if (isNaN(max) || max > MAX_PRICE) max = MAX_PRICE;
    if (max < priceRange[0]) max = priceRange[0];
    setPriceRange([priceRange[0], max]);
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
        <div className="flex flex-col items-center space-y-2">
          <Slider
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={priceRange}
            onValueChange={(values: number[]) => setPriceRange([values[0], values[1]])}
            className="w-full"
          />
          <div className="flex justify-between w-full text-xs text-gray-600">
            <span>Mín: R$ {priceRange[0]}</span>
            <span>Máx: R$ {priceRange[1] === MAX_PRICE ? '∞' : `R$ ${priceRange[1]}`}</span>
          </div>
          <div className="flex w-full gap-2 mt-2">
            <Input
              type="number"
              min={MIN_PRICE}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={handleMinInput}
              className="w-1/2"
              placeholder="Mínimo"
            />
            <Input
              type="number"
              min={priceRange[0]}
              max={MAX_PRICE}
              value={priceRange[1]}
              onChange={handleMaxInput}
              className="w-1/2"
              placeholder="Máximo"
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
      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" onClick={handleApply} disabled={loading}>
        {loading ? "Aplicando..." : "Aplicar"}
      </Button>
    </div>
  );
};

export default SearchFilters;