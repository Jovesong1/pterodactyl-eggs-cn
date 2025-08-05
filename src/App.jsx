import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EggsListPage from './pages/EggsListPage';
import EggDetailPage from './pages/EggDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
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
                  <a href="https://github.com/your-repo/pterodactyl-eggs-cn" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <span className="sr-only">GitHub</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://discord.gg/your-discord" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Discord</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                    </svg>
                  </a>
                  <a href="https://qq.com/your-group" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <span className="sr-only">QQ群</span>
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.003 2C6.478 2 2 6.478 2 12.003C2 17.528 6.478 22.006 12.003 22.006C17.528 22.006 22.006 17.528 22.006 12.003C22.006 6.478 17.528 2 12.003 2ZM16.5 15.75C16.5 15.75 15.75 17.25 12 17.25C8.25 17.25 7.5 15.75 7.5 15.75C7.5 15.75 7.125 15.375 7.5 15C7.875 14.625 8.25 15 8.25 15C8.25 15 9 16.125 12 16.125C15 16.125 15.75 15 15.75 15C15.75 15 16.125 14.625 16.5 15C16.875 15.375 16.5 15.75 16.5 15.75ZM10.875 12C10.875 11.175 10.2 10.5 9.375 10.5C8.55 10.5 7.875 11.175 7.875 12C7.875 12.825 8.55 13.5 9.375 13.5C10.2 13.5 10.875 12.825 10.875 12ZM16.125 12C16.125 11.175 15.45 10.5 14.625 10.5C13.8 10.5 13.125 11.175 13.125 12C13.125 12.825 13.8 13.5 14.625 13.5C15.45 13.5 16.125 12.825 16.125 12Z" />
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
                    <a href="https://docs.pterodactyl.io/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      Pterodactyl 文档
                    </a>
                  </li>
                  <li>
                    <a href="https://pterodactyl.io/community" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      Pterodactyl 社区
                    </a>
                  </li>
                </ul>
              </div>
              
              {/* 快速导航 */}
              <div>
                <h3 className="text-lg font-semibold mb-4">快速导航</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/" className="text-gray-400 hover:text-white transition-colors">首页</a>
                  </li>
                  <li>
                    <a href="/eggs" className="text-gray-400 hover:text-white transition-colors">Egg资源</a>
                  </li>
                  <li>
                    <a href="/categories" className="text-gray-400 hover:text-white transition-colors">分类浏览</a>
                  </li>
                  <li>
                    <a href="/about" className="text-gray-400 hover:text-white transition-colors">关于项目</a>
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
                    备案号：京ICP备XXXXXXXX号-X
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