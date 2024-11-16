"use client";
import { TfiClose, TfiSearch } from "react-icons/tfi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, MessageCircle, Menu, Home, Compass, FolderHeart } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

export const HeaderGlobal = () => {
    const [searchValue, setSearchValue] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const pathname = usePathname();
    const [selectedButton, setSelectedButton] = useState(pathname === "/" ? "home" : "explorar");
    const router = useRouter();

    const handleClearSearch = () => {
        setSearchValue("");
    };

    const handleSearch = async () => {
        if (searchValue.trim() !== "") {
            router.push(`/search?query=${encodeURIComponent(searchValue.trim())}`);
            setIsSearchOpen(false);
        }
    };

    const handleButtonClick = (button: string) => {
        setSelectedButton(button);
    };

    useEffect(() => {
        setSelectedButton(pathname === '/' ? 'home' : 'explorar');
    }, [pathname]);

    const NavigationLinks = () => (
        <nav className="flex flex-col sm:flex-row gap-2">
            <Button
                variant={selectedButton === "home" ? "default" : "ghost"}
                className="rounded-full w-full sm:w-auto justify-start sm:justify-center group hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                onClick={() => handleButtonClick("home")}
                asChild
            >
                <Link href="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Página Inicial</span>
                </Link>
            </Button>
            <Button
                variant={selectedButton === "explorar" ? "default" : "ghost"}
                className="rounded-full w-full sm:w-auto justify-start sm:justify-center group hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                onClick={() => handleButtonClick("explorar")}
                asChild
            >
                <Link href="/explorar" className="flex items-center gap-2">
                    <Compass className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Explorar</span>
                </Link>
            </Button>
            <Button
                variant={selectedButton === "collections" ? "default" : "ghost"}
                className="rounded-full w-full sm:w-auto justify-start sm:justify-center group hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                onClick={() => handleButtonClick("collections")}
                asChild
            >
                <Link href="/collections" className="flex items-center gap-2">
                    <FolderHeart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Coleções</span>
                </Link>
            </Button>
        </nav>
    );

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="sm:hidden hover:bg-primary/10 transition-colors duration-300">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[240px] sm:hidden">
                            <div className="mt-6">
                                <NavigationLinks />
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Logo */}
                    <Link href="/">
                        <motion.svg
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Pinterest"
                            className="transition-all duration-300"
                            fill="#e60023"
                            height="40"
                            role="img"
                            viewBox="0 0 24 24"
                            width="40"
                        >
                            <path d="M7.55 23.12c-.15-1.36-.04-2.67.25-3.93L9 14.02a7 7 0 0 1-.34-2.07c0-1.68.8-2.88 2.08-2.88.88 0 1.53.62 1.53 1.8q0 .57-.22 1.28l-.53 1.73q-.15.5-.15.91c0 1.2.92 1.88 2.09 1.88 2.08 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.11-5.06-5.11-3.36 0-5.49 2.19-5.49 5.23 0 1.23.38 2.37 1.11 3.15-.24.4-.5.48-.88.48-1.2 0-2.34-1.7-2.34-4 0-3.99 3.2-7.16 7.68-7.16 4.7 0 7.66 3.28 7.66 7.33 0 4.07-2.88 7.13-5.98 7.13a3.8 3.8 0 0 1-3.07-1.47l-.61 2.5c-.33 1.28-.83 2.5-1.62 3.67A12 12 0 0 0 24 11.99 12 12 0 1 0 7.55 23.12"></path>
                        </motion.svg>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:block">
                        <NavigationLinks />
                    </div>
                </div>

                {/* Search Bar */}
                <div className={`flex-1 max-w-2xl mx-4 ${isSearchOpen ? 'fixed inset-0 bg-background/95 p-4 z-50 sm:relative sm:bg-transparent sm:p-0' : ''}`}>
                    <div className="relative">
                        {!isSearchOpen && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="sm:hidden absolute left-0 top-1/2 -translate-y-1/2 hover:bg-primary/10 transition-all duration-300"
                                onClick={() => setIsSearchOpen(true)}
                            >
                                <TfiSearch className="h-5 w-5" />
                            </Button>
                        )}
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className={`${isSearchOpen ? 'flex' : 'hidden sm:block'}`}
                            >
                                <TfiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="O que você está procurando?"
                                    className="w-full pl-10 pr-10 rounded-full bg-secondary/80 hover:bg-secondary/90 focus:bg-background border-none shadow-none ring-1 ring-border/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 [&:not(:placeholder-shown)]:scale-105 hover:shadow-md [&::-webkit-search-cancel-button]:hidden outline-none"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    onKeyUp={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch();
                                        }
                                    }}
                                />

                                {searchValue && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    >
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-secondary/80 transition-all duration-300"
                                            onClick={handleClearSearch}
                                        >
                                            <TfiClose className="h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-4 px-2">
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hidden sm:flex hover:bg-primary/10 group transition-all duration-300"
                            title="Notificações"
                        >
                            <Bell className="h-5 w-5 text-muted-foreground group-hover:scale-110 transition-transform" />
                        </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hidden sm:flex hover:bg-primary/10 group transition-all duration-300"
                            title="Mensagens"
                        >
                            <MessageCircle className="h-5 w-5 text-muted-foreground group-hover:scale-110 transition-transform" />
                        </Button>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 ring-muted transition-all duration-300 hover:shadow-lg">
                            <AvatarFallback>V</AvatarFallback>
                        </Avatar>
                    </motion.div>
                </div>
            </div>
        </motion.header>
    );
};
