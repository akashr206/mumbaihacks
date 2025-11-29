"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/utils2";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function WardStaffTable() {
    const [wards, setWards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWards = async () => {
            try {
                const res = await fetch(
                    `${API_URL}/api/staff/wards-distribution`
                );
                if (res.ok) {
                    const data = await res.json();
                    setWards(data);
                }
            } catch (error) {
                console.error("Failed to fetch ward staff distribution", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWards();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            </div>
        );
    }

    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Ward Staff Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ward Name</TableHead>
                            <TableHead>Total Staff</TableHead>
                            <TableHead>Staff Roles</TableHead>
                            <TableHead>Capacity</TableHead>
                            <TableHead>Occupied</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {wards.map((ward) => (
                            <TableRow key={ward.id}>
                                <TableCell className="font-medium">
                                    {ward.name}
                                </TableCell>
                                <TableCell>{ward.totalStaff}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(ward.staffRoles).map(
                                            ([role, count]) => (
                                                <Badge
                                                    key={role}
                                                    variant="secondary"
                                                >
                                                    {role}: {count}
                                                </Badge>
                                            )
                                        )}
                                        {Object.keys(ward.staffRoles).length ===
                                            0 && (
                                            <span className="text-muted-foreground text-sm">
                                                No staff assigned
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>{ward.capacity}</TableCell>
                                <TableCell>{ward.occupied}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
