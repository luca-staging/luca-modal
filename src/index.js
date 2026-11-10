import React from "react";
import ReactDOM from "react-dom/client";
import "./theme/fonts/fonts.css";
import "./styles/theme.css";
import "./theme/themes/themes.css";
import "./styles/bootstrap-lite.css";
import "./styles/restatefi.css";
import "./styles/modern.css";
import "./styles/responsive.css";
import "./styles/brand.css";
import "./styles/wallet-modal.css";
import "./index.css";
import App from "./App";
import { initTheme } from "./theme/themes";
import { BrowserRouter } from "react-router-dom";
import { WalletProvider } from "./web3/WalletProvider";
import { WalletSessionProvider } from "./components/providers/WalletSessionProvider";

initTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <WalletSessionProvider>
          <App />
        </WalletSessionProvider>
      </WalletProvider>
    </BrowserRouter>
  </React.StrictMode>
);
