# OpenRCT2
***注意:** OpenRCT2仅最近（2022年1月）更新以支持非交互式Docker环境，并且正在进行开发以改进它。请理解未来的更新可能不稳定，或者这个Egg可能在未来更新以适应变化。*
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
            <a href="https://github.com/parkervcp/eggs/commits?author=lilkingjr1" title="Codes">💻</a>
        </td>
        <td align="center">
            <a href="https://github.com/parkervcp">
                <img src="https://avatars.githubusercontent.com/u/1207679" width="50px;" alt=""/><br /><sub><b>parkervcp</b></sub>
            </a>
            <br />
            <a href="https://github.com/parkervcp/eggs/commits?author=parkervcp" title="Codes">💻</a>
            <a href="https://github.com/parkervcp/eggs/commits?author=parkervcp" title="Contributor">💡</a>
        </td>
        <td align="center">
            <a href="https://github.com/janisozaur">
                <img src="https://avatars.githubusercontent.com/u/550290" width="50px;" alt=""/><br /><sub><b>janisozaur</b></sub>
            </a>
            <br />
            <a href="https://github.com/OpenRCT2/OpenRCT2/commits?author=janisozaur" title="Codes">💻</a>
            <a href="https://github.com/OpenRCT2/OpenRCT2/commits?author=janisozaur" title="Contributor">💡</a>
        </td>
    </tr>
</table>
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

___
### 游戏描述
来自OpenRCT2的[网站](https://openrct2.io/)：
> OpenRCT2是过山车大亨2（RCT2）的开源重新实现，扩展了游戏的新功能，修复了错误并提高了游戏限制。游戏玩法围绕着建造和维护一个包含景点、商店和设施的游乐园。玩家必须尝试获利并保持良好的公园声誉，同时让游客保持快乐。OpenRCT2允许场景和沙盒游戏。场景要求玩家在规定的时间限制内完成特定目标，而沙盒允许玩家建造一个更灵活的公园，可选择没有限制或财务约束。
___
### 服务器端口
| 端口 | 默认值 (TCP) |
|---------|---------|
| 游戏 | 11753 |

___
### 安装/系统要求

|  | 最低配置 |
|---------|---------|
| 处理器 | x86/64 (*可能支持多架构的develop构建，但尚未测试) |
| 内存 | 256-512 MiB (取决于客户端数量和公园大小) |
| 存储 | 110 MB (*如果从源代码构建可能需要更多) |
| RCT2文件 | **不需要** |

___
### 存档文件
存档文件和自动保存位于以下目录：
```
/home/container/ServerData/save/
```
如果启用了"加载最新自动保存"启动变量，并且`autosave/`目录存在，服务器将加载最新的自动保存而不是指定的存档文件。
___
### 控制台命令
在Pterodactyl添加对交互式程序的控制台命令支持之前，通过面板的控制台输入命令不起作用（参考问题[pterodactyl/panel#3712](https://github.com/pterodactyl/panel/issues/3712)）。
___
### 成为服务器管理员
不幸的是，由于控制台命令目前无法注册，成为服务器的第一个管理员需要一些步骤，如下所示：
1. 确保"记录服务器操作"启动变量设置为"true"。
2. 启动服务器并使用您想要成为管理员的客户端加入。
3. 打开`ServerData/serverlogs/<服务器名称>/<最新日期>.txt`并复制您客户端用户名旁边的SHA1哈希值（也要记下用户名）。
4. 然后，打开`ServerData/users.json`。将哈希值粘贴到"hash"值中，将"name"值更改为您客户端的用户名，并保存文件。
5. 重启服务器，重新加入，您应该成为管理员！

成为管理员后，您可以使用游戏内的用户管理窗口更轻松地添加其他管理员（或组）。
___
### 已知问题
以下是在Pterodactyl上运行OpenRCT2时特有的已知问题，但可能只能通过OpenRCT2的进一步开发/更新来修复。
- 在服务器上配置密码会使非管理员客户端无法在其客户端中输入密码进行连接；它只会断开他们的连接。管理员客户端仍然可以正常加入。（参考问题[OpenRCT2/OpenRCT2#16396](https://github.com/OpenRCT2/OpenRCT2/issues/16396)）
- 您可能偶尔会遇到服务器因"浮点异常（核心转储）"错误而在启动时崩溃的情况。如果这种情况发生在您身上，请通过以下方式帮助OpenRCT2开发：
	1. 在服务器启动命令的开头添加以下内容：`SEGFAULT_SIGNALS=fpe LD_PRELOAD=/lib/x86_64-linux-gnu/libSegFault.so `
	2. 启动服务器。如果正常启动，不会打印额外内容。如果崩溃，它会将堆栈跟踪打印到控制台。
	3. 如果发生崩溃，复制整个堆栈跟踪，并将其保存到日志共享网站（如[Hastebin](https://www.hastebin.com)）。
	4. [向OpenRCT2提交新的错误报告问题](https://github.com/OpenRCT2/OpenRCT2/issues/new?assignees=&labels=bug&template=bug_report.yaml)并与他们分享您的日志。 