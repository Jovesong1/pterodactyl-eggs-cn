# 无冬之夜：增强版

回到这款畅销的龙与地下城角色扮演游戏中的被遗忘的国度。结合了无冬之夜钻石版的所有内容以及全新的增强功能。包含100多小时的获奖冒险和创建自己冒险的工具！

请注意，这是一个非常古老的32位应用程序。文档和支持有限。

> [!重要]
> 由于当前Pterodactyl Wings守护进程中的一个错误（[git问题在此](https://github.com/pterodactyl/panel/issues/3830)），运行此服务器时，您的Wings守护进程**必须**配置为使用UID `1000`。否则，服务器将在打开时崩溃。简而言之，游戏期望当前用户存在，因为它使用它来构建工作目录路径，而默认情况下，为容器创建的用户的UID为1000。

### 服务器端口

| 端口 | 默认值 |
| ---- | ------- |
| 游戏 | 5121 |
| 脚本调试器 | 5122 |

## 内容和模块

这是一个基础服务器，不包含任何内容。所有内容必须自行提供。您可以通过购买游戏并将数据复制到服务器来获取官方模块。您也可以从各种社区网站使用玩家制作的模块，其中最受欢迎的是[Neverwinter Vault](https://neverwintervault.org/project/nwnee/module/land-thuul)。

### 安装官方数据

官方数据可以传输并在服务器上使用，但您必须拥有游戏的副本才能获取数据。

1. 浏览到游戏的本地安装目录。
2. 将`data/`目录归档。
3. 在Pterodactyl中，导航到服务器视图并进入`Files`选项卡。
4. 将新的`data.zip`归档上传到服务器。
5. 将`data.zip`归档解压到`data/`目录中。

官方模块将位于：`data/mod/`

### 安装自定义模块

自定义模块是由其他玩家制作并分发供使用的模块。它们有各种形状和大小，可以在互联网上随处找到。最受欢迎的社区是[Neverwinter Vault](https://neverwintervault.org/project/nwnee/module/land-thuul)。

假设您正在使用[Neverwinter Vault](https://neverwintervault.org/project/nwnee/module/land-thuul)，找到您想要下载的模块。下载相应的文件并将它们上传到服务器上的适当目录。所有自定义模块（和一般的自定义数据）都位于`user`目录中。

下表显示了您可能在自定义模块中找到的不同文件类型以及它们需要放置的目录。某些模块可能会有所不同，需要将某些文件放入`override`文件夹中。请务必阅读模块的描述和任何README文件，以确保这些文件放置得当。

| 文件类型 | 文件夹 | 用途 |
| --- | --- | --- |
| `.mod` | `user/modules` | 模块主文件 |
| `.hak` | `user/hak` | 额外的游戏资源 |
| `.tlk` | `user/tlk` | 对话表（描述、名称等） |
| `.bic` | `user/localvault` | 角色文件 |
| `.wav` / `.bmu` | `user/music` | 音乐文件 