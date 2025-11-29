import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GenericDataView } from "./GenericDataView";

export function ResponseDialog({ isOpen, onClose, title, data }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden bg-background border-border sm:rounded-xl">
                <div className="flex flex-col h-full overflow-hidden">
                    <DialogHeader className="px-6 py-4 border-b border-border bg-card shrink-0">
                        <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-foreground">
                            {title}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Agent response details.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto">
                        <GenericDataView data={data} />
                    </div>

                    <div className="p-4 border-t border-border bg-card flex justify-end shrink-0">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
