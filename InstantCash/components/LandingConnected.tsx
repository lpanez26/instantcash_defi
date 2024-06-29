import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';

import { createThirdwebClient, getContract, resolveMethod, ThirdwebContract } from "thirdweb";
import { ConnectButton, ThirdwebProvider, TransactionButton } from "thirdweb/react";
import { prepareContractCall } from "thirdweb"
import { defineChain } from "thirdweb/chains";

export const client = createThirdwebClient({ 
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "", 
});

export const contract = getContract({ 
  client, 
  chain: defineChain(84532), 
  address: "0xc6B1cBbA50CaA1800A812156328Bb8D3BaC6f545"
});

export default function LandingConnectedComponent() {

  const router = useRouter();

  function deposit() {
    console.log('Deposit Collateral clicked');
    router.push('/pay');
  }

  const handleSuccess = (receipt: any) => {
    console.log('Transaction confirmed', receipt);
    console.log('Deposit Collateral clicked');
    router.push('/pay');
  }  

  const transaction = prepareContractCall({ 
    contract, 
    method: "function createPaymentLink(uint256 amount, string title, string guid)", 
    params: [BigInt(10), "", ""]

  }); 

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-center text-lg font-bold mb-4">Product&apos;s price: $180</h2>
        <p className="mb-4">
          For a $180 credit, you need $360 of Collateral. From your Coinbase.com account you can use 0.1 ETH as
          collateral.
        </p>
        <p className="mb-4">Credit plan: 4 monthly payments of $45 + $1.8 (interest)</p>
        {/* <Button className="w-full px-4 py-2 rounded-md" onClick={deposit}>Deposit Collateral</Button> */}

        <TransactionButton 
          transaction={() => transaction}
          onTransactionConfirmed={handleSuccess}   
          unstyled
        >
          Create
        </TransactionButton>

      </div>
    </div>
  )
}