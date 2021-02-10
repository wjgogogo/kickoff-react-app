const { IN_DEV, IN_TEST, IN_PROD } = require("./scripts/constants");
module.exports = {
  presets: [
    IN_TEST && [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
    (IN_DEV || IN_PROD) && [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "usage",
        corejs: 3,
        bugfixes: true,
        exclude: ["@babel/plugin-transform-regenerator"],
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
    "@emotion/babel-preset-css-prop",
  ].filter(Boolean),
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: true,
        regenerator: true,
        useESModules: IN_DEV || IN_PROD,
      },
    ],
    IN_DEV && [
      "react-refresh/babel",
      {
        skipEnvCheck: true,
      },
    ],
  ].filter(Boolean),
};
