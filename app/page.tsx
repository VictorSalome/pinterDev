
import { Suspense } from "react";
import { Loader } from "./components/Loader";
import { ImageGallery } from "./components/ImageGallery";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<Loader />}>
        <ImageGallery />
      </Suspense>
    </main>
  );
}
