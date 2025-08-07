# Ground Branch

***注意：游戏和服务器仍处于抢先体验阶段。随着更新的发布，您的使用体验可能会有所不同。***
___

### 作者/贡献者

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
    <tr>
        <td align="center">
            <a href="https://github.com/lilkingjr1">
                <img src="https://avatars.githubusercontent.com/u/4533989" width="50px;" alt=""/><br /><sub><b>Red-Thirten</b></sub>
            </a>
            <br />
            <a href="https://github.com/parkervcp/eggs/commits?author=lilkingjr1" title="Original Author">⭐</a>
            <a href="https://github.com/parkervcp/eggs/commits?author=lilkingjr1" title="Codes">💻</a>
        </td>
    </tr>
</table>
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

___

### 游戏描述

来自BlackFoot Studios的[网站](https://www.groundbranch.com/)：
> 来自原版彩虹六号®和幽灵行动®游戏背后的开发者之一，带来了一款讲究思考的第一人称射击游戏，具有深度的角色和武器定制功能。慢慢来。提前思考。完成任务。

___

### 配置功能

- 服务器查询端口的配置。
- 可配置为通过SteamCMD在启动时自动检查服务器更新。也可配置强制验证。
- 目前尚未探索模组（更多信息请参见[模组](#模组)）

___

### 服务器端口

- 下面列出了默认服务器端口，但两个端口都可以自由更改。
- ***正常服务器行为需要开放/分配两个端口！***

| 端口 | 默认值 (UDP) |
|---------|---------|
| **游戏（Pterodactyl中的主要端口）** | 7777 |
| 服务器查询 | 27015 |

___

### 安装/系统要求

|  | 最低要求 | 推荐配置 |
|---------|---------|---------|
| 处理器 | 不支持ARM。 | 最新的x86/64（AMD/Intel）处理器。 |
| 内存 | 550 MiB | 1024-4096 MiB |
| 存储 | 5632 MiB | 7168 MiB |
| 网络 | 3 MiB/s | 7 MiB/s |
| 游戏所有权 | 不需要启动。 | 推荐完全配置服务器（请参见下面的[服务器配置](#服务器配置)） |

___

### 服务器配置

**注意：服务器名称和最大玩家数将在每次服务器启动时被您的Pterodactyl启动设置覆盖。**

#### 游戏内设置（推荐）：

通过内置的管理菜单在游戏中配置服务器的所有方面（MOTD、游戏规则、地图列表、管理员等）是最简单（也是最安全）的方法。请按照以下步骤操作：

1. 启动服务器。
2. 在Pterodactyl的文件浏览器中导航到`/home/container/GroundBranch/ServerConfig`并打开`AdminSetupPassword.txt`。
3. 复制代码并启动您的个人Ground Branch游戏客户端。
4. 通过在服务器浏览器中搜索您在服务器的启动选项卡中设置的名称，登录您的服务器。
5. 按下`` ` ``打开控制台，并运行以下命令：`admin setup <your_setup_password>`。这将把您添加为超级管理员。
6. 运行命令`admin`将打开管理菜单，您可以在其中配置服务器的所有内容。

#### 手动设置（高级）：

服务器的所有配置文件都可以在这里找到：`/home/container/GroundBranch/ServerConfig`

请参考[非官方Ground Branch Wiki](https://unofficialgroundbranchwiki.com/en/dedicated-servers/getting-started)获取配置信息。

___

### 模组

在撰写本文时（2023/08/01），Ground Branch尚无工坊模组。但是，如果它们被引入或您想安装模组，可以将模组安装到`/home/container/steamapps/workshop/content/16900/`。服务器应该会将它们暂存到`/home/container/GroundBranch/Mods`，并在游戏内模组菜单中显示为"Mod ID #"。 