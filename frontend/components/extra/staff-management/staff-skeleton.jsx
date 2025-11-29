"use client"
import { Skeleton } from "@/components/ui/skeleton";

function StaffTableSkeleton() {
    return (
        <div className="w-full">
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                    <tbody>
                        {[...Array(6)].map((_, i) => (
                            <tr
                                key={i}
                                className="border-b border-zinc-100 dark:border-zinc-700"
                            >
                                <td className="px-4 sm:px-6 py-4">
                                    <Skeleton className="h-4 w-32" />
                                </td>
                                <td className="px-4 sm:px-6 py-4">
                                    <Skeleton className="h-4 w-20" />
                                </td>
                                <td className="px-4 sm:px-6 py-4">
                                    <Skeleton className="h-4 w-20" />
                                </td>
                                <td className="px-4 sm:px-6 py-4">
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                </td>
                                <td className="px-4 sm:px-6 py-4">
                                    <Skeleton className="h-4 w-24" />
                                </td>
                                <td className="px-4 sm:px-6 py-4">
                                    <Skeleton className="h-4 w-16" />
                                </td>
                                <td className="px-4 sm:px-6 py-4">
                                    <Skeleton className="h-4 w-20" />
                                </td>
                                <td className="px-4 sm:px-6 py-4">
                                    <Skeleton className="h-7 w-14 rounded-md" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="lg:hidden divide-y divide-zinc-200 dark:divide-zinc-700">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>

                        <div className="space-y-2 text-xs">
                            <Skeleton className="h-3 w-40" />
                            <Skeleton className="h-3 w-36" />
                            <Skeleton className="h-3 w-32" />
                        </div>

                        <Skeleton className="h-7 w-full rounded-md" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StaffTableSkeleton;