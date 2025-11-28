import React from "react";
import { Bell, Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const getIcon = (type) => {
    switch (type) {
        case "info":
            return <Info className="h-5 w-5 text-blue-500" />;
        case "warning":
            return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
        case "success":
            return <CheckCircle className="h-5 w-5 text-green-500" />;
        case "error":
            return <XCircle className="h-5 w-5 text-red-500" />;
        default:
            return <Bell className="h-5 w-5 text-zinc-500" />;
    }
};

const NotificationItem = ({ notification }) => {
    const { title, message, time, type, isRead } = notification;

    return (
        <div
            className={cn(
                "flex items-start gap-4 p-4 border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer",
                !isRead && "bg-blue-50/50 dark:bg-blue-900/10"
            )}
        >
            <div className="mt-1 flex-shrink-0">{getIcon(type)}</div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <h4 className={cn("text-sm font-medium text-zinc-900 dark:text-zinc-100", !isRead && "font-semibold")}>
                        {title}
                    </h4>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap ml-2">
                        {time}
                    </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
                    {message}
                </p>
            </div>
            {!isRead && (
                <div className="mt-2 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
            )}
        </div>
    );
};

export default NotificationItem;
