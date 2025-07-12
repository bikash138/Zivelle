import Razorpay = require("razorpay");

// Use env vars from parent app
export const razorpayInstance = () =>
  new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

// async function createOrder(amount, currency = "INR", receipt = "receipt#1") {
//   const instance = getRazorpayInstance();
//   return instance.orders.create({
//     amount: amount * 100, 
//     currency,
//     receipt,
//   });
// }

// function verifySignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
//   const sign = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(razorpay_order_id + "|" + razorpay_payment_id)
//     .digest("hex");
//   return sign === razorpay_signature;
// }


