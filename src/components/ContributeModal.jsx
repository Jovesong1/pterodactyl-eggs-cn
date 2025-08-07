import { useState } from 'react';

function ContributeModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('issues'); // 'issues' 或 'pr'
  const [eggName, setEggName] = useState('');
  const [eggType, setEggType] = useState('game');
  const [description, setDescription] = useState('');
  
  // GitHub仓库信息
  const repoInfo = {
    owner: 'Jovesong1', // 假设的仓库所有者，请替换为实际值
    repo: 'pterodactyl-eggs-cn',
    issuesUrl: 'https://github.com/Jovesong1/pterodactyl-eggs-cn/issues/new',
    prUrl: 'https://github.com/Jovesong1/pterodactyl-eggs-cn/compare'
  };
  
  // Egg类型选项
  const eggTypes = [
    { id: 'game', label: '游戏服务器' },
    { id: 'app', label: '应用服务器' },
    { id: 'database', label: '数据库' },
    { id: 'other', label: '其他' }
  ];

  // 处理前往GitHub Issues
  const handleGoToGitHub = () => {
    // 获取Egg类型的中文标签
    const eggTypeLabel = eggTypes.find(type => type.id === eggType)?.label || eggType;
    
    // 构建问题标题和内容
    const issueTitle = `[投稿] ${eggName || '新Egg资源'}`;
    const issueBody = `
## Egg资源投稿

### 基本信息
- Egg名称: ${eggName || '(请填写Egg名称)'}
- Egg类型: ${eggTypeLabel}

### 资源描述
${description || '(请填写资源描述)'}

### 资源来源
<!-- 请填写资源来源，如原始Egg链接、自制等 -->

### 汉化/优化内容
<!-- 如果是对现有Egg的汉化或优化，请说明做了哪些改动 -->

### 其他信息
<!-- 如有其他相关信息，请在此补充 -->

---
<!-- 如果您有已经准备好的Egg文件，可以附加在评论中或提供下载链接 -->
`;

    // 编码URL参数
    const encodedTitle = encodeURIComponent(issueTitle);
    const encodedBody = encodeURIComponent(issueBody);
    
    // 打开GitHub Issues页面
    window.open(`${repoInfo.issuesUrl}?title=${encodedTitle}&body=${encodedBody}`, '_blank');
    
    // 关闭模态窗口
    onClose();
  };
  
  // 如果模态窗口未打开，不渲染内容
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl overflow-hidden">
        {/* 模态窗口标题 */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">投稿 Egg 资源</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        {/* 标签页导航 */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('issues')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'issues' 
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            通过 Issues 投稿
          </button>
          <button
            onClick={() => setActiveTab('pr')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'pr' 
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            通过 Pull Request 投稿
          </button>
        </div>
        
        {/* 标签页内容 */}
        <div className="p-6">
          {/* Issues 投稿说明 */}
          {activeTab === 'issues' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">通过 Issues 投稿</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  适合不熟悉 Git 操作的用户，只需填写表单提交您的 Egg 资源或建议。
                </p>
                
                {/* 表单 */}
                <div className="space-y-4 mb-4">
                  {/* Egg名称 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Egg名称
                    </label>
                    <input
                      type="text"
                      value={eggName}
                      onChange={(e) => setEggName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="例如：Minecraft Java、Palworld等"
                    />
                  </div>
                  
                  {/* Egg类型 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Egg类型
                    </label>
                    <select
                      value={eggType}
                      onChange={(e) => setEggType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {eggTypes.map(type => (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* 资源描述 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      资源描述
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="请简要描述该Egg资源的用途、特点等..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-4">
                  <p className="text-blue-700 dark:text-blue-300">
                    提交 Issues 后，我们的维护团队会审核您的投稿并进行处理。
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <button 
                  onClick={handleGoToGitHub}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-lg shadow-md transition-colors flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  前往GitHub提交
                </button>
              </div>
            </div>
          )}
          
          {/* PR 投稿说明 - 简化版 */}
          {activeTab === 'pr' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">通过 Pull Request 投稿</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  适合熟悉 Git 操作的用户，您可以直接提交完整的 Egg 资源文件。
                </p>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4 mb-4">
                  <p className="text-yellow-700 dark:text-yellow-300">
                    提交 PR 前，请确保您的 Egg 资源符合项目规范。
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  {/* 左侧：步骤说明 */}
                  <div className="flex-1">
                    <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-200">投稿步骤：</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <li>Fork 本仓库</li>
                      <li>克隆您 Fork 的仓库到本地</li>
                      <li>在 src/data/eggs/ 目录下创建您的 Egg 资源文件夹</li>
                      <li>添加必要的文件</li>
                      <li>提交更改并推送到您的仓库</li>
                      <li>创建 Pull Request</li>
                    </ol>
                  </div>
                  
                  {/* 右侧：文件结构 */}
                  <div className="flex-1">
                    <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-200">必要文件：</h4>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <p className="mb-1">• [egg-name].md - Egg说明文档</p>
                      <p className="mb-1">• [egg-file].json - Egg配置文件</p>
                      <p>• metadata.json - Egg索引信息</p>
                    </div>
                  </div>
                </div>
                
                {/* 查看详细说明链接 */}
                <div className="mt-4 text-center">
                  <a 
                    href="https://github.com/Jovesong1/pterodactyl-eggs-cn#egg资源管理"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    查看详细说明文档 →
                  </a>
                </div>
              </div>
              
              <div className="flex justify-center">
                <a 
                  href={repoInfo.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-lg shadow-md transition-colors flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  创建 Pull Request
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContributeModal; 