# 🌟 Galaxy AI Platform

<div align="center">

![Galaxy AI Platform](https://img.shields.io/badge/Galaxy%20AI-Platform-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5-1890ff?style=for-the-badge&logo=antdesign)

**专为研发场景设计的AI工具平台，集成MCP、Agent、上下文管理、提示词、多任务、知识库等工具**

[🚀 快速开始](#快速开始) • [📖 文档](#项目结构) • [🎯 功能特性](#功能特性) • [🛠 技术栈](#技术栈)

</div>

---

## ✨ 功能特性

### 🎯 核心AI场景
- 🚀 **AI需求自动化** - 从需求文档解析生成符合规范的EPIC与任务，智能推荐优先级
- 🔍 **历史需求追溯** - 基于工程代码按功能维度自动梳理演进，跨仓库关联提交与需求
- 💻 **AI辅助代码分析** - 结合需求与代码上下文进行设计、规范与质量预检
- 🧪 **AI赋能精准测试** - 理解代码Diff与影响范围，自动生成精准测试用例
- 🤖 **智能化手工测试** - AI驱动的测试用例管理与执行，智能生成测试用例
- ⚡ **测试自动化** - 全流程自动化测试解决方案，提升测试效率和质量

### 🎨 平台特性
- 🎨 **现代化UI设计** - 基于Ant Design的美观界面
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **高性能** - 基于Next.js 15和Turbopack构建
- 🔧 **TypeScript支持** - 完整的类型安全保障
- 🐳 **容器化部署** - 支持Docker和Docker Compose

## 🛠 技术栈

<table>
<tr>
<td><strong>前端框架</strong></td>
<td>Next.js 15 with App Router</td>
</tr>
<tr>
<td><strong>UI组件库</strong></td>
<td>Ant Design 5.x</td>
</tr>
<tr>
<td><strong>样式方案</strong></td>
<td>Tailwind CSS</td>
</tr>
<tr>
<td><strong>状态管理</strong></td>
<td>Zustand + Context API</td>
</tr>
<tr>
<td><strong>类型检查</strong></td>
<td>TypeScript 5</td>
</tr>
<tr>
<td><strong>构建工具</strong></td>
<td>Turbopack</td>
</tr>
<tr>
<td><strong>代码规范</strong></td>
<td>ESLint + Prettier</td>
</tr>
<tr>
<td><strong>容器化</strong></td>
<td>Docker + Docker Compose</td>
</tr>
</table>

## 🚀 快速开始

### 📋 环境要求
- Node.js 18+
- npm 或 yarn
- Docker (可选，用于容器化部署)

### 💻 本地开发

```bash
# 克隆项目
git clone https://github.com/zjx-immersion/galaxy-ai-platform.git
cd galaxy-ai-platform

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

🎉 访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 🐳 Docker部署

```bash
# 生产环境部署
npm run docker:build
npm run docker:run

# 或使用docker-compose
npm run docker:prod
```

### 🔧 开发环境Docker

```bash
# 启动开发环境容器
npm run docker:dev
```

### 📊 项目统计
- **总文件数**: 51个文件
- **代码行数**: 23,999行
- **组件数量**: 15+个React组件
- **页面数量**: 10+个功能页面

## 📜 可用脚本

| 命令 | 描述 |
|------|------|
| `npm run dev` | 🚀 启动开发服务器 (支持Turbopack) |
| `npm run build` | 🏗️ 构建生产版本 |
| `npm run start` | ▶️ 启动生产服务器 |
| `npm run lint` | 🔍 运行代码检查 |
| `npm run lint:fix` | 🔧 自动修复代码问题 |
| `npm run type-check` | ✅ TypeScript类型检查 |
| `npm run docker:build` | 🐳 构建Docker镜像 |
| `npm run docker:run` | 🚀 运行Docker容器 |
| `npm run docker:dev` | 🔧 启动开发环境容器 |
| `npm run docker:prod` | 🚀 启动生产环境容器 |

## 📁 项目结构

```
src/
├── app/                    # 📄 Next.js App Router页面
│   ├── scenarios/         # 🎯 AI场景页面
│   │   ├── ai-req-automation/      # 需求自动化
│   │   ├── intelligent-manual-testing/  # 智能化手工测试
│   │   ├── test-automation/        # 测试自动化
│   │   └── requirement-quality-assessment/  # 需求质量评估
│   ├── docs/              # 📚 文档页面
│   └── users/             # 👥 用户管理
├── components/            # ⚛️ React组件
│   ├── ui/               # 🎨 基础UI组件
│   ├── layout/           # 🏗️ 布局组件
│   ├── sections/         # 📦 页面区块组件
│   └── test-execution/   # 🧪 测试执行组件
├── contexts/             # 🔄 React Context
├── hooks/                # 🪝 自定义Hooks
├── theme/                # 🎨 主题配置
└── types/                # 📝 TypeScript类型定义
```

## 🚀 部署

### ☁️ Vercel部署 (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/zjx-immersion/galaxy-ai-platform)

1. 点击上方按钮或手动在Vercel中导入项目
2. 连接GitHub仓库
3. 自动部署完成 ✨

### 🌐 其他平台

项目支持任何支持Node.js的部署平台：

| 平台 | 状态 | 部署指南 |
|------|------|----------|
| 🟢 Vercel | ✅ 推荐 | 一键部署 |
| 🟢 Netlify | ✅ 支持 | 连接Git仓库 |
| 🟢 Railway | ✅ 支持 | Docker部署 |
| 🟢 DigitalOcean | ✅ 支持 | App Platform |
| 🟢 AWS Amplify | ✅ 支持 | 静态托管 |

## 🤝 贡献指南

我们欢迎所有形式的贡献！请遵循以下步骤：

1. 🍴 **Fork项目**
2. 🌿 **创建功能分支** (`git checkout -b feature/AmazingFeature`)
3. ✅ **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. 📤 **推送到分支** (`git push origin feature/AmazingFeature`)
5. 🔄 **创建Pull Request**

### 📋 开发规范
- 遵循TypeScript类型安全
- 使用ESLint和Prettier保持代码风格
- 编写清晰的提交信息
- 添加必要的测试用例

## 📄 许可证

本项目采用 **MIT许可证** - 查看 [LICENSE](LICENSE) 文件了解详情。

---

<div align="center">

**⭐ 如果这个项目对您有帮助，请给我们一个Star！**

Made with ❤️ by [zjx-immersion](https://github.com/zjx-immersion)

</div>
