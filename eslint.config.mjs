import globals from "globals";
import js from "@eslint/js";
import reactHooksPlugin from "eslint-plugin-react-hooks"; // Does not have support for ESLint flat config yet
import reactPlugin from "eslint-plugin-react";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["frontend/**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { 
      parserOptions: { 
        ecmaFeatures: { 
          jsx: true 
        } 
      },
      globals: globals.browser
    },
    plugins: {
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
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
  js.configs.recommended,
  prettierConfig,
];