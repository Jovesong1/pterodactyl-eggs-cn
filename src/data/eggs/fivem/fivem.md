# FiveM

## 支持的架构

FiveM **仅**支持 **amd64**。**arm64** **不**受支持（如Oracle免费云）


## 关于Pteroadactyl对FiveM的支持说明

Pterodactyl不会为FiveM提供支持。您可以自由运行FiveM服务器，但Pterodactyl Discord不会提供支持，详情请查看下面的discord公告。

如果您计划运行FiveM服务器，值得一读
[Pterodactyl Discord公告](https://discord.com/channels/122900397965705216/124919575534895105/869733533495746560)

## 来自[FiveM](https://fivem.net/)网站

FiveM是Grand Theft Auto V的一个修改版，使您能够在自定义专用服务器上进行多人游戏。

## 注意

目前脚本可以从构建站点获取版本。

`FIVEM_VERSION`变量：

* 默认为`latest`，即最新推荐版本
* 可以设置为特定版本，例如`2431-350dd7bd5c0176216c38625ad5b1108ead44674d`。

`DOWNLOAD_URL`仅在他们开启ddos保护时需要使用。该变量需要指向一个`fx.tar.xz`文件，因为我懒得更新整个脚本。

## txAdmin

txAdmin现已支持，默认禁用。将`TXADMIN_ENABLED`设置为`1`以启用它。

最后一次更新egg将服务器更改为使用txAdmin运行。首次启动时，它将打印一个用于登录txAdmin面板的密钥。

### 在从txAdmin启动之前，您的服务器不会上线

## 服务器端口

运行服务器所需的端口，以表格形式呈现。

| 端口    | 默认值 |
|---------|---------|
| 游戏    | 30110   |
| 游戏+1  | 30120   |
| txAdmin | 40120   | 