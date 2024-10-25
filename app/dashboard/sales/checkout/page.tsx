'use client';

import { useState } from 'react';

import CurrentPath from '@/components/curren-path';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import UserAvatar from '@/components/user-avatar';
import CheckOutForm from './check-out-form';
import SaleItems from './sale-item';

const customers = [
  { id: 1, name: 'Olivia Rothschild' },
  { id: 2, name: 'Ethan Blackwood' },
  { id: 3, name: 'Sophia Vanderbilt' },
];

const products = [
  {
    id: 1,
    name: 'Exquisite Diamond Necklace',
    price: 25000,
    quantity: 1,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 2,
    name: 'Limited Edition Watch',
    price: 15000,
    quantity: 1,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    id: 3,
    name: 'Bespoke Leather Handbag',
    price: 8000,
    quantity: 1,
    image: '/placeholder.svg?height=100&width=100',
  },
];

export default function Component() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [open, setOpen] = useState(false);
  const [emailReceipt, setEmailReceipt] = useState(true);
  const [isVIP, setIsVIP] = useState(false);

  const handleNewCustomer = () => {
    console.log('New customer created:', newCustomerName);
    setNewCustomerName('');
    setIsNewCustomerModalOpen(false);
  };

  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const tax = subtotal * 0.08; // Assuming 8% luxury tax
  const giftWrapFee = isGiftWrap ? 50 : 0;
  const vipDiscount = isVIP ? subtotal * 0.05 : 0;
  const total = subtotal + tax + giftWrapFee - vipDiscount;

  return (
    <div className='grid grid-cols-[1fr_auto] gap-4 overflow-hidden rounded-lg p-4'>
      <Card className=' border-[0.1px] shadow-none rounded-xl'>
        <CardContent>
          <div className='mt-4 mb-8 flex items-center justify-between'>
            <CurrentPath />
            <UserAvatar fallback={'mo'} />
          </div>
          <div className=''>
            <CheckOutForm />
          </div>
        </CardContent>
      </Card>
      <div className='w-[22rem] border-[0.1px] rounded-xl p-4 flex flex-col'>
        <div className='flex-1 p-2 '>
          <h3 className='text-2xl  font-semibold text-primary mb-6'>
            Articles de vente
          </h3>
          <SaleItems />
        </div>
        <div className='bg-gray-50 p-4 rounded-xl'>
          <div className='mt-6 space-y-4'>
            <div className='flex justify-between text-sm'>
              <span className=''>Subtotal</span>
              <span className='font-medium text-gray-800'>
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <div className='flex justify-between text-sm text-green-500 font-medium'>
              <span className=''>Rabais</span>
              <span>${tax.toLocaleString()}</span>
            </div>
            <div className='flex justify-between text-sm font-medium'>
              <span className=''>TCA</span>
              <span>${tax.toLocaleString()}</span>
            </div>
            <Separator className='border-gray-200' />
            <div className='flex justify-between text-lg font-bold'>
              <span className='text-gray-800'>Total</span>
              <span className='text-gray-800'>${total.toLocaleString()}</span>
            </div>
          </div>
          <Button
            className='w-full mt-8 bg-primary rounded-full font-normal hover:bg-blue-700 transition-colors ease-linear duration-300 text-white'
            size='lg'
          >
            Complete Purchase
          </Button>
        </div>
      </div>
    </div>
  );
}

