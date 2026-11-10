import React from "react";
import DocumentHead from "../components/ui/DocumentHead";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "../components/ui/bootstrap";
import { FiLock, FiPieChart, FiShield } from "../components/ui/Icons";
import WalletLogin from "../components/WalletLogin/WalletLogin";
import HomeSections from "../components/home/HomeSections";
import PropertyCard from "../components/marketplace/PropertyCard";
import GlassCard from "../components/ui/GlassCard";
import { useWalletReady } from "../hooks/useWalletReady";
import { useFeaturedProperties } from "../hooks/useMarketplace";
import { APP_FULL_NAME, APP_NAME, APP_TAGLINE, RESTATEFI_FEATURES } from "../config/constants";

const FEATURE_ICONS = {
  lock: FiLock,
  pieChart: FiPieChart,
  shield: FiShield,
};

export default function HomePage() {
  const walletReady = useWalletReady();
  const { data: featured = [], isLoading } = useFeaturedProperties();

  if (!walletReady) {
    return <WalletLogin />;
  }

  return (
    <div className="restatefi-page">
      <DocumentHead title={APP_FULL_NAME} description={APP_TAGLINE} />

      <section className="restatefi-hero container restatefi-animate-in">
        <p className="restatefi-hero__brand">{APP_NAME}</p>
        <div className="restatefi-hero__eyebrow">Ethereum Settlement · Tokenized Assets</div>
        <h1 className="restatefi-hero__title">
          Global real estate investment
          <br />
          <span className="restatefi-hero__gradient">structured for digital ownership</span>
        </h1>
        <p className="restatefi-hero__subtitle">{APP_TAGLINE}</p>
        <div className="restatefi-hero__actions">
          <Link to="/marketplace" className="restatefi-btn restatefi-btn--primary">
            View Marketplace
          </Link>
          <Link to="/dashboard" className="restatefi-btn restatefi-btn--outline">
            View Portfolio
          </Link>
        </div>
        <div className="restatefi-feature-grid">
          {RESTATEFI_FEATURES.map(({ icon, title, desc }) => {
            const Icon = FEATURE_ICONS[icon];
            return (
              <GlassCard key={title} className="restatefi-feature-card restatefi-animate-in">
                <div className="restatefi-feature-icon">
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <Container className="pb-5">
        <HomeSections featured={featured} featuredLoading={isLoading} />
      </Container>

      <Container className="pb-5">
        <div className="restatefi-section-head">
          <div>
            <h2>Featured Offerings</h2>
            <p>Selected assets currently available to qualified investors</p>
          </div>
          <Link to="/marketplace" className="restatefi-back-link">
            View all →
          </Link>
        </div>

        {isLoading ? (
          <div className="restatefi-loading">Loading properties...</div>
        ) : (
          <Row className="g-4">
            {featured.slice(0, 8).map((property) => (
              <Col key={property.id} md={6} lg={3}>
                <PropertyCard property={property} className="restatefi-animate-in" />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}
