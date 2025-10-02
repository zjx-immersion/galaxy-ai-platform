# Galaxy AI Platform

一个专为研发场景设计的AI工具平台，集成MCP、Agent、上下文管理、提示词、多任务、知识库等工具。

## 功能特性

- 🚀 **场景化工具集成** - 按研发场景组织工具，解决具体问题
- 🎨 **现代化UI设计** - 基于Ant Design的美观界面
- 📱 **响应式设计** - 完美适配桌面端和移动端
- ⚡ **高性能** - 基于Next.js 15和Turbopack构建
- 🔧 **TypeScript支持** - 完整的类型安全保障

## 核心场景

1. **代码分析与优化** - AI驱动的代码质量提升工具
2. **提示词工程** - 专业的提示词设计与优化平台
3. **知识库管理** - 智能知识管理和检索系统
4. **Agent工作流** - 智能代理和自动化任务流程

## 技术栈

- **前端框架**: Next.js 15 with App Router
- **UI组件库**: Ant Design 5.x
- **样式方案**: Tailwind CSS
- **状态管理**: Zustand
- **类型检查**: TypeScript
- **构建工具**: Turbopack
- **代码规范**: ESLint + Prettier

## 快速开始

### 本地开发

```bash
# 克隆项目
git clone <repository-url>
cd galaxy-ai-platform

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### Docker部署

```bash
# 构建镜像
npm run docker:build

# 运行容器
npm run docker:run

# 或使用docker-compose
npm run docker:prod
```

### 开发环境Docker

```bash
# 启动开发环境
npm run docker:dev
```

## 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行代码检查
- `npm run lint:fix` - 自动修复代码问题
- `npm run type-check` - TypeScript类型检查

## 项目结构

```
src/
├── app/                 # Next.js App Router页面
├── components/          # React组件
│   ├── ui/             # 基础UI组件
│   ├── layout/         # 布局组件
│   └── sections/       # 页面区块组件
├── theme/              # 主题配置
└── types/              # TypeScript类型定义
```

## 部署

### Vercel部署

1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 自动部署完成

### 其他平台

项目支持任何支持Node.js的部署平台，包括：
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 贡献指南

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。
