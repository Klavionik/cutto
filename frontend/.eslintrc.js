module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ["react-app", "eslint:recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
      },
    ],
    "eol-last": ["error"],
  },
}
