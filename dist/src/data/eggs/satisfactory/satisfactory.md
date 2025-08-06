# 幸福工厂

> [!IMPORTANT]
> ***更新到v1.0？***
> - 确保任何现有服务器都应用了更新的启动命令！
> - 现在需要TCP！（详见[服务器端口](#服务器端口)）
> - 虽然不是必须的，但建议现有服务器删除`~/FactoryGame/Saved/Config/`下的`LinuxServer`目录，以移除已弃用的设置，并通过游戏内服务器管理器重新配置设置。
___

### 游戏描述

来自Coffee Stain的[网站](https://www.satisfactorygame.com/)：
> 幸福工厂是一款第一人称开放世界工厂建造游戏，融合了探索和战斗元素。独自或与朋友一起游玩，探索外星球，创建多层工厂，进入传送带天堂！

___

### Egg功能

- 可配置为通过SteamCMD在启动时自动检查服务器更新。也可配置强制验证。
- 可配置轮换自动保存的数量。
- [*实验性*] 可配置最大玩家数。
- [*高级*] 可配置网络和服务器分支设置。

> [!NOTE]
> 从幸福工厂v1.0开始，大多数服务器设置已从在Egg中配置移至通过游戏内服务器管理器配置。\
> 请参阅[服务器初始化](#服务器初始化)了解可在游戏内配置的设置。

___

### 服务器端口

| 端口          | 默认值 | 协议     | 必需   | 说明                                                                                                                                                  |
|---------------|---------|-----------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| **主端口**   | 7777    | UDP & TCP | **是** | 客户端使用此端口连接。UDP是未加密的游戏流量。TCP也用于游戏内服务器管理器和API，并且是TLS加密的。 |
| **可靠消息** | 8888    | TCP       | **是** | 可靠消息端口。幸福工厂版本1.1及以上需要。                                                                    |

> [!TIP]
> \*您的内部端口**必须与**网络上的外部端口匹配（例如，您不能将外部端口7778转发到内部端口7777；它们必须匹配）。

___

### 安装/系统要求

|  | 最低要求 | 推荐配置 |
|---------|---------|---------|
| 处理器 | 支持现代指令集（如AVX、AES等）的最新x86/64（AMD/Intel）处理器。不支持32位或ARM。 | 偏好单核性能高于多核。如果您通过Proxmox运行Wings，您可能需要将VM的CPU类型设置为"host"以避免会话保存/加载崩溃。 |
| 内存 | 4608 MiB | 8192-12288 MiB（特别是对于4名玩家或大型保存文件） |
| 存储 | 5120 MiB | 7168-10240 MiB（或更多，取决于保存大小或频率） |
| 网络 | 1 Mbit/s | 1-5 Mbit/s（[可能需要服务器*和*客户端配置调整](https://satisfactory.wiki.gg/wiki/Multiplayer#Temporary_lag_solution)） |
| 主机操作系统 | 大多数稳定的Linux操作系统分支应该可以工作 | 使用已安装操作系统的最新内核版本可以防止一些边缘情况下的安装/启动问题。 |
| 游戏所有权 | 不需要启动。 | 需要完全"初始化"（见下面的[服务器初始化](#服务器初始化)） |

___

### 服务器初始化

> [!WARNING]
> 由于TLS证书尚未被信任，服务器无法通过主菜单中的"加入游戏->直接加入游戏..."首次加入。相反，通过"服务器管理器->添加服务器"加入，系统将提示您信任证书并初始化服务器。

要完全"初始化"服务器，拥有游戏的客户端必须登录服务器以"认领"它并创建管理员密码。然后，可以通过游戏内的"创建游戏"选项卡创建新会话，或上传现有保存文件（见下面的[保存文件](#保存文件)）。

管理员客户端可以通过服务器管理器的"服务器设置"选项卡配置以下杂项设置，目前**不**通过Egg设置：

- 服务器名称
- 管理员密码
- 玩家密码保护
- 自动加载会话名称
- 自动暂停（当没有玩家在线时）
- 玩家断开连接时自动保存
- 禁用季节性活动
- 自动保存间隔
- 服务器重启间隔
- 发送游戏数据（崩溃报告）
- 网络质量

> [!NOTE]
> 目前，第0级（入职）无法在专用服务器上玩，即使您上传处于第0级的保存，它也会自动解锁。如果您想玩游戏开始部分的入职，建议您先玩本地多人游戏，然后在完成第0级后上传您的保存。

___

### 保存文件

> [!CAUTION]
> 停止服务器**当前不会**保存您的游戏！在停止服务器之前确保已保存！

保存文件位于以下目录，但可以通过服务器管理器的"管理保存"选项卡（仅限管理员）更轻松地下载到本地计算机。

```md
/home/container/.config/Epic/FactoryGame/Saved/SaveGames/server
```

现有保存文件（包括单人游戏保存）也可以通过服务器管理器上传到服务器，并在同一选项卡下加载。

如果您忘记了管理员密码或通常希望将服务器重置为新服务器，您可以删除以下文件：

```md
/home/container/.config/Epic/FactoryGame/Saved/SaveGames/ServerSettings.<your_server_query_port>.sav
```

___

### 控制台命令

游戏内服务器管理器的"控制台"选项卡是执行命令的唯一方式。通过面板输入命令无效。

[已知命令列表可通过Wiki找到。](https://satisfactory.wiki.gg/wiki/Dedicated_servers#Console_commands)

___

### 已知错误/警告

以下在控制台中看到的错误或警告可以安全忽略：

```log
steamclient.so: cannot open shared object file: No such file or directory
[S_API] SteamAPI_Init(): Loaded '/home/container/.steam/sdk64/steamclient.so' OK.  (First tried local 'steamclient.so')
LogSteamShared: Warning: Steam Dedicated Server API failed to initialize.
```

↑ 尝试加载'steamclient.so'的本地文件，但由于它不存在而无法加载，导致警告消息。但是，备份`/home/container/.steam/sdk64/steamclient.so`成功加载（这是根据[Wiki](https://satisfactory.wiki.gg/wiki/Dedicated_servers#SteamAPI_Init():_Sys_LoadModule_failed_to_load:_/path/to/.steam/sdk64/steamclient.so)的正确行为）。

```log
Warning: failed to init SDL thread priority manager: SDL not found
```

↑ 这是Linux上与Steam相关软件的常见错误，但可以安全忽略。

```log
Exiting abnormally (error code: 130)
```

↑ 这个误导性消息在停止服务器时出现。它由虚幻引擎打印，因为它不知道为什么它被中断（即使它是我们预期的）。如果您注意到上面有正常的引擎关闭日志，这可以安全忽略。

```log
...Error: Couldn't find file for package...
```

```log
...Error: Navmesh bounds are too large!...
```

```log
...Warning: NiagaraSystem...
```

```log
LogStreaming: Warning: Failed to read file '../../../FactoryGame/Saved/SaveGames/GameAnalytics.sav' error.
```

↑ 这些似乎是游戏当前实验版本的常见错误消息。 