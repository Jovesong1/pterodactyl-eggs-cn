# Arma 3

***更新您的Egg？请参阅[如何更新Egg](#如何更新egg)以避免任何问题！***
___

## 作者/贡献者

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
            <a href="https://github.com/aussieserverhosts">
                <img src="https://avatars.githubusercontent.com/u/65438932" width="50px;" alt=""/><br /><sub><b>Aussie Server Hosts</b></sub>
            </a>
            <br />
            <a href="https://github.com/parkervcp/eggs/commits?author=aussieserverhosts" title="Codes">💻</a>
            <a href="https://github.com/parkervcp/eggs/commits?author=aussieserverhosts" title="Contributor">💡</a>
        </td>
        <td align="center">
            <a href="https://github.com/IAmSilK">
                <img src="https://avatars.githubusercontent.com/u/16708907" width="50px;" alt=""/><br /><sub><b>IAmSilK</b></sub>
            </a>
            <br />
            <a href="https://github.com/parkervcp/eggs/commits?author=IAmSilK" title="Codes">💻</a>
            <a href="https://github.com/parkervcp/eggs/commits?author=IAmSilK" title="Contributor">💡</a>
        </td>
        <td align="center">
            <a href="https://github.com/Yomanz">
                <img src="https://avatars.githubusercontent.com/u/5119107" width="50px;" alt=""/><br /><sub><b>Daave</b></sub>
            </a>
            <br />
            <a href="https://github.com/parkervcp/eggs/commits?author=Yomanz" title="Codes">💻</a>
            <a href="https://github.com/parkervcp/eggs/commits?author=Yomanz" title="Original Creator">⭐</a>
            <a href="https://github.com/parkervcp/eggs/commits?author=Yomanz" title="Retired from Development">💤</a>
        </td>
    </tr>
</table>
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

___

### 游戏描述

来自Bohemia Interactive的[网站](https://arma3.com/)：
> 在庞大的军事沙盒中体验真实的战斗游戏玩法。提供各种单人和多人内容，超过20种车辆和40种武器，以及无限的内容创作机会，这是PC上首屈一指的军事游戏。真实、多样、开放 - Arma 3带你走向战场。
___

### Egg功能

- 可配置为运行32位或64位版本的服务器
- 最大玩家数可配置并能够由主机强制执行（*请参阅[推荐的Egg修改](#推荐的egg修改)）
- 能够在启动时下载服务器更新
- 能够在启动时下载、更新和加载Steam Workshop模组（*请参阅[安装要求](#安装要求)）
  - 接受从Arma 3启动器导出的上传的HTML模组列表文件，以定义要在服务器上加载的模组。
  - 还接受手动列出的模组、CDLC和仅服务器端模组。
  - 根据其Steam Workshop页面的最后更新时间检查模组更新，以实现快速高效的更新检查。
  - 自动将模组的`.bikey`移动到`/keys/`目录。
- 可配置为下载创作者DLC
- 可配置为运行服务器的Beta/Performance二进制文件（如果需要；仅限高级用户）
- 可添加额外的[Arma 3启动参数](https://community.bistudio.com/wiki/Arma_3_Startup_Parameters)以微调性能
- 可配置为与主服务器并行运行最多5个无头客户端（可能需要额外的性能开销）
- 兼容[WHMCS](https://www.whmcs.com/)（*请参阅[推荐的Egg修改](#推荐的egg修改)）

___

### 安装要求

- 安装服务器需要一个有效的**真实**Steam账户，并**关闭Steam Guard**（默认的"anonymous"登录无法使用）。此账户*不需要*拥有Arma 3。出于安全原因，[Valve建议](https://developer.valvesoftware.com/wiki/SteamCMD#With_a_Steam_account)为您的专用服务器创建一个新的Steam账户。
- 要使自动Steam Workshop模组下载功能正常工作，Steam账户*确实*需要拥有Arma 3。但是，这是可选功能，如果需要，可以手动将模组上传到服务器。主机可以随意将"禁用模组下载/更新"变量更改为`1`，如果他们不想向客户提供此功能。

___

### 服务器端口

下面列出了默认服务器端口，但主端口可以是任何端口。主端口之后还有三个端口，它们与主端口相关（例如：BattlEye端口总是比主端口高4个端口）。**正常服务器行为需要所有四个端口。**[建议](https://community.bistudio.com/wiki/Arma_3:_Dedicated_Server#Port_Forwarding)每个服务器之间相隔100个端口。

| 端口 | 默认值(UDP) |
|---------|---------|
| **Arma 3游戏和VON（主要）** | 2302 |
| Steam查询(+1) | 2303 |
| Steam端口(+2) | 2304 |
| BattleEye(+4) | 2306 |

___

### 安装/系统要求

|  | 最低配置 | 推荐配置 |
|---------|---------|---------|
| 处理器 | 最近的x86/64（AMD/Intel）处理器。不支持ARM。 | ARMA 3主要是CPU密集型的。与普遍认为的相反，服务器二进制文件*可以*在多个核心/线程上运行。然而，它管理异步任务和超线程的能力*非常*有限，这意味着额外的核心/线程很快就会达到收益递减。此外，它似乎也有限制，无法充分利用分配给它的所有CPU进行AI处理。因此，如果将使用大量AI单位，强烈建议使用无头客户端***和***正确编写的任务文件。 |
| 内存 | 2048 MiB | 3072 MiB（如果使用，每个无头客户端还会额外使用2048 MB内存） |
| 存储 | 20 GiB | 25-35 GiB（或更多，取决于下载的模组数量） |
| 网络 | 如果节点位于NAT后面，则需要Egg修改（*请参阅[定义主机注册绑定地址](#定义主机注册绑定地址)） | Wings节点不在NAT后面 |
| 游戏所有权 | 不需要拥有游戏来启动服务器，但需要拥有游戏才能下载模组。 | 拥有游戏 |

___

### 如何更新Egg

1. 在Pterodactyl面板中，转到**管理** > **Nests** > **Eggs** > **Arma 3**
2. 点击**Import**按钮
3. 将[egg-arma3.json](https://raw.githubusercontent.com/parkervcp/eggs/master/game_eggs/arma/arma3/egg-arma3.json)的内容粘贴到文本区域中
4. 点击**Import**按钮

___

### 推荐的Egg修改

#### 限制最大玩家数

如果您希望强制执行最大玩家数，可以将`Max Players`变量的`user_editable`值更改为`false`。这将防止服务器所有者更改此值。

#### 定义主机注册绑定地址

如果您的Wings节点位于NAT后面，您可能需要定义服务器的公共IP地址，以便它可以正确注册到主服务器。为此，请将以下内容添加到`startup`字符串中：

```
-ip={{SERVER_IP}}
```

#### 添加WHMCS支持

如果您使用WHMCS来管理您的游戏服务器，您可以添加以下变量以允许您的客户通过WHMCS配置他们的服务器：

```json
{
    "name": "Client Mods",
    "description": "A semicolon-separated list of client-side mods to load. These mods will be loaded by the server and will be required by clients. Any mods in this list that are in \"@workshopID\" form will also be included in Automatic Updates (if enabled). NO capital letters, spaces, or folders starting with a number! (ex. myMod;@123456789;@987654321;etc;)",
    "env_variable": "CLIENT_MODS",
    "default_value": "",
    "user_viewable": true,
    "user_editable": true,
    "rules": "nullable|string",
    "field_type": "text"
}
``` 