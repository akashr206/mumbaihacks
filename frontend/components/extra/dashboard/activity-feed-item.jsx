"use client";

export default function ActivityFeedItem({
    icon: Icon,
    title,
    description,
    time,
    bgColor,
}) {
    return (
        <div className="border-b border-zinc-200 last:border-b-0 pb-4 last:pb-0 dark:border-zinc-700">
            <div className="flex gap-3">
                <div
                    className={`rounded-lg ${bgColor} p-2 h-fit flex-shrink-0`}
                >
                    <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className="font-semibold text-zinc-900 dark:text-white text-sm">
                                {title}
                            </p>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                                {description}
                            </p>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium whitespace-nowrap">
                            {time}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
