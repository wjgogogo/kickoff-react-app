const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractWebpackPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const BarWebpackPlugin = require("webpackbar");
const {
  ENTRY_PATH,
  OUTPUT_PATH,
  PUBLIC_HTML_PATH,
  IN_DEV,
} = require("./constants");
module.exports = {
  entry: ENTRY_PATH,
  output: {
    path: OUTPUT_PATH,
    filename: "js/[name].[contenthash:8].js",
  },
  target: "web",
  resolve: {
    extensions: [".ts", ".tsx", ".json", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: IN_DEV
              ? "style-loader"
              : MiniCssExtractWebpackPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: IN_DEV
              ? "style-loader"
              : MiniCssExtractWebpackPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        type: "asset",
        generator: {
          filename: "images/[name].[contenthash:8][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff|woff2|e0t|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[contenthash:8][ext]",
        },
      },
    ],
  },
  plugins: [
    new BarWebpackPlugin({ name: IN_DEV ? "compiling" : "building" }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: PUBLIC_HTML_PATH,
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configOverwrite: {
          exclude: [
            "**/*.test.ts",
            "**/*.test.tsx",
            "**/*.spec.ts",
            "**/*.spec.tsx",
          ],
        },
      },
    }),
  ],
};
