import React from "react";

export default function StatCard({ label, value, hint, accent, className = "" }) {
  return (
    <div className={`restatefi-stat-card restatefi-animate-in ${className}`.trim()}>
      <h4>{label}</h4>
      <p className={accent ? "restatefi-text-success" : ""}>{value}</p>
      {hint && <span className="restatefi-stat-hint">{hint}</span>}
    </div>
  );
}
