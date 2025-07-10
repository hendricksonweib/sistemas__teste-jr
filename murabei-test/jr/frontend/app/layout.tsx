import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`$antialiased`}>      
          <Header/>
          {children}
          <Footer/>
      </body>
    </html>
  );
}
