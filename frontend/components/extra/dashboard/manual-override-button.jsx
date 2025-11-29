"use client";

import { Button } from "@/components/ui/button";
import { Clock, RefreshCw, Settings, AlertTriangle } from "lucide-react";

const OVERRIDE_BUTTONS = [
    {
        id: "pause",
        icon: Clock,
        label: "Pause AI Automation",
        description: "Temporarily stop AI decisions",
        variant: "default",
    },
    {
        id: "refresh",
        icon: RefreshCw,
        label: "Force System Refresh",
        description: "Refresh all data immediately",
        variant: "default",
    },
    {
        id: "thresholds",
        icon: Settings,
        label: "Adjust Thresholds",
        description: "Modify AI decision thresholds",
        variant: "default",
    },
    {
        id: "emergency",
        icon: AlertTriangle,
        label: "Emergency Override",
        description: "Activate emergency protocols",
        variant: "destructive",
    },
];

export default function ManualOverrideButton() {
    return (
        <div className="space-y-2">
            {OVERRIDE_BUTTONS.map((btn) => {
                const Icon = btn.icon;
                return (
                    <Button
                        key={btn.id}
                        variant={btn.variant}
                        className={`w-full justify-start gap-3 px-4 py-3 h-auto ${
                            btn.variant === "destructive"
                                ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                                : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                        }`}
                    >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        <div className="text-left">
                            <p className="text-sm font-medium">{btn.label}</p>
                        </div>
                    </Button>
                );
            })}
        </div>
    );
}
