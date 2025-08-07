const fs = require('fs');
const path = require('path');

/**
 * 从Markdown文件中提取元数据（作为备用）
 * @param {string} mdContent Markdown文件内容
 * @returns {Object} 提取的元数据
 */
function extractMetadataFromMd(mdContent) {
  // 提取标题
  const titleMatch = mdContent.match(/^# (.+)/m);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // 提取描述
  const descMatch = mdContent.match(/## 简介\s+([^#]+)/m);
  const description = descMatch 
    ? descMatch[1].trim().split('\n')[0].replace(/\r/g, '') 
    : '';

  return {
    title,
    description
  };
}

/**
 * 将中文分类名转换为有效的变量名
 * @param {string} category 中文分类名
 * @returns {string} 有效的变量名
 */
function getCategoryKey(category) {
  const mapping = {
    '游戏服务器': 'gameServers',
    '应用服务器': 'appServers',
    '数据库': 'databases',
    '其他': 'others'
  };
  
  return mapping[category] || 'others';
}

/**
 * 生成egg索引
 */
async function generateEggsIndex() {
  console.log('开始生成egg索引...');
  
  // 扫描eggs目录
  const eggsDir = path.join(__dirname, '../src/data/eggs');
  const eggFolders = fs.readdirSync(eggsDir).filter(file => 
    fs.statSync(path.join(eggsDir, file)).isDirectory()
  );
  
  console.log(`找到 ${eggFolders.length} 个egg文件夹`);
  
  // 按类别组织索引
  const categories = {
    '游戏服务器': [],
    '应用服务器': [],
    '数据库': [],
    '其他': []
  };
  
  // 生成索引数组
  for (const folder of eggFolders) {
    const folderPath = path.join(eggsDir, folder);
    const files = fs.readdirSync(folderPath);
    
    const mdFile = files.find(file => file.endsWith('.md'));
    // const eggJsonFile = files.find(file => file.endsWith('.json') && !file.startsWith('metadata'));
    // 先查找带有 egg 的 JSON 文件（不区分大小写）
    const eggJsonWithEgg = files.find(file => 
      file.endsWith('.json') && 
      !file.startsWith('metadata') && 
      file.toLowerCase().includes('egg')
    );
    // 如果找到带有 egg 的，则使用它，否则使用原来的逻辑
    const eggJsonFile = eggJsonWithEgg || files.find(file => 
      file.endsWith('.json') && 
      !file.startsWith('metadata')
    );
    const metadataFile = files.find(file => file === 'metadata.json');
    
    // 收集额外文件信息
    const additionalFiles = files.filter(file => {
      // 排除基本三个文件
      return file !== mdFile && 
             file !== eggJsonFile && 
             file !== metadataFile &&
             // 排除隐藏文件
             !file.startsWith('.');
    }).map(file => {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        path: `${folder}/${file}`,
        size: stats.size,
        isDirectory: stats.isDirectory()
      };
    });
    
    if (mdFile && eggJsonFile) {
      try {
        let eggIndex = null;
        
        // 优先使用metadata.json作为索引信息来源
        if (metadataFile) {
          const metadataContent = fs.readFileSync(path.join(folderPath, metadataFile), 'utf8');
          const metadata = JSON.parse(metadataContent);
          
          eggIndex = {
            id: folder,
            name: metadata.name || folder,
            path: `${folder}/${mdFile}`,
            jsonPath: `${folder}/${eggJsonFile}`,
            version: metadata.version || '1.0.0',
            category: metadata.category || '其他',
            description: metadata.description || '',
            author: metadata.author || '未知',
            date: metadata.date || new Date().toISOString().split('T')[0],
            tags: metadata.tags || [],
            localizationStatus: metadata.localizationStatus || '未汉化',
            optimizationStatus: metadata.optimizationStatus || '未优化',
            testStatus: metadata.testStatus || '未进行运行认证',
            icon: metadata.icon || '',
            downloadUrl: metadata.downloadUrl || `https://github.com/ptero-eggs/${folder}/blob/master/${eggJsonFile}`,
            additionalFiles: additionalFiles // 添加额外文件信息
          };
          
          console.log(`处理: ${folder} - 使用metadata.json`);
        } 
        // 如果没有metadata.json，则尝试从MD和JSON文件中提取信息
        else {
          // 读取文件内容
          const mdContent = fs.readFileSync(path.join(folderPath, mdFile), 'utf8');
          const jsonData = JSON.parse(fs.readFileSync(path.join(folderPath, eggJsonFile), 'utf8'));
          
          // 提取元数据
          const mdMetadata = extractMetadataFromMd(mdContent);
          
          // 构建egg索引项
          eggIndex = {
            id: folder,
            name: mdMetadata.title || jsonData.name || folder,
            path: `${folder}/${mdFile}`,
            jsonPath: `${folder}/${eggJsonFile}`,
            version: jsonData.version || '1.0.0',
            category: '其他',  // 默认分类为"其他"
            description: mdMetadata.description || jsonData.description || '',
            author: jsonData.author || '未知',
            date: new Date().toISOString().split('T')[0],
            tags: [],
            localizationStatus: '未汉化',
            optimizationStatus: '未优化',
            testStatus: '未进行运行认证',
            icon: '',
            downloadUrl: `https://github.com/ptero-eggs/${folder}/blob/master/${eggJsonFile}`,
            additionalFiles: additionalFiles // 添加额外文件信息
          };
          
          console.log(`处理: ${folder} - 从MD和JSON文件提取信息（缺少metadata.json）`);
        }
        
        // 添加到对应类别
        const category = eggIndex.category;
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(eggIndex);
        
      } catch (error) {
        console.error(`处理 ${folder} 时出错:`, error);
      }
    } else {
      console.warn(`警告: ${folder} 文件夹缺少必要的文件`);
    }
  }
  
  // 生成分类索引文件
  for (const [category, eggs] of Object.entries(categories)) {
    if (eggs.length > 0) {
      const categoryKey = getCategoryKey(category);
      const fileName = `eggs-${categoryKey}.js`;
      const filePath = path.join(__dirname, '../src/data/categories', fileName);
      
      // 确保目录存在
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }
      
      const fileContent = `// ${category} - 自动生成的Egg索引文件 - ${new Date().toISOString()}
export const ${categoryKey} = ${JSON.stringify(eggs, null, 2)};
`;
      
      fs.writeFileSync(filePath, fileContent);
      console.log(`已生成 ${category} 索引文件，包含 ${eggs.length} 个egg`);
    }
  }
  
  // 生成主索引文件
  const mainIndexPath = path.join(__dirname, '../src/data/eggs-index.js');
  let mainIndexContent = `// 自动生成的Egg索引文件 - ${new Date().toISOString()}
`;
  
  // 导入各分类
  const importedCategories = [];
  const importedCategoryKeys = new Set(); // 用于跟踪已导入的类别键
  
  for (const category of Object.keys(categories)) {
    if (categories[category].length > 0) {
      const categoryKey = getCategoryKey(category);
      
      // 避免重复导入
      if (!importedCategoryKeys.has(categoryKey)) {
        mainIndexContent += `import { ${categoryKey} } from './categories/eggs-${categoryKey}';\n`;
        importedCategories.push(categoryKey);
        importedCategoryKeys.add(categoryKey);
      }
    }
  }
  
  mainIndexContent += `
const eggsIndex = [
`;
  
  // 合并各分类
  for (const categoryKey of importedCategories) {
    mainIndexContent += `  ...${categoryKey},\n`;
  }
  
  mainIndexContent += `];

export default eggsIndex;
`;
  
  fs.writeFileSync(mainIndexPath, mainIndexContent);
  console.log(`已生成主索引文件，总共包含 ${Object.values(categories).flat().length} 个egg`);
}

// 执行生成
generateEggsIndex().catch(console.error); 