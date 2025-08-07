import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import SearchBar from '../components/SearchBar';
import EggCard from '../components/EggCard';
import eggsIndex from '../data/eggs-index';

function HomePage() {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // 设置页面标题
  useEffect(() => {
    document.title = '翼龙面板中文Egg资源站 - 首页';
  }, []);
  
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
    tested: eggsIndex.filter(egg => egg.testStatus === '已通过运行认证').length,
    optimized: eggsIndex.filter(egg => egg.optimizationStatus === '已优化').length,
  };

  // 获取实际存在的分类
  const existingCategories = [...new Set(eggsIndex.map(egg => egg.category))];
  
  // 获取各个分类的数量
  const categoryStats = {};
  existingCategories.forEach(category => {
    categoryStats[category] = eggsIndex.filter(egg => egg.category === category).length;
  });

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
      
      {/* 统计数据 - 全新设计 */}
      <div className="mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                <svg className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                资源统计
              </h2>
              
              {/* 新的投稿按钮设计 */}
              <Link 
                to="#" 
                onClick={(e) => {
                  e.preventDefault();
                  // 触发导航栏上的投稿按钮
                  document.getElementById('contribute-button')?.click();
                }}
                className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full text-sm font-medium transition-all shadow-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                投稿 Egg
              </Link>
            </div>
            
            {/* 桌面端统计数据 */}
            <div className="relative hidden md:block">
              {/* 背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl"></div>
              
              {/* 主数据卡片 */}
              <div className="relative p-6 rounded-xl">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  {/* 总数和图表 */}
                  <div className="flex flex-col items-center mb-6 md:mb-0">
                    <div className="relative w-40 h-40">
                      {/* 圆环背景 */}
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* 圆环背景 */}
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" className="dark:stroke-gray-700" />
                        
                        {/* 已汉化进度 */}
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="40" 
                          fill="none" 
                          stroke="#4ade80" 
                          strokeWidth="8" 
                          strokeDasharray={`${(stats.localized / stats.total) * 251.2} 251.2`} 
                          strokeDashoffset="0"
                          className="dark:stroke-green-500"
                          transform="rotate(-90 50 50)"
                        />
                        
                        {/* 已认证进度 */}
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="30" 
                          fill="none" 
                          stroke="#fbbf24" 
                          strokeWidth="8" 
                          strokeDasharray={`${(stats.tested / stats.total) * 188.4} 188.4`} 
                          strokeDashoffset="0"
                          className="dark:stroke-yellow-500"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      
                      {/* 中心数字 */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-gray-800 dark:text-white">{stats.total}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-300">资源总数</span>
                      </div>
                    </div>
                    
                    <Link to="/eggs" className="mt-4 text-blue-600 dark:text-blue-400 hover:underline flex items-center">
                      <span>查看全部</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                  
                  {/* 详细统计 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 ml-0 md:ml-8">
                    {/* 状态统计 */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">资源状态</h3>
                      
                      {/* 已汉化 */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                            <span className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500 mr-2"></span>
                            已汉化
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{stats.localized} / {stats.total}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-green-400 dark:bg-green-500 h-2.5 rounded-full" 
                            style={{width: `${(stats.localized / stats.total) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                      
                      {/* 已认证 */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                            <span className="w-3 h-3 rounded-full bg-yellow-400 dark:bg-yellow-500 mr-2"></span>
                            已认证
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{stats.tested} / {stats.total}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-yellow-400 dark:bg-yellow-500 h-2.5 rounded-full" 
                            style={{width: `${(stats.tested / stats.total) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 分类统计 */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">分类统计</h3>
                      
                      {/* 动态生成分类统计 */}
                      {existingCategories.map((category, index) => {
                        // 为每个分类分配一个颜色
                        const colors = [
                          {bg: "bg-red-400 dark:bg-red-500", text: "text-red-700 dark:text-red-300"},
                          {bg: "bg-blue-400 dark:bg-blue-500", text: "text-blue-700 dark:text-blue-300"},
                          {bg: "bg-emerald-400 dark:bg-emerald-500", text: "text-emerald-700 dark:text-emerald-300"},
                          {bg: "bg-purple-400 dark:bg-purple-500", text: "text-purple-700 dark:text-purple-300"},
                          {bg: "bg-amber-400 dark:bg-amber-500", text: "text-amber-700 dark:text-amber-300"},
                          {bg: "bg-gray-400 dark:bg-gray-500", text: "text-gray-700 dark:text-gray-300"}
                        ];
                        const color = colors[index % colors.length];
                        
                        return (
                          <div key={category}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                                <span className={`w-3 h-3 rounded-full ${color.bg} mr-2`}></span>
                                {category}
                              </span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">{categoryStats[category]} / {stats.total}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div 
                                className={`${color.bg} h-2.5 rounded-full`} 
                                style={{width: `${(categoryStats[category] / stats.total) * 100}%`}}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 移动端统计数据 - 新设计 */}
            <div className="md:hidden">
              {/* 总数卡片 */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 mb-6 text-white text-center">
                <div className="text-4xl font-bold mb-1">{stats.total}</div>
                <div className="text-sm opacity-90">资源总数</div>
                <Link to="/eggs" className="mt-3 inline-flex items-center text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full">
                  查看全部
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>

              {/* 状态卡片 */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {/* 已汉化 */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-2xl font-bold">{stats.localized}</div>
                      <div className="text-xs opacity-90">已汉化</div>
                    </div>
                    <div className="rounded-full bg-white/20 p-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2 text-xs">
                    占比: {Math.round((stats.localized / stats.total) * 100)}%
                  </div>
                </div>

                {/* 已认证 */}
                <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl p-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-2xl font-bold">{stats.tested}</div>
                      <div className="text-xs opacity-90">已认证</div>
                    </div>
                    <div className="rounded-full bg-white/20 p-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2 text-xs">
                    占比: {Math.round((stats.tested / stats.total) * 100)}%
                  </div>
                </div>
              </div>

              {/* 分类统计 - 移动端版本 */}
              <div className="bg-white dark:bg-gray-700 rounded-xl p-4">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3">分类统计</h3>
                <div className="space-y-3">
                  {existingCategories.slice(0, 4).map((category, index) => {
                    // 为每个分类分配一个颜色
                    const colors = [
                      {bg: "bg-red-400 dark:bg-red-500", text: "text-red-700 dark:text-red-300"},
                      {bg: "bg-blue-400 dark:bg-blue-500", text: "text-blue-700 dark:text-blue-300"},
                      {bg: "bg-emerald-400 dark:bg-emerald-500", text: "text-emerald-700 dark:text-emerald-300"},
                      {bg: "bg-purple-400 dark:bg-purple-500", text: "text-purple-700 dark:text-purple-300"}
                    ];
                    const color = colors[index % colors.length];
                    
                    return (
                      <div key={category} className="flex items-center">
                        <span className={`w-2 h-2 rounded-full ${color.bg} mr-2`}></span>
                        <span className="text-xs text-gray-700 dark:text-gray-300 flex-1">{category}</span>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{categoryStats[category]}</span>
                      </div>
                    );
                  })}
                  
                  {/* 如果分类太多，显示查看更多链接 */}
                  {existingCategories.length > 4 && (
                    <Link to="/categories" className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-2">
                      查看全部分类
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 筛选标签 */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link 
          to="/eggs?filter=all" 
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors shadow-sm"
        >
          全部资源
        </Link>
        <Link 
          to="/eggs?filter=localized" 
          className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-full hover:bg-green-700 transition-colors shadow-sm flex items-center"
        >
          <span className="w-2 h-2 bg-white rounded-full mr-1.5"></span>
          已汉化 ({stats.localized})
        </Link>
        <Link 
          to="/eggs?filter=optimized" 
          className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-full hover:bg-purple-700 transition-colors shadow-sm flex items-center"
        >
          <span className="w-2 h-2 bg-white rounded-full mr-1.5"></span>
          已优化 ({stats.optimized})
        </Link>
        <Link 
          to="/eggs?filter=tested" 
          className="px-3 py-1.5 bg-yellow-600 text-white text-sm rounded-full hover:bg-yellow-700 transition-colors shadow-sm flex items-center"
        >
          <span className="w-2 h-2 bg-white rounded-full mr-1.5"></span>
          已认证 ({stats.tested})
        </Link>
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

      {/* 项目介绍 - 全新设计 */}
      {!hasSearched && (
        <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8">
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-500/5 dark:bg-green-500/10 rounded-full -ml-40 -mb-40"></div>
          
          <div className="relative">
            {/* 标题区域 */}
            <div className="flex items-center mb-8">
              <div className="bg-blue-600 dark:bg-blue-500 rounded-xl p-3 mr-4 shadow-md">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">关于本项目</h2>
            </div>
            
            {/* 内容区域 - 卡片式布局 */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* 左侧：项目介绍 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  项目简介
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  翼龙面板中文Egg资源站是一个公益性质的资源汇总平台，旨在解决国内用户在使用翼龙面板部署游戏/应用服务器时面临的"英文Egg门槛高、资源分散、适配性不明"等痛点。
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  我们提供经过汉化和优化的Egg资源，包含详细的配置说明和使用教程，帮助用户快速部署各类服务器。
                </p>
              </div>
              
              {/* 右侧：项目特点 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  项目特点
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">中文化界面与配置，降低使用门槛</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">经过测试认证，确保稳定可用</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">详细的配置说明与使用教程</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">社区驱动，持续更新与优化</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* 底部按钮 */}
            <div className="mt-8 flex justify-center">
              <Link 
                to="/about" 
                className="group inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                <span>了解更多详情</span>
                <svg className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage; 