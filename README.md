# 翼龙面板中文Egg资源站

这是一个面向国内用户的公益性质翼龙面板（Pterodactyl）中文Egg资源汇总平台，旨在解决国内用户在使用翼龙面板部署游戏/应用服务器时面临的"英文Egg门槛高、资源分散、适配性不明"等痛点。

## 项目特点

- 📚 **中文化资源**：提供经过汉化的Egg资源，包含详细的配置说明和使用教程
- 🔍 **便捷搜索**：快速查找所需的Egg资源
- 📋 **分类浏览**：按游戏类型、应用类型等分类浏览Egg资源
- 💬 **社区贡献**：支持用户提交自制中文Egg、反馈适配问题或补充配置教程

## 技术栈

- React
- Vite
- React Router
- Tailwind CSS
- Markdown渲染

## 本地开发

### 环境要求

- Node.js 16+
- npm 7+

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建项目

```bash
npm run build
```

## 项目结构

```
src/
├── components/       # 可复用组件
├── pages/           # 页面组件
├── data/            # 数据文件
│   └── eggs/        # Egg资源的Markdown文件
├── utils/           # 工具函数
├── App.jsx          # 应用入口组件
└── main.jsx         # 应用入口文件
```

## 贡献指南

我们欢迎社区成员参与贡献，无论是提交新的中文Egg资源、优化现有资源，还是提供使用反馈，都将帮助我们打造更好的平台。

### 如何贡献

1. Fork本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个Pull Request

## 许可证

本项目采用MIT许可证 - 详见 [LICENSE](LICENSE) 文件
