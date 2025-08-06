import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import eggsIndex from '../data/eggs-index';
import ReportProblemModal from '../components/ReportProblemModal';
import AdditionalFilesSection from '../components/AdditionalFilesSection';

function EggDetailPage() {
  const { id } = useParams();
  const [egg, setEgg] = useState(null);
  const [content, setContent] = useState('');
  const [eggJson, setEggJson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description'); // 'description', 'installation', 'configuration', 'variables', 'technical', 'files'
  const [tabContent, setTabContent] = useState({
    description: '',
    installation: '',
    configuration: '',
    variables: '',
    technical: '',
    files: []
  });
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

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

  // 从JSON文件中提取变量信息并格式化为Markdown
  const formatVariablesAsMarkdown = (jsonData) => {
    if (!jsonData || !jsonData.variables || jsonData.variables.length === 0) {
      return '### 暂无变量信息\n\n该Egg资源未定义任何变量。';
    }

    let markdown = '## 变量配置\n\n';
    markdown += '| 变量名 | 描述 | 默认值 | 用户可见 | 用户可编辑 |\n';
    markdown += '|-------|------|-------|---------|----------|\n';

    jsonData.variables.forEach(variable => {
      // 处理描述中的换行符，将其替换为空格
      const description = variable.description ? variable.description.replace(/\r?\n/g, ' ') : '无描述';
      markdown += `| ${variable.name} | ${description} | ${variable.default_value || '无默认值'} | ${variable.user_viewable ? '是' : '否'} | ${variable.user_editable ? '是' : '否'} |\n`;
    });

    return markdown;
  };

  // 从JSON文件中提取技术信息（启动脚本和安装脚本）
  const formatTechnicalInfoAsMarkdown = (jsonData) => {
    if (!jsonData) {
      return '### 暂无技术信息\n\n该Egg资源未提供技术信息。';
    }

    let markdown = '';

    // 添加基本信息
    markdown += '## 基本信息\n\n';
    markdown += `**名称:** ${jsonData.name || '未指定'}\n\n`;
    markdown += `**作者:** ${jsonData.author || '未指定'}\n\n`;
    markdown += `**描述:** ${jsonData.description || '未提供描述'}\n\n`;
    markdown += `**导出时间:** ${jsonData.exported_at || '未指定'}\n\n`;

    // 添加Docker镜像信息
    if (jsonData.docker_images && Object.keys(jsonData.docker_images).length > 0) {
      markdown += '## Docker镜像\n\n';
      markdown += '| 名称 | 镜像 |\n';
      markdown += '|------|------|\n';
      
      Object.entries(jsonData.docker_images).forEach(([name, image]) => {
        markdown += `| ${name} | ${image} |\n`;
      });
      markdown += '\n';
    }

    // 添加启动脚本
    if (jsonData.startup) {
      markdown += '## 启动脚本\n\n';
      markdown += '```bash\n';
      markdown += jsonData.startup;
      markdown += '\n```\n\n';
    }

    // 添加安装脚本
    if (jsonData.scripts && jsonData.scripts.installation && jsonData.scripts.installation.script) {
      markdown += '## 安装脚本\n\n';
      markdown += '```bash\n';
      markdown += jsonData.scripts.installation.script;
      markdown += '\n```\n\n';
      
      if (jsonData.scripts.installation.container) {
        markdown += `**容器:** ${jsonData.scripts.installation.container}\n\n`;
      }
      
      if (jsonData.scripts.installation.entrypoint) {
        markdown += `**入口点:** ${jsonData.scripts.installation.entrypoint}\n\n`;
      }
    }

    return markdown;
  };

  useEffect(() => {
    // 查找对应的Egg
    const foundEgg = eggsIndex.find(e => e.id === id);
    
    if (!foundEgg) {
      console.error(`找不到ID为 ${id} 的Egg资源`);
      setError('找不到该Egg资源');
      setLoading(false);
      return;
    }
    
    console.log('找到Egg资源:', foundEgg);
    setEgg(foundEgg);
    
    // 设置页面标题
    document.title = `${foundEgg.name} - 翼龙面板中文Egg资源站`;
    
    // 加载Markdown内容和JSON文件
    async function loadEggData() {
      try {
        // 加载Markdown文件
        const mdResponse = await fetch(`/src/data/eggs/${foundEgg.path}`);
        if (!mdResponse.ok) {
          throw new Error(`无法加载Egg内容: ${mdResponse.status} - 路径: /src/data/eggs/${foundEgg.path}`);
        }
        const mdText = await mdResponse.text();
        setContent(mdText);
        
        // 加载JSON文件
        const jsonResponse = await fetch(`/src/data/eggs/${foundEgg.jsonPath}`);
        if (!jsonResponse.ok) {
          console.warn(`无法加载Egg JSON文件: ${jsonResponse.status} - 路径: /src/data/eggs/${foundEgg.jsonPath}`);
        } else {
          const jsonData = await jsonResponse.json();
          setEggJson(jsonData);
        }
        
        // 简单处理内容，分割为不同的标签页内容
        const sections = mdText.split('## ');
        console.log('Markdown分割结果:', sections);
        let descContent = sections[0] || '';
        let installContent = '';
        let configContent = '';
        
        // 查找安装指南和配置参数部分
        for (let i = 1; i < sections.length; i++) {
          const section = sections[i];
          console.log(`处理第${i}个部分:`, section.substring(0, 30) + '...');
          if (section.toLowerCase().startsWith('安装') || section.toLowerCase().startsWith('installation')) {
            console.log('找到安装指南部分');
            installContent = '## ' + section;
          } else if (section.toLowerCase().startsWith('配置') || section.toLowerCase().startsWith('configuration')) {
            console.log('找到配置参数部分');
            configContent = '## ' + section;
          } else {
            // 其他部分添加到描述中
            console.log('将部分添加到描述中');
            descContent += '## ' + section;
          }
        }
        
        console.log('最终内容分割结果:', {
          description: descContent.substring(0, 100) + '...',
          installation: installContent ? installContent.substring(0, 100) + '...' : '无安装指南',
          configuration: configContent ? configContent.substring(0, 100) + '...' : '无配置参数'
        });
        
        // 设置额外文件
        const additionalFiles = foundEgg.additionalFiles || [];
        
        setTabContent({
          description: descContent,
          installation: installContent || '### 默认安装指南\n\n1. 在翼龙面板中导入此Egg\n2. 创建新服务器并选择此Egg\n3. 配置服务器参数\n4. 启动服务器（首次启动需下载游戏文件，耗时较长）',
          configuration: configContent || '### 暂无配置参数\n\n该Egg资源尚未提供详细的配置参数说明。',
          variables: '### 加载中...\n\n正在加载变量信息...',
          technical: '### 加载中...\n\n正在加载技术信息...',
          files: additionalFiles
        });
        
      } catch (err) {
        console.error('加载Egg数据失败:', err);
        setError(`无法加载Egg内容，请稍后再试 - ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    
    loadEggData();
  }, [id]);

  // 当JSON数据加载完成后，更新变量标签页内容和技术信息标签页
  useEffect(() => {
    if (eggJson) {
      const variablesMarkdown = formatVariablesAsMarkdown(eggJson);
      const technicalMarkdown = formatTechnicalInfoAsMarkdown(eggJson);
      
      // 更新标签页内容
      setTabContent(prev => ({
        ...prev,
        variables: variablesMarkdown,
        technical: technicalMarkdown
      }));
    }
  }, [eggJson]);

  // 处理下载按钮点击
  const handleDownload = () => {
    if (!egg || !egg.downloadUrl) {
      alert('暂无下载链接，请联系管理员');
      return;
    }
    
    // 如果是GitHub链接，直接打开
    if (egg.downloadUrl.includes('github.com')) {
      window.open(egg.downloadUrl, '_blank');
      return;
    }
    
    // 如果是本地文件，尝试下载
    try {
      const link = document.createElement('a');
      link.href = egg.downloadUrl;
      link.download = `${egg.name}-v${egg.version}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('下载失败:', err);
      alert('下载失败，请稍后再试');
    }
  };

  // 打开报告问题模态窗口
  const openReportModal = () => {
    setIsReportModalOpen(true);
  };

  // 关闭报告问题模态窗口
  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };

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

  if (error || !egg) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-200 p-4 rounded-lg">
          <p className="font-bold text-lg mb-2">错误</p>
          <p className="mb-4">{error || '找不到该Egg资源'}</p>
          
          {egg && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              <p className="font-semibold mb-2">调试信息:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>ID: {egg.id}</li>
                <li>名称: {egg.name}</li>
                <li>Markdown路径: {egg.path}</li>
                <li>JSON路径: {egg.jsonPath}</li>
              </ul>
              <div className="mt-4">
                <button 
                  onClick={() => window.open(`/src/data/eggs/${egg.path}`, '_blank')}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm mr-2"
                >
                  测试Markdown路径
                </button>
                <button 
                  onClick={() => window.open(`/src/data/eggs/${egg.jsonPath}`, '_blank')}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                >
                  测试JSON路径
                </button>
              </div>
            </div>
          )}
          
          <Link to="/" className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline">
            返回首页
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
        <Link to="/eggs" className="hover:text-blue-600 dark:hover:text-blue-400">Egg资源</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 dark:text-gray-300 font-medium">{egg.name}</span>
      </div>
      
      {/* Egg头部信息 - 卡片式设计 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row">
            {/* 游戏图标 */}
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto md:mx-0 mb-6 md:mb-0 rounded-lg overflow-hidden shadow-lg">
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
                <div className="text-center px-2">
                  <div className="text-xl font-bold text-white">
                    {getShortName(egg.name)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* 标题和版本 */}
            <div className="md:ml-6 flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{egg.name}</h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">版本 {egg.version}</p>
                </div>
                <span className="mt-2 md:mt-0 px-3 py-1 bg-blue-600 dark:bg-blue-700 text-white rounded-full text-sm font-semibold">
                  {egg.category}
                </span>
              </div>
              
              {/* 描述 */}
              <p className="text-gray-600 dark:text-gray-300 text-lg mt-4 mb-6">{egg.description}</p>
            
              {/* 状态标签和下载按钮 */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
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
                
                <div className="flex space-x-2">
                  <button 
                    onClick={handleDownload}
                    className="px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg shadow-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    下载
                  </button>
                  
                  <button 
                    onClick={openReportModal}
                    className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg shadow-md hover:bg-red-700 dark:hover:bg-red-600 transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    报告问题
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mt-6">
            {egg.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* 元数据信息 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 mt-6 pt-4">
            <div className="mb-2 md:mb-0 flex flex-wrap gap-x-4 gap-y-2">
              <span><strong>作者:</strong> {egg.author}</span>
              <span><strong>更新日期:</strong> {egg.date}</span>
              {eggJson && eggJson.name && <span><strong>原始名称:</strong> {eggJson.name}</span>}
              {eggJson && eggJson.author && <span><strong>原始作者:</strong> {eggJson.author}</span>}
            </div>
          </div>
        </div>
      </div>
      
      {/* 内容标签页 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex flex-wrap">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'description'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              详细说明
            </button>
            <button
              onClick={() => setActiveTab('installation')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'installation'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              安装指南
            </button>
            <button
              onClick={() => setActiveTab('configuration')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'configuration'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              配置参数
            </button>
            <button
              onClick={() => setActiveTab('variables')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'variables'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              变量设置
            </button>
            <button
              onClick={() => setActiveTab('technical')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'technical'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              技术信息
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'files'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              额外文件
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab !== 'files' ? (
            <div className="prose max-w-none dark:prose-invert">
              <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                {activeTab === 'description' 
                  ? tabContent.description 
                  : activeTab === 'installation' 
                    ? tabContent.installation 
                    : activeTab === 'configuration'
                      ? tabContent.configuration
                      : activeTab === 'variables'
                        ? tabContent.variables
                        : tabContent.technical}
              </ReactMarkdown>
            </div>
          ) : (
            <AdditionalFilesSection files={tabContent.files} />
          )}
        </div>
      </div>
      
      {/* 相关推荐 */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">相关推荐</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eggsIndex
            .filter(e => e.id !== egg.id && e.category === egg.category)
            .slice(0, 3)
            .map(relatedEgg => (
              <div key={relatedEgg.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/egg/${relatedEgg.id}`} className="block">
                  <div className="h-32 overflow-hidden">
                    {relatedEgg.icon ? (
                      <img 
                        src={relatedEgg.icon} 
                        alt={`${relatedEgg.name} 图标`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-full h-full bg-gradient-to-br ${getGradientColors(relatedEgg.name)} flex items-center justify-center ${relatedEgg.icon ? 'hidden' : ''}`}
                    >
                      <div className="text-center px-4">
                        <div className="text-lg font-bold text-white">
                          {getShortName(relatedEgg.name)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 dark:text-white">{relatedEgg.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">{relatedEgg.description}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
      
      {/* 报告问题模态窗口 */}
      <ReportProblemModal 
        isOpen={isReportModalOpen}
        onClose={closeReportModal}
        eggName={egg.name}
        eggId={egg.id}
      />
    </div>
  );
}

export default EggDetailPage; 