const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@_components": path.resolve(__dirname, "src/components/"),
      "@_assets": path.resolve(__dirname, "src/assets/"),
      "@_pages": path.resolve(__dirname, "src/pages/"),
    },
  },
};
