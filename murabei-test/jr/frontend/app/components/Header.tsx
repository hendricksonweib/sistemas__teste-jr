// components/Header.tsx
import React from "react"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

const Header = () => {
  return (
    <header className="w-full shadow-md bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
          Murabook
        </div>

        {/* Desktop Menu (hidden on small screens) */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-700 dark:text-gray-200">
          <a href="#" className="hover:text-blue-600 transition">Início</a>
          <a href="#" className="hover:text-blue-600 transition">Sobre</a>
          <a href="#" className="hover:text-blue-600 transition">Serviços</a>
          <a href="#" className="hover:text-blue-600 transition">Contato</a>
        </nav>

        {/* Botão de ação */}
        <Button className="hidden md:inline-block">Entrar</Button>

        {/* Menu mobile (hamburger) */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  )
}

export default Header
