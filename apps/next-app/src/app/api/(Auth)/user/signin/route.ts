import { prisma } from "@repo/database/prisma";
import { SignInSchema } from "@repo/zod/zodTypes";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest){
    try {
        const body = await req.json()
        const parsedData = SignInSchema.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json({
                success: false,
                message: "Zod validation Failed"
            }, {status: 411});
        }

        const {
            email, password
        } = parsedData.data;

        //Check in the Database wether user is present or not
        const user = await prisma.customer.findFirst({
            where:{
                email
            },
            include: { addresses: true }
        });

        //If not found return error
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User For the Email Not Found"
            }, {status: 400});
        }

        //Generate the JWT token and Compare the Password
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                {
                    email: user.email,
                    id: user.id,
                },
                process.env.JWT_SECRET || 'bikash',
                {
                    expiresIn: "24h"
                }
            );
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };
            const response = NextResponse.json({
                success: true,
                token,
                user: {
                    name: user.name,
                    email: user.email,
                    role: "CUSTOMER",
                    addresses: user.addresses,
                    createdAt: user.createdAt
                },
                message: "User Login Success"
            }, { status: 200 });
            response.cookies.set("token", token, {
                expires: options.expires,
                httpOnly: options.httpOnly,
                path: "/"
            });
            return response;
        } else {
            return NextResponse.json({
                success: false,
                message: "Wrong Password"
            }, {status: 400});
        }
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "User cannot be Logged In"
        }, {status: 500});
        ;
    }
};