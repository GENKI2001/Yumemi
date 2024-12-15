// @ts-check

import tseslint from 'typescript-eslint';
import globals from 'globals';
import unusedImports from 'eslint-plugin-unused-imports';
import * as pluginImport from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';
import typescript from 'eslint-plugin-import/config/typescript';

export default tseslint.config(...tseslint.configs.recommended, {
  files: ['{src,database,test}/**/*.{ts,mts}'],
  // ...compat.extends('plugin:node/recommended', 'plugin:@typescript-eslint/eslint-recommended', "prettier"),
  
  plugins: {
    'unused-imports': unusedImports,
    import: pluginImport,
  },
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2022,  // tsconfig.jsonのtargetと合わせる
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      project: './tsconfig.json'  // TypeScriptの設定ファイルへのパスを指定
    },
    globals: {
      ...globals.node,
      ...globals.jest,
    }
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      }
    ],
    'no-console': [2, { allow: ['info', 'debug', 'warn', 'error']}],
    'unused-imports/no-unused-imports': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'object',
          'type'
        ],
        pathGroups: [
          {
            pattern: '~/**',
            group: 'parent',
            position: 'before',
          }
        ],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always'
      }
    ],
    ...prettier.rules,
    
  },
});
