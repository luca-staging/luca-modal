import React from "react";
import { Row, Col } from "../components/ui/bootstrap";
import toast from "../lib/toast";
import { useQuery, useQueryClient } from "../lib/query";
import { useAccount } from "../web3/WalletProvider";
import PageShell from "../components/ui/PageShell";
import WalletGate from "../components/ui/WalletGate";
import EmptyState from "../components/ui/EmptyState";
import PropertyCard from "../components/marketplace/PropertyCard";
import { api } from "../services/api";

export default function FavoritesPage() {
  const { address, isConnected } = useAccount();
  const queryClient = useQueryClient();
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", address],
    queryFn: () => api.getFavorites(address),
    enabled: Boolean(address),
  });

  if (!isConnected) {
    return (
      <WalletGate
        title="Watchlist"
        subtitle="Connect your wallet to save assets under consideration."
        helmetTitle="Watchlist — RestateFi"
      />
    );
  }

  const remove = async (propertyId) => {
    try {
      await api.removeFavorite(address, propertyId);
      queryClient.invalidateQueries({ queryKey: ["favorites", address] });
      toast.success("Removed from favorites");
    } catch {
      toast.error("Could not remove favorite");
    }
  };

  return (
    <PageShell
      title="Watchlist"
      subtitle="Assets saved for further review"
      helmetTitle="Watchlist — RestateFi"
    >
      {isLoading ? (
        <div className="restatefi-loading">Loading favorites...</div>
      ) : favorites.length === 0 ? (
        <EmptyState
          message="No assets have been added to the watchlist."
          actionLabel="Browse Marketplace"
          actionTo="/marketplace"
        />
      ) : (
        <Row className="g-4">
          {favorites.map((fav) => (
            <Col md={6} lg={4} key={fav.id}>
              <div className="restatefi-property-card-wrap">
                <PropertyCard property={fav.property} className="restatefi-animate-in" />
                <button
                  type="button"
                  className="restatefi-btn restatefi-btn--outline restatefi-property-card__remove"
                  onClick={() => remove(fav.propertyId)}
                >
                  Remove
                </button>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </PageShell>
  );
}
