module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "import"],
  env: {
    node: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        "newlines-between": "always",
      },
    ],
  },
};
