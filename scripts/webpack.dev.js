const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const COMMON_CONFIG = require("./webpack.common");
const { OUTPUT_PATH } = require("./constants");

module.exports = merge(COMMON_CONFIG, {
	mode: "development",
	devtool: "cheap-module-source-map",
	devServer: {
		contentBase: OUTPUT_PATH,
		host: "localhost",
		port: 1234,
		hot: true,
		overlay: true,
		historyApiFallback: true,
	},
	plugins: [
		new ReactRefreshWebpackPlugin(),
	],
});
