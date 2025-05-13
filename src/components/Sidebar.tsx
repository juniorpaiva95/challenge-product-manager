
import React from "react";
import { HomeIcon, PackageIcon, PlusCircleIcon, SettingsIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const isMobile = useIsMobile();
  
  if (isMobile && !isOpen) return null;
  
  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 md:z-auto
          flex flex-col bg-white shadow-lg md:shadow-none border-r
          min-h-screen
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
          transition-transform duration-300 ease-in-out
          w-64 h-full`}
      >
        {/* Logo area */}
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">
            Gerenciador de Produtos
          </h1>
        </div>
        
        {/* Nav links */}
        <nav className="flex-1 p-4 space-y-1">
          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600"
          >
            <HomeIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium"
          >
            <PackageIcon className="h-5 w-5" />
            <span>Produtos</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600"
          >
            <PlusCircleIcon className="h-5 w-5" />
            <span>Adicionar Produto</span>
          </a>
        </nav>
        
        {/* Footer */}
        <div className="p-4 border-t">
          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600"
          >
            <SettingsIcon className="h-5 w-5" />
            <span>Configurações</span>
          </a>
        </div>
      </div>
    </>
  );
};

export { Sidebar };