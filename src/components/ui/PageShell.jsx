import React from "react";
import DocumentHead from "./DocumentHead";
import { Container } from "./bootstrap";
import PageHeader from "./PageHeader";

export default function PageShell({
  title,
  subtitle,
  helmetTitle,
  children,
  containerClass = "",
  action,
  narrow = false,
  wide = false,
}) {
  const containerCls = [
    "py-5",
    narrow && "restatefi-container--narrow",
    wide && "restatefi-container--wide",
    containerClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="restatefi-page">
      {helmetTitle && <DocumentHead title={helmetTitle} />}
      <Container className={containerCls}>
        {(title || subtitle) && (
          <PageHeader title={title} subtitle={subtitle} action={action} />
        )}
        {children}
      </Container>
    </div>
  );
}
