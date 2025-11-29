"use client";

import { Users, UserCheck, UserX, Coffee } from "lucide-react";
import { useState, useEffect } from "react";
import { API_URL } from "@/lib/utils2";

export default function StaffMetrics() {
    const [stats, setStats] = useState({
        total: 0,
        doctors: 0,
        nurses: 0,
        roles: {},
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/api/staff/stats`);
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch staff stats", error);
            }
        };
        fetchStats();
    }, []);

    // Get top doctor role
    const topRole = Object.entries(stats.roles).sort((a, b) => b[1] - a[1])[0];

    const metrics = [
        {
            icon: Users,
            title: "Total Staff",
            value: stats.total,
            bgColor:
                "bg-zinc-100 dark:bg-zinc-950 border-1 border-zinc-400 dark:border-zinc-700",
            textColor: "text-zinc-900 dark:text-zinc-100",
            iconBgColor: "bg-zinc-200 dark:bg-zinc-700",
        },
        {
            icon: UserCheck,
            title: "Doctors",
            value: stats.doctors,
            bgColor:
                "bg-blue-100 dark:bg-blue-950 border-1 border-blue-700 dark:border-blue-700",
            textColor: "text-blue-600 dark:text-blue-400",
            iconBgColor: "bg-blue-100 dark:bg-blue-900",
        },
        {
            icon: UserCheck,
            title: "Nurses",
            value: stats.nurses,
            bgColor:
                "bg-green-100 dark:bg-green-950 border-1 border-green-700 dark:border-green-700",
            textColor: "text-green-600 dark:text-green-400",
            iconBgColor: "bg-green-100 dark:bg-green-900",
        },
        {
            icon: Users,
            title: topRole ? `${topRole[0]}s` : "Specialists",
            value: topRole ? topRole[1] : 0,
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
                            className={`${metric.iconBgColor} rounded-lg p-2 sm:p-3 shrink-0`}
                        >
                            <metric.icon className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-700 dark:text-zinc-300" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
