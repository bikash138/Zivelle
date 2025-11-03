'use client'
import ConfirmPayment from '@/components/core/ConfirmPayment';
import ConfirmPaymentPageLoader from '@/components/Loaders/ConfirmPaymentPageLoader';
import { resetCart } from '@/redux/slices/cartSlice';
import { Razorpay, RazorpayPaymentResponse } from '@/types/razorpay';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import useSWR from 'swr'
const fetcher = (url: string) => fetch(url).then(res => res.json());

declare global {
  interface Window {
    Razorpay: typeof Razorpay;
  }
}

function ConfirmOrder() {
  const params = useSearchParams()
  const router = useRouter();
  const dispatch = useDispatch()
  const orderId = params.get('orderId');
  const [isProcessing, setIsProcessing] = useState(false)
  const { data, error, isLoading } = useSWR(orderId ? `/api/user/orders/${orderId}` : null, fetcher)

  if(error) return <div><p>Something went wrong</p></div>
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
                  orderId
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

  const handleCancelPayment = async () => {
    try{
      const response = await axios.post('/api/user/restore-stock', {orderId})
      if(response.data?.success){
        router.push('/cart')
      }
      else{
        toast.error('Order cannot be Cancelled')
      }
    }catch(error){
      console.log('Somethig went wrong while cancelling order', error)
    }
  }

  return (
    <ConfirmPayment
      products={data?.reservedOrderDetails.items}
      deliveryAddress={data?.reservedOrderDetails.deliveryAddress}
      orderSummary={OrderSummary}
      isProcessing={isProcessing}
      onConfirmPayment={handleConfirmPayment}
      onCancelPayment={handleCancelPayment}
    />
  );
}

export default ConfirmOrder;
