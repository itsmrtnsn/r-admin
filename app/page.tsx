'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PrinterIcon } from 'lucide-react';

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

interface ReceiptProps {
  items: ReceiptItem[];
  subtotal: number;
  tax: number;
  total: number;
  barName: string;
  date: string;
  orderNumber: string;
}

export default function BarReceipt({
  items = [
    { name: 'Beer', quantity: 2, price: 5 },
    { name: 'Wine', quantity: 1, price: 8 },
    { name: 'Cocktail', quantity: 1, price: 10 },
  ],
  subtotal = 28,
  tax = 2.24,
  total = 30.24,
  barName = 'The Cozy Tavern',
  date = '2023-10-21',
  orderNumber = '1234',
}: ReceiptProps) {
  const [isPrinting, setIsPrinting] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      setIsPrinting(true);
      print();
      setTimeout(() => setIsPrinting(false), 1000);
    }
  };

  return (
    <>
      <Card className='w-full max-w-md mx-auto'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl font-bold'>{barName}</CardTitle>
          <p className='text-sm text-muted-foreground'>Order #{orderNumber}</p>
          <p className='text-sm text-muted-foreground'>{date}</p>
        </CardHeader>
        <CardContent ref={printRef}>
          <div className='space-y-4'>
            {items.map((item, index) => (
              <div key={index} className='flex justify-between'>
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <Separator className='my-4' />
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between'>
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className='flex justify-between font-bold'>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button onClick={handlePrint} disabled={isPrinting}>
            <PrinterIcon className='mr-2 h-4 w-4' /> Print Receipt
          </Button>
        </CardFooter>
      </Card>

      <p>Hello world</p>
    </>
  );
}
