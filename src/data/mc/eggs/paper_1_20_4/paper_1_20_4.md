# Paper 1.20.4

## 简介

Paper是一个高性能的Minecraft服务端，基于Spigot，优化了服务器性能，支持插件。它是目前最受欢迎的服务端之一，适合各种规模的服务器使用。

## 特点

- **高性能**: 相比原版和Spigot，Paper提供了更好的性能优化
- **插件兼容**: 完全兼容Bukkit和Spigot插件
- **更多API**: 为开发者提供了更多API
- **积极维护**: 活跃的开发团队和社区支持
- **频繁更新**: 快速跟进Minecraft版本更新

## 系统要求

- **Java版本**: Java 17或更高版本
- **内存**: 最低2GB，推荐4GB或更多
- **存储空间**: 至少1GB可用空间
- **处理器**: 任何现代处理器(2核或更多)

## 安装指南

1. 在翼龙面板中导入此Egg
2. 创建新服务器并选择此Egg
3. 配置服务器参数，特别是分配足够的内存
4. 启动服务器（首次启动需下载服务端文件，耗时较长）
5. 服务器启动后，可以通过控制台或游戏内命令进行进一步配置

## 配置参数

Paper服务端有多个配置文件，主要包括：

### server.properties

基本的服务器配置文件，包含以下重要参数：

- `server-port`: 服务器端口，默认25565
- `gamemode`: 游戏模式(survival, creative, adventure, spectator)
- `difficulty`: 游戏难度(peaceful, easy, normal, hard)
- `max-players`: 最大玩家数
- `view-distance`: 视距，影响性能
- `spawn-protection`: 出生点保护范围

### paper.yml

Paper特有的配置文件，包含许多性能优化选项：

- `max-auto-save-chunks-per-tick`: 每tick自动保存的区块数
- `optimize-explosions`: 爆炸优化
- `mob-spawner-tick-rate`: 刷怪笼刷新率
- `entity-tracking-range`: 实体追踪范围

### spigot.yml

继承自Spigot的配置文件，包含：

- `view-distance`: 服务器视距覆盖
- `mob-spawn-range`: 生物生成范围
- `entity-activation-range`: 实体激活范围
- `tick-inactive-villagers`: 是否刻不活跃的村民

## 常见问题

1. **服务器启动缓慢**  
   首次启动时需要下载和生成世界，这是正常的。后续启动会更快。

2. **内存不足错误**  
   增加分配给服务器的内存，Paper建议至少分配2GB内存。

3. **插件不兼容**  
   确保使用的插件与当前Paper版本兼容。某些仅适用于特定版本的插件可能需要更新。

4. **TPS(每秒刻)低**  
   检查服务器负载，减少红石设备、实体数量，或调整paper.yml中的性能选项。

## 客户端要求

要连接到Paper 1.20.4服务器，客户端需要：

- Minecraft Java版 1.20.4
- 可以使用官方启动器或第三方启动器(如HMCL、PCL)
- 无需额外模组

## 相关链接

- [Paper官方网站](https://papermc.io/)
- [Paper文档](https://docs.papermc.io/)
- [Paper GitHub](https://github.com/PaperMC/Paper)
- [Minecraft官方网站](https://www.minecraft.net/) 