import React from "react";
import { Row, Col } from "../components/ui/bootstrap";
import AreaChart from "../components/ui/AreaChart";
import { useAccount } from "../web3/WalletProvider";
import PageShell from "../components/ui/PageShell";
import WalletGate from "../components/ui/WalletGate";
import StatCard from "../components/ui/StatCard";
import GlassCard from "../components/ui/GlassCard";
import Badge from "../components/ui/Badge";
import { useDashboard } from "../hooks/useMarketplace";
import { formatPercent, formatUsd } from "../utils/format";

function relativeTime(iso) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

function txBadgeVariant(type) {
  if (type === "RENTAL_DISTRIBUTION") return "success";
  if (type === "SALE") return "warning";
  if (type === "PURCHASE") return "info";
  return "default";
}

function txLabel(type) {
  return String(type || "")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const { data, isLoading } = useDashboard(address);

  if (!isConnected) {
    return (
      <WalletGate
        title="Portfolio"
        subtitle="Connect your wallet to review holdings, rental receipts, and performance."
        helmetTitle="Portfolio — RestateFi"
      />
    );
  }

  const chartData =
    data?.performance?.map((p, i) => ({
      name: String(p.title || `Asset ${i + 1}`).slice(0, 14),
      value: Number(p.investedUsd || 0),
    })) ?? [];

  return (
    <PageShell
      title="Portfolio"
      subtitle="Holdings, rental receipts, and performance summary"
      helmetTitle="Portfolio — RestateFi"
    >
      {data?.isSampleData && (
        <div className="restatefi-demo-banner mb-4 restatefi-animate-in">
          Showing sample portfolio activity for demo. Connect after KYC to record your own
          investments.
        </div>
      )}

      {isLoading ? (
        <div className="restatefi-loading">Loading dashboard...</div>
      ) : (
        <>
          <Row className="g-3 mt-2">
            <Col md={4}>
              <StatCard
                className="restatefi-animate-in"
                label="Total Portfolio Value"
                value={formatUsd(data?.portfolioValueUsd)}
              />
            </Col>
            <Col md={4}>
              <StatCard
                className="restatefi-animate-in"
                label="Owned Properties"
                value={String(data?.ownedProperties ?? 0)}
              />
            </Col>
            <Col md={4}>
              <StatCard
                className="restatefi-animate-in"
                label="Fractional Investments"
                value={String(data?.fractionalInvestments ?? 0)}
              />
            </Col>
            <Col md={4}>
              <StatCard
                className="restatefi-animate-in"
                label="Rental Income"
                value={formatUsd(data?.rentalIncomeUsd)}
                hint="On-chain distributions"
              />
            </Col>
            <Col md={4}>
              <StatCard
                className="restatefi-animate-in"
                label="Portfolio ROI"
                value={formatPercent(data?.roiPercent)}
                accent
              />
            </Col>
            <Col md={4}>
              <StatCard
                className="restatefi-animate-in"
                label="Token Holdings"
                value={data?.tokenHoldings ?? "0"}
              />
            </Col>
          </Row>

          <Row className="g-4 mt-2">
            <Col lg={6}>
              <GlassCard className="p-4 restatefi-animate-in">
                <h3 className="restatefi-sidebar-heading">Investment Performance</h3>
                <div className="restatefi-chart-wrap">
                  {chartData.length > 0 ? (
                    <AreaChart data={chartData} height={240} />
                  ) : (
                    <div className="restatefi-empty py-4">No holdings recorded.</div>
                  )}
                </div>
              </GlassCard>
            </Col>
            <Col lg={6}>
              <GlassCard className="p-4 restatefi-animate-in">
                <h3 className="restatefi-sidebar-heading">Recent Activity</h3>
                {(data?.recentTransactions ?? []).length === 0 ? (
                  <div className="restatefi-empty py-4">No recent activity recorded.</div>
                ) : (
                  <div className="restatefi-tx-list">
                    {data.recentTransactions.map((tx) => (
                      <div key={tx.id} className="restatefi-tx-row restatefi-tx-row--rich">
                        <div className="restatefi-tx-row__media">
                          {tx.propertyImage ? (
                            <img src={tx.propertyImage} alt="" />
                          ) : (
                            <div className="restatefi-tx-row__placeholder" />
                          )}
                        </div>
                        <div className="restatefi-tx-row__body">
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            <Badge variant={txBadgeVariant(tx.type)}>{txLabel(tx.type)}</Badge>
                            <span className="restatefi-tx-row__time">{relativeTime(tx.createdAt)}</span>
                          </div>
                          <strong className="restatefi-tx-row__title">
                            {tx.propertyTitle || "Platform"}
                          </strong>
                          {tx.propertyLocation && (
                            <span className="d-block">{tx.propertyLocation}</span>
                          )}
                        </div>
                        <div className="restatefi-tx-row__amount">
                          <strong>
                            {tx.type === "SALE" ? "+" : tx.type === "PURCHASE" ? "−" : "+"}
                            {formatUsd(tx.amountUsd)}
                          </strong>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </Col>
          </Row>
        </>
      )}
    </PageShell>
  );
}
