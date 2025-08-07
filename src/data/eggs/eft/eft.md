# 逃离塔科夫

# 单人塔科夫服务器

## 服务器安装后

运行服务器一次以生成合作模组所需的配置文件，然后使用您的外部IPv4编辑`/home/container/user/mods/SITCoop/config`中的`coopConfig.json`。

## 连接到服务器的客户端

[Stay in Tarkov](https://github.com/stayintarkov/StayInTarkov.Client)

一个逃离塔科夫BepInEx模块，设计用于与SIT.Aki-Server-Mod一起使用，最终目标是"离线"合作模式。

安装SIT客户端：
- 从官方启动器安装正版逃离塔科夫游戏。
- 从仓库安装[SIT Manager](https://github.com/stayintarkov/SIT.Manager.avalonia)。
- 之后，按照[`SIT Manager方法`](https://docs.stayintarkov.com/en/install.html#)中的说明进行操作。


## 服务器端口

运行服务器所需的端口，表格格式。

| 端口                 | 默认值 |
|----------------------|---------|
| 游戏                 | 6969    |
| SIT模组Websocket     | 6970    |
| Nat辅助WebSocket     | 6971    |

## 服务器组件

安装脚本基于[SIT.Docker](https://github.com/stayintarkov/SIT.Docker)。

[SPT-AKI服务器](https://dev.sp-tarkov.com/SPT-AKI/Server) 

SPT是逃离塔科夫的模组框架。

[SIT.Aki-Server-Mod](https://github.com/stayintarkov/SIT.Aki-Server-Mod)

一个SPT-Aki模组，用于与SPT-Aki服务器一起使用，允许合作模块与SPT-Aki服务器通信。 