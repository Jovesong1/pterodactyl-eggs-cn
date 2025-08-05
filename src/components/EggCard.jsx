import { Link } from 'react-router-dom';

function EggCard({ egg }) {
  // 状态标签的颜色配置
  const statusColors = {
    // 汉化状态
    '已汉化': 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700',
    '部分汉化': 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700',
    '未汉化': 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700',
    // 优化状态
    '已优化': 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700',
    '未优化': 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600',
    // 测试状态
    '已通过运行认证': 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700',
    '未进行运行认证': 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600',
    '测试中': 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700',
  };

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
    if (name.length <= 10) return name;
    
    // 将名称按空格分割
    const words = name.split(' ');
    
    // 如果只有一个单词且长度超过10，截取前10个字符
    if (words.length === 1) return name.substring(0, 10);
    
    // 如果有多个单词，尝试取前两个单词
    if (words.length >= 2) {
      const shortName = words.slice(0, 2).join(' ');
      // 如果前两个单词仍然太长，截取
      return shortName.length <= 10 ? shortName : shortName.substring(0, 10);
    }
    
    return name;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* 游戏图标 */}
      <div className="relative h-40 overflow-hidden">
        {egg.icon ? (
          <img 
            src={egg.icon} 
            alt={`${egg.name} 图标`} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
        <div className="absolute top-0 right-0 p-2">
          <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-600 dark:bg-blue-700 text-white">
            {egg.version}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{egg.name}</h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{egg.description}</p>
        
        {/* 状态标签 */}
        <div className="mt-3 flex flex-wrap gap-2">
          {egg.localizationStatus && (
            <div className={`px-3 py-1 text-xs rounded-full border ${statusColors[egg.localizationStatus]} flex items-center`}>
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
              </svg>
              <span>{egg.localizationStatus}</span>
            </div>
          )}
          
          {egg.optimizationStatus && (
            <div className={`px-3 py-1 text-xs rounded-full border ${statusColors[egg.optimizationStatus]} flex items-center`}>
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
              <span>{egg.optimizationStatus}</span>
            </div>
          )}
          
          {egg.testStatus && (
            <div className={`px-3 py-1 text-xs rounded-full border ${statusColors[egg.testStatus]} flex items-center`}>
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <span>{egg.testStatus}</span>
            </div>
          )}
        </div>
        
        {/* 标签 */}
        <div className="mt-3 flex flex-wrap gap-1">
          {egg.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">作者: {egg.author}</span>
          <Link 
            to={`/egg/${egg.id}`}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            查看详情
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EggCard; 