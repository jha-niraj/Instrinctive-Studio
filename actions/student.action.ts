import { prisma } from "@/lib/prisma";

export async function getStudents() {
    try {
        const students = await prisma.student.findMany({});
        if(!students) {
            return null;
        }

        return students;
    } catch(err: any) {
        console.log("Error while getting the students lists: ", err);
        return null;
    }
}