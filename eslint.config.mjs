import eslint from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import inclusiveLanguagePlugin from 'eslint-plugin-inclusive-language';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'inclusive-language': inclusiveLanguagePlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          jsxSingleQuote: true,
          parser: 'flow',
        },
      ],
      'inclusive-language/use-inclusive-words': 'error',
      semi: [2, 'always'],
      'jsx-quotes': [2, 'prefer-single'],
      'no-console': 2,
      'no-extra-semi': 2,
      'semi-spacing': [2, { before: false, after: true }],
      'no-dupe-else-if': 0,
      'no-setter-return': 0,
      'prefer-promise-reject-errors': 0,
      'react/button-has-type': 2,
      'react/default-props-match-prop-types': 2,
      'react/jsx-closing-bracket-location': 2,
      'react/jsx-closing-tag-location': 2,
      'react/jsx-curly-spacing': 2,
      'react/jsx-curly-newline': 2,
      'react/jsx-equals-spacing': 2,
      'react/jsx-max-props-per-line': [2, { maximum: 1, when: 'multiline' }],
      'react/jsx-first-prop-new-line': 2,
      'react/jsx-curly-brace-presence': [2, { props: 'never', children: 'never' }],
      'react/jsx-pascal-case': 2,
      'react/jsx-props-no-multi-spaces': 2,
      'react/jsx-tag-spacing': [2, { beforeClosing: 'never' }],
      'react/jsx-wrap-multilines': 2,
      'react/no-array-index-key': 2,
      'react/no-typos': 2,
      'react/no-unsafe': 2,
      'react/no-unused-prop-types': 2,
      'react/no-unused-state': 2,
      'react/self-closing-comp': 2,
      'react/sort-comp': 2,
      'react/style-prop-object': 2,
      'react/void-dom-elements-no-children': 2,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  prettierConfig,
  {
    // TypeScript handles undefined variables and declaration merging —
    // disable the base ESLint rules and use TS-aware equivalents.
    files: ['**/*.{ts,tsx}'],
    rules: {
      'no-undef': 'off',
      'no-redeclare': 'off',
      'prettier/prettier': 'off',
    },
  },
  {
    ignores: ['node_modules/**', 'public/**', '.cache/**'],
  },
];
