"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PlanDashboard } from "@/components/ai-status/PlanDashboard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { API_URL } from "@/lib/utils2";

export default function PlanPage() {
    const { id } = useParams();
    const router = useRouter();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchPrediction = async () => {
            try {
                const res = await fetch(`${API_URL}/api/predictions/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch prediction");
                }
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPrediction();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-background gap-4">
                <p className="text-destructive font-medium">Error: {error}</p>
                <Button variant="outline" onClick={() => router.back()}>
                    Go Back
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <div className="flex-1 overflow-hidden">
                <PlanDashboard data={data} />
            </div>
        </div>
    );
}
