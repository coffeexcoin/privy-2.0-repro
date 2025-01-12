'use client'
import { PrivyProvider } from "@privy-io/react-auth"
import { abstractTestnet } from "viem/chains"

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
            config={{
                defaultChain: abstractTestnet,
                supportedChains: [abstractTestnet],
                embeddedWallets: {
                    createOnLogin: "users-without-wallets"
                }
            }}
        >
            {children}
        </PrivyProvider>
    )
}