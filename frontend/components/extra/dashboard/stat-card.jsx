"use client";

export default function StatCard({
    icon: Icon,
    title,
    value,
    change,
    changeType,
    bgColor,
}) {
    const isPositive = changeType === "positive";
    const changeColor = isPositive
        ? "text-green-600 dark:text-green-400"
        : "text-red-600 dark:text-red-400";

    return (
        <div className={`rounded-lg border  shadow-sm p-6  ${bgColor}`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {title}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
                        {value}
                    </p>
                    <p className={`mt-2 text-sm font-medium ${changeColor}`}>
                        {isPositive ? "↑" : "↓"} {Math.abs(change)} vs last week
                    </p>
                </div>

                <div className={`rounded-lg bg-black/20 dark:bg-white/20 p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>
        </div>
    );
}
