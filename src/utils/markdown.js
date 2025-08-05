/**
 * 从Markdown内容中提取frontmatter元数据
 * @param {string} markdown - Markdown文本内容
 * @returns {Object} 包含元数据的对象和剩余内容
 */
export function extractFrontmatter(markdown) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = markdown.match(frontmatterRegex);
  
  if (!match) {
    return {
      metadata: {},
      content: markdown
    };
  }
  
  const frontmatterStr = match[1];
  const content = markdown.replace(frontmatterRegex, '');
  const metadata = {};
  
  // 解析frontmatter
  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      let value = valueParts.join(':').trim();
      
      // 处理数组
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          value = value.slice(1, -1).split(',').map(item => item.trim());
        } catch (e) {
          console.error('解析frontmatter数组失败:', e);
        }
      }
      
      metadata[key.trim()] = value;
    }
  });
  
  return { metadata, content };
}

/**
 * 格式化日期
 * @param {string} dateStr - 日期字符串
 * @returns {string} 格式化后的日期
 */
export function formatDate(dateStr) {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    console.error('日期格式化失败:', e);
    return dateStr;
  }
} 