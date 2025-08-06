import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mcServers } from '../data/mc/mc-index';
import AdditionalFilesSection from '../components/AdditionalFilesSection';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

function MinecraftServerDetailPage() {
  const { id } = useParams();
  const [server, setServer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState('');
  
  useEffect(() => {
    // 设置页面标题
    document.title = '我的世界服务端详情 - 翼龙面板中文Egg资源站';
    
    // 查找对应的服务端
    const foundServer = mcServers.find(s => s.id === id);
    
    if (!foundServer) {
      setError('找不到该服务端资源');
      setLoading(false);
      return;
    }
    
    setServer(foundServer);
    
    // 加载Markdown内容
    async function loadServerData() {
      try {
        const mdResponse = await fetch(`/src/data/mc/${foundServer.path}`);
        if (!mdResponse.ok) {
          throw new Error(`无法加载服务端内容: ${mdResponse.status} - 路径: /src/data/mc/${foundServer.path}`);
        }
        const mdText = await mdResponse.text();
        setContent(mdText);
      } catch (err) {
        console.error('加载服务端数据失败:', err);
        setError(`无法加载服务端内容，请稍后再试 - ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    
    loadServerData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-blue-200 dark:bg-blue-800 h-16 w-16 mb-4"></div>
            <div className="h-4 bg-blue-200 dark:bg-blue-800 rounded w-32 mb-2"></div>
            <div className="h-3 bg-blue-100 dark:bg-blue-900 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !server) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 p-4 rounded-lg">
          <p className="font-bold text-lg mb-2">错误</p>
          <p className="mb-4">{error || '找不到该服务端资源'}</p>
          <Link to="/minecraft" className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline">
            返回我的世界页面
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 面包屑导航 */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">首页</Link>
        <span className="mx-2">/</span>
        <Link to="/minecraft" className="hover:text-blue-600 dark:hover:text-blue-400">我的世界</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 dark:text-gray-300 font-medium">{server.name}</span>
      </div>
      
      {/* 服务端头部信息 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row">
            {/* 服务端图标/标志 */}
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto md:mx-0 mb-6 md:mb-0 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-green-400 to-teal-600 flex items-center justify-center">
              <div className="text-center px-2">
                <div className="text-xl font-bold text-white">
                  {server.name}
                </div>
              </div>
            </div>
            
            {/* 标题和版本 */}
            <div className="md:ml-6 flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                <div>
                  <div className="flex items-center mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{server.name}</h1>
                    <span className="ml-3 px-3 py-1 bg-green-600 text-white text-xs font-bold uppercase rounded-full">
                      服务端
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">版本 {server.version}</p>
                </div>
                <span className="mt-2 md:mt-0 px-3 py-1 bg-blue-600 dark:bg-blue-700 text-white rounded-full text-sm font-semibold">
                  MC {server.mcVersion}
                </span>
              </div>
              
              {/* 描述 */}
              <p className="text-gray-600 dark:text-gray-300 text-lg mt-4 mb-6">{server.description}</p>
            
              {/* 性能标签和下载按钮 */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                  <div className={`px-3 py-1 text-xs rounded-full border ${
                    server.performance === '高' 
                      ? 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700' 
                      : server.performance === '中等'
                        ? 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700'
                        : 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700'
                  } flex items-center`}>
                    <span>性能: {server.performance}</span>
                  </div>
                  
                  <div className="px-3 py-1 text-xs rounded-full border bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700 flex items-center">
                    <span>Java: {server.requiresJava}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <a 
                    href={server.downloadUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    访问官网
                  </a>
                  
                  {server.clientDownloadUrl && (
                    <a 
                      href={server.clientDownloadUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg shadow-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                      </svg>
                      下载客户端
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* 特点标签 */}
          <div className="flex flex-wrap gap-2 mt-6">
            {server.features.map((feature, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧内容 */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="prose max-w-none dark:prose-invert">
                <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
          
          {/* 额外文件区域 */}
          {server.additionalFiles && server.additionalFiles.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">额外文件</h2>
                <AdditionalFilesSection files={server.additionalFiles} />
              </div>
            </div>
          )}
        </div>
        
        {/* 右侧侧边栏 */}
        <div className="lg:col-span-1">
          {/* 类型标识 */}
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
              </svg>
              <h2 className="text-lg font-bold text-green-800 dark:text-green-300">Minecraft 服务端</h2>
            </div>
            <p className="mt-2 text-green-700 dark:text-green-200 text-sm">
              服务端是Minecraft多人游戏的服务器软件，提供游戏世界和玩家互动的环境。
            </p>
          </div>
          
          {/* 客户端信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">客户端信息</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-1">客户端来源</h3>
                  <p className="text-gray-600 dark:text-gray-400">{server.clientSource || '官方启动器或第三方启动器'}</p>
                </div>
                
                {server.clientDownloadUrl && (
                  <a 
                    href={server.clientDownloadUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg shadow-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    下载客户端
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* 支持的MC版本 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">支持的MC版本</h2>
              <div className="flex flex-wrap gap-2">
                {server.supportedVersions && server.supportedVersions.map((version, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {version}
                  </span>
                ))}
                {!server.supportedVersions && (
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    {server.mcVersion}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* 相关链接 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">相关链接</h2>
              <ul className="space-y-2">
                <li>
                  <a 
                    href={server.downloadUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    官方网站
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.minecraft.net/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    Minecraft官网
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* 下载Egg */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">下载Egg</h2>
              <a 
                href={`/src/data/mc/${server.jsonPath}`}
                download={`${server.name}.json`}
                className="w-full px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg shadow-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                下载Egg文件
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MinecraftServerDetailPage; 