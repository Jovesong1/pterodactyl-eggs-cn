# Folding@Home

[Folding@Home](https://foldingathome.org/) 是一个分布式计算项目，旨在模拟蛋白质折叠和其他分子动力学。

## 用户账户

您可以设置用户账户来跟踪您的PPD（每日积分）和已完成的WU（工作单元）。要获取密钥，请访问 [Folding@home 密钥网站](https://apps.foldingathome.org/getpasskey)

## 团队

您可以将您获得的积分添加到您支持的团队中。这不是必需的，因为积分只是用来跟踪完成了多少工作（有一些例外）。这里是[团队的完整列表](https://stats.foldingathome.org/team)

## 远程控制

您可以通过FAHControl连接到您的实例。不支持WebUI，因为它不会受密码保护。

## CPU使用控制

有三种功率模式：
- light（轻量）
- medium（中等）
- full（全功率）

只有light和medium是有用的，因为full启用了GPU，而这在此egg中不受支持。
Light使用**系统可用CPU核心**的一半。Full使用**所有CPU核心**。您仍然可以通过面板限制CPU使用率。

## 支持的版本

支持版本 < v8。v8仍处于测试阶段，不适用于此egg。在此处获取最新的v7版本号：[Folding@Home 下载服务器](https://download.foldingathome.org/releases/public/release/fahclient/debian-stable-64bit/)

## 服务器端口

| 端口 | 默认值 |
| ---- | ------- |
| FAHControl | 36330 | 