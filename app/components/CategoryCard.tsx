import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  image: string;
  description: string;
  onClick: () => void;
  isSelected?: boolean;
}

export function CategoryCard({ title, image, description, onClick, isSelected }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl cursor-pointer group",
        "border-2 transition-all duration-300",
        isSelected ? "border-blue-500 shadow-lg" : "border-transparent hover:border-gray-200"
      )}
    >
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-200">{description}</p>
        </div>
      </div>
    </motion.div>
  );
} 