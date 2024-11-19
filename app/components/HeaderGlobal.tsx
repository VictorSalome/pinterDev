"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Camera, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function HeaderGlobal() {
    const router = useRouter();
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <>
            <div className="h-16" />
            
            <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md shadow-sm z-50">
                <div className="container h-full">
                    <div className="flex h-16 items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                            <Link href="/" className="flex items-center transition-transform hover:scale-110">
                                <Camera className="h-8 w-8 text-red-600" />
                            </Link>

                            <Button
                                variant="ghost"
                                className={cn(
                                    "rounded-full font-semibold hidden md:flex transition-all",
                                    pathname === "/" ? "bg-black text-white hover:bg-black/90" : "hover:bg-gray-100"
                                )}
                                onClick={() => router.push("/")}
                            >
                                Início
                            </Button>

                            <Button
                                variant="ghost"
                                className={cn(
                                    "rounded-full font-semibold hidden md:flex transition-all",
                                    pathname === "/explorar" ? "bg-black text-white hover:bg-black/90" : "hover:bg-gray-100"
                                )}
                                onClick={() => router.push("/explorar")}
                            >
                                Explorar
                            </Button>
                        </div>

                        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-auto px-4">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 transition-colors group-hover:text-gray-700" />
                                <Input
                                    type="search"
                                    placeholder="Pesquisar imagens..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 bg-gray-100 rounded-full border-none transition-all 
                                    focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:ring-offset-0
                                    hover:bg-gray-200/70"
                                />
                            </div>
                        </form>

                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="rounded-full md:hidden hover:bg-gray-100 transition-colors"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[280px] sm:w-[320px] border-l bg-white/95 backdrop-blur-md">
                                <nav className="flex flex-col gap-4 mt-8">
                                    <Link
                                        href="/"
                                        className={cn(
                                            "px-4 py-2 rounded-lg transition-colors",
                                            pathname === "/" 
                                                ? "bg-black text-white" 
                                                : "text-gray-600 hover:bg-gray-100"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Início
                                    </Link>
                                    <Link
                                        href="/explorar"
                                        className={cn(
                                            "px-4 py-2 rounded-lg transition-colors",
                                            pathname === "/explorar" 
                                                ? "bg-black text-white" 
                                                : "text-gray-600 hover:bg-gray-100"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Explorar
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
        </>
    );
}
