"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import {
    CircleCheck,
    Loader2,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    Clock,
    Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ResponseDialog } from "@/components/ai-status/ResponseDialog";
import { API_URL } from "@/lib/utils2.js";

const socket = io(API_URL);

export default function Page() {
    const [updates, setUpdates] = useState({});
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState(null);
    const [batchId, setBatchId] = useState("");
    const [finalPlan, setFinalPlan] = useState(null);
    const [selectedUpdate, setSelectedUpdate] = useState(null);
    const router = useRouter();

    const [decisions, setDecisions] = useState([]);
    const [loadingDecisions, setLoadingDecisions] = useState(true);

    useEffect(() => {
        const fetchDecisions = async () => {
            try {
                const res = await fetch(`${API_URL}/api/predictions`);
                if (res.ok) {
                    const data = await res.json();
                    const formatted = data.map((d) => ({
                        id: d.id,
                        title: "Operational Response Plan",
                        timestamp: new Date(d.createdAt).toLocaleString(),
                        status: "SUCCESS",
                        category: "AI Analysis",
                        reasoning: `Predicted patient increase: ${d.predictedPatientIncrease}. Staff redeployment plans generated.`,
                        impact: d.impact || "No impact summary available",
                        message: { predicted: d },
                    }));
                    setDecisions(formatted);
                }
            } catch (e) {
                console.error("Failed to fetch decisions", e);
            } finally {
                setLoadingDecisions(false);
            }
        };
        fetchDecisions();

        const handleBatchUpdate = (data) => {
            if (!data.batchId) return;

            // Set batchId if it's not set (e.g. triggered by scheduler)
            setBatchId((prev) => {
                if (!prev) return data.batchId;
                return prev;
            });

            const item = data.payload;
            console.log(item);

            setUpdates((prev) => {
                const newUpdates = {
                    ...prev,
                    [item.id]: item,
                };
                delete newUpdates.completed;
                return newUpdates;
            });
        };

        const handleBatchCompleted = (data) => {
            setFinalPlan(data.finalPlan);
            console.log(data.finalPlan);
            fetchDecisions();

            setUpdates((prev) => ({
                ...prev,
                completed: true,
            }));
            setIsRunning(false);
        };

        const handleSchedulerStatus = (data) => {
            setNextRunTime(data.nextRunTime);
            if (data.isRunning) {
                setIsRunning(true);
            }
        };

        socket.on("batch:update", handleBatchUpdate);
        socket.on("batch:completed", handleBatchCompleted);
        socket.on("scheduler:status", handleSchedulerStatus);

        return () => {
            socket.off("batch:update", handleBatchUpdate);
            socket.off("batch:completed", handleBatchCompleted);
            socket.off("scheduler:status", handleSchedulerStatus);
        };
    }, []);

    // Countdown timer
    const [timeLeft, setTimeLeft] = useState("");
    const [nextRunTime, setNextRunTime] = useState(null);

    useEffect(() => {
        if (!nextRunTime) {
            setTimeLeft("");
            return;
        }

        const updateTimer = () => {
            const now = Date.now();
            const diff = nextRunTime - now;

            if (diff <= 0) {
                setTimeLeft("Running soon...");
                return;
            }

            const seconds = Math.ceil(diff / 1000);
            const m = Math.floor(seconds / 60);
            const s = seconds % 60;
            setTimeLeft(`${m}m ${s}s`);
        };

        // Initial update
        updateTimer();

        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [nextRunTime]);

    const startBatch = async () => {
        setError(null);
        setIsRunning(true);
        setUpdates({});
        setFinalPlan(null);

        try {
            const response = await fetch(`${API_URL}/run_batch`, {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to start batch: ${response.statusText}`
                );
            }

            const result = await response.json();
            setBatchId(result.batchId);
            console.log("Batch started:", result.batchId);
        } catch (err) {
            setError(err.message);
            setIsRunning(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "SUCCESS":
                return "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-200";
            case "PENDING":
                return "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-200";
            default:
                return "bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "SUCCESS":
                return (
                    <CheckCircle
                        size={18}
                        className="text-green-500 dark:text-green-400 flex-shrink-0"
                    />
                );
            case "PENDING":
                return (
                    <Clock
                        size={18}
                        className="text-amber-500 dark:text-amber-400 flex-shrink-0"
                    />
                );
            default:
                return (
                    <AlertCircle
                        size={18}
                        className="text-zinc-500 dark:text-zinc-400 flex-shrink-0"
                    />
                );
        }
    };

    const DecisionCard = ({ decision }) => (
        <Card className="bg-white dark:bg-zinc-900 border border-zinc-400 dark:border-zinc-800 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-blue-900/20 transition-shadow">
            <div className="p-4 sm:p-6 space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="mt-1">
                            {getStatusIcon(decision.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-zinc-900 dark:text-white text-sm sm:text-base break-words line-clamp-2">
                                {decision.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                {decision.timestamp}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:ml-auto">
                        <Badge
                            variant="outline"
                            className={`text-xs font-medium whitespace-nowrap ${getStatusColor(
                                decision.status
                            )}`}
                        >
                            {decision.status}
                        </Badge>
                        <Badge
                            variant="outline"
                            className="text-xs font-medium bg-blue-50 dark:bg-zinc-900 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-800 whitespace-nowrap"
                        >
                            {decision.category}
                        </Badge>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-3 sm:space-y-4">
                    {/* Reasoning */}
                    <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                            Reasoning
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {decision.reasoning}
                        </p>
                    </div>

                    {/* Impact Section */}
                    <div className="bg-blue-50 dark:bg-slate-950/30 rounded-lg p-3 sm:p-4 border border-blue-100 dark:border-zinc-900">
                        <h4 className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                            Impact
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                            {decision.impact}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between">
                        <div className="flex flex-col sm:flex-row gap-2 pt-2 sm:gap-3">
                            <Button
                                variant="outline"
                                className="text-xs sm:text-sm h-9 sm:h-10 bg-white dark:bg-slate-800 text-zinc-700 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-slate-700 w-full sm:w-auto"
                            >
                                Approve
                            </Button>
                            <Button
                                variant="outline"
                                className="text-xs sm:text-sm h-9 sm:h-10 bg-white dark:bg-slate-800 text-zinc-700 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-slate-700 w-full sm:w-auto"
                            >
                                Override
                            </Button>
                        </div>
                        <Button
                            className={
                                "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                            }
                            onClick={() => router.push(`/plan/${decision.id}`)}
                        >
                            View details
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );

    const updatesList = Object.entries(updates)
        .filter(([key]) => key !== "completed")
        .map(([_, value]) => value);

    const hasStarted = updatesList.length > 0 || updates.completed;

    return (
        <div className="min-h-screen bg-background py-10 space-y-4">
            {/* Agentic Cycle Monitor Section */}
            <div className="max-w-4xl mx-auto w-full">
                <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                    <div className="px-4 py-4 sm:px-6 lg:px-8 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                            Agentic Cycle Monitor
                        </h2>
                        {hasStarted && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs sm:text-sm text-muted-foreground">
                                    Batch ID:
                                </span>
                                <code className="bg-muted px-2 py-1 rounded text-xs font-mono text-foreground">
                                    {batchId}
                                </code>
                            </div>
                        )}
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8">
                        {!hasStarted && (
                            <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-center">
                                <div className="mb-6 p-4 bg-blue-500/10 rounded-full">
                                    <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 animate-spin text-blue-500" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-medium text-foreground mb-2">
                                    Next cycle in {timeLeft}
                                </h3>
                                <p className="text-muted-foreground mb-8 max-w-md text-sm sm:text-base px-4">
                                    The AI agents will automatically analyze
                                    hospital data and generate optimization
                                    plans.
                                </p>
                                <Button
                                    onClick={startBatch}
                                    disabled={isRunning}
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto min-w-[200px]"
                                >
                                    {isRunning ? "Starting..." : "Start Now"}
                                </Button>
                                {error && (
                                    <div className="mt-6 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm max-w-md">
                                        {error}
                                    </div>
                                )}
                            </div>
                        )}

                        {hasStarted && (
                            <motion.div className="space-y-3 sm:space-y-4">
                                {updatesList.map((u) => (
                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        key={u.id}
                                        className={cn(
                                            "p-4 rounded-lg border transition-all",
                                            u.status === "running" ||
                                                u.status === "fetching"
                                                ? "bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800"
                                                : u.status === "complete"
                                                ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800"
                                                : u.status === "error"
                                                ? "bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-800"
                                                : "bg-card border-border",
                                            u.id === "exit" && "hidden"
                                        )}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                                            <div className="shrink-0 mt-1 hidden sm:block">
                                                {u.status === "running" ||
                                                u.status === "fetching" ? (
                                                    <Loader2 className="animate-spin w-5 h-5 text-amber-500" />
                                                ) : u.status === "complete" ? (
                                                    <CircleCheck className="w-5 h-5 text-emerald-500" />
                                                ) : (
                                                    <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-zinc-800" />
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                                    <div className="sm:hidden shrink-0">
                                                        {u.status ===
                                                            "running" ||
                                                        u.status ===
                                                            "fetching" ? (
                                                            <Loader2 className="animate-spin w-4 h-4 text-amber-500" />
                                                        ) : u.status ===
                                                          "complete" ? (
                                                            <CircleCheck className="w-4 h-4 text-emerald-500" />
                                                        ) : (
                                                            <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-zinc-800" />
                                                        )}
                                                    </div>
                                                    <span className="font-semibold text-foreground capitalize text-sm sm:text-base">
                                                        {u.agent}
                                                    </span>
                                                    <span
                                                        className={cn(
                                                            "text-xs px-2 py-0.5 rounded-full uppercase tracking-wider font-medium",
                                                            u.status ===
                                                                "running" ||
                                                                u.status ===
                                                                    "fetching"
                                                                ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                                                : u.status ===
                                                                  "complete"
                                                                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                                                : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400"
                                                        )}
                                                    >
                                                        {u.status}
                                                    </span>
                                                </div>

                                                {u.status === "running" ||
                                                u.status === "fetching" ? (
                                                    <p className="text-xs sm:text-sm text-muted-foreground animate-pulse">
                                                        {u.message}
                                                    </p>
                                                ) : (
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-2">
                                                        <p className="text-xs sm:text-sm text-muted-foreground truncate max-w-full sm:max-w-[300px]">
                                                            Response received
                                                        </p>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                setSelectedUpdate(
                                                                    u
                                                                )
                                                            }
                                                            className="w-full sm:w-auto h-8 text-xs whitespace-nowrap"
                                                        >
                                                            View Response
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {updates.completed && (
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 items-stretch sm:items-center">
                                <div className="px-4 py-2 sm:py-2.5 flex-1 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-center justify-center">
                                    <span className="text-emerald-700 dark:text-emerald-400 font-medium text-sm sm:text-base flex items-center gap-2">
                                        <CircleCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                                        Cycle Completed
                                    </span>
                                </div>
                                <Button
                                    onClick={startBatch}
                                    disabled={isRunning}
                                    className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-6 sm:px-8 h-10 sm:h-auto"
                                >
                                    Start Again
                                </Button>
                            </div>
                        )}
                        {finalPlan && (
                            <div className="mt-4 sm:mt-6 px-4 py-3 sm:py-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-full">
                                            <CircleCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <p className="text-emerald-900 dark:text-emerald-100 font-semibold text-sm sm:text-base">
                                                Final Plan Generated
                                            </p>
                                            <p className="text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm">
                                                Ready for review and
                                                implementation
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setSelectedUpdate({
                                                agent: "Final Plan",
                                                message: finalPlan,
                                            })
                                        }
                                        className="w-full sm:w-auto border-emerald-200 hover:bg-emerald-100 dark:border-emerald-800 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                                    >
                                        View Plan
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* AI Decision Log Section */}
            <div className="max-w-4xl mx-auto w-full">
                <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
                    <div className="px-4 py-4 sm:px-6 lg:px-8 border-b border-border">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
                            <div className="min-w-0">
                                <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-1">
                                    Review previous cycles
                                </h2>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                    Real-time autonomous decisions and their
                                    outcomes
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8">
                        {loadingDecisions ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col space-y-3 p-6 border rounded-xl bg-white dark:bg-zinc-900"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-2">
                                                <Skeleton className="h-5 w-[250px]" />
                                                <Skeleton className="h-4 w-[200px]" />
                                            </div>
                                            <Skeleton className="h-6 w-[100px]" />
                                        </div>
                                        <div className="space-y-2 pt-4">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-[90%]" />
                                        </div>
                                        <div className="pt-4 flex gap-3">
                                            <Skeleton className="h-10 w-[100px]" />
                                            <Skeleton className="h-10 w-[100px]" />
                                            <div className="flex-1" />
                                            <Skeleton className="h-10 w-[120px]" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-2 sm:space-y-3 md:space-y-4">
                                {decisions.map((decision) => (
                                    <DecisionCard
                                        key={decision.id}
                                        decision={decision}
                                    />
                                ))}
                                {decisions.length === 0 && (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No previous cycles found.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ResponseDialog
                isOpen={!!selectedUpdate}
                onClose={() => setSelectedUpdate(null)}
                title={
                    selectedUpdate?.agent
                        ? `${selectedUpdate.agent} Response`
                        : "Agent Response"
                }
                data={selectedUpdate?.message}
            />
        </div>
    );
}
