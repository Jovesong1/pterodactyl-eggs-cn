# Bastion

## 来自他们的 [Github](https://github.com/TheBastionBot/Bastion)

Bastion是一个多功能Discord机器人，可以帮助您自动化服务器中的大多数任务，从管理和审核到通过各种激励措施、游戏和其他有趣活动保持成员活跃度。


## 运行机器人

您需要为机器人启用两个`特权网关意图`(Privileged Gateway Intents)才能运行。

邀请链接：`https://discord.com/oauth2/authorize?client_id=在此插入应用ID&scope=bot&permissions=8`

## 服务器端口


|            端口       | 默认值 |
|-----------------------|--------|
|  Bastion API端口     | 8377   |

## MongoDB

MongoDB会在后台自动运行。将MongoDB URL保留为默认值以使用它。如果您想使用外部MongoDB服务器，连接字符串应该类似于：`mongodb+srv://<用户名>:<密码>@<ip>/?retryWrites=true&w=majority`

## 启动命令
默认情况下，这应该是`npm start`，但如果您想注册斜杠命令，请将其设置为`npm run commands`，它将在Discord端激活斜杠命令。然后服务器将崩溃，将其改回`npm start`以重新启动机器人并启用斜杠命令。 