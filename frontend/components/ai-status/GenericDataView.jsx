import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function GenericDataView({ data }) {
    if (!data) return null;

    // If data is a string, just show it nicely
    if (typeof data === "string") {
        return (
            <ScrollArea className="h-full w-full">
                <div className="p-6 ">
                    <div className="bg-muted/30 p-6 rounded-lg border border-border">
                        <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                            {data}
                        </p>
                    </div>
                </div>
            </ScrollArea>
        );
    }

    // Flatten top-level keys for display
    const entries = Object.entries(data);

    return (
        <ScrollArea className="h-full w-full bg-background">
            <div className="p-6 max-w-3xl mx-auto">
                <div className="grid gap-4">
                    {entries.map(([key, value], idx) => (
                        <div
                            key={idx}
                            className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-4 rounded-lg border border-border bg-card hover:bg-muted/20 transition-colors"
                        >
                            <div className="sm:w-1/3 shrink-0">
                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                    {key.replace(/_/g, " ")}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                {renderValue(value)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ScrollArea>
    );
}

function renderValue(value) {
    if (value === null || value === undefined) {
        return <span className="text-muted-foreground italic">N/A</span>;
    }

    if (typeof value === "boolean") {
        return (
            <Badge variant={value ? "default" : "secondary"} className={cn(
                value ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20" :
                    "bg-zinc-500/10 text-zinc-500 hover:bg-zinc-500/20 border-zinc-500/20"
            )}>
                {value ? "True" : "False"}
            </Badge>
        );
    }

    if (typeof value === "object") {
        if (Array.isArray(value)) {
            return (
                <div className="flex flex-wrap gap-2">
                    {value.map((item, i) => (
                        <div key={i} className="inline-block">
                            {typeof item === 'object' ? (
                                <div className="bg-muted/50 rounded p-2 text-xs font-mono">
                                    {JSON.stringify(item).slice(0, 50)}...
                                </div>
                            ) : (
                                <Badge variant="outline" className="bg-background">
                                    {String(item)}
                                </Badge>
                            )}
                        </div>
                    ))}
                </div>
            );
        }
        // Nested object
        return (
            <div className="bg-muted/30 rounded-md p-3 text-sm font-mono text-muted-foreground overflow-x-auto">
                {JSON.stringify(value, null, 2)}
            </div>
        );
    }

    return <span className="text-foreground font-medium break-words">{String(value)}</span>;
}
