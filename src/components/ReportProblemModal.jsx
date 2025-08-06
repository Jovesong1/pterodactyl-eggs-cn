import { useState } from 'react';

function ReportProblemModal({ isOpen, onClose, eggName, eggId }) {
  const [problemType, setProblemType] = useState('bug');
  const [description, setDescription] = useState('');

  // 如果模态窗口未打开，则不渲染
  if (!isOpen) return null;

  // 问题类型选项
  const problemTypes = [
    { id: 'bug', label: '运行错误/Bug' },
    { id: 'compatibility', label: '兼容性问题' },
    { id: 'translation', label: '翻译错误/缺失' },
    { id: 'outdated', label: '版本过时' },
    { id: 'other', label: '其他问题' }
  ];

  // 处理前往GitHub Issues
  const handleGoToGitHub = () => {
    // 获取问题类型的中文标签
    const problemTypeLabel = problemTypes.find(type => type.id === problemType)?.label || problemType;
    
    // 构建问题标题和内容
    const issueTitle = `[${problemTypeLabel}] ${eggName} 问题报告`;
    const issueBody = `
## 问题描述
${description}

## Egg信息
- Egg名称: ${eggName}
- Egg ID: ${eggId}
- 问题类型: ${problemTypeLabel}

## 系统环境
<!-- 请填写您的系统环境信息，如操作系统、翼龙面板版本等 -->

## 其他信息
<!-- 如有其他相关信息，请在此补充 -->
`;

    // 编码URL参数
    const encodedTitle = encodeURIComponent(issueTitle);
    const encodedBody = encodeURIComponent(issueBody);
    
    // 打开GitHub Issues页面
    window.open(`https://github.com/Jovesong1/pterodactyl-eggs-cn/issues/new?title=${encodedTitle}&body=${encodedBody}`, '_blank');
    
    // 关闭模态窗口
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* 背景遮罩 */}
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
        </div>

        {/* 模态窗口居中技巧 */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        {/* 模态窗口内容 */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  报告问题: {eggName}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    请填写以下信息，我们将引导您前往GitHub提交Issue。
                  </p>
                </div>

                {/* 表单 */}
                <div className="mt-4">
                  {/* 问题类型 */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      问题类型
                    </label>
                    <select
                      value={problemType}
                      onChange={(e) => setProblemType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {problemTypes.map(type => (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 问题描述 */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      问题描述
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="请详细描述您遇到的问题..."
                    ></textarea>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-600 p-4 rounded-r-md mb-4">
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      点击"前往GitHub"按钮后，您将被引导至GitHub Issues页面提交问题。如果您没有GitHub账号，需要先注册一个。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 按钮区域 */}
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleGoToGitHub}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              前往GitHub提交
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportProblemModal; 