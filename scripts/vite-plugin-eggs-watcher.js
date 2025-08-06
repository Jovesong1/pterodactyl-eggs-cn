import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

// 监视eggs文件夹变化并自动更新索引的Vite插件
export default function eggsWatcher() {
  let isUpdating = false;
  let updateQueued = false;
  
  // 节流函数，防止频繁更新
  const throttledUpdate = () => {
    if (isUpdating) {
      updateQueued = true;
      return;
    }
    
    isUpdating = true;
    console.log('🥚 检测到eggs文件夹变化，正在更新索引...');
    
    // 使用子进程运行更新脚本
    const updateProcess = spawn('node', [path.resolve(process.cwd(), 'scripts/update-eggs.cjs')], {
      stdio: 'inherit',
      shell: true
    });
    
    updateProcess.on('close', (code) => {
      isUpdating = false;
      
      if (code === 0) {
        console.log('🥚 索引更新完成！');
      } else {
        console.error(`🥚 索引更新失败，退出码: ${code}`);
      }
      
      // 如果在更新过程中又有新的变化，则再次更新
      if (updateQueued) {
        updateQueued = false;
        setTimeout(throttledUpdate, 1000); // 延迟1秒再次更新
      }
    });
  };
  
  return {
    name: 'vite-plugin-eggs-watcher',
    configureServer(server) {
      // 获取eggs文件夹的路径
      const eggsDir = path.resolve(process.cwd(), 'src/data/eggs');
      
      // 确保文件夹存在
      if (!fs.existsSync(eggsDir)) {
        console.warn(`🥚 警告: eggs文件夹不存在: ${eggsDir}`);
        return;
      }
      
      // 监视eggs文件夹的变化
      const watcher = server.watcher;
      watcher.add(eggsDir);
      
      // 当eggs文件夹有变化时，更新索引
      watcher.on('add', (file) => {
        if (file.includes('/eggs/')) {
          throttledUpdate();
        }
      });
      
      watcher.on('change', (file) => {
        if (file.includes('/eggs/')) {
          throttledUpdate();
        }
      });
      
      watcher.on('unlink', (file) => {
        if (file.includes('/eggs/')) {
          throttledUpdate();
        }
      });
      
      console.log('🥚 Egg索引监视器已启动，正在监视eggs文件夹的变化...');
    }
  };
} 