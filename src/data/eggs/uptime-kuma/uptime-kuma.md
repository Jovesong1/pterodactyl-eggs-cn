# Uptime Kuma

## 作者与贡献者
| 名称        | Github资料  | 请我喝咖啡 |
| ------------- |-------------|-------------|
|   gOOvER   | https://github.com/gOOvER | [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/B0B351D0Q) |

## 描述
Uptime Kuma是一个易于使用的自托管监控工具
此Egg基于parker的通用nodejs egg

## 链接
Github: https://github.com/louislam/uptime-kuma

## 管理员与登录
安装并成功启动后，浏览到您的<ip>:<端口>并设置管理员。

## 服务器端口

Uptime Kuma需要1个端口。您可以选择任何您想要的端口

| 端口    | 默认值       |
|---------|---------------|
| 默认    |     3000      |

## Cloudflared, Apprise & Chromium

最新镜像提供对Cloudflared和Apprise的支持。

### Cloudflared
通过Cloudflared，可以在不使用nginx代理的情况下通过Cloudflare创建代理。更多信息请参见：
https://github.com/louislam/uptime-kuma/wiki/Reverse-Proxy-with-Cloudflare-Tunnel

### Apprise
Apprise为各种服务提供通知。Uptime Kuma内置了对Apprise的支持。
更多信息请参见：
https://github.com/caronc/apprise#supported-notifications

### 监控HTTP(s) - 浏览器引擎(Chromium)
该镜像支持"HTTP(s) - 浏览器引擎"监控。
要使用此监控，请在设置中的"常规 -> Chrome/Chromium可执行文件"（底部）下输入以下路径：

/usr/bin/chromium-browser 