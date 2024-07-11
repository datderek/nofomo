import globals from "globals";
import pluginJs from "@eslint/js";
import reactConfig from "eslint-plugin-react/configs/recommended.js";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["frontend/**/*.{js,mjs,cjs,jsx}"],
    reactConfig,
    languageOptions: { 
      parserOptions: { 
        ecmaFeatures: { 
          jsx: true 
        } 
      },
      globals: globals.browser
    } 
  },
  {
    files: ["backend/**/*.js"], 
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node 
    },
    rules: {
      "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
    }
  },
  pluginJs.configs.recommended,
  prettierConfig,
];