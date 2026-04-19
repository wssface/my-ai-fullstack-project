整体技术栈
前端:Vue 3 + TypeScript + Vite(构建用户界面，利用 Composition API 和 TS 保证组件类型安全)
后端:Node.js + Express + TypeScript	(提供 RESTful API，处理业务逻辑，读写文件数据)
类型共享:自定义 packages/shared-types (前后端共用同一份 TypeScript 类型定义，保证接口契约一致)
数据存储:文件系统（todos.json）	(第一阶段使用 JSON 文件模拟数据库，便于快速验证功能)
部署:Vercel (前端) + Railway (后端)	(实现公网可访问的预览环境)

项目结构：
- node：后端服务
- vue：前端页面
- ts：类型检查

项目功能：
- 新增待办事项
- 删除待办事项
- 更改待办事项状态
- 文章列表展示


项目部署：
- 后端服务部署在腾讯云服务器上
- 前端页面部署在腾讯云服务器上

常用命令：
- yarn i：安装项目依赖
- yarn dev：启动项目
- yarn build：构建项目
- yarn lint：检查代码规范
- yarn test：运行测试
- yarn start：启动项目
- npx tsc --noEmit:类型检查

