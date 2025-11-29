import React from "react";
import {
    TrendingUp,
    Users,
    Stethoscope,
    Activity,
    Package,
    ArrowRight,
    CheckCircle2,
    Clock,
    AlertTriangle,
    ArrowLeft,
    X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function PlanDashboard({ data, onClose }) {
    if (!data) return null;
    const router = useRouter();
    // Handle nested 'predicted' object from the analyzer agent
    const prediction = data.predicted || data;
    const { predictedPatientIncrease, staffPlan, inventoryPlan } = prediction;

    // Helper to determine severity color
    const getSeverityColor = (increase) => {
        if (increase > 50) return "text-red-600 dark:text-red-500";
        if (increase > 20) return "text-orange-600 dark:text-orange-500";
        return "text-emerald-600 dark:text-emerald-500";
    };

    const getSeverityBg = (increase) => {
        if (increase > 50)
            return "bg-red-100 dark:bg-red-500/10 border-red-200 dark:border-red-500/20";
        if (increase > 20)
            return "bg-orange-100 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20";
        return "bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20";
    };

    return (
        <div className="flex flex-col h-full bg-background text-foreground transition-colors duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-4 sm:py-6 border-b bg-card/50 backdrop-blur-xl shrink-0 gap-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={() => router.back()}>
                        <ArrowLeft></ArrowLeft>
                        Back
                    </Button>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                            Operational Response Plan
                        </h2>
                        <p className="text-muted-foreground text-xs sm:text-sm mt-1 flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Generated just now
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 mx-auto">
                <section>
                    <div className="flex mb-2 justify-between">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                            Impact Analysis
                        </h3>
                        <div className="flex items-center gap-2">
                            <Button
                                className={
                                    "bg-blue-500 hover:bg-blue-600 text-white"
                                }
                            >
                                Approve
                            </Button>
                            <Button variant={"outline"}>Override</Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        <Card
                            className={cn(
                                "col-span-1 lg:col-span-2 relative overflow-hidden border bg-card p-6 sm:p-8 shadow-sm dark:shadow-2xl transition-all",
                                "dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-900/50",
                                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/5 before:to-purple-500/5 before:opacity-50 dark:before:opacity-100"
                            )}
                        >
                            <div className="relative z-10 flex flex-col sm:flex-row items-start justify-between gap-6">
                                <div className="flex-1">
                                    <p className="text-muted-foreground font-medium mb-2 text-sm sm:text-base">
                                        Predicted Patient Surge (24h)
                                    </p>
                                    <div className="flex items-baseline gap-3 sm:gap-4 flex-wrap">
                                        <span
                                            className={cn(
                                                "text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter",
                                                getSeverityColor(
                                                    predictedPatientIncrease
                                                )
                                            )}
                                        >
                                            +{predictedPatientIncrease || 0}
                                        </span>
                                        <span className="text-muted-foreground font-medium text-sm sm:text-base">
                                            patients
                                        </span>
                                    </div>
                                    <p className="mt-4 text-muted-foreground max-w-md text-sm sm:text-base leading-relaxed">
                                        Based on current incident reports and
                                        historical data, we anticipate a
                                        significant influx requiring immediate
                                        resource reallocation.
                                    </p>
                                </div>
                                <div
                                    className={cn(
                                        "p-3 sm:p-4 rounded-full self-start sm:self-start shrink-0",
                                        getSeverityBg(predictedPatientIncrease)
                                    )}
                                >
                                    <TrendingUp
                                        className={cn(
                                            "w-6 h-6 sm:w-8 sm:h-8",
                                            getSeverityColor(
                                                predictedPatientIncrease
                                            )
                                        )}
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Status Summary Card */}
                        <Card className="bg-card/50 border p-5 sm:p-6 flex flex-col justify-center h-full">
                            <div className="space-y-4 sm:space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground text-sm sm:text-base">
                                        Urgency Level
                                    </span>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "uppercase text-xs sm:text-sm",
                                            getSeverityColor(
                                                predictedPatientIncrease
                                            )
                                        )}
                                    >
                                        {predictedPatientIncrease > 50
                                            ? "Critical"
                                            : predictedPatientIncrease > 20
                                            ? "High"
                                            : "Moderate"}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground text-sm sm:text-base">
                                        Staff Actions
                                    </span>
                                    <span className="text-foreground font-mono font-medium text-sm sm:text-base">
                                        {staffPlan ? staffPlan.length : 0}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground text-sm sm:text-base">
                                        Supply Chain
                                    </span>
                                    <span className="text-foreground font-mono font-medium text-sm sm:text-base">
                                        {inventoryPlan
                                            ? inventoryPlan.length
                                            : 0}{" "}
                                        Items
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* Staff Redeployment Section */}
                <section>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                        Staff Redeployment Plan
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {staffPlan &&
                            staffPlan.map((plan, idx) => (
                                <Card
                                    key={idx}
                                    className="p-4 border bg-card hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <Badge
                                            variant={
                                                plan.plan === "redeployment"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            className="uppercase text-xs"
                                        >
                                            {plan.plan}
                                        </Badge>
                                        {plan.plan === "redeployment" && (
                                            <div className="flex items-center text-xs text-muted-foreground gap-1">
                                                <span>{plan.fromWard}</span>
                                                <ArrowRight className="w-3 h-3" />
                                                <span className="font-medium text-foreground">
                                                    {plan.toWard}
                                                </span>
                                            </div>
                                        )}
                                        {plan.plan === "addition" && (
                                            <div className="flex items-center text-xs text-muted-foreground gap-1">
                                                <span>To:</span>
                                                <span className="font-medium text-foreground">
                                                    {plan.toWard}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2 mt-3">
                                        {plan.staff &&
                                            typeof plan.staff === "object" && (
                                                <div className="flex flex-wrap gap-2">
                                                    {plan.staff.doctor && (
                                                        <Badge
                                                            variant="outline"
                                                            className="flex items-center gap-1"
                                                        >
                                                            <Stethoscope className="w-3 h-3" />
                                                            {Array.isArray(
                                                                plan.staff
                                                                    .doctor
                                                            )
                                                                ? `${plan.staff.doctor.reduce(
                                                                      (
                                                                          acc,
                                                                          d
                                                                      ) =>
                                                                          acc +
                                                                          (parseInt(
                                                                              d.number
                                                                          ) ||
                                                                              0),
                                                                      0
                                                                  )} Doctors`
                                                                : `${plan.staff.doctor} Doctors`}
                                                        </Badge>
                                                    )}
                                                    {plan.staff.nurse && (
                                                        <Badge
                                                            variant="outline"
                                                            className="flex items-center gap-1"
                                                        >
                                                            <Users className="w-3 h-3" />
                                                            {plan.staff.nurse}{" "}
                                                            Nurses
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}
                                        {plan.notes && (
                                            <p className="text-xs text-muted-foreground mt-2 italic">
                                                "{plan.notes}"
                                            </p>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        {(!staffPlan || staffPlan.length === 0) && (
                            <div className="col-span-full p-8 text-center text-muted-foreground border rounded-lg border-dashed">
                                No staff redeployment required at this time.
                            </div>
                        )}
                    </div>
                </section>

                {/* Supply Chain Section */}
                <section>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Package className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                        Supply Chain Requirements
                    </h3>

                    <Card className="bg-card border overflow-hidden dark:bg-zinc-900">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/50 text-muted-foreground uppercase tracking-wider font-medium text-xs">
                                    <tr>
                                        <th className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                                            Item Name
                                        </th>
                                        <th className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                                            Required
                                        </th>
                                        <th className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                                            Current Stock
                                        </th>
                                        <th className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                                            Reason
                                        </th>
                                        <th className="px-4 py-3 sm:px-6 sm:py-4 text-right whitespace-nowrap">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {inventoryPlan &&
                                        inventoryPlan.map((item, idx) => {
                                            const itemName =
                                                item.item ||
                                                item.name ||
                                                "Unknown Item";
                                            const quantity =
                                                item.toBeAddedQuantity ||
                                                item.quantity ||
                                                0;
                                            const current =
                                                item.currentQuantity || 0;
                                            const reason =
                                                item.reason ||
                                                "Stock replenishment";

                                            return (
                                                <tr
                                                    key={idx}
                                                    className="hover:bg-muted/50 transition-colors group"
                                                >
                                                    <td className="px-4 py-3 sm:px-6 sm:py-4 font-medium text-foreground whitespace-nowrap">
                                                        {itemName}
                                                    </td>
                                                    <td className="px-4 py-3 sm:px-6 sm:py-4 font-mono whitespace-nowrap text-red-500 font-bold">
                                                        +{quantity}
                                                    </td>
                                                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-muted-foreground font-mono whitespace-nowrap">
                                                        {current}
                                                    </td>
                                                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-muted-foreground text-xs max-w-xs truncate">
                                                        {reason}
                                                    </td>
                                                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-right whitespace-nowrap">
                                                        <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-xs uppercase tracking-wider flex items-center justify-end gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                            Order{" "}
                                                            <ArrowRight className="w-3 h-3" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                        {(!inventoryPlan || inventoryPlan.length === 0) && (
                            <div className="p-8 text-center text-muted-foreground">
                                No inventory requirements identified.
                            </div>
                        )}
                    </Card>
                </section>
            </div>
        </div>
    );
}
