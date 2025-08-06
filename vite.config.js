import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs-extra';
import eggsWatcher from './scripts/vite-plugin-eggs-watcher.js';

// 复制Markdown文件到构建目录的插件
const copyMarkdownPlugin = () => {
  return {
    name: 'copy-markdown-plugin',
    closeBundle: async () => {
      // 确保目标目录存在
      await fs.ensureDir('dist/src/data');
      
      // 复制eggs目录
      if (fs.existsSync('src/data/eggs')) {
        await fs.copy('src/data/eggs', 'dist/src/data/eggs');
        console.log('Markdown files copied to dist/src/data/eggs');
      }
      
      // 复制about.md
      if (fs.existsSync('src/data/about.md')) {
        await fs.copy('src/data/about.md', 'dist/src/data/about.md');
        console.log('about.md copied to dist/src/data');
      }
      
      // 复制categories目录
      if (fs.existsSync('src/data/categories')) {
        await fs.copy('src/data/categories', 'dist/src/data/categories');
        console.log('Categories files copied to dist/src/data/categories');
      }
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  // 使用相对路径
  base: './',
  plugins: [
    react(),
    copyMarkdownPlugin(),
    eggsWatcher() // 添加eggs监视器插件
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 生成静态资源的文件名格式
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  // 配置别名
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // 开发服务器配置
  server: {
    port: 3000,
    open: true
  }
});
