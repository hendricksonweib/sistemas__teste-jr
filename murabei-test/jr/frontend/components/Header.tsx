// components/Header.tsx
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Plus } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Murabook Logo" className="h-8 w-auto" />
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            className="hidden md:inline-flex items-center gap-2 text-gray-100 hover:bg-gray-800 hover:text-white">
            <Plus className="w-4 h-4" />
            Adicionar
          </Button>
          <Button
            variant="default"
            size="icon"
            className="md:hidden text-gray-100 hover:bg-gray-800"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
