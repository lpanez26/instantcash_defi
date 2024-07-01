import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from 'next/navigation';

import { useAppContext } from "@/context/GlobalContext";

export default function LandingConnectedComponent() {

  const {  setAccountAddress, setPaymentAmount, setPaymentCollateral , setInterestAmount} = useAppContext();
  const router = useRouter();

  const searchParams = useSearchParams();
  const [address, setAddress] = useState(searchParams.get('address')||"");   
  const [amount, setAmount] = useState(searchParams.get('amount')||"");

  var totalAmount = Number(amount);
  var collateralAmount = totalAmount * 2;
  var insterestString = process.env.NEXT_PUBLIC_INTEREST_RATE || "0";
  var interest = totalAmount * (parseInt(insterestString) / 100);

  setAccountAddress(address);
  setPaymentAmount(totalAmount);
  setPaymentCollateral(collateralAmount);

  function deposit() {
    console.log('Deposit Collateral clicked');
    router.push('/pay');
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-center text-lg font-bold mb-4">Product&apos;s price: ${ totalAmount }</h2>
        <h4 className="text-center text-lg font-bold mb-4">Store Address: { address.substring(0,5) + '....' + address.substring(address.length-5, address.length) }</h4>
        <p className="mb-4">
          For a ${ totalAmount } credit, you need ${ collateralAmount } of Collateral. From your Coinbase.com account you can use 0.1 ETH as
          collateral.
        </p>
        <p className="mb-4">Credit plan: 4 monthly payments of ${ totalAmount/4 } + ${ interest } (interest)</p>
        <Button className="w-full px-4 py-2 rounded-md" onClick={deposit}>Deposit Collateral</Button>
      </div>
    </div>
  )
}