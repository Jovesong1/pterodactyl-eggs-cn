# Mordhau

Steam 描述
MORDHAU 是一款中世纪第一人称和第三人称多人砍杀游戏。作为一名雇佣兵，进入一个虚构但真实的世界中最多 64 名玩家的激烈战场，在这里您将体验到残酷而令人满足的近战战斗，让您总是想要回来体验更多。

## 版本

### 原生版

标准的 Linux Mordhau 服务器

### Wine 版

在 Wine 中运行的 Windows 版服务器。
支持一些在 Linux 版服务器上无法运行的模组。
比 Linux 版本消耗更多的服务器资源。

## 服务器端口

Mordhau 需要 3 个端口

| 端口    | 默认值       |
|---------|---------------|
| 游戏    | 7777          |
| 查询    | 27015         |
| 信标    | 15000         |

## 地图轮换 / 更改配置

在这个[帖子](https://mordhau.com/forum/topic/10348/dedicated-server-hosting-guide-linux/?page=1)中有很多有用的信息
您需要先运行一次服务器，然后 Mordhau/Saved/Config/LinuxServer 文件夹才可用

## 默认地图变量

默认情况下，游戏总是启动相同的游戏地图和模式。更改此变量以使服务器以您选择的地图和模式启动。例如，Grad/HRD_Grad 或 TaigaMap/FL_Taiga

地图类型
HRD = 囤积
SKM = 小规模战斗
FL = 前线
FFA = 死亡竞赛
BR = 大逃杀
TDM = 团队死亡竞赛

每个地图的有效类型

Grad/
HRD_Grad
BR_Grad
FFA_Grad
FL_Grad
SKM_Grad

Contraband/
FFA_Contraband
SKM_Contraband
TDM_Contraband

DuelCamp/
FFA_Camp
FL_Camp
HRD_Camp
SKM_Camp
TDM_Camp_64
TDM_Camp

MaxMap/
FFA_MountainPeak
FL_MountainPeak
HRD_MountainPeak
SKM_MountainPeak
TDM_MountainPeak 