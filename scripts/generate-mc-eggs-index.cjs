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
 * 生成MC egg索引
 */
async function generateMcEggsIndex() {
  console.log('开始生成MC egg索引...');
  
  // 扫描MC eggs目录
  const mcEggsDir = path.join(__dirname, '../src/data/mc/eggs');
  
  // 确保目录存在
  if (!fs.existsSync(mcEggsDir)) {
    fs.mkdirSync(mcEggsDir, { recursive: true });
    console.log(`创建MC eggs目录: ${mcEggsDir}`);
  }
  
  const eggFolders = fs.readdirSync(mcEggsDir).filter(file => 
    fs.statSync(path.join(mcEggsDir, file)).isDirectory()
  );
  
  console.log(`找到 ${eggFolders.length} 个MC egg文件夹`);
  
  // 按类型组织索引
  const categories = {
    'cores': [], // 核心
    'servers': [] // 服务端
  };
  
  // 版本映射
  const versionMappings = {};
  
  // 生成索引数组
  for (const folder of eggFolders) {
    const folderPath = path.join(mcEggsDir, folder);
    const files = fs.readdirSync(folderPath);
    
    const mdFile = files.find(file => file.endsWith('.md'));
    const eggJsonFile = files.find(file => file.endsWith('.json') && !file.startsWith('metadata'));
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
            path: `eggs/${folder}/${mdFile}`,
            jsonPath: `eggs/${folder}/${eggJsonFile}`,
            version: metadata.version || '1.0.0',
            type: metadata.type || 'server', // 默认为服务端类型
            mcVersion: metadata.mcVersion || 'unknown', // MC版本
            description: metadata.description || '',
            author: metadata.author || '未知',
            date: metadata.date || new Date().toISOString().split('T')[0],
            tags: metadata.tags || [],
            performance: metadata.performance || '中等',
            features: metadata.features || [],
            requiresJava: metadata.requiresJava || 'Java 17+',
            clientSource: metadata.clientSource || '', // 客户端来源
            clientDownloadUrl: metadata.clientDownloadUrl || '', // 客户端下载地址
            additionalFiles: additionalFiles // 添加额外文件信息
          };
          
          console.log(`处理MC egg: ${folder} - 使用metadata.json - 类型: ${eggIndex.type}`);
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
            path: `eggs/${folder}/${mdFile}`,
            jsonPath: `eggs/${folder}/${eggJsonFile}`,
            version: jsonData.version || '1.0.0',
            type: 'server', // 默认为服务端类型
            mcVersion: 'unknown', // 默认MC版本未知
            description: mdMetadata.description || jsonData.description || '',
            author: jsonData.author || '未知',
            date: new Date().toISOString().split('T')[0],
            tags: [],
            performance: '中等',
            features: [],
            requiresJava: 'Java 17+',
            clientSource: '', // 客户端来源
            clientDownloadUrl: '', // 客户端下载地址
            additionalFiles: additionalFiles // 添加额外文件信息
          };
          
          console.log(`处理MC egg: ${folder} - 从MD和JSON文件提取信息（缺少metadata.json）`);
        }
        
        // 添加到对应类别
        const category = eggIndex.type === 'core' ? 'cores' : 'servers';
        categories[category].push(eggIndex);
        
        // 更新版本映射
        if (!versionMappings[eggIndex.mcVersion]) {
          versionMappings[eggIndex.mcVersion] = {
            cores: [],
            servers: []
          };
        }
        
        // 将ID添加到对应版本的映射中
        if (eggIndex.type === 'core') {
          versionMappings[eggIndex.mcVersion].cores.push(eggIndex.id);
        } else {
          versionMappings[eggIndex.mcVersion].servers.push(eggIndex.id);
        }
        
      } catch (error) {
        console.error(`处理MC egg ${folder} 时出错:`, error);
      }
    } else {
      console.warn(`警告: MC egg ${folder} 文件夹缺少必要的文件`);
    }
  }
  
  // 生成MC版本列表
  const versions = Object.keys(versionMappings).map(version => {
    return {
      id: version,
      name: version,
      cores: versionMappings[version].cores,
      servers: versionMappings[version].servers,
      isLatest: version === Object.keys(versionMappings).sort().reverse()[0]
    };
  });
  
  // 生成索引文件
  const mcIndexPath = path.join(__dirname, '../src/data/mc/mc-index.js');
  let indexContent = `// 自动生成的MC egg索引文件 - ${new Date().toISOString()}

// MC版本列表
export const mcVersions = ${JSON.stringify(versions, null, 2)};

// MC核心列表
export const mcCores = ${JSON.stringify(categories.cores, null, 2)};

// MC服务端列表
export const mcServers = ${JSON.stringify(categories.servers, null, 2)};

// 版本与核心/服务端的映射关系
export const versionMappings = ${JSON.stringify(versionMappings, null, 2)};

// 获取特定版本支持的核心
export function getCoresForVersion(versionId) {
  if (!versionMappings[versionId]) return [];
  return mcCores.filter(core => versionMappings[versionId].cores.includes(core.id));
}

// 获取特定版本支持的服务端
export function getServersForVersion(versionId) {
  if (!versionMappings[versionId]) return [];
  return mcServers.filter(server => versionMappings[versionId].servers.includes(server.id));
}

// 导出默认对象
export default {
  versions: mcVersions,
  cores: mcCores,
  servers: mcServers,
  versionMappings,
  getCoresForVersion,
  getServersForVersion
};
`;
  
  fs.writeFileSync(mcIndexPath, indexContent);
  console.log(`已生成MC索引文件，包含 ${categories.cores.length} 个核心和 ${categories.servers.length} 个服务端`);
}

// 执行生成
generateMcEggsIndex().catch(console.error); 