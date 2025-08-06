# Fabric 1.20.4

## 简介

Fabric是一个轻量级的Minecraft模组加载器，专为提高性能和减少资源占用而设计。它提供了一个现代化的模组API，使模组开发更加简单高效。Fabric相比于Forge启动更快，占用资源更少，是小型服务器和性能敏感场景的理想选择。

## 特点

- **轻量级**: 相比其他模组加载器，占用更少的系统资源
- **启动快速**: 服务器启动时间明显缩短
- **现代API**: 为模组开发者提供了现代化的API
- **兼容性好**: 与大多数Fabric模组兼容
- **频繁更新**: 快速跟进Minecraft版本更新

## 系统要求

- **Java版本**: Java 17或更高版本
- **内存**: 最低1.5GB，推荐3GB或更多
- **存储空间**: 至少500MB可用空间
- **处理器**: 任何现代处理器

## 安装指南

1. 在翼龙面板中导入此Egg
2. 创建新服务器并选择此Egg
3. 配置服务器参数
4. 启动服务器（首次启动需下载Fabric安装器和服务端文件）
5. 服务器启动后，可以通过FTP上传Fabric模组到mods文件夹

## 配置参数

Fabric服务端的配置与原版Minecraft类似，主要包括：

### server.properties

基本的服务器配置文件，包含以下重要参数：

- `server-port`: 服务器端口，默认25565
- `gamemode`: 游戏模式(survival, creative, adventure, spectator)
- `difficulty`: 游戏难度(peaceful, easy, normal, hard)
- `max-players`: 最大玩家数
- `view-distance`: 视距，影响性能
- `spawn-protection`: 出生点保护范围

### fabric-server-launcher.properties

Fabric特有的配置文件，包含启动参数设置。

## 安装模组

1. 通过FTP连接到服务器
2. 导航到服务器根目录下的`mods`文件夹（如果不存在，请创建一个）
3. 上传Fabric兼容的模组文件(.jar)
4. 重启服务器以加载模组

## 常见问题

1. **服务器崩溃**  
   检查日志文件，确认是否有模组冲突。尝试移除最近添加的模组，然后逐个添加以找出问题模组。

2. **模组不加载**  
   确保上传的模组是Fabric版本，而不是Forge版本。同时确认模组与当前Minecraft版本兼容。

3. **内存不足错误**  
   增加分配给服务器的内存，特别是当安装了多个大型模组时。

4. **版本不兼容**  
   确保所有模组都兼容当前的Minecraft和Fabric版本。

## 客户端要求

要连接到Fabric 1.20.4服务器，客户端需要：

- Minecraft Java版 1.20.4
- 安装相同版本的Fabric客户端
- 安装与服务器相同的模组（如果服务器使用了模组）

## 相关链接

- [Fabric官方网站](https://fabricmc.net/)
- [Fabric Wiki](https://fabricmc.net/wiki/start)
- [Fabric GitHub](https://github.com/FabricMC)
- [Fabric模组数据库](https://www.curseforge.com/minecraft/mc-mods?filter-game-version=2020709689%3A9366&filter-sort=4) 