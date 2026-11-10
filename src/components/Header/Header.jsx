import React, { useState } from "react";
import "./Header.css";
import { Container } from "../ui/bootstrap";
import logo from "../../assets/restatefi-logo.png";
import { FaWallet, AiOutlineMenu, RxCross2 } from "../ui/Icons";
import { useWeb3Modal, useAccount, useNetwork, useSwitchNetwork } from "../../web3/WalletProvider";
import { Link, useLocation } from "react-router-dom";
import { useWalletReady } from "../../hooks/useWalletReady";
import { useWalletSession } from "../providers/WalletSessionProvider";
import { SUPPORTED_CHAINS, CHAIN_META } from "../../config/chains";
import { APP_NAME } from "../../config/constants";

export default function Header() {
  const location = useLocation();
  const walletReady = useWalletReady();
  const isHomeGated = location.pathname === "/" && !walletReady;
  const [show, setShow] = useState(false);
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const { clearSignedOut } = useWalletSession();

  const openConnect = () => {
    clearSignedOut();
    open();
  };

  const handleClose = () => setShow(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/marketplace", label: "Marketplace" },
    { to: "/list-property", label: "List Asset" },
    { to: "/favorites", label: "Watchlist" },
    { to: "/dashboard", label: "Portfolio" },
    { to: "/investments", label: "Holdings" },
    { to: "/profile", label: "Profile" },
    { to: "/admin", label: "Admin" },
  ];

  const isActivePath = (to) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  return (
    <header className="main_header_here">
      <nav className="main_headre navbar">
        <Container>
          <div className="main_logo navbar-brand">
            <Link to="/" className="restatefi-brand-mark">
              <img src={logo} alt={APP_NAME} />
              <span>
                {APP_NAME}
                <small>Institutional Marketplace</small>
              </span>
            </Link>
          </div>

          <div className="in_resonsive">
            <button type="button" onClick={address ? () => open() : openConnect} className="wallet_button2">
              <FaWallet style={{ fontSize: "1.2rem" }} />
            </button>
            <button
              type="button"
              className="d-lg-none header-menu-btn"
              aria-label="Toggle menu"
              onClick={() => setShow((v) => !v)}
            >
              {show ? <RxCross2 className="header-menu-toggle" /> : <AiOutlineMenu className="header-menu-toggle" />}
            </button>
          </div>

          <div className={`navbar-collapse${show ? " show" : ""}`}>
            <div className="navbar-nav me-auto">
              {!isHomeGated &&
                navLinks.map(({ to, label }) => {
                  const active = isActivePath(to);
                  return (
                    <Link
                      key={to}
                      to={to}
                      onClick={handleClose}
                      className={`nav-link header_links${active ? " header_links--active" : ""}`}
                      aria-current={active ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  );
                })}
            </div>
            <div className="navbar-nav">
              {!isHomeGated && (
                <select
                  className="restatefi-chain-select me-2"
                  value={chain?.id ?? ""}
                  onChange={(e) => switchNetwork?.(Number(e.target.value))}
                  aria-label="Select network"
                >
                  {SUPPORTED_CHAINS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {CHAIN_META[c.id]?.name ?? c.name}
                    </option>
                  ))}
                </select>
              )}
              <button type="button" onClick={address ? () => open() : openConnect} className="wallet_button">
                {address
                  ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
                  : "Connect Wallet"}
                {!address && <FaWallet />}
              </button>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}
