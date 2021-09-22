const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { merge } = require("webpack-merge");

const paths = require("./paths");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: false,
  output: {
    path: paths.build,
    // Change the publicPath to /repository-name/ when you use github pages
    publicPath: "/shining-text/",
    filename: "js/[name].[contenthash].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
