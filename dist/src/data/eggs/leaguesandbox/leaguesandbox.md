# League Sandbox

## 来自他们的 [Github](https://github.com/LeagueSandbox/GameServer)

[![Build status](https://ci.appveyor.com/api/projects/status/7olahkndcs3r295p/branch/indev?svg=true)](https://ci.appveyor.com/project/MythicManiac/gameserver/branch/indev)
[![Build Status](https://travis-ci.org/LeagueSandbox/GameServer.svg?branch=indev)](https://travis-ci.org/LeagueSandbox/GameServer)

项目网站以及更多规格说明可以在这里找到：<https://leaguesandbox.github.io/>

项目Discord聊天：<https://discord.gg/Bz3znAM>

## 安装说明

安装后，您需要设置

- `/home/container/Settings/GameInfo.json` `CONTENT_PATH` 仅设为 `Content`
- `/home/container/Settings/GameServerSettings.json` `autoStartClient` 设为 `false`

## 服务器端口

运行服务器所需的端口，以表格形式呈现。

| 端口 | 默认值 |
| ---- | ------- |
| 游戏 | 5119    | 