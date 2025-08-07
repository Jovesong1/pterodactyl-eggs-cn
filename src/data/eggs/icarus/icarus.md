# Icarus

***注意：服务器版本目前被开发者标记为测试版。***
___

### 作者/贡献者

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
    <tr>
        <td align="center">
            <a href="https://github.com/BolverBlitz">
                <img src="https://avatars.githubusercontent.com/u/35345288" width="50px;" alt=""/><br /><sub><b>BolverBlitz</b></sub>
            </a>
            <br />
            <a href="https://github.com/BolverBlitz" title="Codes">💻</a>
            <a href="https://github.com/BolverBlitz" title="Maintains">🔨</a>
        </td>
    </tr>
</table>
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

___

### 游戏描述

Icarus是一款基于会话的生存游戏，最多支持8名合作玩家或单人玩家，大部分游戏内容发生在定时任务中。玩家在环绕行星的空间站上接受任务合同，然后降落到行星表面尝试完成目标。一旦任务计时器结束，降落舱就会返回空间站。如果玩家未能及时返回，他们的工作坊物品将留在表面，进度也会丢失。
游戏还支持没有重置的开放世界模式。

___

### Egg功能

- 目前通过Wine64运行Windows版本的服务器。
- 重启时自动更新。

___

### 服务器端口

- 下面列出了默认服务器端口，但所有三个端口都可以自由更改。
- 客户端通过游戏中的服务器列表连接。

| 端口    | 默认值 | 协议 |
|---------|---------|----------|
| 游戏    | 17777   | UDP      |
| 查询   | 27015   | UDP      |

___

### 安装/系统要求

|           | 推荐配置  | 额外信息  |
|-----------|--------------|-------------|
| 处理器 | 较新的x86/64 (AMD/Intel)处理器。不支持32位或ARM。 | 未经证实的报告称启用RCON时会显著增加CPU使用率，但我自己无法复现。 |
| 内存       |  8-16 GB     |
| 存储空间   |  14 GB (或更多，取决于存档大小或频率) |

___

#### 存档文件和自定义设置位置

您可以通过在启动参数中添加`-UserDir=`来定义设置的自定义目录。[更多信息](https://github.com/RocketWerkz/IcarusDedicatedServer/wiki/Server-Config-&-Launch-Parameters#-userdir)

#### 服务器游戏设置

[服务器配置和启动参数](https://github.com/RocketWerkz/IcarusDedicatedServer/wiki/Server-Config-&-Launch-Parameters) 