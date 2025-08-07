# Grafana

## 来自 [Grafana](https://github.com/grafana/grafana) GitHub

开放且可组合的可观测性和数据可视化平台。
可视化来自多个来源的指标、日志和跟踪，如Prometheus、Loki、Elasticsearch、InfluxDB、Postgres等多种数据源。

## 初始凭据

Grafana首次启动后，您可以使用以下凭据登录：

- 用户名：admin
- 密码：admin

## 更新支持

该egg在重新安装时_应该_保留数据和配置文件夹。因此，可以使用"latest"作为所选版本进行重新安装来更新Grafana。

如果您想完全重置服务器，请在重新安装前手动删除`conf`和`data`目录。

## 服务器端口

运行服务器所需的端口，以表格形式展示。

| 端口     | 默认值 |
| -------- | ------ |
| Web界面  | 3000   | 