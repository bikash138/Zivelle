import getUserIdFromRequest from "@/lib/getUserId";
import { prisma } from "@repo/database/prisma";
import { NextRequest, NextResponse } from "next/server";

type Item = {
  id: string;
  adminId: string;
  quantity: number;
  price: number;
  selectedSize: string;
};

export async function POST(req: NextRequest){
    try{
        const {userId, error} = await getUserIdFromRequest(req)
        if(error){
            return error
        }

        const {items, totalAmount, deliveryAddress} = await req.json()
        const expiresAt = new Date(Date.now() + 5*60*1000)

        const order = await prisma.$transaction(async(tx)=>{
            for(const item of items){
                const result = await tx.item.updateMany({
                    where: {
                        id: item.id,
                        stock: {
                            gte: item.quantity
                        }
                    },
                    data: {
                        stock: {
                            decrement: item.quantity
                        },
                    }
                })
                if(result.count === 0){
                    throw { type: "OUT_OF_STOCK", item }; 
                }
            }

            return await tx.order.create({
                data:{
                    expiresAt,
                    deliveryAddress,
                    total: totalAmount,
                    orderStatus: "Pending",
                    paymentStatus: "Pending",
                    customerId: userId,
                    items: {
                        create: items.map((item: Item) => ({
                            itemId: item.id, 
                            sellerId: item.adminId,
                            quantity: item.quantity, 
                            price: item.price, 
                            size: item.selectedSize, 
                        })),
                    },
                }
            })
        })

        return NextResponse.json({
            success: true,
            message: "Order Reserved Success",
            orderId: order.id
        }, {status: 200})
    }catch(err: any){ // eslint-disable-line
        if (err.type === "OUT_OF_STOCK") {
            return NextResponse.json(
            {
                success: false,
                itemId: err.item.id,
                message: `${err.item.title} is currently out of stock`,
            },
            { status: 409 }
            );
        }
        console.log(err)
        return NextResponse.json({
            success: false,
            message: "Something went while Reserving stocks"
        }, {status: 500})
    }
}