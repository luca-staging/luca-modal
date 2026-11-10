import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CHAIN_META, DEFAULT_CHAIN_ID, SUPPORTED_CHAINS } from "../config/chains";

const WalletContext = createContext(null);

const hexToNumber = (hex) => parseInt(hex, 16);

async function readAccount(provider) {
  const accounts = await provider.request({ method: "eth_accounts" });
  return accounts?.[0] || null;
}

async function readChainId(provider) {
  const chainId = await provider.request({ method: "eth_chainId" });
  return hexToNumber(chainId);
}

export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const provider = typeof window !== "undefined" ? window.ethereum : null;

  const refresh = useCallback(async () => {
    if (!provider) {
      setAddress(null);
      setChainId(null);
      return;
    }
    try {
      const [acct, id] = await Promise.all([readAccount(provider), readChainId(provider)]);
      setAddress(acct);
      setChainId(id);
    } catch {
      setAddress(null);
    }
  }, [provider]);

  useEffect(() => {
    refresh();
    if (!provider?.on) return undefined;
    const onAccounts = (accounts) => setAddress(accounts?.[0] || null);
    const onChain = (id) => setChainId(hexToNumber(id));
    provider.on("accountsChanged", onAccounts);
    provider.on("chainChanged", onChain);
    return () => {
      provider.removeListener?.("accountsChanged", onAccounts);
      provider.removeListener?.("chainChanged", onChain);
    };
  }, [provider, refresh]);

  const connect = useCallback(async () => {
    if (!provider) {
      window.open("https://metamask.io/download/", "_blank", "noopener,noreferrer");
      return;
    }
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    setAddress(accounts?.[0] || null);
    setChainId(await readChainId(provider));
    setModalOpen(false);
  }, [provider]);

  const disconnect = useCallback(() => {
    setAddress(null);
    setModalOpen(false);
  }, []);

  const switchNetwork = useCallback(
    async (targetId) => {
      if (!provider) return;
      const hex = `0x${Number(targetId).toString(16)}`;
      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: hex }],
        });
      } catch (err) {
        if (err?.code === 4902) {
          const meta = CHAIN_META[targetId];
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: hex,
                chainName: meta?.name || `Chain ${targetId}`,
                nativeCurrency: {
                  name: meta?.symbol || "ETH",
                  symbol: meta?.symbol || "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://cloudflare-eth.com"],
                blockExplorerUrls: meta?.explorer ? [meta.explorer] : [],
              },
            ],
          });
        } else {
          throw err;
        }
      }
      setChainId(Number(targetId));
    },
    [provider]
  );

  const open = useCallback(async (opts) => {
    if (opts?.view === "Account" || address) {
      setModalOpen(true);
      return;
    }
    await connect();
  }, [address, connect]);

  const value = useMemo(
    () => ({
      address,
      isConnected: Boolean(address),
      chainId,
      chain: chainId
        ? { id: chainId, name: CHAIN_META[chainId]?.name || `Chain ${chainId}` }
        : undefined,
      connect,
      disconnect,
      switchNetwork,
      open,
      close: () => setModalOpen(false),
      modalOpen,
      hasProvider: Boolean(provider),
    }),
    [address, chainId, connect, disconnect, switchNetwork, open, modalOpen, provider]
  );

  return (
    <WalletContext.Provider value={value}>
      {children}
      {modalOpen && (
        <div className="rf-wallet-modal" role="dialog" aria-modal="true">
          <button
            type="button"
            className="rf-wallet-modal__backdrop"
            aria-label="Close"
            onClick={() => setModalOpen(false)}
          />
          <div className="rf-wallet-modal__panel">
            <h3>Wallet</h3>
            {address ? (
              <>
                <p className="rf-wallet-modal__addr">
                  {address.slice(0, 8)}…{address.slice(-6)}
                </p>
                <label className="rf-wallet-modal__label" htmlFor="rf-chain">
                  Network
                </label>
                <select
                  id="rf-chain"
                  className="form-select"
                  value={chainId ?? DEFAULT_CHAIN_ID}
                  onChange={(e) => switchNetwork(Number(e.target.value))}
                >
                  {SUPPORTED_CHAINS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <button type="button" className="restatefi-btn restatefi-btn--outline w-100 mt-3" onClick={disconnect}>
                  Disconnect
                </button>
              </>
            ) : (
              <>
                <p>Connect an injected browser wallet (MetaMask, Rabby, etc.).</p>
                <button type="button" className="restatefi-btn restatefi-btn--primary w-100" onClick={connect}>
                  {provider ? "Connect wallet" : "Install MetaMask"}
                </button>
              </>
            )}
            <button type="button" className="rf-wallet-modal__close" onClick={() => setModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </WalletContext.Provider>
  );
}

function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet requires WalletProvider");
  return ctx;
}

/** wagmi-compatible hooks */
export function useAccount() {
  const { address, isConnected } = useWallet();
  return { address, isConnected };
}

export function useNetwork() {
  const { chain } = useWallet();
  return { chain };
}

export function useSwitchNetwork() {
  const { switchNetwork } = useWallet();
  return { switchNetwork, switchNetworkAsync: switchNetwork };
}

export function useDisconnect() {
  const { disconnect } = useWallet();
  return { disconnect };
}

export function useWeb3Modal() {
  const { open, close } = useWallet();
  return { open, close };
}

export { useWallet };
