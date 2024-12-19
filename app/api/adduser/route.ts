import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ msg: "Method not allowed" }, { status: 501 });
    }

    try {
        const { name, email, password } = await req.json();

        console.log(name, email, password);

        const response = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        if(!response) {
            return NextResponse.json({ msg: "Unable to create the user" }, { status: 501 });
        }

        return NextResponse.json({ msg: "User created successfully", response }, { status: 200 });
    } catch (err) {
        console.log("Error while creating the user: " + err);
        return NextResponse.json({ msg: "Error while creating the user" }, { status: 501 });
    }
}