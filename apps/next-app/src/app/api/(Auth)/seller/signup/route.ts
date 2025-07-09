import { prisma } from "@repo/database/prisma";
import { SignUpSchema } from "@repo/zod/zodTypes";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest){
    try {
        const body = await req.json()
        const parsedData = SignUpSchema.safeParse(body);
        if (!parsedData.success) {
            return NextResponse.json({
                success: false,
                message: "Zod Validation Failed"
            }, {status: 411}
        )};
        const {
            name, store, email, password
        } = parsedData.data;

        //Check if User already exists
        const extistingUser = await prisma.seller.findFirst({
            where:{
                email: email
            }
        });
        if (extistingUser) {
            return NextResponse.json({
                success: false,
                message: "User already exists. Please Login"
            }, {status: 400});
        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create the User
        await prisma.seller.create({
            data:{
                email,
                store,
                name,
                password: hashedPassword
            }
        });

        //Return the response
        return NextResponse.json({
            success: true,
            message: 'Account Created Successfully'
        });
    }
    catch (error) {
        console.log(error);
        NextResponse.json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
