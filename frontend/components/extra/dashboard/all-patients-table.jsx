"use client";

import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { API_URL } from "@/lib/utils2";

export default function AllPatientsTable() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const getStatusColor = (status) => {
        const colors = {
            critical:
                "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
            urgent: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
            routine:
                "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
        };
        return (
            colors[status] ||
            "bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
        );
    };

    const getStageColor = (stage) => {
        const colors = {
            "in-treatment":
                "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
            waiting:
                "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
            admitted:
                "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
            "discharge-ready":
                "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
        };
        return (
            colors[stage] ||
            "bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
        );
    };

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const res = await fetch(API_URL + "/api/patients");
            const data = await res.json();
            setPatients(data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-400 dark:border-zinc-700 overflow-hidden">
            
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-zinc-400 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800">
                            <th className="text-left px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white">
                                Patient
                            </th>
                            <th className="text-left px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white">
                                Department
                            </th>
                            <th className="text-left px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white">
                                Status
                            </th>
                            <th className="text-left px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white">
                                Stage
                            </th>
                            <th className="text-left px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white">
                                Doctor
                            </th>
                            <th className="text-left px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white">
                                Time
                            </th>
                            <th className="text-left px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {!loading &&
                            patients.map((patient, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b border-zinc-400 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                                        <div>
                                            <p className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white truncate">
                                                {patient.name}
                                            </p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                {patient.id} • {patient.age}y
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                                        {patient.department}
                                    </td>

                                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                                        <span
                                            className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium inline-block ${getStatusColor(
                                                patient.status
                                            )}`}
                                        >
                                            {patient.status}
                                        </span>
                                    </td>

                                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                                        <span
                                            className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium inline-block ${getStageColor(
                                                patient.stage
                                            )}`}
                                        >
                                            {patient.stage}
                                        </span>
                                    </td>

                                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-blue-600 dark:text-blue-400">
                                        {patient.doctor}
                                    </td>

                                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                                        {patient.time}
                                    </td>

                                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                                        <Button className="text-blue-600 bg-white dark:bg-black hover:bg-zinc-300 dark:hover:bg-zinc-900 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-xs sm:text-sm">
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden p-4 space-y-4">
                {!loading &&
                    patients.map((patient, idx) => (
                        <div
                            key={idx}
                            className="border border-zinc-400 dark:border-zinc-700 rounded-lg p-4 space-y-3"
                        >
                            <div className="flex justify-between items-start gap-2">
                                <div className="min-w-0 flex-1">
                                    <p className="font-semibold text-sm text-zinc-900 dark:text-white truncate">
                                        {patient.name}
                                    </p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {patient.id} • {patient.age}y
                                    </p>
                                </div>

                                <Button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-xs flex-shrink-0">
                                    View
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div>
                                    <p className="text-zinc-600 dark:text-zinc-400 mb-1">
                                        Department
                                    </p>
                                    <p className="font-medium text-zinc-900 dark:text-white">
                                        {patient.department}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-zinc-600 dark:text-zinc-400 mb-1">
                                        Doctor
                                    </p>
                                    <p className="font-medium text-blue-600 dark:text-blue-400">
                                        {patient.doctor}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-zinc-600 dark:text-zinc-400 mb-1">
                                        Time
                                    </p>
                                    <p className="font-medium text-zinc-900 dark:text-white">
                                        {patient.time}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-zinc-600 dark:text-zinc-400 mb-1">
                                        Status
                                    </p>
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-xs font-medium inline-block ${getStatusColor(
                                            patient.status
                                        )}`}
                                    >
                                        {patient.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <span
                                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStageColor(
                                        patient.stage
                                    )}`}
                                >
                                    {patient.stage}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
