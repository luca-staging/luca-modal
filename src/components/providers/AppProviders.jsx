import React from "react";
import { QueryClientProvider } from "../../lib/query";

export default function AppProviders({ children }) {
  return <QueryClientProvider>{children}</QueryClientProvider>;
}
