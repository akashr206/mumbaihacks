"use client";

export default function DepartmentCapacity() {
    const departments = [
        { name: "Emergency", waiting: 7, current: 23, max: 30 },
        { name: "ICU", waiting: 2, current: 18, max: 20 },
        { name: "Surgery", waiting: 3, current: 12, max: 15 },
        { name: "Cardiology", waiting: 1, current: 8, max: 12 },
        { name: "Orthopedics", waiting: 4, current: 15, max: 20 },
        { name: "Pediatrics", waiting: 2, current: 9, max: 15 },
    ];

    const getProgressPercentage = (current, max) => (current / max) * 100;

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-400 dark:border-zinc-700 p-4 sm:p-6 w-full">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <span className="text-lg sm:text-xl">📋</span>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">
                    Department Capacity
                </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
                {departments.map((dept, idx) => (
                    <div key={idx} className="w-full">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 mb-2">
                            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white truncate">
                                {dept.name}
                            </h3>
                            <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                                {dept.waiting} waiting{" "}
                                <span className="mx-1 sm:mx-2">•</span>{" "}
                                {dept.current} / {dept.max}
                            </span>
                        </div>
                        <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5 sm:h-2 overflow-hidden">
                            <div
                                className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-300"
                                style={{
                                    width: `${getProgressPercentage(
                                        dept.current,
                                        dept.max
                                    )}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
