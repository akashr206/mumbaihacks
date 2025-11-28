"use client";

export default function PatientQueue() {
    const queuePatients = [
        {
            name: "John Smith",
            age: 45,
            department: "Emergency",
            patientId: "P001",
            status: "critical",
            statusText: "critical",
            stage: "in-treatment",
            stageText: "in-treatment",
            admitted: "14:30",
            doctor: "Dr. Williams",
        },
        {
            name: "Sarah Johnson",
            age: 32,
            department: "Emergency",
            patientId: "P002",
            status: "urgent",
            statusText: "urgent",
            stage: "waiting",
            stageText: "waiting",
            admitted: "14:45",
            waitTime: "Wait: 28min",
        },
        {
            name: "Emma Wilson",
            age: 28,
            department: "Orthopedics",
            patientId: "P004",
            status: "routine",
            statusText: "routine",
            stage: "waiting",
            stageText: "waiting",
            admitted: "13:30",
            waitTime: "Wait: 42min",
        },
    ];

    const getStatusColor = (status) => {
        const colors = {
            critical:
                "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
            urgent: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
            routine:
                "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
            "in-treatment":
                "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
            waiting:
                "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
            admitted:
                "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
        };
        return (
            colors[status] ||
            "bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
        );
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-400 dark:border-zinc-700 p-4 sm:p-6 w-full">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-4 sm:mb-6">
                Patient Queue
            </h2>

            <div className="space-y-3 sm:space-y-4">
                {queuePatients.map((patient, idx) => (
                    <div
                        key={idx}
                        className="border border-zinc-400 dark:border-zinc-700 rounded-lg p-3 sm:p-4 hover:shadow-md dark:hover:bg-zinc-800 transition-all"
                    >
                        <div className="flex flex-col gap-1 sm:gap-2">
                            <div className="flex flex-1 justify-between min-w-0">
                                <div>
                                    <h3 className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-white truncate">
                                        {patient.name}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 truncate">
                                        {patient.age}y • {patient.department} •{" "}
                                        {patient.patientId}
                                    </p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                                        Admitted: {patient.admitted}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        <span
                                            className={`px-2 sm:px-3 py-1 h-max shrink-0 rounded-full text-xs font-medium ${getStatusColor(
                                                patient.statusText
                                            )}`}
                                        >
                                            {patient.statusText}
                                        </span>
                                        <span
                                            className={`px-2 sm:px-3 py-1 h-max shrink-0 rounded-full text-xs font-medium ${getStatusColor(
                                                patient.stageText
                                            )}`}
                                        >
                                            {patient.stageText}
                                        </span>
                                    </div>
                                    <div >
                                        {patient.doctor && (
                                            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium truncate">
                                                {patient.doctor}
                                            </p>
                                        )}
                                        {patient.waitTime && (
                                            <p className="text-xs sm:text-sm text-orange-600 dark:text-orange-400">
                                                {patient.waitTime}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
