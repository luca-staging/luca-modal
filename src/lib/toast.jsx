import React, { useEffect, useState } from "react";

let push = () => {};

export function toast(message, type = "info") {
  push({ id: `${Date.now()}-${Math.random()}`, message: String(message), type });
}

toast.success = (message) => toast(message, "success");
toast.error = (message) => toast(message, "error");

export default toast;

export function Toaster() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    push = (item) => {
      setItems((prev) => [...prev, item]);
      setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== item.id));
      }, 2800);
    };
    return () => {
      push = () => {};
    };
  }, []);

  if (!items.length) return null;

  return (
    <div className="rf-toaster" aria-live="polite">
      {items.map((item) => (
        <div key={item.id} className={`rf-toast rf-toast--${item.type}`}>
          {item.message}
        </div>
      ))}
    </div>
  );
}
