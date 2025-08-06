# Resonite无头客户端
## 来自 https://resonite.com
进入一个充满无限可能性的全新数字宇宙，与世界各地的人社交和交流，或者构建、创造和开发任何东西。

# 注意

要使用此egg，您需要一个测试版代码和一个Steam账户。目前，测试版代码只能通过访问Resonite Patreon (https://www.patreon.com/Resonite)，并订阅"Discoverer"级别获得。然后，您将能够在游戏中向Resonite机器人发送"/headlessCode"消息，并接收测试版代码。账户还需要在其库中有Resonite。如果您从未在此Steam账户上安装过Resonite，可以在steamcmd中运行`app_license_request 2519830`来实现这一点。
有关Headless配置的更多信息，请在官方Resonite Discord中询问：https://discord.gg/resonite

此游戏不需要任何端口转发，而是使用随机端口上的UDP NAT穿透（和/或中继）。您可以在配置中使用`forcePort`指令强制使用特定端口进行直接连接，但大多数通信是通过使用LiteNetLib（LNL）的NAT穿透完成的。 