import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import eggsIndex from '../data/eggs-index';

function CategoriesPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // 为游戏名生成一个基于名称的渐变色
  const getGradientColors = (name) => {
    // 基于游戏名生成一个简单的哈希值
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    // 根据哈希值选择渐变色
    const gradients = [
      'from-blue-400 to-indigo-600',
      'from-purple-400 to-pink-600',
      'from-green-400 to-teal-600',
      'from-red-400 to-orange-600',
      'from-yellow-400 to-amber-600',
      'from-indigo-400 to-blue-600',
      'from-pink-400 to-rose-600',
      'from-teal-400 to-cyan-600',
    ];
    
    return gradients[Math.abs(hash) % gradients.length];
  };

  // 获取游戏名的简短显示版本（用于占位图）
  const getShortName = (name) => {
    // 如果名称很短，直接返回
    if (name.length <= 12) return name;
    
    // 将名称按空格分割
    const words = name.split(' ');
    
    // 如果只有一个单词且长度超过12，截取前12个字符
    if (words.length === 1) return name.substring(0, 12);
    
    // 如果有多个单词，尝试取前两个单词
    if (words.length >= 2) {
      const shortName = words.slice(0, 2).join(' ');
      // 如果前两个单词仍然太长，截取
      return shortName.length <= 12 ? shortName : shortName.substring(0, 12);
    }
    
    return name;
  };

  useEffect(() => {
    // 获取所有分类和标签
    const categoriesMap = {};
    const tagsMap = {};
    
    eggsIndex.forEach(egg => {
      // 处理分类
      if (egg.category) {
        if (!categoriesMap[egg.category]) {
          categoriesMap[egg.category] = 0;
        }
        categoriesMap[egg.category]++;
      }
      
      // 处理标签
      if (egg.tags && Array.isArray(egg.tags)) {
        egg.tags.forEach(tag => {
          if (!tagsMap[tag]) {
            tagsMap[tag] = 0;
          }
          tagsMap[tag]++;
        });
      }
    });
    
    // 转换为数组并排序
    const categoriesArray = Object.keys(categoriesMap).map(name => ({
      name,
      count: categoriesMap[name]
    })).sort((a, b) => b.count - a.count);
    
    const tagsArray = Object.keys(tagsMap).map(name => ({
      name,
      count: tagsMap[name]
    })).sort((a, b) => b.count - a.count);
    
    setCategories(categoriesArray);
    setTags(tagsArray);
  }, []);

  // 处理查看全部点击
  const handleViewAll = (category) => {
    navigate('/eggs', { state: { selectedCategory: category } });
  };

  // 处理标签点击
  const handleTagClick = (tag) => {
    navigate('/eggs', { state: { selectedTag: tag } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">分类浏览</h1>
      
      {/* 分类列表 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          按类别浏览
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{category.name}</h3>
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold px-3 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {category.count} 个 Egg 资源
                </p>
                <button 
                  onClick={() => handleViewAll(category.name)}
                  className="w-full py-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center"
                >
                  <span>查看全部</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 标签列表 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
          </svg>
          按标签浏览
        </h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <button
                key={index}
                onClick={() => handleTagClick(tag.name)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium transition-colors flex items-center"
              >
                {tag.name}
                <span className="ml-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs">
                  {tag.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* 热门推荐 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
          </svg>
          热门推荐
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {eggsIndex
            .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
            .slice(0, 4)
            .map((egg, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 overflow-hidden">
                  {egg.icon ? (
                    <img 
                      src={egg.icon} 
                      alt={`${egg.name} 图标`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-full h-full bg-gradient-to-br ${getGradientColors(egg.name)} flex items-center justify-center ${egg.icon ? 'hidden' : ''}`}
                  >
                    <div className="text-center px-4">
                      <div className="text-xl font-bold text-white">
                        {getShortName(egg.name)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{egg.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{egg.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">版本 {egg.version}</span>
                    <button 
                      onClick={() => navigate(`/egg/${egg.id}`)}
                      className="px-4 py-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-colors text-sm"
                    >
                      查看详情
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage; 