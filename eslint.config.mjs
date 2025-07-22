import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importHelpers from 'eslint-plugin-import-helpers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    ignores: ['.next/', 'node_modules/', 'public/', 'build/', 'dist/'],
  },
  ...compat.extends('next/core-web-vitals'),
  js.configs.recommended,
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'import-helpers': importHelpers,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/^react/',
            '/^next/',
            'module',
            '/^@/',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
    },
  },
  prettierConfig,
];
