import { useAccount, useNetwork } from "../web3/WalletProvider";
import { useWalletSession } from "../components/providers/WalletSessionProvider";
import { SUPPORTED_CHAIN_IDS } from "../config/chains";

/** True when wallet is connected on a supported chain. */
export function useWalletReady() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { signedOut } = useWalletSession();
  const onSupportedChain = SUPPORTED_CHAIN_IDS.includes(chain?.id);
  return !signedOut && Boolean(isConnected && address && onSupportedChain);
}
