# Arma Reforger

***服务器版本目前被Arma开发者标记为早期访问！随着服务器软件添加更多功能，请经常检查egg更新。***
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
            <a href="https://github.com/Soljian">
                <img src="https://avatars.githubusercontent.com/u/4036453" width="50px;" alt=""/><br /><sub><b>Soljian</b></sub>
            </a>
            <br />
            <a href="https://github.com/parkervcp/eggs/commits?author=Soljian" title="Contributor">💡</a>
        </td>
    </tr>
</table>
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

___

### 游戏描述

来自Bohemia Interactive的[网站](https://reforger.armaplatform.com/)：
> 体验真实的冷战战斗，与朋友一起在广阔的51平方公里中大西洋岛屿上奋斗——或者担任游戏主持人，创建自己的场景供他人享受。
___

### Egg功能

- 可配置为通过SteamCMD在启动时自动检查服务器更新。强制验证也是可配置的。
- 能够在启动时下载和加载Arma Reforger Workshop模组（需要手动编辑`config.json`文件）。
- 通过启动参数配置`config.json`文件中的多个常用设置：
  - 服务器名称、密码、场景ID、禁用第三人称视角、最大FPS等...
- 最大玩家数可配置并能够由主机强制执行（*请参阅[限制最大玩家数](#限制最大玩家数)）。
- 兼容[WHMCS](https://www.whmcs.com/)。

___

### 服务器端口

| 端口 | 默认值 | 协议 | 必需 | 注释 |
|---------|---------|---------|---------|---------|
| **游戏** | 2001 | UDP | **是** | 面板中的主要端口 |
| A2S | 17777 | UDP | 否 | Steam查询 / 需要在`config.json`中额外配置 |
| RCON | 19999 | UDP | 否 | 需要在`config.json`中额外配置 |

___

### 安装/系统要求

|  | 最低配置 | 推荐配置 |
|---------|---------|---------|
| 处理器 | 最近的x86/64（AMD/Intel）处理器。不支持ARM。 | 在FPS不受限制的情况下，负载下可以使用高达300-600%的CPU（设置最大FPS以防止）。 |
| 内存 | 3328 MiB | 6144-8192 MiB |
| 存储 | 5 GB | 7-10 GB（或更多，取决于下载的模组数量） |
| 网络 | 如果节点位于NAT后面，将需要Egg修改（*请参阅[定义主机注册绑定地址](#定义主机注册绑定地址)） | Wings节点不在NAT后面 |
| 游戏所有权 | 不需要启动或下载模组。 | ---- |

___

### 如何添加模组

目前，向服务器添加模组很棘手，因为文档很少，而且很难找到模组ID。希望这种情况在未来会改变，但按照以下步骤可以使其工作：

1. 打开Arma Reforger客户端副本并订阅/下载任何您想添加到服务器的模组（目前，我不知道在不需要使用游戏的情况下找到模组ID的方法）。
2. 完成后，关闭游戏并导航到您计算机上的此文件夹：`My Documents\My Games\ArmaReforger\addons\`
3. 随意打开每个文件夹，找到您想要添加的模组并在文本编辑器中打开每个模组的`ServerData.json`文件。
4. 然后，在您的服务器面板上，打开`config.json`文件进行编辑。
5. 找到`"mods": []`并将其替换为以下内容：

```json
"mods": [
	{
		"modId": "591AF5BDA9F7CE8B",
		"name": "Capture & Hold",
		"version": "1.0.0"
	},
	{
		"modId": "9A51598BACFBFDE7",
		"name": "Explosive Goats Beta",
		"version": "0.5.42"
	}
]
```

6. 将`modId`更改为您找到的`ServerData.json`文件顶部的`id`值。
7. 将`name`更改为您找到的`ServerData.json`文件**顶部**的`name`值。
8. 将`version`更改为您找到的`ServerData.json`文件顶部的`version`值。
9. 对您想要添加的每个模组重复此操作，如上所示复制/粘贴`{}`部分。确保每个`{}`部分后面都有一个`,`，**除了**最后一项。

___

### 限制最大玩家数

如果您希望强制执行最大玩家数，可以将`Max Players`变量的`user_editable`值更改为`false`。这将防止服务器所有者更改此值。

___

### 定义主机注册绑定地址

如果您的Wings节点位于NAT后面，您可能需要定义服务器的公共IP地址，以便它可以正确注册到主服务器。为此，请将以下内容添加到`startup`字符串中：

```
-publicAddress={{SERVER_IP}}
```

如果您的节点位于NAT后面，并且您需要使用不同的端口转发，您还可以添加：

```
-publicPort={{SOME_OTHER_PORT}}
``` 