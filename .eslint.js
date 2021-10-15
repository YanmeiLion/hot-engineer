// .eslint.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // 添加`prettier`拓展 用于和`prettier`冲突时覆盖`eslint`规则
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: { 
    "react/prop-types": 0 //防止在react组件定义中缺少props验证
  },
  settings: {
    react: {
      version: '^17.0.2',
    },
  },
}
