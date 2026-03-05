import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-plugin-prettier';
import skipFormatting from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  skipFormatting,
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      // No console logs in production
      'no-console': ['error', { allow: ['warn', 'error'] }],
      // Allow unused variables if prefixed with underscore
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Ignore generated files
    'node_modules/**',
    '*.min.js',
  ]),
]);

export default eslintConfig;
