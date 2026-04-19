// 引入你原有的后端逻辑 (假设它导出了一个 Express App)
// 注意：需要根据你实际的入口文件路径调整
const app = require('../src/index.js'); 

// EdgeOne Pages 要求的函数签名，必须导出此函数
export default function onRequest(context) {
  // 将请求交由 Express 应用处理
  return app(context.request, context);
}