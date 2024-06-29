"use client";

import HeaderComponent from "@/components/Header";
import LandingConnectedComponent from "@/components/LandingConnected";
import LandingDisconnectComponent from "@/components/LandingDisconnect";
import Image from "next/image";
import { useActiveAccount } from "thirdweb/react";

export default function Home() {

 
  const account = useActiveAccount();
  console.log("wallet address", account?.address);

  return (
    <>
    <HeaderComponent />
    { (account?.address) && (
      <LandingConnectedComponent />
    )}
    { !(account?.address) && (
      <LandingDisconnectComponent />
    )}
    </>
  );
}
