export default {
  ignores: [commit => commit.includes('init')], // 忽略 init 初始化提交
  extends: ['@commitlint/config-conventional'], // 基础规范
  rules: {
    'body-leading-blank': [2, 'always'], // 提交描述主体前空行
    'footer-leading-blank': [1, 'always'], // 底部说明前空行
    'header-max-length': [2, 'always', 108], // 标题最大长度 108
    'subject-empty': [2, 'never'], // 标题不可为空
    'type-empty': [2, 'never'], // 类型不可为空
    'type-enum': [ // 允许的提交类型（规范提交场景）
      2,
      'always',
      [
        'wip', // 开发中
        'feat', // 新增功能
        'fix', // 修复 Bug
        'test', // 测试相关
        'refactor', // 代码重构
        'build', // 构建配置（如依赖、打包）
        'docs', // 文档更新
        'perf', // 性能优化
        'style', // 代码风格（不影响逻辑）
        'ci', // 持续集成配置
        'chore', // 琐事（如配置文件修改）
        'revert', // 回滚代码
        'types', // 类型声明更新
        'release' // 版本发布
      ]
    ]
  }
};
