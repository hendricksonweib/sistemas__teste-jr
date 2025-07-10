"use client"
import BookCard from "@/components/BookCard";

export default function Home() {
  const livros = [
    {
      title: "O Alquimista",
      author: "Paulo Coelho",
      description:
        "A jornada de Santiago, um jovem pastor andaluz que viaja em busca de seu tesouro e descobre os segredos da vida.",
      year: 1988,
      pages: 163,
      rating: 5,
    },
    {
      title: "1984",
      author: "George Orwell",
      description:
        "Um clássico distópico sobre um futuro onde o governo controla tudo.",
      year: 1949,
      pages: 328,
      rating: 4,
    },
  ];

  return (
    <section className="w-full">
      <div className="w-full">
        <img
          src="/banner.jpg"
          alt="Banner Murabook"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="px-4 py-10 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          A melhor experiência na sua{" "}
          <span className="text-blue-600 dark:text-blue-400">
            jornada de aprendizagem
          </span>
        </h1>

        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Nossa biblioteca foi desenvolvida para oferecer um acesso simples e
          eficiente ao acervo digital. Com funcionalidades que permitem buscar
          livros por{" "}
          <strong className="text-blue-600 dark:text-blue-400 font-medium">
            título
          </strong>{" "}
          ou{" "}
          <strong className="text-blue-600 dark:text-blue-400 font-medium">
            autor
          </strong>
          , cadastrar novas obras e organizar sua leitura de forma prática, ela
          é o apoio ideal para estudantes, educadores e apaixonados por
          conhecimento.
          <br />
          <br />
          <span className="font-medium">Explore, descubra</span> e{" "}
          <span className="text-blue-600 dark:text-blue-400 font-semibold">
            aprimore sua rotina
          </span>{" "}
          de estudos com uma plataforma pensada para tornar o aprendizado mais
          acessível e dinâmico.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {livros.map((livro, index) => (
          <BookCard
            key={index}
            {...livro}
            onView={() => console.log("Ver", livro.title)}
          />
        ))}
      </div>
    </section>
  );
}
