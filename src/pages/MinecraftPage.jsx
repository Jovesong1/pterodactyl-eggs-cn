import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mcVersions, mcCores, mcServers, getCoresForVersion, getServersForVersion } from '../data/mc/mc-index';

function MinecraftPage() {
  const [selectedVersion, setSelectedVersion] = useState(mcVersions.find(v => v.isLatest)?.id || '');
  const [cores, setCores] = useState([]);
  const [servers, setServers] = useState([]);
  const [activeTab, setActiveTab] = useState('versions'); // 'versions', 'cores', 'servers'
  
  // 设置页面标题
  useEffect(() => {
    document.title = '我的世界服务器资源 - 翼龙面板中文Egg资源站';
  }, []);
  
  // 当选择版本变化时，更新核心和服务端列表
  useEffect(() => {
    if (selectedVersion) {
      setCores(getCoresForVersion(selectedVersion));
      setServers(getServersForVersion(selectedVersion));
    }
  }, [selectedVersion]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 标题区域 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">我的世界服务器资源</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          为国内用户提供优质的我的世界服务器资源
        </p>
      </div>
      
      {/* 标签页导航 */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="flex flex-wrap">
          <button
            onClick={() => setActiveTab('versions')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'versions'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            游戏版本
          </button>
          <button
            onClick={() => setActiveTab('cores')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'cores'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            核心
          </button>
          <button
            onClick={() => setActiveTab('servers')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'servers'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            服务端
          </button>
        </nav>
      </div>
      
      {/* 版本选择器 */}
      <div className="mb-8">
        <label htmlFor="version-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          选择我的世界版本
        </label>
        <select
          id="version-select"
          value={selectedVersion}
          onChange={(e) => setSelectedVersion(e.target.value)}
          className="block w-full max-w-md px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        >
          {mcVersions.map(version => (
            <option key={version.id} value={version.id}>
              {version.name} {version.isLatest ? '(最新)' : ''}
            </option>
          ))}
        </select>
      </div>
      
      {/* 内容区域 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {activeTab === 'versions' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">我的世界版本</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mcVersions.map(version => (
                <div 
                  key={version.id} 
                  className={`p-4 rounded-lg border ${
                    version.id === selectedVersion 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  } hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => setSelectedVersion(version.id)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {version.name}
                      {version.isLatest && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                          最新
                        </span>
                      )}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{version.releaseDate}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {version.description || '无描述'}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>核心: {version.cores?.length || 0}</span>
                    <span>服务端: {version.servers?.length || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'cores' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              可用核心 - {selectedVersion}
            </h2>
            {cores.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cores.map(core => (
                  <div key={core.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{core.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        core.performance === '高' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : core.performance === '中等'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        性能: {core.performance}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{core.description}</p>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">特点:</h4>
                      <div className="flex flex-wrap gap-2">
                        {core.features.map((feature, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Java要求:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{core.requiresJava}</p>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <Link 
                        to={`/mc/core/${core.id}`} 
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                      >
                        查看详情
                      </Link>
                      <a 
                        href={core.downloadUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                      >
                        官方网站
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p>该版本暂无可用核心</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'servers' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              可用服务端 - {selectedVersion}
            </h2>
            {servers.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {servers.map(server => (
                  <div key={server.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{server.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        server.performance === '高' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : server.performance === '中等'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        性能: {server.performance}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{server.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">特点:</h4>
                        <div className="flex flex-wrap gap-2">
                          {server.features.map((feature, index) => (
                            <span 
                              key={index} 
                              className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">客户端要求:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {server.clientSource || '官方启动器或第三方启动器'}
                        </p>
                        {server.clientDownloadUrl && (
                          <a 
                            href={server.clientDownloadUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                          >
                            下载客户端
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Java要求:</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{server.requiresJava}</p>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                      <Link 
                        to={`/mc/server/${server.id}`} 
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                      >
                        查看详情
                      </Link>
                      <div className="flex space-x-2">
                        <a 
                          href={server.downloadUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                        >
                          官方网站
                        </a>
                        <a
                          href={`/src/data/mc/${server.jsonPath}`}
                          download={`${server.name}.json`}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                        >
                          下载Egg
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p>该版本暂无可用服务端</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MinecraftPage; 