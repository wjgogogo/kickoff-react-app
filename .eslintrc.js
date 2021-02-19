module.exports = {
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
  rules: {
    "prettier/prettier":"warn",
    "react/react-in-jsx-scope": "error",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
  },
  ignorePatterns: ["*.js"],
};
