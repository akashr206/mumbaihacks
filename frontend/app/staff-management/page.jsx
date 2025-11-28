"use client";

import StaffMetrics from "@/components/extra/staff-management/staff-metrics";
import StaffList from "@/components/extra/staff-management/staff-list";
import AddStaffDialog from "@/components/extra/staff-management/add-staff-dialog";

export default function StaffManagementPage() {
    return (
        <div className="w-full sm:px-4 md:px-6 lg:px-8 sm:py-8">
            {/* Page Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
                        Staff Management
                    </h1>
                    <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                        Manage hospital staff, schedules, and assignments
                    </p>
                </div>
                <AddStaffDialog />
            </div>

            {/* Metrics Section */}
            <StaffMetrics />

            {/* Staff Directory Section */}
            <div>
                <StaffList />
            </div>
        </div>
    );
}
