"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AddPatientDialog() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        department: "",
        stage: "",
        admissionTime: "",
        doctor: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSelectChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Patient Data:", formData);
        // Logic to be added later
        setOpen(false);
    };

    const handleSuggestDoctor = () => {
        console.log("Suggesting doctor...");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-fit flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium text-sm sm:text-base">
                    <User className="h-4 w-4" /> New Admission
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-zinc-900 dark:text-zinc-50">New Patient Admission</DialogTitle>
                    <DialogDescription className="text-zinc-500 dark:text-zinc-400">
                        Enter the details of the new patient below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-zinc-900 dark:text-zinc-50">Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-600"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="age" className="text-zinc-900 dark:text-zinc-50">Age</Label>
                            <Input
                                id="age"
                                type="number"
                                value={formData.age}
                                onChange={handleChange}
                                placeholder="30"
                                className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-600"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="gender" className="text-zinc-900 dark:text-zinc-50">Gender</Label>
                            <Select required value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                                <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-blue-600">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone" className="text-zinc-900 dark:text-zinc-50">Phone</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 234 567 890"
                                className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-600"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-zinc-900 dark:text-zinc-50">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john.doe@example.com"
                            className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-600"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="department" className="text-zinc-900 dark:text-zinc-50">Department</Label>
                            <Select required value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
                                <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-blue-600">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="emergency">Emergency</SelectItem>
                                    <SelectItem value="cardiology">Cardiology</SelectItem>
                                    <SelectItem value="neurology">Neurology</SelectItem>
                                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                                    <SelectItem value="surgery">Surgery</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="stage" className="text-zinc-900 dark:text-zinc-50">Stage</Label>
                            <Select required value={formData.stage} onValueChange={(value) => handleSelectChange("stage", value)}>
                                <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-blue-600">
                                    <SelectValue placeholder="Select stage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="triage">Triage</SelectItem>
                                    <SelectItem value="examination">Examination</SelectItem>
                                    <SelectItem value="treatment">Treatment</SelectItem>
                                    <SelectItem value="recovery">Recovery</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="admissionTime" className="text-zinc-900 dark:text-zinc-50">Admission Time</Label>
                            <Input
                                id="admissionTime"
                                type="datetime-local"
                                value={formData.admissionTime}
                                onChange={handleChange}
                                className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-600"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="doctor" className="text-zinc-900 dark:text-zinc-50">Doctor</Label>
                        <Input
                            id="doctor"
                            value={formData.doctor}
                            onChange={handleChange}
                            placeholder="Dr. Smith"
                            className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-600"
                            required
                        />
                        <button
                            type="button"
                            onClick={handleSuggestDoctor}
                            className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 w-fit hover:underline"
                        >
                            Suggest doctor
                        </button>
                    </div>

                    <DialogFooter className="mt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Admit Patient
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
