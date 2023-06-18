// eslint-disable-next-line no-undef
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: {
    tailwindcss: {
      config: "tailwind.config.js",
    },
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "tailwindcss/classnames-order": "off",
    "tailwindcss/no-custom-classname": "off",
  },
};
