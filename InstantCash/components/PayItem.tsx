"use client";

import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';

export default function PayItemComponent() {

  const router = useRouter();

  function thankYou() {
    router.push('/thank-you');
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-sm w-full text-center">
        <p className="text-center">Product&apos;s price: $180</p>
        <p className="text-center">
          Credit plan: 4 monthly payments of $45 + $1.8 (interest). Payments due dates: Jul 21th, Aug 21th, Sept 21th,
          Oct 21th.
        </p>
        <p className="text-center">Estimated total debt: $187.2</p>
        <div className="flex justify-center">
          <Button className="px-4 py-2 font-bold  rounded" onClick={thankYou}>Get credit & Pay for product</Button>
        </div>
      </div>
    </div>
  )
}