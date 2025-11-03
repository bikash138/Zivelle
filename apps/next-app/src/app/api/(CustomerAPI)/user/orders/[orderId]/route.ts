import { prisma } from "@repo/database/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ orderId: string }> }
) {
    try{
        const {orderId} = await params
        const reservedOrderDetails = await prisma.order.findUnique({
            where:{
                id: orderId
            },
            include:{
                items:{
                    include:{
                        item:{
                            select:{
                                id: true,
                                title: true,
                                thumbnail: true,
                                price: true,
                            }
                        }
                    }
                }
            }
        })
        if(!reservedOrderDetails){
            return NextResponse.json({
                success: false,
                message: "Order not found"
            })
        }
        const formattedData = {
            ...reservedOrderDetails,
            items: reservedOrderDetails.items.map((orderItem)=>({
                id: orderItem.id,
                quantity: orderItem.quantity,
                price: orderItem.price,
                size: orderItem.size,
                title: orderItem.item.title,
                thumbnail: orderItem.item.thumbnail,
            }))
            
        }
        return NextResponse.json({
            success: true,
            message: "Order Details fetched",
            reservedOrderDetails: formattedData,
            expires: 30
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong while fetching order details"
        })
    }
}