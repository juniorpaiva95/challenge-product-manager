import { create } from "zustand";

interface ProductStore {
  search: string;
  setSearch: (value: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  search: "",
  setSearch: (value) => set({ search: value, currentPage: 1 }),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
})); 