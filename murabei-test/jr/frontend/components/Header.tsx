"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Plus } from "lucide-react"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"

const Header = () => {
  return (
    <header className="w-full bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Murabook Logo" className="h-8 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <Link href="/Collection" className="hover:text-white transition">Coleção</Link>
          <Link href="/search-author" className="hover:text-white transition">Buscar por Autor</Link>
          <Link href="/search-title" className="hover:text-white transition">Buscar por Título</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/create">
            <Button className="hidden md:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white">
              <Plus className="w-4 h-4" />
              Adicionar
            </Button>
          </Link>
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-gray-800"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </DrawerTrigger>

            <DrawerContent className="bg-gray-900 border-t border-gray-700 text-white px-6 py-6">
              <div className="flex flex-col space-y-4 text-lg">
                <Link href="/collection" className="hover:text-blue-400 transition">Coleção</Link>
                <Link href="/search-author" className="hover:text-blue-400 transition">Buscar por Autor</Link>
                <Link href="/search-title" className="hover:text-blue-400 transition">Buscar por Título</Link>
                <Link href="/create">
                  <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </Link>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  )
}

export default Header
