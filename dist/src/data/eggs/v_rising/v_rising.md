# V Rising

### 作者 / 贡献者

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
    <tr>
        <td align="center">
            <a href="https://github.com/lilkingjr1">
                <img src="https://avatars.githubusercontent.com/u/4533989" width="50px;" alt=""/><br /><sub><b>Red-Thirten</b></sub>
            </a>
            <br />
            <a href="https://github.com/parkervcp/eggs/commits?author=lilkingjr1" title="Codes">💻</a>
        </td>
        <td align="center">
            <a href="https://github.com/kapatheus">
                <img src="https://avatars.githubusercontent.com/u/59861026" width="50px;" alt=""/><br /><sub><b>Kapatheus</b></sub>
            </a>
            <br />
            <a href="https://github.com/parkervcp/eggs/commits?author=kapatheus" title="Codes">💻</a>
            <a href="https://github.com/parkervcp/eggs/commits?author=kapatheus" title="Contributor">💡</a>
        </td>
    </tr>
</table>
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

___

### 游戏描述

来自Stunlock Studios的[网站](https://playvrising.com/):
> 作为吸血鬼觉醒。在附近的定居点猎取鲜血以恢复力量，躲避灼热的阳光以求生存。建造你的城堡，在充满神秘的不断变化的开放世界中繁荣发展。在线获得盟友，征服生者之地。

___

### Egg功能

- 目前通过Wine运行服务器的Windows版本。一旦发布了适当的原生Linux服务器二进制文件，此egg将会更新。
- 可配置为通过SteamCMD在启动时自动检查服务器更新。强制验证也是可配置的。
- 所有[正式认可的](https://github.com/StunlockStudios/vrising-dedicated-server-instructions/blob/master/1.0.x/INSTRUCTIONS.md#server-host-settings) `ServerHostSettings.json`设置可以通过启动变量自动配置。
  - 这包括：服务器名称、游戏设置预设、密码、最大玩家数、自动保存设置等...
  - 这不包括一些不常用的设置（例如启用API、禁用保存文件压缩等），但这些仍然可以通过在`~/save-data/Settings/`目录中创建自定义`ServerHostSettings.json`文件来修改。
- 支持RCON（*需要额外端口 – 参见[服务器端口](#服务器端口)）。有关RCON的更多信息，请参阅[手动配置主题](#手动配置主题)下的RCON部分。

___

### 服务器端口

- 下面列出了默认服务器端口，但这三个端口都可以自由更改。
- 唯一*必需*的端口是游戏端口，但查询端口需要服务器出现在服务器列表中（没有查询端口仍然可以直接连接）。还有报告称，服务器只有在受欢迎时才会出现在服务器列表中，在故障排除时请考虑这一点。
- 客户端通过游戏端口连接。
- RCON端口是可选的，仅在服务器所有者启用/使用RCON时才需要。

| 端口 | 默认值 | 协议 |
|---------|---------|---------|
| **游戏（Pterodactyl中的主要端口）** | 9876 | UDP |
| 查询 | 9877 | UDP |
| RCON | 25575 | TCP |

___

### 安装/系统要求

|  | 最低配置 | 推荐配置 |
|---------|---------|---------|
| 处理器 | 最近的x86/64（AMD/Intel）处理器。不支持32位或ARM。 | 未经证实的报告称，启用RCON时会使用明显更多的CPU，但我自己无法复现。 |
| 内存 | 3072 MiB | 4096-6144 MiB |
| 存储 | 3.5 GB | 5-10 GB（或更多，取决于保存大小或频率） |
| 游戏所有权 | 完全不需要。 | ---- |

___

### 手动配置主题

以下是涵盖egg不会自动处理的手动配置程序的各种主题，这些主题可能对服务器所有者有用：

#### 保存文件和自定义设置位置

您可以在`~/save-data/`目录中找到游戏设置和保存。

#### 服务器游戏设置

标准化的游戏设置可以通过"游戏设置预设"启动参数应用。如果您想要更多自定义设置来调整，可以将位于`~/VRisingServer_Data/StreamingAssets/Settings/`的`ServerGameSettings.json`文件复制到`~/save-data/Settings/`并根据需要调整。此外，确保"游戏设置预设"设置为空/null。[可以在此处找到](https://cdn.stunlock.com/blog/2022/05/25083113/Game-Server-Settings.pdf)每个设置的描述及其适用的最小/最大值列表。

#### 成为管理员

要在游戏中成为管理员，您首先需要打开`~/VRisingServer_Data/StreamingAssets/Settings/`下的`adminlist.txt`文件，并添加您的[steamID64](https://steamid.io/)（每行一个steamID64）。这可以在不重启服务器的情况下完成。要在游戏中成为管理员，您需要在选项菜单中启用控制台，用`` ` ``打开它，并使用`adminauth`控制台命令进行身份验证。一旦成为管理员，您可以使用许多管理命令，如`banuser`、`bancharacter`、`banned`、`unban`和`kick`。

如果您通过游戏内控制台禁止用户，服务器将自动修改`banlist.txt`文件，但您也可以手动修改它（每行一个steamID64）。

#### 将本地/客户端保存转移到服务器

[请仔细按照开发者的这些说明操作](https://github.com/StunlockStudios/vrising-dedicated-server-instructions/blob/master/1.0.x/INSTRUCTIONS.md#transfer-localclient-save-to-a-dedicated-server)。注意：`-saveName <n>`命令行参数和`GameSettingsPreset`设置分别由Egg的"保存名称"和"游戏设置预设"启动参数自动处理。另外，如果`~/save-data/Settings`目录中存在自定义`ServerGameSettings.json`文件，请删除它。

#### RCON

RCON可以允许远程向服务器发送一般和重启公告（这些功能目前不受控制台命令行支持）。您可以通过正确配置Pterodactyl服务器启动选项卡下的相关变量来启用RCON。RCON端口必须分配给服务器。[点击此处获取有效命令列表和推荐的RCON客户端](https://github.com/StunlockStudios/vrising-dedicated-server-instructions/blob/master/1.0.x/INSTRUCTIONS.md#rcon-1)。

## 安装指南

1. 在翼龙面板中导入此Egg
2. 创建新服务器并选择V Rising
3. 配置服务器参数（名称、密码、最大玩家数等）
4. 启动服务器（首次启动需下载游戏文件，耗时较长）
5. 在游戏中通过服务器列表或直接IP连接到服务器

## 配置参数

### 基本设置
- **服务器名称**: 在服务器浏览器中显示的名称
- **服务器密码**: 连接服务器所需的密码
- **最大连接用户数**: 服务器允许的最大玩家数
- **游戏设置预设**: 预定义的游戏规则集（PvP、PvE等）

### 高级设置
- **自动保存间隔**: 游戏自动保存的时间间隔（秒）
- **自动保存数量**: 保留的自动保存文件数量
- **服务器FPS**: 服务器运行的目标帧率 