import React from "react";
import { Row, Col } from "../ui/bootstrap";
import Badge from "../ui/Badge";
import GlassCard from "../ui/GlassCard";
import StatCard from "../ui/StatCard";
import { useAccount } from "../../web3/WalletProvider";
import { useDashboard } from "../../hooks/useMarketplace";
import { formatPercent, formatUsd } from "../../utils/format";

const STEPS = [
  {
    n: "01",
    title: "Review the record",
    desc: "Each offering shows location, price, expected return, and rental yield before any allocation.",
  },
  {
    n: "02",
    title: "Allocate from your wallet",
    desc: "A connected wallet on a supported network settles the fractional interest.",
  },
  {
    n: "03",
    title: "Receive distributions",
    desc: "Rental income is recorded against the position and kept with the ownership history.",
  },
];

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

function txLabel(type) {
  return String(type || "")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function marketRows(properties) {
  const byCountry = new Map();
  for (const property of properties) {
    const country = property.country || "Other";
    const row = byCountry.get(country) || {
      country,
      count: 0,
      yieldSum: 0,
      cities: [],
    };
    row.count += 1;
    row.yieldSum += Number(property.rentalYield || 0);
    if (property.city && !row.cities.includes(property.city)) row.cities.push(property.city);
    byCountry.set(country, row);
  }
  return [...byCountry.values()]
    .map((row) => ({
      ...row,
      avgYield: row.count ? row.yieldSum / row.count : 0,
    }))
    .sort((a, b) => b.count - a.count || a.country.localeCompare(b.country));
}

export default function HomeSections({ featured = [], featuredLoading = false }) {
  const { address } = useAccount();
  const { data, isLoading } = useDashboard(address);
  const markets = marketRows(featured);
  const activity = (data?.recentTransactions ?? []).slice(0, 4);

  return (
    <>
      <section className="restatefi-home-block">
        <div className="restatefi-section-head">
          <div>
            <h2>Your position</h2>
            <p>Value, income, and recent activity for this wallet</p>
          </div>
        </div>

        {data?.isSampleData && (
          <div className="restatefi-demo-banner mb-3">
            Sample portfolio activity is shown until this wallet records its own investments.
          </div>
        )}

        {isLoading ? (
          <div className="restatefi-loading">Loading your position...</div>
        ) : (
          <Row className="g-4">
            <Col lg={5}>
              <Row className="g-3">
                <Col sm={6}>
                  <StatCard label="Portfolio value" value={formatUsd(data?.portfolioValueUsd)} />
                </Col>
                <Col sm={6}>
                  <StatCard label="Rental income" value={formatUsd(data?.rentalIncomeUsd)} />
                </Col>
                <Col sm={6}>
                  <StatCard label="Portfolio ROI" value={formatPercent(data?.roiPercent)} accent />
                </Col>
                <Col sm={6}>
                  <StatCard
                    label="Positions"
                    value={String(data?.fractionalInvestments ?? 0)}
                    hint={`${data?.ownedProperties ?? 0} properties`}
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={7}>
              <GlassCard className="p-4 h-100">
                <h3 className="restatefi-sidebar-heading">Recent activity</h3>
                {activity.length === 0 ? (
                  <div className="restatefi-empty py-4">No activity recorded for this wallet.</div>
                ) : (
                  <div className="restatefi-tx-list">
                    {activity.map((tx) => (
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
                            <Badge variant="info">{txLabel(tx.type)}</Badge>
                            <span className="restatefi-tx-row__time">{relativeTime(tx.createdAt)}</span>
                          </div>
                          <strong className="restatefi-tx-row__title">
                            {tx.propertyTitle || "Platform"}
                          </strong>
                          {tx.propertyLocation && <span className="d-block">{tx.propertyLocation}</span>}
                        </div>
                        <div className="restatefi-tx-row__amount">
                          <strong>{formatUsd(tx.amountUsd)}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
            </Col>
          </Row>
        )}
      </section>

      <section className="restatefi-home-block">
        <div className="restatefi-section-head">
          <div>
            <h2>Markets in view</h2>
            <p>Where the current offerings are located, with average rental yield</p>
          </div>
        </div>
        {featuredLoading ? (
          <div className="restatefi-loading">Loading markets...</div>
        ) : markets.length === 0 ? (
          <div className="restatefi-empty">No markets are listed yet.</div>
        ) : (
          <GlassCard className="restatefi-market-list">
            {markets.map((market) => (
              <div key={market.country} className="restatefi-market-row">
                <div>
                  <strong>{market.country}</strong>
                  <span>
                    {market.count} {market.count === 1 ? "offering" : "offerings"}
                  </span>
                </div>
                <span className="restatefi-market-row__cities">{market.cities.join(" · ")}</span>
                <span className="restatefi-market-row__yield">{formatPercent(market.avgYield)} yield</span>
              </div>
            ))}
          </GlassCard>
        )}
      </section>

      <section className="restatefi-home-block">
        <div className="restatefi-section-head">
          <div>
            <h2>How a position is opened</h2>
            <p>The path from reviewing an asset to receiving rental distributions</p>
          </div>
        </div>
        <div className="restatefi-step-grid">
          {STEPS.map((step) => (
            <GlassCard key={step.n} className="restatefi-step-card">
              <div className="restatefi-step-card__index">{step.n}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>
    </>
  );
}
