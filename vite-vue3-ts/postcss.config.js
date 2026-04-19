import pxtorem from '@minko-fe/postcss-pxtorem';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    pxtorem({
      rootValue: 16, // 基准值（1rem = 16px，可根据设计稿调整）
      unitPrecision: 5, // 转换精度（保留 5 位小数）
      propList: ['*'], // 所有属性都转换
      selectorBlackList: ['no-rem'], // 类名含 no-rem 的不转换
      atRules: ['media'], // 媒体查询中的 PX 也转换
      exclude: /node_modules/ // 排除第三方库
    }),
    autoprefixer() // 自动添加 CSS 前缀（适配低版本浏览器）
  ]
};
