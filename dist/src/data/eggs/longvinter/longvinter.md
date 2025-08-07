# Longvinter
Longvinter是一款多人第三人称沙盒游戏，包含了制作、农耕、建造、贸易和PVP等元素。
___

### 服务器端口

- 默认服务器端口如下所示，但所有三个端口都可以自由更改。
- **注意：** 目前查询端口似乎完全没有被使用（至少在Linux服务器上）。

| 端口 | 默认值 |
|---------|---------|
| **游戏（Pterodactyl中的主端口）** | 7777 (UDP) |
| 查询 | 27015 (UDP/TCP) |
| 查询 +1 | 27016 (UDP/TCP) |

___

### 安装/系统要求

|  | 最低配置 | 
|---------|---------|
| 内存 | 2048 MiB |
| 存储 | 2 GB |

___

### 已知错误/警告

以下在控制台中看到的错误或警告可以安全忽略：

```log
[2022.05.15-00.07.35:353][508]LogEOS: Error: UpdateSession: 
Successfully updated session 'Test' with ID '18exxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
```

↑ 此错误会定期显示，但不会影响服务器功能。开发者仓库中已有一个[公开问题](https://github.com/Uuvana-Studios/longvinter-linux-server/issues/40)。 