import { prisma } from "@repo/database/prisma";
import { OrderSchema } from "@repo/zod/zodTypes";
import { NextRequest, NextResponse } from "next/server";
import getUserId from "@/lib/getUserId"

// export async function POST(req: NextRequest){
//     try{
//         const userId = '7897a286-164c-4766-b031-74498767fbc4'
//         const customerId = '111-111-111-111'
//         const body =await req.json()
//         const parsedData = OrderSchema.safeParse(body)
//         if(!parsedData.success){
//             return NextResponse.json({
//                 success: false,
//                 message: "Validation Failed",
//                 errors: parsedData.error.errors
//             }, { status: 400 })
//         }
//         const { itemId, quantity, total } = parsedData.data
//         const order = await prisma.order.create({
//             data:{
//                 sellerId: userId,
//                 customerId: customerId,
//                 itemId,
//                 quantity,
//                 total
//             }
//         })
//         return NextResponse.json({
//             success: true,
//             message: "Order Placed Successfully",
//             order
//         },{status:200})
//     }catch(error){
//         console.log(error)
//         return NextResponse.json({
//             success: false,
//             message: "Order Can't Placed"
//         }, {status: 500})
//     }
// }

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