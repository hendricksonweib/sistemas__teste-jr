"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EditBookModal } from "@/components/EditBookModal";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BookDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/books/${id}`);
        if (!res.ok) throw new Error("Livro não encontrado");
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error("Erro ao buscar livro:", err);
        toast.error("Erro ao buscar o livro.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = confirm(`Tem certeza que deseja excluir "${book.title}"?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/api/v1/books/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir livro");

      toast.success(`"${book.title}" foi excluído com sucesso.`);
      router.push("/books");
    } catch (error) {
      console.error("Erro ao excluir:", error);
      toast.error("Falha ao excluir o livro. Tente novamente.");
    }
  };

  if (loading) return <p className="text-center py-10">Carregando livro...</p>;
  if (!book) return <p className="text-center py-10">Livro não encontrado.</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 py-10">
      <Card className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
        <CardContent className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{book.title}</h1>
            <p className="text-blue-600 italic text-sm">por {book.author}</p>
          </div>

          <div className="text-sm text-gray-800 space-y-2">
            <p><span className="font-semibold">Editora:</span> {book.publisher}</p>
            <p><span className="font-semibold">Autores:</span> {book.authors}</p>
            <p><span className="font-semibold">Biografia:</span> {book.biography}</p>
            <p><span className="font-semibold">Sinopse:</span> {book.synopsis || "Sem sinopse disponível."}</p>
          </div>

          <div className="flex gap-4 mt-6">
            <EditBookModal
              book={book}
              onUpdate={(updatedBook) => setBook(updatedBook)}
            />
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
