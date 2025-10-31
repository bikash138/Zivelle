'use client'
import ConfirmPayment from '@/components/core/ConfirmPayment';

function App() {
  const sampleProducts = [
    {
      id: '1',
      name: 'Cu Tshirt',
      brand: 'Zivelle',
      image: 'https://images.pexels.com/photos/1042143/pexels-photo-1042143.jpeg?auto=compress&cs=tinysrgb&w=400',
      size: 'M',
      price: 999.00,
      quantity: 1,
    },
    {
      id: '2',
      name: 'Classic Denim Jacket',
      brand: 'Urban Wear',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400',
      size: 'L',
      price: 2499.00,
      quantity: 1,
    },
  ];

  const sampleAddress = {
    name: 'John Doe',
    phone: '+91 98765 43210',
    addressLine1: '123, MG Road, Brigade Gateway',
    addressLine2: 'Near Metro Station',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
  };

  const sampleOrderSummary = {
    subtotal: 3498.00,
    tax: 279.84,
    shipping: 0,
    total: 3777.84,
  };

  const handleConfirmPayment = () => {
    alert('Payment confirmed! Order will be processed.');
  };

  return (
    <ConfirmPayment
      products={sampleProducts}
      deliveryAddress={sampleAddress}
      orderSummary={sampleOrderSummary}
      onConfirmPayment={handleConfirmPayment}
    />
  );
}

export default App;
