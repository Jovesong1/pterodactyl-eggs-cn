# MongoDB

## 来自他们的[官网](https://www.mongodb.com/)

MongoDB是一个为现代应用程序开发者和云时代构建的通用、基于文档的分布式数据库。

### MongoDB免费监控

要禁用关于免费监控的消息，您可以运行`db.disableFreeMonitoring()`。

## 安全性

默认情况下，MongoDB**不强制访问控制**，这意味着即使您在Pterodactyl服务器设置中设置了管理员用户名和密码，**任何人都可以在没有身份验证的情况下连接到数据库**，并执行任何操作。

> :warning: 这就是为什么我们建议尽可能只将您的MongoDB数据库暴露给您的本地网络

### 启用身份验证

要启用身份验证，您需要在`mongod.conf`文件中编辑以下行：

```yaml
security:
  authorization: "enabled"
```

> :closed_lock_with_key: 要了解有关MongoDB安全性的更多信息，您可以阅读[MongoDB安全检查表](https://www.mongodb.com/docs/manual/administration/security-checklist/#security-checklist)

### MongoDB 6或7 egg的特定说明

**[MongoDB 6 egg](./egg-mongo-d-b6.json)或[MongoDB 7 egg](./egg-mongo-d-b7.json)默认在`mongod.conf`文件中启用访问控制**，这意味着即使人们能够作为访客连接到您的数据库，[他们也将无法执行任何操作，除了无害的命令](https://dba.stackexchange.com/a/292175)

### 禁用身份验证

**如果您知道自己在做什么**并且想要明确禁用访问控制，您可以在`mongod.conf`文件中编辑以下行：

```yaml
security:
  authorization: "disabled"
```

## 最低内存警告

MongoDB每10万个资产大约需要1GB的RAM。如果系统必须开始将内存交换到磁盘，这将对性能产生严重的负面影响，应该避免。

## 服务器端口

运行服务器所需的端口，以表格形式展示。

| 端口    | 默认值 |
|---------|---------|
| 服务器  |  27017  | 