# RabbitMQ

## 来自[RabbitMQ](https://www.rabbitmq.com/)网站

RabbitMQ是应用最广泛的开源消息代理。

## 安装

按照常规egg安装指南在您的Pterodactyl实例上安装egg。
设置服务器时，默认将使用最新的RabbitMQ版本。

对于非常新或非常旧的RabbitMQ版本，您可能需要调整所使用的Erlang版本。
这可以通过调整所使用镜像的版本号来实现（例如，使用`ghcr.io/pterodactyl/yolks:erlang_22`而不是`ghcr.io/ptero-eggs/yolks:erlang_24`）。

截至目前，最新版本要求您至少使用ghcr.io/pterodactyl/yolks:erlang_25

## 配置

在Pterodactyl中配置RabbitMQ只能通过配置文件完成。
这意味着：

- 使用`/home/container/etc/rabbitmq/rabbitmq.conf`正常配置服务器本身
- 使用位于`/home/container/etc/rabbitmq/enabled_plugins`的插件文件启用插件
- 通过[definitions.json](https://www.rabbitmq.com/definitions.html)配置用户和虚拟主机

您可以使用配置中的`load_definitions`选项设置所使用的`definitions.json`的路径。
请注意，3.8.6之前的RabbitMQ版本需要正确配置的管理插件才能执行此操作！
获取可用的`definitions.json`的最简单方法是使用管理插件设置本地实例。您可以在那里配置您的实例，并通过上传来加载定义。

默认情况下，只有`listeners.tcp.default`被配置为匹配您的主要分配。
如果您想公开其他端口（例如Web管理界面），则必须在`rabbitmq.conf`中手动配置该端口。

## 更新支持

该egg在重新安装时_应该_保留`etc`文件夹，以防止意外破坏配置。因此，可以使用"latest"作为所选版本进行重新安装来更新RabbitMQ。

如果您想完全重置服务器，请在重新安装前手动删除`etc`目录。

### 服务器端口

运行服务器所需的端口，以表格形式呈现。

| 端口            | 默认值 |
| --------------- | ------ |
| RabbitMQ代理    | 5672   | 