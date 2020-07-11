const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageJSON = require("../package");

module.exports = () => {
  function getOutputConfig() {
    return {
      path: path.resolve(__dirname, "../frontend/dist"),
      filename: "[name].bundle.js",
    };
  }

  function getWebpackPlugins(env) {
    const developMode = env.NODE_ENV;
    return [
      new webpack.DefinePlugin({
        "process.env.dev": "true",
        "process.env.API_PORT": env.API_PORT,
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1, // disable creating additional chunks
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(__dirname, "../frontend/index.html"),
        templateParameters: {
          url: packageJSON.url,
          description: packageJSON.description,
          title: packageJSON.title,
          NODE_ENV: developMode,
        },
        title: packageJSON.title,
        meta: {
          keywords: packageJSON.keywords.join(","),
          description: packageJSON.description,
          author: packageJSON.author,
        },
      }),
    ];
  }

  return {
    getOutputConfig,
    getWebpackPlugins,
  };
};
