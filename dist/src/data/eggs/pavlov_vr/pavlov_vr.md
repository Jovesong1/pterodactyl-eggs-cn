# 帕夫洛夫 VR (Pavlov VR)

帕夫洛夫 VR 是一款多人 VR 射击游戏，高度注重社区功能。逼真的装弹功能和快节奏的战斗是核心体验的一部分。

## 推荐的服务器设置

### 最低内存要求

此服务器需要约 2048M 内存才能运行。3.2 GHz 的核心可以支持约 24 名玩家。由于 Pavlov VR 是单线程的，更快的时钟速度将意味着更高的性能。

### 在同一主机上运行多个服务器

如果您正在运行多个服务器并设置了额外的端口（参见[运行多个服务器](http://wiki.pavlov-vr.com/index.php?title=Dedicated_server#Running_multiple_servers_on_one_host)），则需要允许访问定义的端口以及比该端口高 400 的端口。因此，如果您使用 7000 作为端口，则需要开放 UDP 7000 和 7400。

### API 密钥

为了让您的服务器显示在服务器列表中，现在需要由 vankrupt 发放的 ApiKey。这是为了防止对主服务器的 DOS 攻击。

通过[点击这里](https://pavlov-ms.vankrupt.com/servers/v1/key)并使用您的手机号码接收短信来获取密钥（请注意，对于非美国手机，此短信系统已有报告的失败情况。在这种情况下，请向 davevillz 发送私信，提供您的手机号码并请求密钥）。

### Steam 创意工坊

从 Steam 创意工坊下载大型地图时，请确保您的节点分配了足够的 RAM 来将地图文件存储在其 tmpfs 中！这需要您修改 wings 配置以增加 tmpfs_size 值。

此外，由于 Pavlov 在临时目录中存储创意工坊地图的方式，持久保存创意工坊地图的唯一方法是为 /tmp/workshop 创建挂载点。有关挂载的帮助，请访问以下链接 - [使用 Pterodactyl 的挂载](https://pterodactyl.io/guides/mounts.html)

如需额外帮助，请参阅以下内容 - [专用服务器维基](http://wiki.pavlov-vr.com/index.php?title=Dedicated_server)

## 服务器端口

| 端口  | 默认值 |
|-------|---------|
| 游戏  |  7777   |
| 游戏  |  8177   |
| RCON  |  8188   | 