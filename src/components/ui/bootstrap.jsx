import React from "react";

export function Container({ children, className = "", fluid, ...rest }) {
  return (
    <div className={`${fluid ? "container-fluid" : "container"} ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

export function Row({ children, className = "", ...rest }) {
  return (
    <div className={`row ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

export function Col({ children, className = "", md, lg, ...rest }) {
  const parts = ["col"];
  if (md) parts.push(`col-md-${md}`);
  if (lg) parts.push(`col-lg-${lg}`);
  if (className) parts.push(className);
  return (
    <div className={parts.join(" ")} {...rest}>
      {children}
    </div>
  );
}

function FormRoot({ children, className = "", ...rest }) {
  return (
    <form className={className} {...rest}>
      {children}
    </form>
  );
}

function FormGroup({ children, className = "", ...rest }) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

function FormLabel({ children, className = "", ...rest }) {
  return (
    <label className={className} {...rest}>
      {children}
    </label>
  );
}

function FormControl({ className = "", as, ...rest }) {
  const Tag = as || "input";
  return <Tag className={`form-control ${className}`.trim()} {...rest} />;
}

function FormSelect({ children, className = "", ...rest }) {
  return (
    <select className={`form-select ${className}`.trim()} {...rest}>
      {children}
    </select>
  );
}

export const Form = Object.assign(FormRoot, {
  Group: FormGroup,
  Label: FormLabel,
  Control: FormControl,
  Select: FormSelect,
});

export default { Container, Row, Col, Form };
