
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
}

export declare class Razorpay {
  constructor(options: RazorpayOptions);
  open(): void;
}

export type RazorpayPaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};