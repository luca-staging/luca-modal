module.exports = ({ addComponents }) => {
  addComponents({
    ".restatefi-field": {
      backgroundColor: "var(--bg-input)",
      borderWidth: "1px",
      borderColor: "var(--border)",
      borderRadius: "0.75rem",
      color: "var(--text-primary)",
    },
    ".restatefi-field:focus": {
      outline: "none",
      borderColor: "var(--border-accent)",
      boxShadow: "0 0 0 3px var(--accent-dim)",
    },
  });
};
