// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import { globalIgnores } from 'eslint/config'

export default tseslint.config(
  globalIgnores(
    [
      'dist/**/*',
      'build/**/*',
      '**/*.min.js',
      'prettier.config.ts',
      'eslint.config.js',
      'node_modules/**/*'
    ],
    'Global Ignores'
  ),

  // Базовые настройки
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },

  // Базовые правила ESLint
  eslint.configs.recommended,

  // Правила для TypeScript
  ...tseslint.configs.recommended,

  // Интеграция с Prettier
  prettierRecommended,

  // Кастомные настройки для TypeScript-файлов
  {
    files: ['src/**/*.{ts,tsx}'], // Линтим только файлы в src
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      'no-console': ['warn', { allow: ['error'] }],
      'prefer-const': 'error'
    }
  },

  // Настройки для JavaScript-файлов
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-unused-vars': 'error'
    }
  }
)
