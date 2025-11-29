"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
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

export default function AddStaffDialog() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        department: "",
        currentShift: "",
        nextShift: "",
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
        console.log("Staff Data:", formData);
        // Logic to be added later
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Add Staff Member</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-zinc-900 dark:text-zinc-50">Add New Staff Member</DialogTitle>
                    <DialogDescription className="text-zinc-500 dark:text-zinc-400">
                        Enter the details of the new staff member below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-zinc-900 dark:text-zinc-50">Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Dr. Sarah Wilson"
                            className="col-span-3 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-blue-600"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="role" className="text-zinc-900 dark:text-zinc-50">Role</Label>
                        <Select required value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                            <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-blue-600">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="doctor">Doctor</SelectItem>
                                <SelectItem value="nurse">Nurse</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="technician">Technician</SelectItem>
                                <SelectItem value="support">Support</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
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
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="currentShift" className="text-zinc-900 dark:text-zinc-50">Current Shift</Label>
                            <Select required value={formData.currentShift} onValueChange={(value) => handleSelectChange("currentShift", value)}>
                                <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-blue-600">
                                    <SelectValue placeholder="Select shift" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="morning">Morning</SelectItem>
                                    <SelectItem value="afternoon">Afternoon</SelectItem>
                                    <SelectItem value="night">Night</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="nextShift" className="text-zinc-900 dark:text-zinc-50">Next Shift</Label>
                            <Select required value={formData.nextShift} onValueChange={(value) => handleSelectChange("nextShift", value)}>
                                <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-blue-600">
                                    <SelectValue placeholder="Select shift" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="morning">Morning</SelectItem>
                                    <SelectItem value="afternoon">Afternoon</SelectItem>
                                    <SelectItem value="night">Night</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Add Member
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
