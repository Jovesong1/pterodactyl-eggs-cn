# Neos VR 无头客户端
## 来自 https://neos.com
开发Neos，简称neo spatium - 新空间，一个高度协作的虚拟和增强现实元宇宙。

# 注意

要使用此egg，您需要一个beta代码和一个Steam账户。目前beta代码只能通过访问Neos Patreon，订阅"Gunter"级别，并将您的Patreon链接到Discord获得。然后您将能够看到#headless-client频道，密码将被固定在-betapassword后面的命令中。该账户还需要在其库中拥有Neos VR。如果您从未在此Steam账户上安装过Neos VR，可以通过在steamcmd中运行`app_license_request 740250`来实现。
有关配置的更多信息，请访问：https://wiki.neos.com/Headless_Client/Server

此游戏不需要任何端口转发，而是使用随机端口上的UDP NAT穿透（和/或中继）。您可以在配置中强制使用特定端口进行直接连接，但大多数通信是通过使用LiteNetLib（LNL）的NAT穿透完成的。 