import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEggs, setFilteredEggs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  
  // 提取所有分类和标签
  const categories = [...new Set(eggsIndex.map(egg => egg.category))];
  const tags = [...new Set(eggsIndex.flatMap(egg => egg.tags))];
  
  // 状态筛选选项
  const statusFilters = [
    { id: 'localized', label: '已汉化', field: 'localizationStatus', value: '已汉化' },
    { id: 'optimized', label: '已优化', field: 'optimizationStatus', value: '已优化' },
    { id: 'tested', label: '已认证', field: 'testStatus', value: '已通过运行认证' }
  ];
  
  // 创建Fuse搜索实例
  const fuse = new Fuse(eggsIndex, {
    keys: ['name', 'description', 'tags', 'category'],
    threshold: 0.4,
    includeScore: true
  });

  // 处理从URL和其他页面传入的筛选条件
  useEffect(() => {
    // 从URL参数中获取筛选条件
    const filter = searchParams.get('filter');
    if (filter) {
      setSelectedStatus(filter);
    }
    
    // 检查是否有从分类页传入的筛选条件
    if (location.state) {
      if (location.state.filterCategory || location.state.selectedCategory) {
        setSelectedCategory(location.state.filterCategory || location.state.selectedCategory);
      }
      if (location.state.filterTag || location.state.selectedTag) {
        setSelectedTag(location.state.filterTag || location.state.selectedTag);
      }
    }
  }, [location, searchParams]);
  
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
    
    // 应用状态筛选
    if (selectedStatus) {
      const statusFilter = statusFilters.find(filter => filter.id === selectedStatus);
      if (statusFilter) {
        results = results.filter(egg => egg[statusFilter.field] === statusFilter.value);
      }
    }
    
    // 应用搜索筛选
    if (searchTerm) {
      const searchResults = fuse.search(searchTerm);
      results = searchResults
        .map(result => result.item)
        .filter(egg => {
          // 同时满足分类、标签和状态筛选条件
          let matchesFilters = true;
          
          if (selectedCategory) {
            matchesFilters = matchesFilters && egg.category === selectedCategory;
          }
          
          if (selectedTag) {
            matchesFilters = matchesFilters && egg.tags.includes(selectedTag);
          }
          
          if (selectedStatus) {
            const statusFilter = statusFilters.find(filter => filter.id === selectedStatus);
            if (statusFilter) {
              matchesFilters = matchesFilters && egg[statusFilter.field] === statusFilter.value;
            }
          }
          
          return matchesFilters;
        });
    }
    
    setFilteredEggs(results);
  }, [searchTerm, selectedCategory, selectedTag, selectedStatus]);

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
  
  // 处理状态筛选
  const handleStatusFilter = (status) => {
    setSelectedStatus(status === selectedStatus ? '' : status);
    
    // 更新URL参数
    if (status === selectedStatus) {
      searchParams.delete('filter');
    } else {
      searchParams.set('filter', status);
    }
    setSearchParams(searchParams);
  };
  
  // 清除所有筛选条件
  const clearAllFilters = () => {
    setSelectedCategory('');
    setSelectedTag('');
    setSelectedStatus('');
    setSearchTerm('');
    searchParams.delete('filter');
    setSearchParams(searchParams);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Egg资源列表</h1>
      
      {/* 搜索栏 */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {/* 状态筛选器 */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={clearAllFilters}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory && !selectedTag && !selectedStatus && !searchTerm
                ? 'bg-blue-600 dark:bg-blue-700 text-white shadow-md' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            全部资源
          </button>
          
          {statusFilters.map(filter => {
            // 计算每种状态的资源数量
            const count = eggsIndex.filter(egg => egg[filter.field] === filter.value).length;
            
            // 为不同状态设置不同的颜色
            const colors = {
              localized: 'bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600',
              optimized: 'bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-600',
              tested: 'bg-yellow-600 dark:bg-yellow-700 hover:bg-yellow-700 dark:hover:bg-yellow-600'
            };
            
            return (
              <button
                key={filter.id}
                onClick={() => handleStatusFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                  selectedStatus === filter.id 
                    ? `${colors[filter.id]} text-white shadow-md` 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span className="w-2 h-2 bg-white rounded-full mr-1.5"></span>
                {filter.label} ({count})
              </button>
            );
          })}
        </div>
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
          {selectedStatus && <span> 状态为 <span className="font-semibold">{statusFilters.find(f => f.id === selectedStatus)?.label}</span></span>}
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
            onClick={clearAllFilters}
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