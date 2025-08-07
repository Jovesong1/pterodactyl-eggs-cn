# Counter-Strike 1.6 ReHLDS

## 描述
Counter-Strike 1.6 ReHLDS（反向工程的Half-Life专用服务器）是原始HLDS的优化和更新版本，旨在提高稳定性、性能和安全性。它为托管Counter-Strike 1.6服务器提供了一个现代平台，更好地支持自定义插件和模块。

这个egg提供了使用ReHLDS、MetaMod-R、AMX Mod X和其他流行工具设置Counter-Strike 1.6服务器所需的一切。



## 系统要求

| 组件    | 最低             | 推荐        |
|--------------|---------------------|--------------------|
| 处理器    | -                   | -                  |
| 内存          | 1 GB                | 2 GB               |
| 存储      | 2 GB                | 5 GB               |


## 服务器端口

运行服务器所需的端口，以表格形式展示。

| 端口    | 默认值 |
|---------|---------|
| 游戏    | 27015   |
| Source TV | 27020 |
| 客户端  | 27005   |
| Steam   | 26900   |


27015是默认端口，但可以使用任何端口。
唯一必需的端口是游戏端口，服务器可以在没有其他分配的情况下完美运行。


## 模块

- **ReHLDS**：改进的性能、崩溃保护和扩展功能。
- **MetaMod-R**：用于自定义服务器修改的插件加载器。
- **AMX Mod X**：用于服务器插件的高级脚本平台。
- **ReAPI**：通过新的本机函数增强插件功能。
- **ReGameDLL**：更新的游戏库，提供改进的功能。
- **Reunion**：一个Metamod插件，允许协议47和48的非Steam客户端连接到ReHLDS服务器


## 注意

- 服务器安装包含默认配置文件，如`server.cfg`、`listip.cfg`和`banned.cfg`。

有关进一步的配置或插件信息，请参阅官方[AMX Mod X文档](https://amxmodx.org/)或[ReHLDS GitHub存储库](https://github.com/dreamstalker/rehlds)。 