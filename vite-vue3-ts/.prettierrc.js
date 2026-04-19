export default {
  printWidth: 80, // 一行最多 80 字符
  tabWidth: 2, // 2 个空格缩进（与 Vue 官方一致）
  useTabs: false, // 不使用 Tab 缩进
  semi: true, // 行尾添加分号
  singleQuote: true, // 使用单引号
  quoteProps: "as-needed", // 对象 key 仅必要时加引号
  jsxSingleQuote: false, // JSX 中使用双引号
  trailingComma: "all", // 对象/数组末尾添加逗号（便于 diff）
  bracketSpacing: true, // 大括号内保留空格 { foo: bar }
  jsxBracketSameLine: false, // JSX 闭合标签换行
  arrowParens: "always", // 箭头函数单参数也加括号 (x) => x
  endOfLine: "auto" // 自动适配系统换行符
};
