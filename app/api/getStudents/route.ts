import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({ msg: "Method not allowed" }, { status: 501 });
    }

    try {
        const response = await prisma.student.findMany({});

        if(!response) {
            return NextResponse.json({ msg: "Unable to get the student list" }, { status: 501 });
        }

        return NextResponse.json({ msg: "Student List fetched Successfully", response }, { status: 200 });
    } catch (err: any) {
        console.log("Error while fetching the student lists: " + err);
        return NextResponse.json({ msg: "Error while fetching the student lists: " }, { status: 501 });
    }
}