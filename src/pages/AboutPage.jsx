import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

function AboutPage() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMarkdown() {
      try {
        const response = await fetch('/src/data/about.md');
        if (!response.ok) {
          throw new Error(`无法加载内容: ${response.status}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error('加载Markdown失败:', err);
        setContent('# 加载失败\n\n无法加载关于页面内容，请稍后再试。');
      } finally {
        setLoading(false);
      }
    }
    
    loadMarkdown();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-4 bg-blue-200 dark:bg-blue-800 rounded w-32 mb-2"></div>
            <div className="h-4 bg-blue-200 dark:bg-blue-800 rounded w-64 mb-2"></div>
            <div className="h-4 bg-blue-200 dark:bg-blue-800 rounded w-48"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">关于本项目</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          翼龙面板中文 Egg 资源汇总站 - 连接国内翼龙生态的桥梁
        </p>
      </div>
      
      {/* 项目简介卡片 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-12">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3"></div>
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center mb-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
              <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">项目背景</h2>
              <p className="text-gray-600 dark:text-gray-300">
                本项目是一个公益性质的翼龙面板（Pterodactyl）中文 Egg 资源汇总平台，旨在解决国内用户在使用翼龙面板部署游戏/应用服务器时面临的痛点。
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">二次维护说明</h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-600 p-4 rounded-r-md mb-6">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                本项目是基于 <a href="https://github.com/ptero-eggs/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">https://github.com/ptero-eggs/</a> 进行的二次维护，主要是对 Egg 增加了中文的汉化和优化。
              </p>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              我们的目标是建立一个面向中文用户的 Egg 资源库，通过汉化、优化和本地化，降低使用门槛，推动翼龙生态在国内的普及与落地。
            </p>
          </div>
        </div>
      </div>
      
      {/* 项目特点 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          项目特点
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">中文本地化</h3>
            <p className="text-gray-600 dark:text-gray-300">
              对 Egg 配置、参数注释、错误提示进行全面的中文翻译，降低语言障碍，提升用户体验。
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">优化适配</h3>
            <p className="text-gray-600 dark:text-gray-300">
              针对国内网络环境和使用习惯进行优化，解决原版 Egg 在国内环境下的各种问题。
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">运行认证</h3>
            <p className="text-gray-600 dark:text-gray-300">
              对 Egg 进行实际环境测试，确保其在国内服务器环境下可以稳定运行，并提供详细的配置指南。
            </p>
          </div>
        </div>
      </div>
      
      {/* 项目目标 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          项目目标
        </h2>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <ul className="space-y-4">
            <li className="flex">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                <strong className="text-gray-800 dark:text-white">降低技术门槛：</strong> 通过中文化和详细文档，让更多非专业用户也能轻松部署游戏服务器。
              </p>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                <strong className="text-gray-800 dark:text-white">资源集中化：</strong> 将分散的 Egg 资源集中整理，提供统一的下载和更新渠道。
              </p>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                <strong className="text-gray-800 dark:text-white">社区共建：</strong> 鼓励用户参与贡献，形成良性的资源共享生态。
              </p>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-0.5">
                <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                <strong className="text-gray-800 dark:text-white">同步更新：</strong> 及时跟进官方 Egg 更新，确保用户能够使用最新版本。
              </p>
            </li>
          </ul>
        </div>
      </div>
      
      {/* 参与贡献 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          参与贡献
        </h2>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            我们欢迎所有对项目感兴趣的朋友参与贡献，无论是提交新的 Egg、优化现有 Egg，还是改进文档，都能帮助项目变得更好。
          </p>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">如何参与</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  在 GitHub 上提交 Issue 或 Pull Request
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  反馈使用过程中遇到的问题
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  分享您的使用经验和配置技巧
                </li>
              </ul>
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">GitHub 仓库</h3>
              <a 
                href="https://github.com/Jovesong1/pterodactyl-eggs-cn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <svg className="w-8 h-8 mr-3 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <div>
                  <div className="text-lg font-semibold text-gray-800 dark:text-white">pterodactyl-eggs-cn</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">访问我们的 GitHub 仓库</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Markdown 内容 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="prose max-w-none dark:prose-invert">
          <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default AboutPage; 