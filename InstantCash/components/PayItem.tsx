"use client";

import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';

import { useAppContext } from "@/context/GlobalContext";

export default function PayItemComponent() {

  const { accountAddress, paymentAmount, paymentCollateral } = useAppContext();
  const router = useRouter();

  var insterestString = process.env.NEXT_PUBLIC_INTEREST_RATE || "0";
  var interest = paymentAmount * (parseInt(insterestString) / 100);

  console.log('accountAddress', accountAddress);
  console.log('paymentAmount', paymentAmount);
  console.log('paymentCollateral', paymentCollateral);

  function thankYou() {
    router.push('/thank-you');
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-sm w-full text-center">
        <p className="text-center">Product&apos;s price: ${ paymentAmount }</p>
        <p className="text-center">
        Credit plan: 4 monthly payments of ${ paymentAmount/4 } + ${ interest } (interest). Payments due dates: Jul 21th, Aug 21th, Sept 21th,
          Oct 21th.
        </p>
        <p className="text-center">Estimated total debt: ${ paymentAmount + interest }</p>
        <div className="flex justify-center">
          <Button className="px-4 py-2 font-bold  rounded" onClick={thankYou}>Get credit & Pay for product</Button>
        </div>
      </div>
    </div>
  )
}