"use client";

import { useState } from "react";
import Image from "next/image";
import { HeaderGlobal } from "../components/HeaderGlobal";

interface Collection {
  id: string;
  title: string;
  description: string;
  cover_photo: string;
}

export default function Collections() {
  const [loading] = useState(false);
  const [collections] = useState<Collection[]>([]);

  return (
    <main className="min-h-screen bg-white">
      <HeaderGlobal />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Minhas Coleções</h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {collections.map((collection: Collection) => (
              <div key={collection.id} className="rounded-lg overflow-hidden shadow-lg">
                <div className="relative h-48">
                  <Image
                    src={collection.cover_photo || "/placeholder.jpg"}
                    alt={collection.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-semibold text-lg">{collection.title}</h2>
                  <p className="text-gray-600">{collection.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 