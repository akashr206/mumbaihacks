import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlanDashboard } from "./PlanDashboard";
import { GenericDataView } from "./GenericDataView";

export function ResponseDialog({ isOpen, onClose, title, data }) {
    // Check if we have structured prediction data
    const predictionData = data?.predicted || (data?.analysis ? data.analysis : null);
    const hasStructuredData = !!predictionData;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95vw] h-[95vh] flex flex-col p-0 gap-0 overflow-hidden bg-background border-border sm:rounded-xl">
                {hasStructuredData ? (
                    <PlanDashboard data={predictionData} />
                ) : (
                    <div className="flex flex-col h-full">
                        <DialogHeader className="px-6 py-4 border-b border-border bg-card">
                            <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-foreground">
                                {title}
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                                Agent response details.
                            </DialogDescription>
                        </DialogHeader>

                        <GenericDataView data={data} />

                        <div className="p-4 border-t border-border bg-card flex justify-end">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                            >
                                Close
                            </Button>

                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
