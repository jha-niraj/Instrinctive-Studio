import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import { Ellipsis } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast"
import { useStudentStore } from "@/app/store/useStudentStore";

const TableRowSkeleton = () => (
    <TableRow>
        <TableCell className="w-12">
            <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
        </TableCell>
        <TableCell>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </TableCell>
        <TableCell>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </TableCell>
        <TableCell>
            <div className="flex gap-2">
                {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-1">
                        <div className="h-12 w-12 bg-gray-200 rounded-xl animate-pulse" />
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                ))}
            </div>
        </TableCell>
        <TableCell>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </TableCell>
        <TableCell>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </TableCell>
        <TableCell>
            <div className="h-2 w-2 bg-gray-200 rounded-full animate-pulse" />
        </TableCell>
        <TableCell>
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
        </TableCell>
    </TableRow>
)

export default function StudentTable() {
    const { students, setStudents, isLoading, setIsLoading, deleteStudentAsync } = useStudentStore();

    useEffect(() => {
        const fetchStudentsLists = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("/api/getStudents");

                if (!response) {
                    throw new Error("Failed to get the students");
                }

                const data = await response.data;
                setStudents(data.response);
            } catch (err: any) {
                console.log("Error while fetching students lists: ", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchStudentsLists();
    }, [])

    const handleStudentDelete = async (id: string) => {
        try {
            await deleteStudentAsync(id);
            // toast.success(data.msg);
        } catch (err: any) {
            console.log("Error while deleting a student: ", err);
        }
    }

    return (
        <Table className="border-2 border-gray-100 rounded-xl p-2">
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Cohort</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead>Date Joined</TableHead>
                    <TableHead>Last login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>More</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    isLoading ? (
                        [...Array(5)].map((_, index) => (
                            <TableRowSkeleton key={index} />
                        ))
                    ) : (
                        students && students?.map((student, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index + 1}.</TableCell>
                                <TableCell className="font-medium">{student.name}</TableCell>
                                <TableCell>{student.cohort}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        {
                                            student.courses.map((course) => (
                                                <div key={course} className="flex items-center gap-1">
                                                    <Image
                                                        src="https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?s=612x612&w=0&k=20&c=Dw1nKFtnU_Bfm2I3OPQxBmSKe9NtSzux6bHqa9lVZ7A="
                                                        alt="Adeline H. Dancy"
                                                        height={45}
                                                        width={45}
                                                        className="rounded-xl"
                                                    />
                                                    <span className="text-sm">{course}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </TableCell>
                                <TableCell>{student.dateJoined}</TableCell>
                                <TableCell>{student.lastLogin}</TableCell>
                                <TableCell>
                                    <div className={`h-2 w-2 rounded-full ${student.status ? "bg-green-500" : "bg-red-500"}`} />
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="cursor-pointer" asChild>
                                            <Ellipsis />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuItem className="cursor-pointer">
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleStudentDelete(student.id)}>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )
                }
            </TableBody>
        </Table>
    )
}

