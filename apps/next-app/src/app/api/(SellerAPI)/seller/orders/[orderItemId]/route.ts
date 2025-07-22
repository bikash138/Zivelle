import { prisma } from "@repo/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest, 
    { params }: { params: Promise<{ orderItemId: string }>}
){
    try{
        const { orderItemId } = await params
        const { itemStatus } = await request.json()

        const updatedOrderItem = await prisma.orderItem.update({
            where: {
                id: parseInt(orderItemId)
            },
            data: { itemStatus },
            include: {
                item:true,
                order: true
            }
        })

        if (itemStatus === "Delivered"){
            await prisma.item.update({
                where:{
                    id: updatedOrderItem.itemId
                },
                data: {
                    soldCount: {
                        increment: updatedOrderItem.quantity
                    },
                    stock: {
                        decrement: updatedOrderItem.quantity
                    }
                }
            })
        }

        return NextResponse.json({
            success: true,
            message: "Order status updated successfully",
            data: updatedOrderItem
        });
    }catch(error){
        console.error("Error updating order status:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to update order status" 
        },{ status: 500 });
    }
}