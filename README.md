# 翼龙面板Eggs汉化项目

这个项目包含了针对[Pterodactyl面板](https://pterodactyl.io/)的Eggs资源汉化版本。这些汉化文件可以帮助中文用户更好地使用翼龙面板部署各种服务器。

## 项目简介

翼龙面板(Pterodactyl)是一款开源的游戏服务器管理面板，支持多种游戏和应用服务器的部署和管理。本项目旨在为中文用户提供汉化后的Eggs资源，使其能够更方便地使用翼龙面板。

## 已汉化的Eggs

目前已汉化的Eggs包括：

### 工具类

1. **SFTP 存储共享** - 利用翼龙面板内置的SFTP系统的存储共享服务
2. **Uptime Kuma** - 易于使用的自托管监控工具
3. **JTS3ServerMod** - TeamSpeak 3服务器机器人，提供多种管理功能

### 应用服务器

1. **TeamSpeak ARM64** - 针对ARM64架构的TeamSpeak服务器
2. **Yarr** - 自托管的RSS订阅源聚合器

### 游戏服务器

1. **Counter Strike 1.6 - 原版** - 经典的Counter-Strike 1.6服务器
2. **Counter Strike 1.6 - ReHLDS** - 优化版的CS 1.6服务器，基于ReHLDS
3. **Counter-Strike 2** - 最新的Counter-Strike 2服务器
4. **ClassiCube(MGC)** - 基于MCGalaxy的ClassiCube服务器

## 使用方法

1. 在`src/data/eggs/`目录中找到需要的egg文件
2. 下载对应的JSON文件
3. 在翼龙面板中导入egg文件
4. 创建新服务器时选择导入的egg模板

## 目录结构

- `src/data/eggs/` - 所有汉化后的egg文件
- `src/data/eggs/index.json` - 汉化egg的索引文件
- `src/data/README.md` - 详细的项目说明

## 贡献

欢迎提交更多的egg汉化或改进现有的汉化。请通过Pull Request或Issue参与贡献。

## 许可

本项目遵循与原始egg相同的许可条款。
