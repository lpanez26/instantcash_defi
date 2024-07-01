"use client";

import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context/GlobalContext";

export default function ThankYouComponent() {

  const { accountAddress, paymentAmount, paymentCollateral } = useAppContext();

   return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Thank You</h2>
        <p className="mb-4">${paymentCollateral} USDC has been used to pay for the product.</p>
        <p className="mb-8">
          Now you will be redirected to the ecommerce&apos;s checkout page to finish the payment process.
        </p>
        <Button className="w-full">OK</Button>
      </div>
    </div>
  )
}