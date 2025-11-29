"use client";

import StatCard from "@/components/extra/dashboard/stat-card";
import ManualOverrideButton from "@/components/extra/dashboard/manual-override-button";
import DepartmentCapacity from "@/components/extra/dashboard/department-capacity";
import { Users, UserCheck, Package, Clock, Loader2 } from "lucide-react";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/utils2";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalPatients: 0,
        staffOnDuty: 0,
        criticalCases: 0,
        avgWaitTime: "0m",
    });
    const [wards, setWards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await fetch(`${API_URL}/api/dashboard/stats`);
                const wardsRes = await fetch(`${API_URL}/api/dashboard/wards`);

                if (statsRes.ok) {
                    const statsData = await statsRes.json();
                    setStats(statsData);
                }
                if (wardsRes.ok) {
                    const wardsData = await wardsRes.json();
                    let totalPatients = 0;
                    wardsData.forEach((e) => {
                        totalPatients += e.occupied;
                    });
                    console.log(totalPatients);

                    setWards(wardsData);
                }
            } catch (e) {
                console.error("Failed to fetch dashboard data", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[80vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            </div>
        );
    }
    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1700px] mx-auto space-y-6 sm:space-y-8">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="text-left">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white">
                        Operations Dashboard
                    </h1>
                    <p className="mt-1 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
                        Real-time hospital operations and patient flow
                    </p>
                </div>
            </div>

            {/* Overview Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                    icon={Users}
                    title=" Total Active Patients"
                    value={stats.totalPatients}
                    change="12%"
                    changeType="positive"
                    bgColor="bg-green-100 dark:bg-green-950 border border-green-700 dark:border-green-700"
                />
                <StatCard
                    icon={UserCheck}
                    title="Staff on Duty"
                    value={stats.staffOnDuty}
                    change="5%"
                    changeType="positive"
                    bgColor="bg-blue-100 dark:bg-blue-950 border border-blue-700 dark:border-blue-700"
                />
                <StatCard
                    icon={Package}
                    title="Critical Cases"
                    value={stats.criticalCases}
                    change="2%"
                    changeType="negative"
                    bgColor="bg-orange-100 dark:bg-orange-950 border border-orange-700 dark:border-orange-700"
                />
                <StatCard
                    icon={Clock}
                    title="Average Wait Time"
                    value={stats.avgWaitTime}
                    change="3%"
                    changeType="positive"
                    bgColor="bg-cyan-100 dark:bg-cyan-950 border border-cyan-700 dark:border-cyan-700"
                />
            </div>

            <div>
                <DepartmentCapacity wards={wards} />
            </div>
        </div>
    );
}
