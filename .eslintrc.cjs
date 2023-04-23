module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/react-in-jsx-scope': 'off',
    ' @typescript-eslint/no-confusing-void-expression': 'off',
    'import/no-absolute-path': 'off',
    'spaced-comment': 'off',
    '@typescript-eslint/indent': 'off',
    'e@typescript-eslint/method-signature-style': 'off'
  }
}
