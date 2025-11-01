'use client'
import ConfirmPayment from '@/components/core/ConfirmPayment';
import ConfirmPaymentPageLoader from '@/components/Loaders/ConfirmPaymentPageLoader';
import { resetCart } from '@/redux/slices/cartSlice';
import { RazorpayPaymentResponse } from '@/types/razorpay';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useSWR from 'swr'
//@ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())

function App() {
  const params = useSearchParams()
  const router = useRouter();
  const dispatch = useDispatch()
  const orderId = params.get('orderId');
  const [isProcessing, setIsProcessing] = useState(false)
  const { data, error, isLoading } = useSWR(orderId ? `/api/user/orders/${orderId}` : null, fetcher)
  if(error) return <div>"Something went wrong"</div>
  if(!data) return <ConfirmPaymentPageLoader/>
  if(isLoading) return <ConfirmPaymentPageLoader/>

  const OrderSummary = {
    subtotal: data?.reservedOrderDetails.total
  }

  const handleConfirmPayment = async () => {
    const totalAmount = data.reservedOrderDetails.total
    try{
      const response = await axios.post('/api/user/orders', {
        totalAmount: totalAmount,
        orderId: orderId
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const data = response.data;
      if (data.success) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_WYcFPIFUgHXrUC',
          amount: data.data.amount,
          currency: data.data.currency,
          order_id: data.data.id,
          handler: function (response:RazorpayPaymentResponse ) {
            (async () => {
              try {
                const verifyRes = await axios.post('/api/verify-payment', {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }, {
                  headers: { 'Content-Type': 'application/json' }
                });
                const verifyData = verifyRes.data;
                if (verifyData.success) {
                  dispatch(resetCart())
                  alert("Payment successful and verified!");
                  router.push('/')
                } else {
                  alert("Payment verification failed!");
                }
              } catch (error) {
                console.log(error)
                alert("Payment verification failed!");
              }
            })();
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
        } else {
        console.log("Payment can't be done")
        }
    }catch(error){
      console.error(error);
    } finally{
      setIsProcessing(false)
    }
  }

  return (
    <ConfirmPayment
      products={data?.reservedOrderDetails.items}
      deliveryAddress={data?.reservedOrderDetails.deliveryAddress}
      orderSummary={OrderSummary}
      isProcessing={isProcessing}
      onConfirmPayment={handleConfirmPayment}
    />
  );
}

export default App;
