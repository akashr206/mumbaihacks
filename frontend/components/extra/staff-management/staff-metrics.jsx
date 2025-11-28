"use client";

import { Users, UserCheck, UserX, Coffee } from "lucide-react";

export default function StaffMetrics() {
    const metrics = [
        {
            icon: Users,
            title: "Total Staff",
            value: "142",
            bgColor:
                "bg-zinc-100 dark:bg-zinc-950 border-1 border-zinc-400 dark:border-zinc-700",
            textColor: "text-zinc-900 dark:text-zinc-100",
            iconBgColor: "bg-zinc-200 dark:bg-zinc-700",
        },
        {
            icon: UserCheck,
            title: "On Duty",
            value: "68",
            bgColor:
                "bg-green-100 dark:bg-green-950 border-1 border-green-700 dark:border-green-700",
            textColor: "text-green-600 dark:text-green-400",
            iconBgColor: "bg-green-100 dark:bg-green-900",
        },
        {
            icon: UserX,
            title: "Off Duty",
            value: "62",
            bgColor:
                "bg-zinc-100 dark:bg-zinc-950 border-1 border-zinc-400 dark:border-zinc-700",
            textColor: "text-zinc-900 dark:text-zinc-100",
            iconBgColor: "bg-zinc-200 dark:bg-zinc-700",
        },
        {
            icon: Coffee,
            title: "On Break",
            value: "12",
            bgColor:
                "bg-orange-100 dark:bg-orange-950 border-1 border-orange-700 dark:border-orange-700",
            textColor: "text-orange-600 dark:text-orange-400",
            iconBgColor: "bg-orange-100 dark:bg-orange-900",
        },
    ];

    return (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {metrics.map((metric, idx) => (
                <div
                    key={idx}
                    className={`${metric.bgColor} rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 sm:p-6 transition-colors`}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                {metric.title}
                            </p>
                            <p
                                className={`mt-3 text-3xl sm:text-4xl font-bold ${metric.textColor}`}
                            >
                                {metric.value}
                            </p>
                        </div>
                        <div
                            className={`${metric.iconBgColor} rounded-lg p-2 sm:p-3 flex-shrink-0`}
                        >
                            <metric.icon className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-700 dark:text-zinc-300" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
