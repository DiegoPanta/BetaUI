// eslint.config.js (Flat Config Format)
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import skipFormatting from 'eslint-config-prettier';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // JavaScript recommended rules
  ...js.configs.recommended,

  // Vue essential rules
  ...pluginVue.configs['flat/essential'],

  // Skip formatting rules
  ...skipFormatting,
];
