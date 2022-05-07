import { defineConfig } from 'umi';
import path from 'path';

export default defineConfig({
  // nodeModulesTransform: {
  //   type: 'none',
  // },
  antd: {},
  // sass: {
  //   prependData: '@import "assets/styles/index.scss";',
  //   sassOptions: {
  //     includePaths: [path.resolve(__dirname, '../src')],
  //   },
  // },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  // mfsu: {},
  extraPostCSSPlugins: [
    // require('postcss-import'),
    require('tailwindcss')({
      config: './tailwind.config.js',
    }),
    // require('postcss-nested'),
  ],
  // webpack5: {},
  fastRefresh: {},
  // esbuild: true,
});
