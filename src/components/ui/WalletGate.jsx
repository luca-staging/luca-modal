import React from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "./GlassCard";
import PageShell from "./PageShell";

export default function WalletGate({
  title = "Wallet required",
  subtitle = "Please connect a supported wallet to continue.",
  helmetTitle = "Connect Wallet — RestateFi",
}) {
  const navigate = useNavigate();

  return (
    <PageShell title={title} subtitle={subtitle} helmetTitle={helmetTitle}>
      <GlassCard className="restatefi-empty-state p-5 text-center restatefi-animate-in">
        <p className="restatefi-empty-state__message">
          A connected wallet is required to review account data and complete transactions.
        </p>
        <button type="button" className="restatefi-btn restatefi-btn--primary" onClick={() => navigate("/")}>
          Connect Wallet
        </button>
      </GlassCard>
    </PageShell>
  );
}
