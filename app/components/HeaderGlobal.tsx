"use client";
import { TfiClose, TfiSearch } from "react-icons/tfi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const HeaderGlobal = () => {

    const [ReadValue, setReadValue] = useState("");
    const pathname = usePathname();
    const [selectedButton, setSelectedButton] = useState(pathname === "/" ? "home" : "criar");
    const router = useRouter();

    const handleClearSearch = () => {
        setReadValue("");
    };

    const handleSearch = async () => {
        if (ReadValue.trim() !== "") {
            router.push(`/search?query=${ReadValue.trim()}`); // Redireciona para a rota de busca
        }
    };

    const handleButtonClick = (button: string) => {
        setSelectedButton(button);
    };



    useEffect(() => {
        if (pathname === '/') {
            setSelectedButton('home');
        } else {
            setSelectedButton('criar');
        }
    }, [pathname]);
    return (
        <div className="bg-white flex items-center justify-between h-20 px-4 sm:px-10">
            <div className="flex gap-4">
                {/* Menu */}
                <svg aria-hidden="true" aria-label="" className="g_1 gUZ U9O kVc  rounded-full #e60023" fill="#e60023" height="40" role="img" viewBox="0 0 24 24" width="40">
                    <path d="M7.55 23.12c-.15-1.36-.04-2.67.25-3.93L9 14.02a7 7 0 0 1-.34-2.07c0-1.68.8-2.88 2.08-2.88.88 0 1.53.62 1.53 1.8q0 .57-.22 1.28l-.53 1.73q-.15.5-.15.91c0 1.2.92 1.88 2.09 1.88 2.08 0 3.57-2.16 3.57-4.96 0-3.12-2.04-5.11-5.06-5.11-3.36 0-5.49 2.19-5.49 5.23 0 1.23.38 2.37 1.11 3.15-.24.4-.5.48-.88.48-1.2 0-2.34-1.7-2.34-4 0-3.99 3.2-7.16 7.68-7.16 4.7 0 7.66 3.28 7.66 7.33 0 4.07-2.88 7.13-5.98 7.13a3.8 3.8 0 0 1-3.07-1.47l-.61 2.5c-.33 1.28-.83 2.5-1.62 3.67A12 12 0 0 0 24 11.99 12 12 0 1 0 7.55 23.12"></path>
                </svg>

                <button className={selectedButton === "home" ? "bg-black text-white w-32 h-10 rounded-full font-semibold" : "text-black w-32 h-10 rounded-full font-semibold"} onClick={() => handleButtonClick("home")}>
                    <Link href="/">Página Inicial</Link>
                </button>
                <button className={selectedButton === "criar" ? "bg-black text-white w-32 h-10 rounded-full" : "text-black font-semibold w-32 h-10 rounded-full"} onClick={() => handleButtonClick("criar")}>
                    <Link href="/explorar">Explorar</Link>
                </button>
            </div>

            {/* Search Bar */}
            <div className="bg-[#f3f2f2] hover:bg-[#e6e5e5] shadow-sm rounded-2xl flex-1 max-w-5xl mx-auto">
                <div className="h-12 flex items-center gap-2 px-2 relative">
                    <div className="text-black h-10 flex items-center">
                        <TfiSearch size={20} />
                    </div>
                    <Input
                        type="text"
                        placeholder="Pesquisar"
                        className="h-10 w-full rounded-lg outline-none px-2 text-black"
                        value={ReadValue}
                        onChange={(e) => setReadValue(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                    {ReadValue && (
                        <Button variant={"pinter"} className="absolute right-2 text-black bg-transparent border-none" onClick={handleClearSearch}>
                            <TfiClose size={18} />
                        </Button>
                    )}
                </div>
            </div>

            {/* User Icons */}
            <div className="flex items-center gap-4">
                <svg aria-hidden="true" height="24" role="img" viewBox="0 0 24 24" width="24" fill="#767676">
                    <path d="M19 7v6.17A10 10 0 0 1 22 19H2a10 10 0 0 1 3-5.83V7a7 7 0 1 1 14 0m-4 14a3 3 0 1 1-6 0z"></path>
                </svg>
                <svg aria-hidden="true" height="24" role="img" viewBox="0 0 24 24" width="24" fill="#767676">
                    <path d="M18 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M12 0a11 11 0 0 0-8.52 17.95l-1.46 5.43a.5.5 0 0 0 .73.55l5.08-2.75A10.98 10.98 0 0 0 23 11 11 11 0 0 0 12 0"></path>
                </svg>
                <svg className="hover:bg-[#E9E9E9] rounded-full p-1" preserveAspectRatio="xMidYMid meet" version="1.1" viewBox="-50 -50 100 100" width="32" xmlns="http://www.w3.org/2000/svg">
                    <title>Vsalome</title>
                    <text className="sGz dyH iFc H2s" dy="0.35em" fill="#767676" fontSize="48px" textAnchor="middle">V</text>
                </svg>
            </div>
        </div>
    )
}

