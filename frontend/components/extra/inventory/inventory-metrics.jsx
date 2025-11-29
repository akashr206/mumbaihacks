"use client";

import {
    AlertTriangle,
    TrendingDown,
    Package,
    ShoppingCart,
} from "lucide-react";
import { useState, useEffect } from "react";
import { API_URL } from "@/lib/utils2";

export default function InventoryMetrics() {
    const [metrics, setMetrics] = useState([
        {
            label: "Critical Items",
            value: "-",
            icon: AlertTriangle,
            bgColor: "bg-red-50 dark:bg-red-950 ",
            textColor: "text-red-600 dark:text-red-400",
            borderColor: "border-red-700 dark:border-red-800 border-1",
        },
        {
            label: "Low Stock",
            value: "-",
            icon: TrendingDown,
            bgColor: "bg-amber-50 dark:bg-amber-950",
            textColor: "text-amber-600 dark:text-amber-400",
            borderColor: "border-amber-700 dark:border-amber-800 border-1",
        },
        {
            label: "Total Items",
            value: "-",
            icon: Package,
            bgColor: "bg-blue-50 dark:bg-blue-950",
            textColor: "text-blue-600 dark:text-blue-400",
            borderColor: "border-blue-700 dark:border-blue-800 border-1",
        },
        {
            label: "Auto-Orders Active",
            value: "-",
            icon: ShoppingCart,
            bgColor: "bg-green-50 dark:bg-green-950",
            textColor: "text-green-600 dark:text-green-400",
            borderColor: "border-green-700 dark:border-green-800 border-1",
        },
    ]);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await fetch(`${API_URL}/api/inventory`);
                if (res.ok) {
                    const data = await res.json();

                    const critical = data.filter((i) => i.current === 0).length;
                    const lowStock = data.filter(
                        (i) => i.current <= i.minimum
                    ).length;
                    const total = data.length;
                    const autoOrders = lowStock; // Assuming auto-order for low stock

                    setMetrics((prev) => [
                        { ...prev[0], value: critical },
                        { ...prev[1], value: lowStock },
                        { ...prev[2], value: total },
                        { ...prev[3], value: autoOrders },
                    ]);
                }
            } catch (e) {
                console.error("Failed to fetch inventory metrics", e);
            }
        };
        fetchMetrics();
    }, []);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                    <div
                        key={index}
                        className={`${metric.bgColor} border ${metric.borderColor} rounded-lg p-2.5 sm:p-4 md:p-5 lg:p-6`}
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                                <p className="text-[10px] sm:text-xs md:text-sm text-zinc-600 dark:text-zinc-400 mb-1 sm:mb-2 truncate">
                                    {metric.label}
                                </p>
                                <p
                                    className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold ${metric.textColor} truncate`}
                                >
                                    {metric.value}
                                </p>
                            </div>
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 shrink-0" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
