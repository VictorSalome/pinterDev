"use client";

import { useState } from "react";
import { TfiClose, TfiSearch } from "react-icons/tfi"; // Removi os ícones não utilizados
import { Menu } from "./Menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const Header = () => {
    const [search, setSearch] = useState('');

    const handleClearSearch = () => {
        setSearch('');
    };

    return (
        <div className="bg-white flex items-center justify-between h-20 px-4 sm:px-10">
            <Menu />

            <div className="bg-[#f3f2f2] hover:bg-[#e6e5e5] shadow-sm rounded-2xl flex-1 max-w-5xl mx-auto">
                <div className="h-12 flex items-center gap-2 px-2 relative">
                    <div className="text-black h-10 flex items-center">
                        <TfiSearch size={20} />
                    </div>
                    <Input
                        type="text"
                        placeholder="Pesquisar"
                        className="h-10 w-full rounded-lg outline-none px-2 text-black"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <Button
                            className="absolute right-2 text-black"
                            onClick={handleClearSearch}
                        >
                            <TfiClose size={20} />
                        </Button>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <svg aria-hidden="true" height="24" role="img" viewBox="0 0 24 24" width="24" fill="#767676">
                    <path d="M19 7v6.17A10 10 0 0 1 22 19H2a10 10 0 0 1 3-5.83V7a7 7 0 1 1 14 0m-4 14a3 3 0 1 1-6 0z"></path>
                </svg>
                <svg aria-hidden="true" height="24" role="img" viewBox="0 0 24 24" width="24" fill="#767676">
                    <path d="M18 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M12 0a11 11 0 0 0-8.52 17.95l-1.46 5.43a.5.5 0 0 0 .73.55l5.08-2.75A10.98 10.98 0 0 0 23 11 11 11 0 0 0 12 0"></path>
                </svg>
                <svg
                    className="hover:bg-[#E9E9E9] rounded-full p-1"
                    preserveAspectRatio="xMidYMid meet"
                    version="1.1"
                    viewBox="-50 -50 100 100"
                    width="32"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>Vsalome</title>
                    <text className="sGz dyH iFc H2s" dy="0.35em" fill="#767676" fontSize="48px" textAnchor="middle">V</text>
                </svg>
            </div>
        </div>
    );
};
