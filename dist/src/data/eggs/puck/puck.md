# Puck
### 游戏描述

穿上你的冰鞋，跳进这个基于物理的冰球游戏。没有规则，没有暂停，只要把冰球射入球门。愿最好的队伍获胜！

### 有用链接

- Steam: https://steamcommunity.com/app/2994020

### 作者和贡献者
| 名称        | Github个人资料  | 买杯咖啡 |
| ------------- |-------------|-------------|
|   Red-Banana-Official  | https://github.com/Red-Banana-Official | / |
|   Rai68   | https://github.com/rai68 | / |

### 服务器端口

默认情况下，Puck需要2个端口。

| 端口    | 默认值       |
|---------|---------------|
|游戏    |     7777     |
|查询   |     7778     |


## 配置

### **服务器配置存储在哪里？**
Puck专用服务器配置存储在`server_configuration.json`中，该文件由此egg自动管理。

不需要手动编辑此文件，**您可以直接在Pterodactyl面板中**使用环境变量设置大多数关键值。

---

### **默认配置文件（`server_configuration.json`）**
在首次启动时，服务器将生成以下结构：

```json
{
    "adminSteamIds": [],
    "isPublic": true,
    "kickTimeout": 300,
    "maxPlayers": 10,
    "name": "Pterodactyl Puck Server",
    "password": "",
    "phaseDurationMap": {
        "BlueScore": 5,
        "FaceOff": 3,
        "GameOver": 15,
        "PeriodOver": 15,
        "Playing": 300,
        "RedScore": 5,
        "Replay": 10,
        "Warmup": 600
    },
    "pingPort": 7778,
    "port": 7777,
    "printMetrics": true,
    "reloadBannedSteamIds": false,
    "targetFrameRate": 120,
    "tickRate": 100,
    "usePuckBannedSteamIds": true,
    "voip": false
}
```

### 安装/系统需求

|           | 推荐配置  | 额外信息  |
|-----------|--------------|-------------|
| 处理器 | 较新的x86/64（AMD/Intel）处理器。 | 服务器至少需要1个核心。 |
| 内存       |  1 GB     |
| 存储   |  1 GB（或更多，取决于存档大小或频率） | 