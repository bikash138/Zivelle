import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body
    const secret = process.env.RAZORPAY_KEY_SECRET as string
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // Payment is verified
      return NextResponse.json({ success: true });
    } else {
      // Verification failed
      return NextResponse.json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" });
  }
}