import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@repo/database/prisma";

type Item = {
  id: string;
  adminId: string;
  quantity: number;
  price: number;
  selectedSize: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, items } = body
    const secret = process.env.RAZORPAY_KEY_SECRET as string
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      await prisma.order.update({
        where:{
          razorpayOrderId: razorpay_order_id
        },
        data:{
          paymentStatus: "Success",
          razorpayPaymentId: razorpay_payment_id,
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
      // Payment is verified
      return NextResponse.json({ success: true });
    } else {
      // Verification failed
      await prisma.order.updateMany({
        where:{
          razorpayOrderId: razorpay_order_id
        },
        data:{
          paymentStatus: "Failed",
          razorpayPaymentId: razorpay_payment_id
        }
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