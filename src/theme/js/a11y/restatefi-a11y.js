module.exports = ({ addUtilities }) => {
  addUtilities({
    ".restatefi-focus-ring:focus-visible": {
      outline: "2px solid var(--accent)",
      outlineOffset: "2px",
    },
  });
};
