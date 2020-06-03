const path = require("path");
const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env": require(path.join(__dirname, 'config', process.env.NODE_ENV))
    }),
  ],
  resolve: {
    extensions: [".js", ".html"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    },
  },
};
