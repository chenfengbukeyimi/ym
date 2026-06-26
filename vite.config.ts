// import { resolve } from 'node:path';
import { defineConfig } from 'vite-plus';

export default defineConfig({
  lint: {
    ignorePatterns: ['dist/**', 'node_modules/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },

  fmt: {
    singleQuote: true,
    ignorePatterns: ['dist/**', 'node_modules/**'],
  },

  staged: {
    '*': 'vp check --fix',
    '**/*.{ts,md,json}': 'cspell lint --no-progress',
  },

  /**
   * 库包配置
   * 注意: 库包测试，必须关闭 root 配置
   */
  pack: {
    exports: true,
    dts: { tsgo: true },
  },

  test: {
    include: ['tests/**/*.test.ts'],
  },

  /** 应用配置(功能页面) */
  // root: resolve(__dirname, 'example'),
});
