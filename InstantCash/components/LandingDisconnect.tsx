import { Button } from "@/components/ui/button"
import ConnectButtonComponent from "./ConnectButton"

export default function LandingDisconnectComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-sm w-full text-center">
        <h1 className="text-xl font-bold">Welcome to CrediFI</h1>
        <p className="text-lg">Product&apos;s price: $180</p>
        <ConnectButtonComponent labelButton="Connect using Coinbase.com account" />
      </div>
    </div>
  )
}