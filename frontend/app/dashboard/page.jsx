"use client";

import StatCard from "@/components/extra/dashboard/stat-card";
import ActivityFeedItem from "@/components/extra/dashboard/activity-feed-item";
import ManualOverrideButton from "@/components/extra/dashboard/manual-override-button";
import DepartmentCapacity from "@/components/extra/dashboard/department-capacity";
import PatientQueue from "@/components/extra/dashboard/patient-queue";
import AllPatientsTable from "@/components/extra/dashboard/all-patients-table";
import AddPatientDialog from "@/components/extra/dashboard/add-patient-dialog";
import { Button } from "@/components/ui/button";
import {
    Users,
    UserCheck,
    Package,
    TrendingUp,
    Activity,
    AlertCircle,
    CheckCircle,
    Bell,
    ClipboardX,
    Clock
} from "lucide-react";

export default function DashboardPage() {
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
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    <AddPatientDialog />
                    <Button className="flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm">
                        <ClipboardX className="w-4 h-4" />
                        Process Discharge
                    </Button>
                </div>
            </div>

            {/* Overview Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                    icon={Users}
                    title=" Total Active Patients"
                    value="234"
                    change="12%"
                    changeType="positive"
                    bgColor="bg-green-100 dark:bg-green-950 border border-green-700 dark:border-green-700"
                />
                <StatCard
                    icon={UserCheck}
                    title="Staff on Duty"
                    value="89"
                    change="5%"
                    changeType="positive"
                    bgColor="bg-blue-100 dark:bg-blue-950 border border-blue-700 dark:border-blue-700"
                />
                <StatCard
                    icon={Package}
                    title="Critical Cases"
                    value="7"
                    change="2%"
                    changeType="negative"
                    bgColor="bg-orange-100 dark:bg-orange-950 border border-orange-700 dark:border-orange-700"
                />
                <StatCard
                    icon={Clock}
                    title="Average Wait Time"
                    value="29m"
                    change="3%"
                    changeType="positive"
                    bgColor="bg-cyan-100 dark:bg-cyan-950 border border-cyan-700 dark:border-cyan-700"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Left Column: Operations (Capacity & Queue) */}
                <div className="xl:col-span-2 space-y-6">
                    <DepartmentCapacity />
                    <PatientQueue />
                </div>

                {/* Right Column: AI & Manual Override */}
                <div className="space-y-6">
                    {/* AI Activity Feed */}
                    <div className="rounded-lg border border-zinc-200 bg-white shadow-sm p-4 sm:p-6 dark:border-zinc-700 dark:bg-zinc-900 h-fit">
                        <div className="mb-4 sm:mb-6 flex items-center gap-2">
                            <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-900 dark:text-white" />
                            <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
                                AI Activity Feed
                            </h2>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            <ActivityFeedItem
                                icon={UserCheck}
                                title="Staff Reallocation"
                                description="AI adjusted nurse assignments in ER due to increased patient volume"
                                time="2 min ago"
                                bgColor="bg-green-500"
                            />
                            <ActivityFeedItem
                                icon={AlertCircle}
                                title="Supply Alert"
                                description="Low inventory detected for surgical gloves - Auto-order initiated"
                                time="15 min ago"
                                bgColor="bg-orange-500"
                            />
                            <ActivityFeedItem
                                icon={Bell}
                                title="Patient Notification"
                                description="Automated check-in reminders sent to 23 scheduled patients"
                                time="1 hour ago"
                                bgColor="bg-blue-500"
                            />
                            <ActivityFeedItem
                                icon={CheckCircle}
                                title="Capacity Optimization"
                                description="Predicted surge in admissions. Prepared additional beds in Wing B"
                                time="2 hours ago"
                                bgColor="bg-green-500"
                            />
                        </div>
                    </div>

                    {/* Manual Override */}
                    <div className="rounded-lg border border-zinc-200 bg-white shadow-sm p-4 sm:p-6 dark:border-zinc-700 dark:bg-zinc-900 h-fit">
                        <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white">
                            Manual Override
                        </h2>
                        <ManualOverrideButton />
                    </div>
                </div>
            </div>

            {/* All Patients Table */}
            <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-3 sm:mb-4">
                    All Patients
                </h2>
                <AllPatientsTable />
            </div>
        </div>
    );
}
