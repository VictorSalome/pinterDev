"use client";

import { useState } from "react";
import { TfiClose, TfiSearch } from "react-icons/tfi";
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



            <div className="bg-[#f3f2f2] hover:bg-[#e6e5e5] shadow-sm rounded-2xl flex-1 max-w-5xl mx-auto 0">
                <div className="h-12 flex items-center gap-2 px-2 relative">
                    <div className="text-black h-10 flex items-center">
                        <TfiSearch size={20} />
                    </div>
                    <Input
                        type="text"
                        placeholder="Pesquisar"
                        className="h-10 w-full rounded-lg outline-none px-2 text-black "
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} // Atualiza o valor do input
                    />
                    {search && (
                        <Button
                            className="absolute right-2 text-black"
                            onClick={handleClearSearch}
                        >
                            <TfiClose size={20} />
                        </Button>
                    )}                </div>
            </div>
        </div>
    );
};
