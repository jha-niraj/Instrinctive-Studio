import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { studentname, cohort, courses } = await req.json();
        if(!studentname || !cohort || !courses) {
            return NextResponse.json({
                success: false,
                msg: "Please provide all the details of the students.."
            })
        }

        
    } catch(err: any) {
        console.log("Failed to add students, please try again after some time...", err);
        return NextResponse.json({
            success: false,
            message: 'Failed to add student. Please try again later.',
            error: 'INTERNAL_SERVER_ERROR'
          }, { status: 500 });
    }
}