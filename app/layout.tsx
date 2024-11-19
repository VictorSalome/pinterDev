import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HeaderGlobal } from "./components/HeaderGlobal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unsplash Gallery",
  description: "Galeria de imagens usando a API do Unsplash",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-white min-h-screen`}>
        <HeaderGlobal />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
