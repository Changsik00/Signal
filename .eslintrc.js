// https://eslint.org/docs/user-guide/configuring
module.exports = {
  // 현재 eslintrc 파일을 기준으로 ESLint 규칙을 적용
  root: true,
  // 추가적인 규칙들을 적용
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'prettier',
    'plugin:prettier/recommended',
  ],
  // 코드 정리 플러그인 추가
  plugins: ['prettier'],
  // 사용자 편의 규칙 추가
  rules: {
    'prettier/prettier': [
      'error',
      // https://prettier.io/docs/en/options.html
      {
        "arrowParens": "avoid",
        "bracketSpacing": true,
        "htmlWhitespaceSensitivity": "css",
        "insertPragma": false,
        "printWidth": 140,
        "proseWrap": "preserve",
        "quoteProps": "as-needed",
        "requirePragma": false,
        "semi": false,
        "singleQuote": false,
        "tabWidth": 2,
        "trailingComma": "none",
        "useTabs": false,
        "vueIndentScriptAndStyle": false
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};