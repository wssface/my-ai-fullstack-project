import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import eslintParser from "vue-eslint-parser";

export default [
  // 配置忽略文件（替代传统 .eslintignore）
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "public/**",
      "build/**",
      "src/assets/**",
      "*.config.js",
      "*.config.ts"
    ]
  },
  // 基础配置（适配 Vue/TS 文件）
  {
    files: ["**/*.{js,mjs,cjs,vue,ts,tsx}"],
    languageOptions: {
      parser: eslintParser, // 解析 Vue 单文件组件
      parserOptions: {
        parser: "@typescript-eslint/parser", // 解析 TS 语法
        ecmaVersion: 2020,
        sourceType: "module"
      },
      globals: { ...globals.browser, ...globals.node } // 全局变量
    },
    plugins: {
      vue: pluginVue,
      "@typescript-eslint": tseslint.plugin,
      prettier: prettier // 集成 Prettier
    },
    rules: {
      // 基础规则
      "no-var": "error", // 禁止使用 var
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off", // 生产环境禁止 console
      "no-multiple-empty-lines": ["warn", { max: 1 }], // 最多允许 1 行空行
      
      // Vue 规则
      "vue/multi-word-component-names": "off", // 关闭组件名多单词校验（灵活命名）
      "vue/valid-template-root": "off", // 允许模板根节点多元素
      
      // TS 规则
      "@typescript-eslint/no-explicit-any": "off", // 允许使用 any（可选，根据团队规范调整）
      "no-unused-vars": ["error", { "varsIgnorePattern": "Vue" }], // 忽略 Vue 未使用警告
      
      // Prettier 规则（将 Prettier 错误作为 ESLint 错误提示）
      "prettier/prettier": "error"
    }
  },
  // 集成推荐规则
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  ...pluginVue.configs["flat/recommended"],
  prettierConfig // 覆盖 ESLint 与 Prettier 冲突的规则
];
