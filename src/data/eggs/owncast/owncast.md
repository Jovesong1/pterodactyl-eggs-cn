# Owncast

## 来自[Owncast](https://owncast.online)网站

Owncast是一个自托管的直播视频和网页聊天服务器，可与现有流行的广播软件一起使用。

## 安装

按照常规egg安装指南在您的Pterodactyl实例上安装egg。
设置服务器时，将使用变量中设置的版本，默认为0.0.11。

## 配置

在Pterodactyl中配置Owncast可以通过使用命令行开关完成：
* -backupdir string
	* 备份将写入的目录
* -database string
	* 数据库文件的路径
* -enableDebugFeatures
	* 启用额外的调试选项
* -enableVerboseLogging
	* 启用额外的日志记录
* -logdir string
	* 日志将写入的目录
* -restoreDatabase string
	* 恢复Owncast数据库备份
* -rtmpport int
	* 设置RTMP服务器的监听端口
* -streamkey string
	* 设置您的流密钥/管理员密码
* -webserverip string
	* 强制Web服务器监听此IP地址
* -webserverport string
	* 强制Web服务器监听特定端口



## 更新支持

该egg在重新安装时_应该_保留`data`文件夹，以防止意外破坏配置。

如果您想完全重置服务器，请在重新安装前手动删除`data`目录。

### 服务器端口

运行服务器所需的端口，以表格形式呈现。

| 端口          | 默认值 |
| ------------- | ------ |
| Web服务器     | 8090   |
| RTMP          | 8091   | 