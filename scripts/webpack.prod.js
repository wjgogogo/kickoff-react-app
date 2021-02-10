const { merge } = require("webpack-merge");
const MiniCssExtractWebpackPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const COMMON_CONFIG = require("./webpack.common");
const { ENABLE_ANALYZER } = require("./constants");

module.exports = merge(COMMON_CONFIG, {
  mode: "production",
  devtool: false,
  plugins: [
    new MiniCssExtractWebpackPlugin({
      filename: "css/[name].[contenthash:8].css",
    }),
    ENABLE_ANALYZER && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
});
