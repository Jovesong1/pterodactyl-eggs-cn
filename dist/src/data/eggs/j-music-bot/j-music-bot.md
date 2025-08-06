# JMusicBot

## 简介

JMusicBot是一个易于设置和运行的Discord音乐机器人，它提供了丰富的音乐播放功能，让您的Discord服务器拥有高质量的音乐体验。

## 服务器要求

- 内存: 至少512MB RAM
- CPU: 至少1核心
- 存储: 至少100MB可用空间
- 网络: 稳定的网络连接

## 安装指南

1. 在翼龙面板中导入此Egg
2. 创建新服务器并选择此Egg
3. 配置Discord Bot Token和Owner ID
4. 启动服务器

## 配置参数

| 参数名 | 描述 | 默认值 |
|-------|------|-------|
| BOT_TOKEN | Discord机器人令牌 | (必填) |
| BOT_OWNER | 机器人所有者的Discord用户ID | (必填) |
| BOT_PREFIX | 机器人命令前缀 | @mention |
| BOT_ALT_PREFIX | 替代命令前缀 | NONE |
| BOT_GAME | 机器人游戏状态 | DEFAULT |
| BOT_STATUS | 机器人在线状态 | ONLINE |
| BOT_SONG_STATUS | 在状态中显示当前歌曲 | false |
| BOT_NPIMAGES | 显示当前播放歌曲的图片 | true |
| BOT_STAY_IN_CHANNEL | 播放完成后保持在语音频道 | false |
| BOT_MAXTIME | 歌曲最大时长(秒) | 0 |
| BOT_ALONE_TIME | 无人时自动停止的时间(秒) | 0 |

## 常见问题

### 机器人无法连接到Discord

确保您提供了正确的Bot Token，并且机器人已被邀请到您的Discord服务器。

### 机器人无法播放音乐

检查机器人是否有足够的权限加入语音频道和发送消息。

## 支持与反馈

如有问题，请在GitHub仓库提交issue：https://github.com/jagrosh/MusicBot 