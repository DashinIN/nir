module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    indent: [2, 4],
    'linebreak-style': 'off',
    'react/self-closing-comp': ['error', {
      'component': true,
      'html': true
    }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/jsx-indent': [2, 4],
    'react/jsx-indent-props': [2, 4],
    'react/jsx-filename-extension': [
        2,
        {
            extensions: ['.js', '.jsx', '.tsx'],
        },
    ],
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'prettier/prettier': 'off',
    'react/prop-types': 'off',
},

}
