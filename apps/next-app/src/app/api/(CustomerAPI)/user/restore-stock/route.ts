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
            if (!order) {
                return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
            }
            console.log(order)
            if (order.orderStatus == "Confirmed") {
                return NextResponse.json({ success: false, message: "Order already confirmed" }, { status: 400 });
            }

            // 1. Restore stock
            await Promise.all(
                order.items.map((item) =>
                tx.item.update({
                    where: { id: item.itemId },
                    data: { stock: { increment: item.quantity } },
                })
                )
            );

            // 2. Mark all order items as cancelled
            await tx.orderItem.updateMany({
                where: { orderId },
                data: { itemStatus: "Cancelled" },
            });

            // 3. Mark order status as cancelled
            await tx.order.update({
                where: { id: orderId },
                data: {
                orderStatus: "Cancelled",
                paymentStatus: "Failed",
            }
            });
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