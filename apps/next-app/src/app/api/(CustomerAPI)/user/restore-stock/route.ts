import { prisma } from "@repo/database/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest){
    try{
        const {orderId} = await req.json()
        await prisma.$transaction(async(tx)=>{
            const order = await tx.order.findUnique({
                where: {
                    id: orderId
                },
                include: {
                    items: true
                }
            })
            if(!order || order.orderStatus !== "Pending") throw new Error("Order cannot Cancelled")

            for(const item of order.items){
                await tx.item.update({
                    where: {
                        id: item.id
                    },
                    data:{
                        stock:{
                            increment: item.quantity
                        }
                    }
                })
            }

            await tx.order.update({
                where: {
                    id: orderId
                },
                data:{
                    orderStatus: "Cancelled"
                }
            })
        })
        return NextResponse.json({
            success: true,
            message: "Order Cancelled Success"
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Stock was not restored"
        })
    }
}