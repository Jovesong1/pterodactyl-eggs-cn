# Clusterio

## 介绍

Clusterio (https://github.com/clusterio/clusterio) 是一个集群式Factorio服务器管理器，提供在Factorio中实现跨服务器交互的工具。
它之前最著名的是通过传送箱实现跨服务器物品传输和云存储。
但这一功能已从Clusterio中分离出来，成为Clusterio的一个名为[Subspace Storage](https://github.com/clusterio/subspace_storage)的插件。

本身Clusterio不会以任何方式改变游戏玩法，您甚至可以使用Clusterio来管理完全原版的Factorio服务器。
插件负责将可见的变化添加到游戏中，请参阅[插件部分](#插件)了解可以安装到Clusterio集群的现成插件。

## 功能

- 集群式Factorio服务器管理，允许您通过网页界面和命令行界面管理跨物理服务器群的Factorio服务器运行。

- 用户列表管理，用于将游戏内管理员、白名单用户和封禁同步到集群中的所有服务器。

- 通过单一指标端点集成支持将整个集群的统计数据导出到Prometheus。

- 广泛的插件支持，用于使用Clusterio的通信骨干向Factorio添加您自己的跨服务器功能。

## 设置

Clusterio使用Controller/Host系统设置，Controller服务器运行Web UI并控制哪些Host运行哪些实例。

Controller服务器运行一个Web服务器，用户需要能够访问该服务器进行集群管理，其他节点也需要访问它以进行管理。

Host服务器运行Factorio服务器，目前需要手动导入任何模组，包括Clustorio Library(https://mods.factorio.com/mod/clusterio_lib)和Subspace Storage(https://mods.factorio.com/mod/subspace_storage)的Factorio模组。

两者各只需要一个端口。

服务器模式控制服务器是Controller还是Host，每个变量都标记为Controller、Host或所有所需。请确保填写所有必需的变量。

首先设置Controller服务器，然后您可以生成Host服务器连接所需的Controller URL和Controller Token。

集群的其他配置选项可以在config-Controller.json和config-Host.json中找到。

只有在优雅停止时，对集群的更改才会写入数据库。

## 服务器端口

Clusterio需要一个端口

| 端口       | 默认值    |
|------------|------------|
| Controller HTTP| 8081       |
| Host 游戏 | 34197      | 