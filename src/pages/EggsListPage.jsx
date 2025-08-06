import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Fuse from 'fuse.js';
import SearchBar from '../components/SearchBar';
import EggCard from '../components/EggCard';
import eggsIndex from '../data/eggs-index';

function EggsListPage() {
  // 设置页面标题
  useEffect(() => {
    document.title = '全部Egg资源 - 翼龙面板中文Egg资源站';
  }, []);
  
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEggs, setFilteredEggs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  
  // 提取所有分类和标签
  const categories = [...new Set(eggsIndex.map(egg => egg.category))];
  const tags = [...new Set(eggsIndex.flatMap(egg => egg.tags))];
  
  // 创建Fuse搜索实例
  const fuse = new Fuse(eggsIndex, {
    keys: ['name', 'description', 'tags', 'category'],
    threshold: 0.4,
    includeScore: true
  });

  // 处理从其他页面传入的筛选条件
  useEffect(() => {
    // 检查是否有从分类页传入的筛选条件
    if (location.state) {
      if (location.state.filterCategory || location.state.selectedCategory) {
        setSelectedCategory(location.state.filterCategory || location.state.selectedCategory);
      }
      if (location.state.filterTag || location.state.selectedTag) {
        setSelectedTag(location.state.filterTag || location.state.selectedTag);
      }
    }
  }, [location]);
  
  // 当筛选条件变化时，更新显示的Egg列表
  useEffect(() => {
    let results = [...eggsIndex];
    
    // 应用分类筛选
    if (selectedCategory) {
      results = results.filter(egg => egg.category === selectedCategory);
    }
    
    // 应用标签筛选
    if (selectedTag) {
      results = results.filter(egg => egg.tags.includes(selectedTag));
    }
    
    // 应用搜索筛选
    if (searchTerm) {
      const searchResults = fuse.search(searchTerm);
      results = searchResults
        .map(result => result.item)
        .filter(egg => {
          // 同时满足分类和标签筛选条件
          return (!selectedCategory || egg.category === selectedCategory) && 
                 (!selectedTag || egg.tags.includes(selectedTag));
        });
    }
    
    setFilteredEggs(results);
  }, [searchTerm, selectedCategory, selectedTag]);

  // 处理搜索
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  // 处理分类筛选
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };
  
  // 处理标签筛选
  const handleTagFilter = (tag) => {
    setSelectedTag(tag === selectedTag ? '' : tag);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Egg资源列表</h1>
      
      {/* 搜索栏 */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {/* 筛选器 */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">按分类筛选</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory 
                  ? 'bg-blue-600 dark:bg-blue-700 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              全部
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category 
                    ? 'bg-blue-600 dark:bg-blue-700 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">按标签筛选</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === tag 
                    ? 'bg-blue-600 dark:bg-blue-700 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* 结果统计 */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-300">
          共找到 <span className="font-semibold">{filteredEggs.length}</span> 个Egg资源
          {selectedCategory && <span> 在 <span className="font-semibold">{selectedCategory}</span> 分类下</span>}
          {selectedTag && <span> 带有 <span className="font-semibold">{selectedTag}</span> 标签</span>}
          {searchTerm && <span> 匹配 <span className="font-semibold">"{searchTerm}"</span></span>}
        </p>
      </div>
      
      {/* Egg列表 */}
      {filteredEggs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEggs.map(egg => (
            <EggCard key={egg.id} egg={egg} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <svg className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-lg">没有找到符合条件的Egg资源</p>
          <button 
            onClick={() => {
              setSelectedCategory('');
              setSelectedTag('');
              setSearchTerm('');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            清除所有筛选条件
          </button>
        </div>
      )}
    </div>
  );
}

export default EggsListPage; 