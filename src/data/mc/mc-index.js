// 自动生成的MC egg索引文件 - 2025-08-06T23:25:33.235Z

// MC版本列表
export const mcVersions = [
  {
    "id": "1.20.4",
    "name": "1.20.4",
    "cores": [
      "fabric_1_20_4"
    ],
    "servers": [
      "paper_1_20_4"
    ],
    "isLatest": true
  }
];

// MC核心列表
export const mcCores = [
  {
    "id": "fabric_1_20_4",
    "name": "Fabric 1.20.4",
    "path": "eggs/fabric_1_20_4/fabric_1_20_4.md",
    "jsonPath": "eggs/fabric_1_20_4/egg-fabric-1.20.4.json",
    "version": "1.0.0",
    "type": "core",
    "mcVersion": "1.20.4",
    "description": "轻量级模组加载器，启动快速，资源占用低，适合安装各种模组",
    "author": "Fabric Team",
    "date": "2023-12-10",
    "tags": [
      "轻量级",
      "模组支持",
      "启动快速"
    ],
    "performance": "高",
    "features": [
      "轻量级",
      "模组支持",
      "启动快速",
      "低资源占用"
    ],
    "requiresJava": "Java 17+",
    "clientSource": "",
    "clientDownloadUrl": "",
    "additionalFiles": []
  }
];

// MC服务端列表
export const mcServers = [
  {
    "id": "paper_1_20_4",
    "name": "Paper 1.20.4",
    "path": "eggs/paper_1_20_4/paper_1_20_4.md",
    "jsonPath": "eggs/paper_1_20_4/egg-paper-1.20.4.json",
    "version": "1.0.0",
    "type": "server",
    "mcVersion": "1.20.4",
    "description": "高性能的Minecraft服务端，基于Spigot，优化了服务器性能，支持插件",
    "author": "PaperMC Team",
    "date": "2023-12-10",
    "tags": [
      "高性能",
      "插件支持",
      "优化补丁"
    ],
    "performance": "高",
    "features": [
      "高性能",
      "插件支持",
      "优化补丁",
      "多线程处理"
    ],
    "requiresJava": "Java 17+",
    "clientSource": "官方启动器或第三方启动器",
    "clientDownloadUrl": "https://www.minecraft.net/zh-hans/download",
    "additionalFiles": []
  }
];

// 版本与核心/服务端的映射关系
export const versionMappings = {
  "1.20.4": {
    "cores": [
      "fabric_1_20_4"
    ],
    "servers": [
      "paper_1_20_4"
    ]
  }
};

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
