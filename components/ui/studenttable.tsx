import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Student {
    name: string
    cohort: string
    courses: string[]
    dateJoined: string
    lastLogin: string
    status: "active" | "inactive"
}

const students: Student[] = [
    {
        name: "Anshuman Kashyap",
        cohort: "AY 2024-25",
        courses: ["CBSE 9 Science", "CBSE 9 Math"],
        dateJoined: "17. Nov. 2024",
        lastLogin: "17. Nov. 2024 4:16 PM",
        status: "active"
    },
    {
        name: "Bansi Dadhaniya",
        cohort: "AY 2024-25",
        courses: ["CBSE 9 Science", "CBSE 9 Math"],
        dateJoined: "17. Nov. 2024",
        lastLogin: "17. Nov. 2024 4:16 PM",
        status: "active"
    }
]

export default function StudentTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Cohort</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead>Date Joined</TableHead>
                    <TableHead>Last login</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    students.map((student, index) => (
                        <TableRow key={student.name}>
                            <TableCell className="font-medium">{ index + 1 }.</TableCell>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.cohort}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    {student.courses.map((course) => (
                                        <div key={course} className="flex items-center gap-1">
                                            <Avatar className="h-6 w-6">
                                                <AvatarFallback className="bg-primary/10 text-xs">
                                                    {course.includes("Science") ? "S" : "M"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">{course}</span>
                                        </div>
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell>{student.dateJoined}</TableCell>
                            <TableCell>{student.lastLogin}</TableCell>
                            <TableCell>
                                <div className={`h-2 w-2 rounded-full ${student.status === "active" ? "bg-green-500" : "bg-red-500"}`} />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

