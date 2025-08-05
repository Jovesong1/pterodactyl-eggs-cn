import { useState } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import SearchBar from '../components/SearchBar';
import EggCard from '../components/EggCard';
import eggsIndex from '../data/eggs-index';

function HomePage() {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // 创建Fuse搜索实例
  const fuse = new Fuse(eggsIndex, {
    keys: ['name', 'description', 'tags', 'category'],
    threshold: 0.4,
    includeScore: true
  });

  // 处理搜索
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    
    const results = fuse.search(searchTerm);
    setSearchResults(results.map(result => result.item));
    setHasSearched(true);
  };

  // 获取展示的Egg（显示最多9个）
  const featuredEggs = eggsIndex.slice(0, 9);

  // 获取各种状态的Egg数量
  const stats = {
    total: eggsIndex.length,
    localized: eggsIndex.filter(egg => egg.localizationStatus === '已汉化').length,
    optimized: eggsIndex.filter(egg => egg.optimizationStatus === '已优化').length,
    tested: eggsIndex.filter(egg => egg.testStatus === '已通过运行认证').length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 标题区域 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">翼龙面板中文Egg资源站</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          为国内用户提供优质的翼龙面板Egg中文资源
        </p>
        
        <div className="max-w-3xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      {/* 统计数据 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">资源总数</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.localized}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">已汉化</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.optimized}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">已优化</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.tested}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">已认证</div>
        </div>
      </div>

      {/* 搜索结果 */}
      {hasSearched && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-800 dark:text-white">
            <svg className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            搜索结果 ({searchResults.length})
          </h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(egg => (
                <EggCard key={egg.id} egg={egg} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <svg className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-gray-500 dark:text-gray-400 text-lg">没有找到相关Egg资源，请尝试其他关键词</p>
            </div>
          )}
        </div>
      )}

      {/* 热门Egg */}
      {!hasSearched && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
            <svg className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            热门Egg资源
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEggs.map(egg => (
              <EggCard key={egg.id} egg={egg} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/eggs" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <span>查看全部Egg资源</span>
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* 项目介绍 */}
      {!hasSearched && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800 dark:text-white">
            <svg className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            关于本项目
          </h2>
          <div className="prose max-w-none dark:prose-invert">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              翼龙面板中文Egg资源站是一个公益性质的资源汇总平台，旨在解决国内用户在使用翼龙面板部署游戏/应用服务器时面临的"英文Egg门槛高、资源分散、适配性不明"等痛点。
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              我们提供经过汉化和优化的Egg资源，包含详细的配置说明和使用教程，帮助用户快速部署各类服务器。
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <Link 
              to="/about" 
              className="inline-flex items-center px-6 py-2 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            >
              了解更多
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage; 