import React from "react";
import "./WalletLogin.css";
import { FaWallet } from "../ui/Icons";
import {
  useWeb3Modal,
  useAccount,
  useNetwork,
  useSwitchNetwork,
} from "../../web3/WalletProvider";
import { useWalletSession } from "../providers/WalletSessionProvider";
import DocumentHead from "../ui/DocumentHead";
import logo from "../../assets/restatefi-logo.png";
import Badge from "../ui/Badge";
import { SUPPORTED_CHAIN_IDS, CHAIN_META, DEFAULT_CHAIN_ID } from "../../config/chains";
import {
  APP_FULL_NAME,
  APP_NAME,
  APP_TAGLINE,
  RESTATEFI_SHOWCASE_PROPERTIES,
  RESTATEFI_HERO_IMAGES,
  RESTATEFI_LOGIN_COPY,
} from "../../config/constants";

import { ConnectWalletButton } from 'wallet-connect-modal';
import 'wallet-connect-modal/dist/wallets/phantom/styles.css';
import 'wallet-connect-modal/dist/wallets/metamask/styles.css';
import 'wallet-connect-modal/dist/wallets/rabby/styles.css';
import 'wallet-connect-modal/dist/wallets/tronlink/styles.css';
import 'wallet-connect-modal/dist/wallets/bitget/styles.css';
import 'wallet-connect-modal/dist/wallets/coinbase/styles.css';
import 'wallet-connect-modal/dist/wallets/solflare/styles.css';
import 'wallet-connect-modal/dist/wallets/okx/styles.css';
import 'wallet-connect-modal/dist/wallets/mac/styles.css';

const ALLOCATION = [
  { title: "Fractional ownership", line: "A proportional share of the asset" },
  { title: "Documented rental yield", line: "Income recorded against the position" },
  { title: "Ownership record", line: "A complete history of the interest" },
];

const ASSET_TYPES = [
  {
    title: "Residential",
    line: "Homes and private residences held as fractional interests.",
    src: RESTATEFI_HERO_IMAGES.livingRoom,
    alt: "Living room",
  },
  {
    title: "Commercial",
    line: "Offices and income property with a documented yield.",
    src: RESTATEFI_HERO_IMAGES.officeRoom,
    alt: "Office room",
  },
  {
    title: "Hospitality",
    line: "Hotels, dining rooms, and other hospitality assets.",
    src: RESTATEFI_HERO_IMAGES.hotelRoom,
    alt: "Hotel room",
  },
];

const OPENING_STEPS = [
  {
    n: "01",
    title: "Review the asset record",
    desc: "Location, price, expected return, and rental yield are visible before any allocation.",
  },
  {
    n: "02",
    title: "Allocate from your wallet",
    desc: "A connected wallet on a supported network settles the fractional interest.",
  },
  {
    n: "03",
    title: "Receive rental distributions",
    desc: "Income is recorded against the position and kept with the ownership history.",
  },
];

const HERO_GALLERY = [
  {
    key: "living",
    src: RESTATEFI_HERO_IMAGES.livingRoom,
    alt: "Living room",
    caption: "Living room",
  },
  {
    key: "hotel",
    src: RESTATEFI_HERO_IMAGES.hotelRoom,
    alt: "Hotel room",
    caption: "Hotel room",
  },
  {
    key: "office",
    src: RESTATEFI_HERO_IMAGES.officeRoom,
    alt: "Office room",
    caption: "Office room",
  },
  {
    key: "beach",
    src: RESTATEFI_HERO_IMAGES.beach,
    alt: "Beach",
    caption: "Beach",
  },
];

