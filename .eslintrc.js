module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: "airbnb-base",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "linebreak-style": ["error", "windows"],
  },
};
