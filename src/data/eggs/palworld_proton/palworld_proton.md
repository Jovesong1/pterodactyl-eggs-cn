# 幻兽帕鲁 (Palworld)

### Steam 描述
在这款全新的多人开放世界生存与制作游戏中，与被称为"帕鲁"的神秘生物一起战斗、耕种、建造和工作！

### 作者 / 贡献者
<table>
    <tr>
        <td align="center">
            <a href="https://github.com/Ballaual">
                <img src="https://avatars.githubusercontent.com/u/38478976" width="50px;" alt=""/><br /><sub><b>Alexander Ballauf</b></sub>
            </a>
            <br />
            <a href="https://github.com/parkervcp/eggs/issues/2669#issuecomment-1900216079" title="Codes">💻</a>
            <a href="https://github.com/parkervcp/eggs/commits?author=Ballaual" title="Maintains">🔨</a>
        </td>
        <td align="center">
            <a href="https://github.com/QuintenQVD0">
                <img src="https://avatars.githubusercontent.com/u/67589015" width="50px;" alt=""/><br /><sub><b>QuintenQVD0</b></sub>
            </a>
            <br />
            <a href="https://github.com/parkervcp/eggs/issues/2669#issuecomment-1899999796" title="Codes">💻</a>
        <td align="center">
            <a href="https://github.com/hackles">
                <img src="https://avatars.githubusercontent.com/u/30584261" width="50px;" alt=""/><br /><sub><b>heckler</b></sub>
            </a>
            <br />
            <a href="https://github.com/parkervcp/eggs/issues/2669#issuecomment-1900043987" title="Contributor">💡</a>
        </td>
        </td>
        <td align="center">
            <a href="https://github.com/danny6167">
                <img src="https://avatars.githubusercontent.com/u/388231" width="50px;" alt=""/><br /><sub><b>Daniel Barton</b></sub>
            </a>
            <br />
            <a href="https://github.com/parkervcp/eggs/issues/2669#issuecomment-1900100992" title="Codes">💻</a>
        </td>  
        <td align="center">
            <a href="https://github.com/Rodhin">
                <img src="https://avatars.githubusercontent.com/u/13395074" width="50px;" alt=""/><br /><sub><b>Rodhin</b></sub>
            </a>
            <br />
            <a href="https://github.com/parkervcp/eggs/issues/2669#issuecomment-1900153550" title="Codes">💻</a>
        </td> 
        <td align="center">
            <a href="https://github.com/B0rbor4d">
                <img src="https://avatars.githubusercontent.com/u/33213807" width="50px;" alt=""/><br /><sub><b>B0rbor4d</b></sub>
            </a>
            <br />
            <a href="https://github.com/parkervcp/eggs/issues/2669#issuecomment-1900213758" title="Contributor">💡</a>
        </td>
        <td align="center">
            <a href="https://github.com/Simsz">
                <img src="https://avatars.githubusercontent.com/u/12779829" width="50px;" alt=""/><br /><sub><b>Zach</b></sub>
            </a>
            <br />
            <a href="https://github.com/parkervcp/eggs/issues/2669#issuecomment-1899954711" title="Contributor">💡</a>
        </td>         
    </tr>
</table>

## 已知问题 / 常见问题

1) 服务器不会在社区服务器选项卡中显示。<br>
-> 这是一个已知问题，开发者希望能尽快修复。最好的选择是通过IP和密码连接。

2) 服务器存在内存泄漏。<br>
-> 这也是一个已知问题。<br>
-> `bEnableInvaderEnemy` 选项似乎对当前内存使用量有很大影响。禁用它可能是个好选择。<br>
-> 提示：每6小时安排一次服务器重启。您可以根据您的系统调整这个值！<br>

3) 服务器不会在Steam服务器列表中显示。<br>
-> 目前不支持，将来可能也不会支持。

4) 配置文件在服务器重启时被删除/重置。<br>
-> 在编辑配置文件之前，请确保先完全停止服务器。否则所有更改都不会被保存。

## 推荐的服务器设置

### 内存

由于至少存在一个内存泄漏，服务器需要约16-32GB内存。<br>
根据[官方文档](https://tech.palworldgame.com/dedicated-server-guide)，您可以使用8GB内存启动服务器，但很快就会耗尽内存。<br>
最低配置应为16GB，但目前强烈建议使用32GB。<br>

### CPU

Intel / AMD 处理器，至少4核。

### 存储

截至2024年1月19日，服务器需要约5GB存储空间。随着后续内容/更新，这可能会增加。

## 服务器端口

| 端口            | 默认值 |
| --------------- | ------- |
| 游戏            | 8211    |
| RCON (可选) | 25575   |

RCON端口不需要分配。

### 更新

1. 更新您的egg
2. 将所有已创建服务器的启动脚本更新为egg现在提供的脚本
3. 然后点击重新安装，因为需要下载解析器应用程序
4. 由于Palworld开发者在v0.1.5.0版本中忘记向配置添加新的`bShowPlayerList`键，您需要自己添加。这在将来可能会修复。其默认值为False

配置文件末尾示例：`bUseAuth=True,bShowPlayerList=False,BanListURL="https://api.palworldgame.com/api/banlist.txt")`

### 变量解析

目前提供的解析器应用程序能够编辑截至2024年2月1日Palworld配置文件中存在的所有变量。

然而，egg中只包含最基本和必要的变量。
需要更多变量的用户将不得不自己添加。

查看哪个键对应哪个变量的列表，请参阅[这里](https://github.com/QuintenQVD0/Palword-server-config-parser?tab=readme-ov-file#key-with-variables)

**不存在的变量将自动跳过解析，因此您不必担心它会清空您的配置文件**

### Proton

有一个特殊的egg使用proton而不是附带`winmm.dll`和`RE-UE4SS`的原生linux版本，因此对于想要运行模组的用户来说是可能的。

请注意，这个egg的控制台输出是损坏的（感谢proton / wine），所以您只会看到解析器输出。RCON控制台仍然可以工作。

### 配置

配置文件位于以下路径：`Pal/Saved/Config/LinuxServer/PalWorldSettings.ini`，如果您运行的是proton egg，则为`Pal/Saved/Config/WindowsServer/PalWorldSettings.ini` 