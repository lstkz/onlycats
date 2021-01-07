// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    // eslint-disable-next-line no-undef
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-floating-promises': 'error',
  },
};
