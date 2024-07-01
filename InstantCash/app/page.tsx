"use client";

import HeaderComponent from "@/components/Header";
import LandingConnectedComponent from "@/components/LandingConnected";
import LandingDisconnectComponent from "@/components/LandingDisconnect";
import Image from "next/image";
import { Suspense } from "react";
import { useActiveAccount } from "thirdweb/react";

export default function Home() {

 
  const account = useActiveAccount();
  console.log("wallet address", account?.address);

  return (
    <>
     <Suspense fallback={<div>Loading...</div>}>
     <HeaderComponent />
      { (account?.address) && (
        <LandingConnectedComponent />
      )}
      { !(account?.address) && (
        <LandingDisconnectComponent />
      )}
     </Suspense>
    </>
  );
}
