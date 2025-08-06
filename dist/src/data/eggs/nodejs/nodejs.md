---
name: Node.js应用
version: 2.0.1
category: 应用服务器
description: 适用于翼龙面板的Node.js应用服务器
author: 翼龙中文社区
date: 2023-09-18
tags: [应用, Node.js, JavaScript]
---

# Node.js应用服务器

## 简介

Node.js是一个基于Chrome V8引擎的JavaScript运行环境，使开发者能够使用JavaScript构建服务器端应用程序。这个Egg提供了在翼龙面板上运行Node.js应用的配置。

## 服务器要求

- 内存: 至少512MB RAM (推荐1GB+)
- CPU: 至少1核心
- 存储: 至少500MB可用空间
- 网络: 稳定的网络连接

## 安装指南

1. 在翼龙面板中导入此Egg
2. 创建新服务器并选择此Egg
3. 上传你的Node.js应用代码或使用Git克隆
4. 配置启动命令和环境变量
5. 启动服务器

## 配置参数

| 参数名 | 描述 | 默认值 |
|-------|------|-------|
| STARTUP_CMD | 启动命令 | npm start |
| NODE_VERSION | Node.js版本 | 16 |
| USER_UPLOAD | 允许用户上传文件 | true |
| AUTO_UPDATE | 自动更新依赖 | false |
| DEFAULT_PORT | 默认端口 | 3000 |

## 常见问题

### 应用无法启动

确保package.json文件中定义了正确的启动脚本，并且所有依赖都已安装。可以尝试运行以下命令：

```bash
npm install
npm audit fix
```

### 端口访问问题

确保应用监听的是0.0.0.0而不是localhost或127.0.0.1，这样才能从外部访问。

## 支持与反馈

如有问题，请在GitHub仓库提交issue或加入我们的QQ群：123456789 