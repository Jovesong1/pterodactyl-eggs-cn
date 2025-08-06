import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EggsListPage from './pages/EggsListPage';
import EggDetailPage from './pages/EggDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import MinecraftPage from './pages/MinecraftPage';
import MinecraftCoreDetailPage from './pages/MinecraftCoreDetailPage';
import MinecraftServerDetailPage from './pages/MinecraftServerDetailPage';
import './App.css';

function App() {
  // 暗黑模式状态
  const [darkMode, setDarkMode] = useState(false);

  // 初始化时检查系统偏好
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }

    // 监听系统偏好变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 切换暗黑模式
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow pt-20 relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/eggs" element={<EggsListPage />} />
            <Route path="/egg/:id" element={<EggDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/minecraft" element={<MinecraftPage />} />
            <Route path="/mc/core/:id" element={<MinecraftCoreDetailPage />} />
            <Route path="/mc/server/:id" element={<MinecraftServerDetailPage />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 dark:bg-gray-950 text-white relative z-10">
          {/* 主要底部内容 */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 关于我们 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">关于我们</h3>
                <p className="text-gray-400 text-sm mb-4">
                  翼龙面板中文Egg资源站是一个公益性质的资源汇总平台，旨在为国内用户提供优质的翼龙面板Egg中文资源。
                </p>
                <p className="text-gray-400 text-sm">
                  本项目是对 <a href="https://github.com/ptero-eggs/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ptero-Eggs</a> 的二次维护，主要增加了中文翻译和本地化适配。我们致力于为中文用户提供更友好的翼龙面板使用体验。
                </p>
                <div className="mt-4 flex space-x-4">
                  <a href="https://github.com/Jovesong1/pterodactyl-eggs-cn" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <span className="sr-only">GitHub</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                 
                </div>
              </div>
              
              {/* 友情链接 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">友情链接</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="https://github.com/ptero-eggs/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      Ptero-Eggs 官方仓库
                    </a>
                  </li>
                  <li>
                    <a href="https://pterodactyl.io/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      Pterodactyl 官方网站
                    </a>
                  </li>
                  <li>
                    <a href="https://pterodactyl.top" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      Pterodactyl 中国版
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* 快速导航 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">快速导航</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">首页</Link>
                  </li>
                  <li>
                    <Link to="/eggs" className="text-gray-400 hover:text-white transition-colors">Egg资源</Link>
                  </li>
                  <li>
                    <Link to="/categories" className="text-gray-400 hover:text-white transition-colors">分类浏览</Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-white transition-colors">关于项目</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* 版权信息 */}
          <div className="border-t border-gray-700">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-gray-400">
                  &copy; {new Date().getFullYear()} 翼龙面板中文Egg资源站 - 公益项目
                </p>
                <p className="text-sm text-gray-400 mt-2 md:mt-0">
                  <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    备案号：琼ICP备20001473号-3
                  </a>
                </p>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                本站内容仅供学习交流，请遵守相关法律法规
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App; 