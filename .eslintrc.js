module.exports = {
  env: {
      browser: true,
      es2021: true,
      jest: true,
  },
  // eslint-disable-next-line max-len
  extends: ["next/core-web-vitals"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
      ecmaFeatures: {
          jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
      'react/jsx-indent': [2, 4],
      'react/jsx-indent-props': [2, 4],
      indent: [2, 4],
      'react/jsx-filename-extension': [2, {
          extensions: ['.js', '.jsx', '.tsx'],
      }],
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      'no-unused-vars': 'warn',
      'react/require-default-props': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'warn',
      'react/function-component-definition': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'no-shadow': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-underscore-dangle': 'off',
      'no-param-reassign': 'off',
      'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
      'max-len': ['error', {
          ignoreComments: true,
          code: 120,
      }],
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'no-undef': 'off',
      'react/no-array-index-key': 'off',
  }
};
