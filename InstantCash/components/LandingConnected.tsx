import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';

export default function LandingConnectedComponent() {

  const router = useRouter();

  function deposit() {
    console.log('Deposit Collateral clicked');
    router.push('/pay');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-center text-lg font-bold mb-4">Product&apos;s price: $180</h2>
        <p className="mb-4">
          For a $180 credit, you need $360 of Collateral. From your Coinbase.com account you can use 0.1 ETH as
          collateral.
        </p>
        <p className="mb-4">Credit plan: 4 monthly payments of $45 + $1.8 (interest)</p>
        <Button className="w-full px-4 py-2 rounded-md" onClick={deposit}>Deposit Collateral</Button>
      </div>
    </div>
  )
}