const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const devController = require("./webpack.dev")();
const packageJSON = require("../package");

module.exports = () => {
  function getOutputConfig() {
    return {
      path: path.resolve(__dirname, "../frontend/dist"),
      filename: "[name].bundle.js",
      publicPath: packageJSON.url,
    };
  }

  function getWebpackPlugins(env) {
    const plugins = devController.getWebpackPlugins(env);
    return plugins.concat([
      new webpack.IgnorePlugin(/@amcharts/),
      new UglifyJsPlugin(),
    ]);
  }

  return {
    getOutputConfig,
    getWebpackPlugins,
  };
};
