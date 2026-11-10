/** Lightweight chain defs — no viem dependency */
export const SUPPORTED_CHAINS = [
  { id: 1, name: "Ethereum" },
  { id: 137, name: "Polygon" },
  { id: 8453, name: "Base" },
  { id: 42161, name: "Arbitrum" },
  { id: 10, name: "Optimism" },
  { id: 56, name: "BNB Chain" },
  { id: 43114, name: "Avalanche" },
];

export const DEFAULT_CHAIN_ID = 1;

export const SUPPORTED_CHAIN_IDS = SUPPORTED_CHAINS.map((c) => c.id);

export const CHAIN_META = {
  1: { name: "Ethereum", explorer: "https://etherscan.io", symbol: "ETH" },
  137: { name: "Polygon", explorer: "https://polygonscan.com", symbol: "MATIC" },
  8453: { name: "Base", explorer: "https://basescan.org", symbol: "ETH" },
  42161: { name: "Arbitrum", explorer: "https://arbiscan.io", symbol: "ETH" },
  10: { name: "Optimism", explorer: "https://optimistic.etherscan.io", symbol: "ETH" },
  56: { name: "BNB Chain", explorer: "https://bscscan.com", symbol: "BNB" },
  43114: { name: "Avalanche", explorer: "https://snowtrace.io", symbol: "AVAX" },
};

export const USER_ROLES = [
  "GUEST",
  "INVESTOR",
  "PROPERTY_OWNER",
  "BROKER",
  "AGENCY",
  "ADMIN",
  "COMPLIANCE_OFFICER",
];

