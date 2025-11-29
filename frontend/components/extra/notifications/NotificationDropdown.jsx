"use client";

import React, { useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import NotificationItem from "./NotificationItem";

const NotificationDropdown = () => {
    // Mock data - same as NotificationList for consistency
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "System Update Scheduled",
            message: "The system will undergo maintenance tonight at 2:00 AM EST.",
            time: "2 hours ago",
            type: "info",
            isRead: false,
        },
        {
            id: 2,
            title: "Low Stock Alert",
            message: "Surgical masks inventory is running low.",
            time: "4 hours ago",
            type: "warning",
            isRead: false,
        },
        {
            id: 3,
            title: "New Staff Member Added",
            message: "Dr. Sarah Jenkins has been successfully added.",
            time: "1 day ago",
            type: "success",
            isRead: true,
        },
        {
            id: 4,
            title: "Backup Failed",
            message: "Daily data backup failed due to connection timeout.",
            time: "1 day ago",
            type: "error",
            isRead: true,
        },
        {
            id: 5,
            title: "Shift Reminder",
            message: "You have an upcoming shift tomorrow at 8:00 AM.",
            time: "2 days ago",
            type: "default",
            isRead: true,
        },
    ]);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const markAllAsRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-10 w-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    <Bell className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 dark:bg-zinc-900 dark:border-zinc-800 p-0">
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                    <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">Notifications</h3>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={markAllAsRead}
                            className="h-auto p-0 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-transparent"
                        >
                            Mark all as read
                        </Button>
                    )}
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length > 0 ? (
                        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                            {notifications.map((notification) => (
                                <div key={notification.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                    <NotificationItem notification={notification} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
                            <p className="text-sm">No notifications</p>
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationDropdown;
