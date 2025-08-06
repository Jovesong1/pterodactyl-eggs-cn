# 翼龙面板中文Egg资源站

这是一个面向国内用户的公益性质翼龙面板（Pterodactyl）中文Egg资源汇总平台，旨在解决国内用户在使用翼龙面板部署游戏/应用服务器时面临的"英文Egg门槛高、资源分散、适配性不明"等痛点。

## 项目特点

- 📚 **中文化资源**：提供经过汉化的Egg资源，包含详细的配置说明和使用教程
- 🔍 **便捷搜索**：快速查找所需的Egg资源
- 📋 **分类浏览**：按游戏类型、应用类型等分类浏览Egg资源
- 💬 **社区贡献**：支持用户提交自制中文Egg、反馈适配问题或补充配置教程
- 🔄 **自动索引**：自动生成和更新Egg索引，便于管理大量Egg资源

## 技术栈

- React 18
- Vite 4
- React Router 6
- Tailwind CSS 3
- Markdown渲染 (react-markdown)

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

启动开发服务器时，系统会自动生成Egg索引，并在开发过程中监视Egg文件的变化，自动更新索引。

### 构建项目

```bash
npm run build
```

构建项目时，系统会自动生成Egg索引，并将所有必要的文件复制到构建目录。

## 项目结构

```
├── dist/               # 构建输出目录
├── public/             # 静态资源
├── scripts/            # 脚本文件
│   ├── generate-eggs-index.cjs    # Egg索引生成脚本
│   ├── update-eggs.cjs            # Egg索引更新脚本
│   └── vite-plugin-eggs-watcher.js # Egg文件监视插件
├── src/
│   ├── components/     # 可复用组件
│   ├── pages/          # 页面组件
│   ├── data/           # 数据文件
│   │   ├── eggs/       # Egg资源文件
│   │   │   ├── [egg-name]/        # 每个Egg的文件夹
│   │   │   │   ├── [egg-name].md  # Egg的说明文档
│   │   │   │   ├── [egg-file].json # Egg的配置文件
│   │   │   │   └── metadata.json  # Egg的索引信息
│   │   ├── categories/ # 按类别组织的Egg索引
│   │   └── eggs-index.js # 主Egg索引文件
│   ├── utils/          # 工具函数
│   ├── App.jsx         # 应用入口组件
│   ├── App.css         # 应用样式
│   ├── index.css       # 全局样式
│   └── main.jsx        # 应用入口文件
├── .gitignore          # Git忽略文件
├── index.html          # HTML模板
├── package.json        # 项目配置
├── README.md           # 项目说明
├── LICENSE             # 许可证
├── tailwind.config.js  # Tailwind配置
└── vite.config.js      # Vite配置
```

## Egg资源管理

### Egg文件结构

每个Egg资源都存放在`src/data/eggs/[egg-name]`文件夹中，包含以下文件：

- **[egg-name].md**：Egg的说明文档，包含安装指南、配置参数等信息
- **[egg-file].json**：Egg的配置文件，即翼龙面板使用的egg文件
- **metadata.json**：Egg的索引信息，用于生成索引和展示在网站上

### metadata.json格式

```json
{
  "name": "Egg名称",
  "version": "版本号",
  "category": "分类",  // 仅包含：游戏服务器、工具、应用服务器、其他 四类，其他都会导致索引出现异常。
  "description": "简短描述",
  "author": "作者",
  "date": "更新日期",
  "tags": ["标签1", "标签2"],
  "localizationStatus": "已汉化",
  "optimizationStatus": "已优化",
  "testStatus": "已通过运行认证",
  "icon": "图标URL",
  "downloadUrl": "下载链接"
}
```

### 添加新的Egg

1. 在`src/data/eggs`目录下创建新的文件夹，以egg名称命名
2. 在文件夹中添加三个文件：md文档、json配置文件和metadata.json
3. 系统将自动检测并更新索引

## 自动索引功能

本项目实现了自动索引生成功能，可以自动扫描`src/data/eggs`目录，读取每个egg的metadata.json文件，并生成按类别组织的索引文件。

### 索引生成时机

- 开发模式启动时（`npm run dev`）
- 构建项目时（`npm run build`）
- 开发过程中检测到egg文件变化时
- 手动运行更新命令时（`npm run update-eggs`）

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
