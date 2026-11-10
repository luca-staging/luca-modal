import React from "react";
import { Link } from "react-router-dom";
import GlassCard from "./GlassCard";

export default function EmptyState({
  message,
  actionLabel,
  actionTo,
  onAction,
  className = "",
}) {
  return (
    <GlassCard
      className={`restatefi-empty-state p-5 text-center restatefi-animate-in ${className}`.trim()}
    >
      <p className="restatefi-empty-state__message">{message}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="restatefi-btn restatefi-btn--primary">
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && (
        <button type="button" className="restatefi-btn restatefi-btn--primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </GlassCard>
  );
}
