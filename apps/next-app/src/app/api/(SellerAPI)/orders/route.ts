import { prisma } from "@repo/database/prisma";
import { OrderSchema } from "@repo/zod/zodTypes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        const userId = '7897a286-164c-4766-b031-74498767fbc4'
        const body =await req.json()
        const parsedData = OrderSchema.safeParse(body)
        if(!parsedData.success){
            return NextResponse.json({
                success: false,
                message: "Validation Failed",
                errors: parsedData.error.errors
            }, { status: 400 })
        }
        const { itemId, quantity, total } = parsedData.data
        const order = await prisma.order.create({
            data:{
                sellerId: userId,
                itemId,
                quantity,
                total
            }
        })
        return NextResponse.json({
            success: true,
            message: "Order Placed Successfully",
            order
        },{status:200})
    }catch(error){
        return NextResponse.json({
            success: false,
            message: "Order Can't Placed"
        },{status: 500})
    }
}

export async function GET(req: NextRequest) {
    try{
        const userId = '7897a286-164c-4766-b031-74498767fbc4'
        const allOrders = await prisma.order.findMany({
            where: {
                sellerId: userId
            },
            select:{
                id: true,
                quantity: true,
                total: true,
                status: true,
                placedOn: true,
                item:{
                    select:{
                        title: true
                    }
                }
            }
        })
        return NextResponse.json({
            success:true,
            message: "All Order fetched Successfully",
            allOrders
        }, {status: 200})
    }catch(error){
        return NextResponse.json({
            success: false,
            message: "Order Can't Placed"
        },{status: 500})
    }
}