// <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4'>
//   <div className='bg-white rounded-lg shadow-xl w-full max-w-6xl overflow-hidden'>
//     <div className='flex flex-col lg:flex-row'>
//       <div className='lg:w-3/5 p-8 bg-white'>
//         <div className='flex items-center justify-between mb-8'>
//           <h2 className='text-3xl font-serif font-bold text-blue-600'>
//             Luxury Checkout
//           </h2>
//           <div className='w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center'>
//             <span className='text-2xl font-serif font-bold text-white'>LX</span>
//           </div>
//         </div>
//         <div className='space-y-6'>
//           <div>
//             <Label
//               htmlFor='paymentMethod'
//               className='text-sm font-medium text-gray-700 mb-1 block'
//             >
//               Payment Method
//             </Label>
//             <Select
//               onValueChange={setPaymentMethod}
//               defaultValue={paymentMethod}
//             >
//               <SelectTrigger
//                 id='paymentMethod'
//                 className='w-full border-gray-200 text-gray-800'
//               >
//                 <SelectValue placeholder='Select payment method' />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value='card'>
//                   <span className='flex items-center'>
//                     <CreditCard className='mr-2 h-4 w-4 text-blue-500' />
//                     Card
//                   </span>
//                 </SelectItem>
//                 <SelectItem value='cash'>
//                   <span className='flex items-center'>
//                     <DollarSign className='mr-2 h-4 w-4 text-blue-500' />
//                     Cash
//                   </span>
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div>
//             <Label
//               htmlFor='customer'
//               className='text-sm font-medium text-gray-700 mb-1 block'
//             >
//               Customer
//             </Label>
//             <div className='flex space-x-2'>
//               <Popover open={open} onOpenChange={setOpen}>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant='outline'
//                     role='combobox'
//                     aria-expanded={open}
//                     className='w-full justify-between border-gray-200 text-gray-800'
//                   >
//                     {selectedCustomer
//                       ? customers.find(
//                           (customer) => customer.id === selectedCustomer
//                         )?.name
//                       : 'Select customer...'}
//                     <ChevronDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className='w-[200px] p-0'>
//                   <Command>
//                     <CommandInput placeholder='Search customer...' />
//                     <CommandEmpty>No customer found.</CommandEmpty>
//                     <CommandGroup>
//                       {customers.map((customer) => (
//                         <CommandItem
//                           key={customer.id}
//                           onSelect={() => {
//                             setSelectedCustomer(
//                               customer.id === selectedCustomer
//                                 ? null
//                                 : customer.id
//                             );
//                             setOpen(false);
//                           }}
//                         >
//                           <Star className='mr-2 h-4 w-4 text-blue-500' />
//                           {customer.name}
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </Command>
//                 </PopoverContent>
//               </Popover>
//               <Dialog
//                 open={isNewCustomerModalOpen}
//                 onOpenChange={setIsNewCustomerModalOpen}
//               >
//                 <DialogTrigger asChild>
//                   <Button
//                     variant='outline'
//                     size='icon'
//                     className='border-gray-200 text-gray-800'
//                   >
//                     <Plus className='h-4 w-4' />
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Add New Customer</DialogTitle>
//                   </DialogHeader>
//                   <div className='grid gap-4 py-4'>
//                     <div className='grid grid-cols-4 items-center gap-4'>
//                       <Label htmlFor='name' className='text-right'>
//                         Name
//                       </Label>
//                       <Input
//                         id='name'
//                         value={newCustomerName}
//                         onChange={(e) => setNewCustomerName(e.target.value)}
//                         className='col-span-3'
//                       />
//                     </div>
//                   </div>
//                   <div className='flex justify-end'>
//                     <Button
//                       onClick={handleNewCustomer}
//                       className='bg-blue-600 hover:bg-blue-700 text-white'
//                     >
//                       Add Customer
//                     </Button>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//           <div className='flex items-center space-x-2'>
//             <Switch
//               id='email-receipt'
//               checked={emailReceipt}
//               onCheckedChange={setEmailReceipt}
//             />
//             <Label
//               htmlFor='email-receipt'
//               className='text-sm font-medium text-gray-700'
//             >
//               Email Receipt
//             </Label>
//           </div>
//           {emailReceipt && (
//             <div>
//               <Label
//                 htmlFor='email'
//                 className='text-sm font-medium text-gray-700 mb-1 block'
//               >
//                 Email Address
//               </Label>
//               <Input
//                 id='email'
//                 type='email'
//                 placeholder='Enter email address'
//                 className='w-full border-gray-200 text-gray-800 placeholder-gray-400'
//               />
//             </div>
//           )}
//           <div className='flex items-center space-x-2'>
//             <Switch
//               id='gift-wrap'
//               checked={isGiftWrap}
//               onCheckedChange={setIsGiftWrap}
//             />
//             <Label
//               htmlFor='gift-wrap'
//               className='text-sm font-medium text-gray-700'
//             >
//               Luxury Gift Wrapping ($50)
//             </Label>
//           </div>
//           <div className='flex items-center space-x-2'>
//             <Switch
//               id='vip-membership'
//               checked={isVIP}
//               onCheckedChange={setIsVIP}
//             />
//             <Label
//               htmlFor='vip-membership'
//               className='text-sm font-medium text-gray-700'
//             >
//               Apply VIP Membership (5% discount)
//             </Label>
//           </div>
//           <div>
//             <Label
//               htmlFor='special-requests'
//               className='text-sm font-medium text-gray-700 mb-1 block'
//             >
//               Special Requests or Notes
//             </Label>
//             <Textarea
//               id='special-requests'
//               placeholder='Enter any special requests or notes for your order'
//               className='w-full border-gray-200 text-gray-800 placeholder-gray-400'
//             />
//           </div>
//         </div>
//       </div>
//       <div className='lg:w-2/5 p-8 bg-gray-50'>
//         <h3 className='text-2xl font-serif font-semibold mb-4 text-blue-600'>
//           Order Summary
//         </h3>
//         <ScrollArea className='h-[300px] rounded-md border border-gray-200'>
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className='flex justify-between items-center p-4 border-b border-gray-200 last:border-b-0'
//             >
//               <div className='flex items-center space-x-4'>
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className='w-16 h-16 object-cover rounded'
//                 />
//                 <div className='flex flex-col'>
//                   <span className='font-medium text-gray-800'>
//                     {product.name}
//                   </span>
//                   <span className='text-sm '>
//                     Quantity: {product.quantity}
//                   </span>
//                 </div>
//               </div>
//               <span className='text-lg font-semibold text-gray-800'>
//                 ${product.price.toLocaleString()}
//               </span>
//             </div>
//           ))}
//         </ScrollArea>
//         <div className='mt-6 space-y-4'>
//           <div className='flex justify-between text-sm'>
//             <span className=''>Subtotal</span>
//             <span className='font-medium text-gray-800'>
//               ${subtotal.toLocaleString()}
//             </span>
//           </div>
//           <div className='flex justify-between text-sm'>
//             <span className='text-gray-600'>Luxury Tax (8%)</span>
//             <span className='font-medium text-gray-800'>
//               ${tax.toLocaleString()}
//             </span>
//           </div>
//           {isGiftWrap && (
//             <div className='flex justify-between text-sm'>
//               <span className='text-gray-600'>Gift Wrapping</span>
//               <span className='font-medium text-gray-800'>$50</span>
//             </div>
//           )}
//           {isVIP && (
//             <div className='flex justify-between text-sm text-green-600'>
//               <span>VIP Discount (5%)</span>
//               <span className='font-medium'>
//                 -${vipDiscount.toLocaleString()}
//               </span>
//             </div>
//           )}
//           <Separator className='border-gray-200' />
//           <div className='flex justify-between text-lg font-bold'>
//             <span className='text-gray-800'>Total</span>
//             <span className='text-gray-800'>${total.toLocaleString()}</span>
//           </div>
//         </div>
//         <Button
//           className='w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white'
//           size='lg'
//         >
//           Complete Purchase
//         </Button>
//         <div className='mt-4 text-center text-sm text-gray-600 flex items-center justify-center'>
//           <Package className='mr-2 h-5 w-5' />
//           Free shipping on all orders over $10,000
//         </div>
//       </div>
//     </div>
//   </div>
// </div>;
