# Project Zomboid

僵尸毁灭工程是终极僵尸生存游戏。无论是单人还是多人模式：您都需要通过掠夺、建造、制作、战斗、耕种和钓鱼来努力生存。游戏拥有硬核RPG技能系统、广阔的地图、高度可定制的沙盒和一只可爱的教程浣熊等待着不谨慎的玩家。那么，您将如何死亡？

## 配置

Project Zomboid在服务器启动时会创建备份，方法是将其SaveData复制到Temp中然后压缩。几天后，这些文件会变得非常大，导致您的服务器在启动时失败，并显示错误：`java.util.concurrent.ExecutionException: java.io.IOException: No space left on device`。

您可以在Project Zomboid服务器设置中通过`BackupsOnStart=false`禁用备份，或者增加wings配置文件config.yml中的`tmpfs_size`。

## 服务器端口

Project Zomboid需要一个用于游戏数据的端口和一个用于Steam的端口。

```log
> *** SERVER STARTED ****.
> *** Steam is enabled.
> Server is listening on port 16261 (for Steam connection) and port 16262 (for UDPRakNet connection).
> Clients should use 16261 port for connections.
```

| 端口        | 默认值 |
|-------------|---------|
| DefaultPort | 16261   |
| UDPPort     | 16262   | 