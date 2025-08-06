# Counter-Strike 2

## 简介

Counter-Strike 2是Valve开发的第一人称射击游戏，是Counter-Strike系列的最新作品。这个Egg提供了运行CS2专用服务器的配置。

## 服务器要求

- 内存: 至少4GB RAM (推荐8GB+)
- CPU: 至少4核心
- 存储: 至少30GB可用空间
- 网络: 稳定的网络连接，推荐带宽≥20Mbps

## 安装指南

1. 在翼龙面板中导入此Egg
2. 创建新服务器并选择此Egg
3. 配置服务器参数，特别是STEAM_GSLT（Steam游戏服务器登录令牌）
4. 启动服务器

## 配置参数

| 参数名 | 描述 | 默认值 |
|-------|------|-------|
| SRCDS_MAP | 默认地图 | de_dust2 |
| MAX_PLAYERS | 最大玩家数 | 12 |
| AUTO_UPDATE | 是否自动更新 | 1 (启用) |
| TV_PORT | SourceTV端口 | 27020 |
| STEAM_GSLT | Steam游戏服务器登录令牌 | (必填) |
| VAC_ENABLED | 是否启用VAC反作弊 | 1 (启用) |
| RCON_ENABLED | 是否启用RCON远程控制 | 1 (启用) |
| RCON_PASSWORD | RCON密码 | (自定义) |
| SERVER_PASSWORD | 服务器密码 | (留空为公开) |
| SERVER_NAME | 服务器名称 | (自定义) |
| GAME_MODE | 游戏模式 | 0 |
| GAME_TYPE | 游戏类型 | 0 |

## 游戏模式与类型

不同的游戏模式和类型组合可以提供不同的游戏体验：

- 休闲模式：GAME_TYPE=0, GAME_MODE=0
- 竞技模式：GAME_TYPE=0, GAME_MODE=1
- 死亡竞赛：GAME_TYPE=1, GAME_MODE=2
- 军备竞赛：GAME_TYPE=1, GAME_MODE=0
- 爆破模式：GAME_TYPE=0, GAME_MODE=0
- 人质模式：GAME_TYPE=0, GAME_MODE=0 (使用cs_开头的地图)

## 常见问题

### 服务器不显示在公共列表中

确保您已正确配置STEAM_GSLT，这是服务器在公共列表中显示的必要条件。

### 无法连接到服务器

确保服务器端口已在防火墙中开放，且没有被其他应用占用。

## 支持与反馈

如有问题，请在GitHub仓库提交issue或加入我们的QQ群：123456789 