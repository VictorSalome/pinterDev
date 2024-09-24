import { useState } from "react";
import { TfiClose, TfiSearch } from "react-icons/tfi";

export const Header = () => {
    const [search, setSearch] = useState('');

    // Função para limpar o campo de pesquisa
    const handleClearSearch = () => {
        setSearch(''); // Limpa o valor do input
    };

    return (
        <div className="bg-slate-500 flex items-center justify-between h-20 px-4 sm:px-10">
            <button className="bg-black text-white rounded-2xl h-10 w-40 ml-4">
                Página inicial
            </button>
            <div className="bg-white rounded-2xl flex-1 max-w-5xl mx-auto">
                <div className="h-12 flex items-center gap-2 px-2 relative">
                    <div className="text-black h-10 flex items-center">
                        <TfiSearch size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Pesquisar"
                        className="h-10 w-full rounded-lg outline-none px-2 text-black"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} // Atualiza o valor do input
                    />
                    {search && (
                        <button
                            className="absolute right-2 text-black"
                            onClick={handleClearSearch}
                        >
                            <TfiClose size={20} />
                        </button>
                    )}                </div>
            </div>
        </div>
    );
};
