# Red-DiscordBot

## 来自他们的 [Github](https://github.com/Cog-Creators/Red-DiscordBot)

一个多功能Discord机器人

## 服务器端口

运行Red不需要任何端口。

如果您想使用内部Lavalink服务器，您需要将端口2333分配为主要端口

## 额外要求

当使用Audio Cog时，机器人会尝试将文件保存到/tmp目录，导致磁盘空间错误。当尝试安装cog时，由于pip使用/tmp来构建依赖项，您也可能会看到相同的错误。要解决此错误，您必须使用自定义容器策略增加`tmpfs`的大小。

更多详情请参阅：
<https://pterodactyl.io/wings/1.0/configuration.html#other-values>

### 模组/插件可能需要向服务器添加端口 