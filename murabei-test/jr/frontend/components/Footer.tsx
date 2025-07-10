// components/Footer.tsx
"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800 mt-10">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="Murabook Logo"
            className="h-8 w-auto dark:hidden"
          />
          <img
            src="/logo.svg"
            alt="Murabook Logo"
            className="h-8 w-auto hidden dark:block"
          />
        </Link>
        <p className="text-sm text-center md:text-right text-gray-500">
          © {new Date().getFullYear()} Murabook. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
