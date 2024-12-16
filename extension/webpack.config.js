const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production", // Use "development" for debugging
  entry: {
    content: "./src/content.js",
    popup: "./src/popup.js",
    background: "./src/background.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/manifest.json", to: "manifest.json" },
        { from: "src/popup.html", to: "popup.html" }, // Copy popup HTML
        { from: "src/logo.png", to: "logo.png" }, // Copy icon (if any)
        // Add other static files like images or styles here
      ],
    }),
  ],
  resolve: {
    extensions: [".js"],
  },
};
