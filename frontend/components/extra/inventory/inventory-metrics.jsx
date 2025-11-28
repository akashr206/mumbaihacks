"use client";

import {
    AlertTriangle,
    TrendingDown,
    Package,
    ShoppingCart,
} from "lucide-react";

export default function InventoryMetrics() {
    const metrics = [
        {
            label: "Critical Items",
            value: "2",
            icon: AlertTriangle,
            bgColor: "bg-red-50 dark:bg-red-950 ",
            textColor: "text-red-600 dark:text-red-400",
            borderColor: "border-red-700 dark:border-red-800 border-1",
        },
        {
            label: "Low Stock",
            value: "2",
            icon: TrendingDown,
            bgColor: "bg-amber-50 dark:bg-amber-950",
            textColor: "text-amber-600 dark:text-amber-400",
            borderColor: "border-amber-700 dark:border-amber-800 border-1",
        },
        {
            label: "Total Items",
            value: "8",
            icon: Package,
            bgColor: "bg-blue-50 dark:bg-blue-950",
            textColor: "text-blue-600 dark:text-blue-400",
            borderColor: "border-blue-700 dark:border-blue-800 border-1",
        },
        {
            label: "Auto-Orders Active",
            value: "7",
            icon: ShoppingCart,
            bgColor: "bg-green-50 dark:bg-green-950",
            textColor: "text-green-600 dark:text-green-400",
            borderColor: "border-green-700 dark:border-green-800 border-1",
        },
    ];

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
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 flex-shrink-0" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