export default function WalletLogin() {
  const { open } = useWeb3Modal();
  const { clearSignedOut } = useWalletSession();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const isSupported = SUPPORTED_CHAIN_IDS.includes(chain?.id);
  const defaultChain = CHAIN_META[DEFAULT_CHAIN_ID];
  const featured = RESTATEFI_SHOWCASE_PROPERTIES.find((p) => p.featured) || RESTATEFI_SHOWCASE_PROPERTIES[0];
  const rest = RESTATEFI_SHOWCASE_PROPERTIES.filter((p) => !p.featured);

  return (
    <div className="restatefi-page wallet-login-page">
      <DocumentHead title={APP_FULL_NAME} description={APP_TAGLINE} />

      <header className="wallet-login-bar">
        <div className="container wallet-login-bar__inner">
          <div className="restatefi-brand-mark wallet-login-bar__brand">
            <img src={logo} alt={APP_FULL_NAME} />
            <span>
              {APP_NAME}
              <small>Institutional Marketplace</small>
            </span>
          </div>
          <div className="wallet-login-bar__actions">
            <ConnectWalletButton className="restatefi-btn restatefi-btn--primary" userId="sousa" />
          </div>
        </div>
      </header>

      <section className="wallet-login-hero container restatefi-animate-in">
        <div className="wallet-login-hero__grid">
          <div className="wallet-login-hero__copy">
            <div className="restatefi-hero__eyebrow">{RESTATEFI_LOGIN_COPY.eyebrow}</div>

            <h1 className="wallet-login-hero__headline">{RESTATEFI_LOGIN_COPY.headline}</h1>

            <p className="wallet-login-hero__lead">{APP_TAGLINE}</p>
            <p className="wallet-login-hero__subhead">{RESTATEFI_LOGIN_COPY.subhead}</p>

            <div className="wallet-login-metrics">
              <ul className="wallet-login-stats">
                {RESTATEFI_LOGIN_COPY.highlights.map(({ label, value }) => (
                  <li key={label} className="wallet-login-stats__item">
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
              <p className="wallet-login-includes__label">What an allocation includes</p>
              <ul className="wallet-login-stats wallet-login-stats--includes">
                {ALLOCATION.map(({ title, line }) => (
                  <li key={title} className="wallet-login-stats__item">
                    <strong>{title}</strong>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="wallet-login-hero__visual restatefi-animate-in">
            <div className="wallet-login-bento">
              {HERO_GALLERY.map((item, index) => (
                <figure key={item.key} className="wallet-login-bento__cell">
                  <img src={item.src} alt={item.alt} loading={index === 0 ? "eager" : "lazy"} />
                  <figcaption className="wallet-login-bento__caption">{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wallet-login-types container">
        <div className="wallet-login-section-head restatefi-animate-in">
          <p className="restatefi-filters__title">Asset types</p>
          <h2 className="wallet-login-section-head__title">Residential, commercial, and hospitality</h2>
          <p className="wallet-login-section-head__desc">
            Homes, offices, and hospitality assets available to qualified investors.
          </p>
        </div>
        <div className="wallet-login-types__grid">
          {ASSET_TYPES.map((type) => (
            <article key={type.title} className="wallet-login-type restatefi-animate-in">
              <img src={type.src} alt={type.alt} loading="lazy" />
              <div className="wallet-login-type__body">
                <h3>{type.title}</h3>
                <p>{type.line}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wallet-login-showcase container">
        <div className="wallet-login-section-head restatefi-animate-in">
          <p className="restatefi-filters__title">Featured markets</p>
          <h2 className="wallet-login-section-head__title">{RESTATEFI_LOGIN_COPY.showcaseTitle}</h2>
          <p className="wallet-login-section-head__desc">{RESTATEFI_LOGIN_COPY.showcaseDesc}</p>
        </div>

        <div className="wallet-login-showcase__bento">
          <article className="wallet-login-property wallet-login-property--featured restatefi-animate-in">
            <img src={featured.image} alt={`${featured.city}, ${featured.country}`} loading="lazy" />
            <div className="wallet-login-property__overlay">
              <div>
                <Badge variant="success">Featured offering</Badge>
                <h3 className="wallet-login-property__city">{featured.city}</h3>
                <p className="wallet-login-property__country">{featured.country}</p>
              </div>
              <div className="wallet-login-property__meta">
                <span>{featured.type}</span>
                <span>{featured.price}</span>
                <span className="restatefi-text-success">{featured.yield} net yield</span>
              </div>
            </div>
          </article>

          <div className="wallet-login-showcase__grid">
            {rest.map((property) => (
              <article key={property.city} className="wallet-login-property restatefi-animate-in">
                <img src={property.image} alt={`${property.city}, ${property.country}`} loading="lazy" />
                <div className="wallet-login-property__overlay">
                  <div>
                    <h3 className="wallet-login-property__city">{property.city}</h3>
                    <p className="wallet-login-property__country">{property.country}</p>
                  </div>
                  <div className="wallet-login-property__meta">
                    <Badge variant="info">{property.type}</Badge>
                    <span className="restatefi-text-success">{property.yield} yield</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="wallet-login-markets">
          <div className="wallet-login-markets__head">
            <h3>Markets in view</h3>
            <p>City, asset type, price, and yield for the offerings above.</p>
          </div>
          <div className="wallet-login-markets__list">
            {RESTATEFI_SHOWCASE_PROPERTIES.map((property) => (
              <div key={property.city} className="wallet-login-markets__row">
                <div className="wallet-login-markets__place">
                  <strong className="wallet-login-markets__city">{property.city}</strong>
                  <span className="wallet-login-markets__country">{property.country}</span>
                </div>
                <span className="wallet-login-markets__type">{property.type}</span>
                <span className="wallet-login-markets__price">{property.price}</span>
                <span className="wallet-login-markets__yield">{property.yield} yield</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wallet-login-steps container">
        <div className="wallet-login-section-head restatefi-animate-in">
          <p className="restatefi-filters__title">How a position is opened</p>
          <h2 className="wallet-login-section-head__title">From the record to a distribution</h2>
          <p className="wallet-login-section-head__desc">
            Review the record, allocate from a connected wallet, then receive documented rental distributions.
          </p>
        </div>
        <div className="restatefi-step-grid">
          {OPENING_STEPS.map((step) => (
            <article key={step.n} className="glass-card restatefi-step-card restatefi-animate-in">
              <div className="restatefi-step-card__index">{step.n}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="wallet-login-footer">
        <div className="container">
          <p className="wallet-login-footer__copy">
            © {new Date().getFullYear()} {APP_FULL_NAME}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
