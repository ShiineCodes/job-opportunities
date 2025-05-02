import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import nextPlugin from '@next/eslint-plugin-next';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import { tailwindSyntax } from '@eslint/css/syntax';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores([
    '!.commitlintrc.cjs',
    '!.lintstagedrc.cjs',
    '!jest.config.js',
    '!plopfile.js',
    '!react-shim.js',
    '!tsup.config.ts',
    '.changeset',
    '.DS_Store',
    '.next',
    '.now/*',
    '*.config.js',
    '*.css',
    'build',
    'coverage',
    'dist',
    'esm/*',
    'node_modules',
    'public/*',
    'scripts/*',
    'tests/*',
    '.vscode/*',
  ]),
  {
    linterOptions: {
      reportUnusedInlineConfigs: 'warn',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ...pluginReact.configs.flat.recommended,
    files: ['**/*.{jsx,tsx}'],
  },
  {
    ...pluginReact.configs.flat['jsx-runtime'],
    files: ['**/*.{jsx,tsx}'],
  },
  tseslint.configs.recommended,
  nextPlugin.flatConfig.recommended,
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended'],
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    languageOptions: {
      tolerant: true,
      customSyntax: tailwindSyntax,
    },
    extends: ['css/recommended'],
    rules: {
      'css/use-baseline': ['warn', { available: 'newly' }],
    },
  },
]);
