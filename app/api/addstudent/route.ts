import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ msg: "Method not allowed" }, { status: 501 });
    }

    try {
        const { name, cohort, courses, dateJoined } = await req.json();

        // console.log(name, cohort, courses, dateJoined);

        if (!Array.isArray(courses) || courses.length === 0) {
            return NextResponse.json(
                { message: 'Invalid course format' },
                { status: 400 }
            );
        }

        const response = await prisma.student.create({
            data: {
                name,
                cohort,
                courses,
                dateJoined
            }
        })

        if(!response) {
            return NextResponse.json({ msg: "Unable to add the student" }, { status: 501 });
        }

        return NextResponse.json({ msg: "Student added successfully", response }, { status: 200 });
    } catch (err: any) {
        console.log("Error while adding the student: " + err);
        return NextResponse.json({ msg: "Error while adding the student: " }, { status: 501 });
    }
}