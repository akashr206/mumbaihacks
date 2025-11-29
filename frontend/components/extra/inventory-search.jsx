"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function InventorySearch({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch?.(value);
    };

    return (
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 dark:text-zinc-500" />
            <input
                type="text"
                placeholder="Search supplies..."
                value={searchTerm}
                onChange={handleChange}
                className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
        </div>
    );
}
