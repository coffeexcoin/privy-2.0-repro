"use client";
import { ConnectedWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { toHex } from "viem";

export default function Home() {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();

  const executeFeeEstimation = async (wallet: ConnectedWallet) => {
    if (!wallet) return;

    const provider = await wallet.getEthereumProvider();

    const transactionCount = await provider.request({
      method: "eth_getTransactionCount",
      params: [wallets[0].address, "latest"],
    });

    console.log(transactionCount);

    const gas = await provider.request({
      method: "eth_estimateGas",
      params: [
        {
          from: wallet.address,
          to: wallet.address,
          nonce: toHex(transactionCount),
        },
      ],
    });

    return gas;
  };

  return (
    <>
      {ready ? (
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
          {authenticated ? (
            <button
              className="border-2 p-2 cursor-pointer text-2xl font-bold"
              onClick={() => logout()}
            >
              Log Out
            </button>
          ) : (
            <button
              className="border-2 p-2 cursor-pointer text-2xl font-bold"
              onClick={() => login()}
            >
              Login
            </button>
          )}
          <div className="flex flex-col items-center justify-center gap-1">
            <p>Wallets</p>
            {(wallets ?? []).map((wallet) => (
              <div key={wallet.address}>{wallet.address}</div>
            ))}
          </div>
          {wallets[0] !== undefined && (
            <button
              className="border-2 p-2 cursor-pointer text-2xl font-bold"
              onClick={async () => {
                const gas = await executeFeeEstimation(wallets[0]);

                console.log(gas);
              }}
            >
              Execute Fee Estimation
            </button>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
