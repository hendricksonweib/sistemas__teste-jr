// components/Header.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Plus } from "lucide-react";
const Header = () => {
  return (
    <header className="w-full shadow-md bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Murabook Logo" className="h-10 w-auto" />
        </div>
        
        <Button className="hidden md:inline-flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Adicionar
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
