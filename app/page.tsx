"use client"

import StudentTable from "@/components/ui/studenttable";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from 'lucide-react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useStudentStore } from "./store/useStudentStore";

interface Course {
	id: string;
	name: string;
	courseCode: string;
}

interface StudentFormData {
	name: string;
	cohort: string;
	dateJoined: string;
	courses: string[];
	status: boolean;
}

const courses: Course[] = [
	{ id: '1', name: 'CBSE 9 Math', courseCode: 'cbse9math' },
	{ id: '2', name: 'CBSE 10 Science', courseCode: 'cbse10science' },
];

export default function Page() {
	const { addStudentAsync } = useStudentStore();
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
	const [formData, setFormData] = useState<StudentFormData>({
		name: '',
		cohort: '',
		dateJoined: new Date().toISOString().split('T')[0],
		courses: [],
		status: true
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleCourseToggle = (courseId: string) => {
		const selectedCourse = courses.find((course => course.id === courseId));

		if (!selectedCourse) {
			return;
		}
		setSelectedCourses(prev =>
			prev.includes(courseId)
				? prev.filter(id => id !== courseId)
				: [...prev, courseId]
		);
		setFormData(prev => ({
			...prev,
			courses: prev.courses.includes(selectedCourse.name)
				? prev.courses.filter(name => name !== selectedCourse.name)
				: [...prev.courses, selectedCourse.name]
		}));
	};
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};
	const handleCohortChange = (value: string) => {
		setFormData(prev => ({
			...prev,
			cohort: value
		}));
	};
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);

		try {
			// if (!formData.name || !formData.cohort || !formData.dateJoined || formData.courses.length === 0) {
			// 	throw new Error('Please fill in all required fields');
			// }
			// const response = await axios.post('/api/addstudent', formData);

			// const data = await response.data;
			// if (!response) {
			// 	throw new Error('Failed to add student');
			// }
			await addStudentAsync(formData);
			// toast.success(data.msg);
			setFormData({
				name: '',
				cohort: '',
				dateJoined: new Date().toISOString().split('T')[0],
				courses: [],
				status: true
			});
			setSelectedCourses([]);
			setIsOpen(false);
		} catch (error) {
			console.log("Failed to add student: ", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="space-y-6 sm:pl-4">
			<Toaster />
			<div className="flex flex-col sm:flex-row items-center justify-between">
				<div className="flex gap-4">
					<Select defaultValue="2024-25">
						<SelectTrigger className="w-[120px]">
							<SelectValue placeholder="Select Year" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="2024-25">AY 2024-25</SelectItem>
							<SelectItem value="2023-24">AY 2023-24</SelectItem>
						</SelectContent>
					</Select>
					<Select defaultValue="cbse9">
						<SelectTrigger className="w-[120px]">
							<SelectValue placeholder="Select Class" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="cbse9">CBSE 9</SelectItem>
							<SelectItem value="cbse10">CBSE 10</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<button className="px-4 py-2 flex gap-2 items-center justify-center rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
							<Plus className="h-4 w-4" />
							Add new student
						</button>
					</SheetTrigger>
					<SheetContent className="sm:max-w-[425px]">
						<SheetHeader>
							<SheetTitle>Add New Student</SheetTitle>
							<SheetDescription>
								Enter the details of the new student here. Click save when you're done.
							</SheetDescription>
						</SheetHeader>
						<form onSubmit={handleSubmit} className="space-y-4 mt-4">
							<div className="space-y-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									placeholder="Enter student's name"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="cohort">Cohort</Label>
								<Select
									value={formData.cohort}
									onValueChange={handleCohortChange}
									required
								>
									<SelectTrigger>
										<SelectValue placeholder="Select cohort" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="AY 2024-25">AY 2024-25</SelectItem>
										<SelectItem value="AY 2023-24">AY 2023-24</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label>Courses</Label>
								<div className="space-y-2">
									{
										courses.map((course) => (
											<div key={course.id} className="flex items-center space-x-2">
												<Checkbox
													id={course.id}
													checked={selectedCourses.includes(course.id)}
													onCheckedChange={() => handleCourseToggle(course.id)}
												/>
												<Label htmlFor={course.id}>{course.name}</Label>
											</div>
										))
									}
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="dateJoined">Date Joined</Label>
								<Input
									id="dateJoined"
									name="dateJoined"
									type="date"
									value={formData.dateJoined}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="pt-4">
								<Button
									type="submit"
									className="w-full"
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Saving...' : 'Save Student'}
								</Button>
							</div>
						</form>
					</SheetContent>
				</Sheet>
			</div>
			<StudentTable />
		</div>
	);
}