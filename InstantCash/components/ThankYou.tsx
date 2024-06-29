
import { Button } from "@/components/ui/button"

export default function ThankYouComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Thank You</h2>
        <p className="mb-4">180 USDC has been used to pay for the product.</p>
        <p className="mb-8">
          Now you will be redirected to the ecommerce&apos;s checkout page to finish the payment process.
        </p>
        <Button className="w-full">OK</Button>
      </div>
    </div>
  )
}