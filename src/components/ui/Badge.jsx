import React from "react";

const variants = {
  default: "restatefi-badge",
  info: "restatefi-badge restatefi-badge--info",
  success: "restatefi-badge restatefi-badge--success",
  warning: "restatefi-badge restatefi-badge--warning",
};

export default function Badge({ variant = "default", children, className = "" }) {
  return (
    <span className={`${variants[variant] || variants.default} ${className}`.trim()}>
      {children}
    </span>
  );
}
