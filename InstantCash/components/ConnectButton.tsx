import { thirdwebClient } from "@/utils/thirdweb";
import { baseSepolia, defineChain } from "thirdweb/chains";

import {
  createWallet,
  walletConnect,
  inAppWallet,
} from "thirdweb/wallets";

import {
  ThirdwebProvider,
  ConnectButton,
  useWalletInfo
} from "thirdweb/react";

const walletsSetup = [
  createWallet("com.coinbase.wallet", {
    walletConfig: {
      options: "smartWalletOnly",
    },    
  }),
];

interface TitleComponentProps {
    labelButton: string;
  }

const ConnectButtonComponent: React.FC<TitleComponentProps> = ({ labelButton }) => {

    const handleDisconnect = () => {
        // Handle the disconnect event here
        console.log("Wallet disconnected");
      };  
    
    return (
        <ConnectButton
                    client={thirdwebClient}
                    wallets={walletsSetup}
                    theme={"light"}
                    connectButton={{ label: labelButton || "Connect" }}
                    connectModal={{
                      size: "compact",
                      title: "Instant Cash",
                      showThirdwebBranding: false,
                    }}
                    chain={defineChain(baseSepolia)}
                    onDisconnect={handleDisconnect}
                  />
    )
};

export default ConnectButtonComponent;