/* eslint-disable no-undef */
module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
    'react',
    'react-hooks'
  ],
  'rules': {
    'indent': [
      'error',
      2,
      {'SwitchCase': 1},
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      'only-multiline',
    ],
    'no-mixed-spaces-and-tabs': 'off',
    '@typescript-eslint/ban-ts-comment': ['error', {'ts-ignore': 'allow-with-description'}],
    '@typescript-eslint/explicit-function-return-type': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};
