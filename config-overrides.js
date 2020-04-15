const path = require("path");

module.exports = {
  webpack: function (config) {
    config.devtool = "source-map";
    config.resolve = {
      extensions: [".js", ".html"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@core": path.resolve(__dirname, "src/core"),
      },
    };
    return config;
  },
};
