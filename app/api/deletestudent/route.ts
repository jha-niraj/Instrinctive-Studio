import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ msg: "Method not allowed" }, { status: 501 });
    }

    try {
        const { id } = await req.json();

        const response = await prisma.student.delete({
            where: {
                id
            }
        })

        if(!response) {
            return NextResponse.json({ msg: "Unable to delete the student" }, { status: 501 });
        }

        return NextResponse.json({ msg: "Student deleted successfully", response }, { status: 200 });
    } catch (err: any) {
        console.log("Error while deleting the student: " + err);
        return NextResponse.json({ msg: "Error while deleting the student: " }, { status: 501 });
    }
}