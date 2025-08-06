# Rust服务器

## 简介

Rust是一款多人在线生存游戏，玩家需要在一个充满敌意的世界中收集资源、建造基地并与其他玩家互动。这个Egg提供了运行Rust专用服务器的配置。

## 服务器要求

- 内存: 至少8GB RAM (推荐16GB+)
- CPU: 至少4核心
- 存储: 至少20GB可用空间
- 网络: 稳定的网络连接，推荐带宽≥20Mbps

## 安装指南

1. 在翼龙面板中导入此Egg
2. 创建新服务器并选择此Egg
3. 配置服务器参数
4. 启动服务器

## 配置参数

| 参数名 | 描述 | 默认值 |
|-------|------|-------|
| APP_PORT | 游戏端口 | 28015 |
| RCON_PORT | RCON远程控制端口 | 28016 |
| QUERY_PORT | 查询端口 | 28017 |
| RCON_PASSWORD | RCON密码 | changeme |
| SERVER_NAME | 服务器名称 | Rust服务器 |
| SERVER_DESCRIPTION | 服务器描述 | 由翼龙面板搭建的Rust服务器 |
| SERVER_URL | 服务器网址 | https://pterodactyl.io |
| SERVER_IDENTITY | 服务器标识 | rust |
| SERVER_SEED | 地图种子 | 0 |
| SERVER_MAXPLAYERS | 最大玩家数 | 50 |
| SERVER_WORLDSIZE | 世界大小 | 3000 |

## 常见问题

### 服务器启动缓慢

Rust服务器首次启动需要下载游戏文件并生成地图，这可能需要较长时间，请耐心等待。

### 无法连接到服务器

确保游戏端口(默认28015)已在防火墙中开放，且没有被其他应用占用。

## 支持与反馈

如有问题，请在GitHub仓库提交issue或加入我们的QQ群：123456789 