import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@repo/database/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = body
    const secret = process.env.RAZORPAY_KEY_SECRET as string
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      await prisma.$transaction(async(tx)=>{
        await tx.order.update({
          where:{
            razorpayOrderId: razorpay_order_id
          },
          data:{
            paymentStatus: "Success",
            razorpayPaymentId: razorpay_payment_id,
          }
        })
        const orderItems = await tx.orderItem.findMany({
          where: {
            orderId: orderId
          },
          select:{
            itemId: true,
            quantity: true,
          }
        })
        await Promise.all(
          orderItems.map((item) =>
            tx.item.update({
              where: { id: item.itemId },
              data: {
                soldCount: { increment: item.quantity },
              },
            })
          )
        )
      })
      
      // Payment is verified
      return NextResponse.json({ success: true });
    } else {
      // Verification failed
      await prisma.$transaction(async(tx)=>{
        await tx.order.updateMany({
          where:{
            razorpayOrderId: razorpay_order_id
          },
          data:{
            paymentStatus: "Failed",
            razorpayPaymentId: razorpay_payment_id
          }
        })
      })
      return NextResponse.json({ 
        success: false, 
        message: "Invalid signature" 
      });
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, message: "Server error" });
  }
}