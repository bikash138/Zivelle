import Razorpay = require("razorpay");

// Use env vars from parent app
export const razorpayInstance = () =>
  new Razorpay({
    key_id: '',
    key_secret: '',
  });


