# Enshrouded

### 游戏描述

Enshrouded是一款生存、制作和动作RPG战斗游戏，设置在一个庞大的基于体素的大陆中。当您穿越开放世界的山脉和沙漠时，您可以自由选择自己的道路并塑造自己的命运。

点燃古老的火焰之力，拼凑出地表下隐藏的故事碎片。

### 有用的链接

- 官网：https://enshrouded.com/
- Steam：https://store.steampowered.com/app/1203620/Enshrouded/
- Wiki：https://enshrouded.wiki.gg/wiki/Enshrouded_Wiki
- Discord：https://discord.gg/enshrouded

### 作者与贡献者
| 名称        | Github个人资料  | 请我喝杯咖啡 |
| ------------- |-------------|-------------|
|   Red-Banana-Official  | https://github.com/Red-Banana-Official | / |
|   Vapok   | https://github.com/Vapok | https://www.buymeacoffee.com/vapok |
|   QuintenQVD0   | https://github.com/QuintenQVD0 | / |
|   gOOvER   | https://github.com/gOOvER | https://ko-fi.com/B0B351D0Q  |

### 服务器端口

默认情况下，Enshrouded需要1个端口。

| 端口    | 默认值       |
|---------|---------------|
|游戏/查询   |     15637     |

## 配置

### **服务器配置存储在哪里？**
Enshrouded专用服务器配置存储在`enshrouded_server.json`中，该文件由此egg自动管理。

无需手动编辑此文件，**您可以直接在Pterodactyl面板中**使用环境变量**设置大多数关键值**。

---

### **如何配置服务器**
**大多数设置可以通过Pterodactyl的环境变量修改。**  
前往**Pterodactyl面板 → 服务器设置**，您可以在那里编辑：
- **服务器名称(`SRV_NAME`)** – 玩家在服务器列表中看到的名称。
- **用户组密码**：
  - **管理员组(`SRV_PW`)** – 授予管理员权限。
  - **朋友组(`SRV_PW2`)** – 授予减少的管理员权限。
  - **访客组(`SRV_PW3`)** – 用户的一般访问权限。
- **最大玩家数(`MAX_PLAYERS`)** – 玩家槽位数量(1-16)。

其他设置，如**游戏设置、IP绑定和日志位置**，仍然在`enshrouded_server.json`中管理

---

### **默认配置文件(`enshrouded_server.json`)**
在首次启动时，服务器将生成以下结构：

```json
{
    "enableTextChat": false,
    "enableVoiceChat": false,
    "gameSettings": {
        "aggroPoolAmount": "Normal",
        "bossDamageFactor": 1,
        "bossHealthFactor": 1,
        "dayTimeDuration": 1800000000000,
        "enableDurability": true,
        "enableGliderTurbulences": true,
        "enableStarvingDebuff": false,
        "enemyDamageFactor": 1,
        "enemyHealthFactor": 1,
        "enemyPerceptionRangeFactor": 1,
        "enemyStaminaFactor": 1,
        "experienceCombatFactor": 1,
        "experienceExplorationQuestsFactor": 1,
        "experienceMiningFactor": 1,
        "factoryProductionSpeedFactor": 1,
        "foodBuffDurationFactor": 1,
        "fromHungerToStarving": 600000000000,
        "miningDamageFactor": 1,
        "nightTimeDuration": 720000000000,
        "pacifyAllEnemies": false,
        "perkCostFactor": 1,
        "perkUpgradeRecyclingFactor": 0.5,
        "plantGrowthSpeedFactor": 1,
        "playerBodyHeatFactor": 1,
        "playerHealthFactor": 1,
        "playerManaFactor": 1,
        "playerStaminaFactor": 1,
        "randomSpawnerAmount": "Normal",
        "resourceDropStackAmountFactor": 1,
        "shroudTimeFactor": 1,
        "tamingStartleRepercussion": "LoseSomeProgress",
        "threatBonus": 1,
        "tombstoneMode": "AddBackpackMaterials",
        "weatherFrequency": "Normal"
    },
    "gameSettingsPreset": "Default",
    "ip": "0.0.0.0",
    "logDirectory": "./logs",
    "name": "My Enshrouded Server",
    "queryPort": 15637,
    "saveDirectory": "./savegame",
    "slotCount": 16,
    "userGroups": [
        {
            "canAccessInventories": true,
            "canEditBase": true,
            "canExtendBase": true,
            "canKickBan": true,
            "name": "Admin",
            "password": "ChangeMe1",
            "reservedSlots": 0
        },
        {
            "canAccessInventories": true,
            "canEditBase": true,
            "canExtendBase": true,
            "canKickBan": false,
            "name": "Friend",
            "password": "ChangeMe2",
            "reservedSlots": 1
        },
        {
            "canAccessInventories": false,
            "canEditBase": false,
            "canExtendBase": false,
            "canKickBan": false,
            "name": "Guest",
            "password": "ChangeMe3",
            "reservedSlots": 3
        }
    ],
    "voiceChatMode": "Proximity"
}
```

### 安装/系统要求

|           | 推荐配置  | 额外信息  |
|-----------|--------------|-------------|
| 处理器 | 最新的x86/64（AMD/Intel）处理器。 | 服务器至少需要4核。 |
| 内存       |  4-6 GB     |
| 存储   |  30 GB（或更多，取决于存档大小或频率） |

### 服务器不在服务器列表中显示？

服务器不在服务器列表中显示是一个已知问题。

作为解决方案，您可以通过Steam服务器浏览器中的IP:查询端口将服务器添加为收藏。 