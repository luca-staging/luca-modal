import React from "react";
import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import { DEFAULT_PROPERTY_IMAGE } from "../../config/propertyImages";
import { formatPercent, formatUsd } from "../../utils/format";

export default function PropertyCard({ property, className = "" }) {
  const image =
    property.images?.[0] ||
    DEFAULT_PROPERTY_IMAGE;

  return (
    <Link to={`/marketplace/${property.id}`} className={`restatefi-property-card ${className}`.trim()}>
      <div className="restatefi-property-card__image">
        <img src={image} alt={property.title} loading="lazy" />
        <div className="restatefi-property-card__badges">
          {property.isTokenized && <Badge variant="info">Tokenized</Badge>}
          {property.fractionalAvailable && <Badge variant="success">Fractional</Badge>}
        </div>
      </div>
      <div className="restatefi-property-card__body">
        <h3>{property.title}</h3>
        <p className="restatefi-property-card__location">
          {property.city}, {property.country}
        </p>
        <div className="restatefi-property-card__stats">
          <div>
            <span>Price</span>
            <strong>{formatUsd(property.priceUsd)}</strong>
          </div>
          <div>
            <span>ROI</span>
            <strong className="restatefi-text-success">{formatPercent(property.expectedRoi)}</strong>
          </div>
          <div>
            <span>Yield</span>
            <strong>{formatPercent(property.rentalYield)}</strong>
          </div>
        </div>
      </div>
    </Link>
  );
}
