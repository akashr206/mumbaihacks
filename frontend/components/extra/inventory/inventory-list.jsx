"use client";

import { useState, useMemo, useEffect } from "react";
import InventoryItem from "../inventory-item";
import InventorySearch from "../inventory-search";
import { API_URL } from "@/lib/utils2";
import { Skeleton } from "@/components/ui/skeleton";

export default function InventoryList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [inventoryItems, setInventoryItems] = useState([]);

    const filteredItems = useMemo(() => {
        if (!searchTerm.trim()) return inventoryItems;
        return inventoryItems.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                item.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, inventoryItems]);

    const fetchInventoryItems = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL + "/api/inventory");
            const data = await response.json();
            setInventoryItems(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching inventory items:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventoryItems();
    }, []);

    return (
        <div className="space-y-4 sm:space-y-6">
            <div>
                <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white mb-3 sm:mb-4">
                    Supply Status
                </h2>
                <InventorySearch onSearch={setSearchTerm} />
            </div>

            <div className="space-y-3 sm:space-y-4">
                {loading &&
                    [...Array(6)].map((_, idx) => (
                        <div
                            key={idx}
                            className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 sm:p-5 bg-white dark:bg-zinc-900"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-5 w-16" />
                            </div>

                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>

                            <div className="mt-4">
                                <Skeleton className="h-2 w-full" />
                                <Skeleton className="h-2 w-5/6 mt-2" />
                            </div>
                        </div>
                    ))}

                {!loading &&
                    filteredItems.length > 0 &&
                    filteredItems.map((item, index) => (
                        <InventoryItem key={index} item={item} />
                    ))}

                {!loading && filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-zinc-600 dark:text-zinc-400">
                            No supplies found matching your search.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
