import { prisma } from "@repo/database/prisma";
import { NextRequest, NextResponse } from "next/server";
import getUserId from "@/lib/getUserId"

export async function GET(req: NextRequest) {
    try{
        const {userId, error} = await getUserId(req)
        if(error){
            return error
        }
        const allOrders = await prisma.orderItem.findMany({
            where: {
                sellerId: userId
            },
            select:{
                orderId: true,
                itemId: true,
                quantity: true,
                size: true,
                price: true,
                item:{
                    select:{
                        title: true,
                        thumbnail: true
                    }
                },
                order:{
                    select:{
                        placedOn: true,
                        orderStatus: true,
                        paymentStatus: true,
                        customer:{
                            select:{
                                name: true,
                                email: true,
                                address: true
                            }
                        }
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
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Order Can't Placed"
        }, {status: 500})
    }
}