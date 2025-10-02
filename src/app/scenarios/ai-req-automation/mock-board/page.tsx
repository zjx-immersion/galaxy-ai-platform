"use client";

import React from "react";
import { Layout, Typography, Breadcrumb, Table, Tag, Button, Space, Input, Dropdown, Modal, Tree, Drawer, Card, Switch, Upload, Progress, Divider, App } from "antd";
import { SearchOutlined, CloseOutlined, SendOutlined, PlusOutlined, UserOutlined, EyeOutlined, SettingOutlined, UploadOutlined, LinkOutlined, FolderOutlined, FileTextOutlined, BulbOutlined, AppstoreOutlined, ToolOutlined, EditOutlined, CheckOutlined, ImportOutlined, RocketOutlined, ShareAltOutlined, CopyOutlined, FilePdfOutlined, DownOutlined } from "@ant-design/icons";
import Header from "@/components/layout/Header";
import { useAIAssistantLayout } from '@/hooks/useAIAssistantLayout';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

// ====== 类型定义 ======
type Priority = "P0" | "P1" | "P2" | "P3";
type Status =
  | "待分析" | "分析中" | "分析完成"
  | "待设计" | "设计中" | "设计完成"
  | "待开发" | "开发中" | "开发完成"
  | "待测试" | "测试中" | "测试完成";

type ItemType = "requirement" | "epic" | "story";

interface RequirementItem {
  key: string;
  type: ItemType;
  id: number;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  owner?: string;
  estimate?: number; // 人天
  spent?: number; // 人天
  remaining?: number; // 人天
  creator?: string;
  onesKey?: string; // Mock Ones Issue Key
  synced?: boolean;
  children?: RequirementItem[];
}

const USERS = ["朱凡", "张敏", "李强", "王伟", "赵丽"];

// 颜色映射
const priorityColor: Record<Priority, string> = { P0: "red", P1: "orange", P2: "blue", P3: "default" };
const statusColor: Record<Status, string> = {
  待分析: "default", 分析中: "processing", 分析完成: "success",
  待设计: "default", 设计中: "processing", 设计完成: "success",
  待开发: "default", 开发中: "processing", 开发完成: "success",
  待测试: "default", 测试中: "processing", 测试完成: "success",
};

// 示例数据
const initialData: RequirementItem[] = [
  {
    key: "req-1", type: "requirement", id: 1, title: "AI需求自动化平台",
    description: "构建一个智能化的需求管理平台，支持文档解析、质量评估和自动化同步",
    priority: "P0", status: "待分析", owner: USERS[0], estimate: 50, spent: 0, remaining: 50, creator: USERS[0],
    children: [
      {
        key: "epic-21", type: "epic", id: 21, title: "支持多种需求来源自动聚合",
        description: "实现从多种文档格式解析需求，并自动生成结构化的Epic和Story",
        priority: "P1", status: "待分析", owner: USERS[0], estimate: 20, spent: 0, remaining: 20, creator: USERS[0],
        children: [
          { key: "story-2101", type: "story", id: 2101, title: "解析PRD生成EPIC与任务", description: "支持docx/pdf/md格式的PRD文档解析，自动提取Epic和Story信息", priority: "P1", status: "分析中", owner: USERS[1], estimate: 8, spent: 2, remaining: 6, creator: USERS[0] },
          { key: "story-2102", type: "story", id: 2102, title: "字段映射与规范校验", description: "确保解析出的需求字段符合银河规范，进行自动校验和格式化", priority: "P2", status: "待设计", owner: USERS[2], estimate: 5, spent: 0, remaining: 5, creator: USERS[0] },
        ]
      },
      {
        key: "epic-22", type: "epic", id: 22, title: "优先级与关联性智能推荐",
        description: "基于AI算法分析需求间的关联关系，智能推荐优先级和依赖关系",
        priority: "P2", status: "待分析", owner: USERS[3], estimate: 15, spent: 0, remaining: 15, creator: USERS[3],
        children: [
          { key: "story-2201", type: "story", id: 2201, title: "优先级打分模型", description: "建立多维度的优先级评估模型，自动计算需求优先级", priority: "P2", status: "待分析", owner: USERS[4], estimate: 6, spent: 0, remaining: 6, creator: USERS[3] },
          { key: "story-2202", type: "story", id: 2202, title: "关联检测与可视化", description: "识别需求间的依赖、重复、关联关系，并提供可视化展示", priority: "P3", status: "待分析", owner: USERS[2], estimate: 8, spent: 0, remaining: 8, creator: USERS[3] },
        ]
      }
    ]
  },
  {
    key: "req-2", type: "requirement", id: 2, title: "智能代码生成助手",
    description: "基于大语言模型的代码生成工具，支持多种编程语言和框架的智能代码补全",
    priority: "P1", status: "设计中", owner: USERS[1], estimate: 40, spent: 5, remaining: 35, creator: USERS[1],
    children: [
      {
        key: "epic-31", type: "epic", id: 31, title: "多语言代码生成引擎",
        description: "构建支持JavaScript、Python、Java等主流语言的代码生成核心引擎",
        priority: "P1", status: "设计中", owner: USERS[1], estimate: 25, spent: 3, remaining: 22, creator: USERS[1],
        children: [
          { key: "story-3101", type: "story", id: 3101, title: "JavaScript代码生成器", description: "实现JavaScript/TypeScript的智能代码生成，支持React、Vue等框架", priority: "P1", status: "开发中", owner: USERS[2], estimate: 12, spent: 3, remaining: 9, creator: USERS[1] },
          { key: "story-3102", type: "story", id: 3102, title: "Python代码生成器", description: "实现Python的智能代码生成，支持Django、Flask等框架", priority: "P2", status: "待开发", owner: USERS[3], estimate: 10, spent: 0, remaining: 10, creator: USERS[1] },
        ]
      },
      {
        key: "epic-32", type: "epic", id: 32, title: "智能代码补全与优化",
        description: "提供实时代码补全建议和代码质量优化建议",
        priority: "P2", status: "待设计", owner: USERS[4], estimate: 15, spent: 2, remaining: 13, creator: USERS[1],
        children: [
          { key: "story-3201", type: "story", id: 3201, title: "实时代码补全", description: "基于上下文提供智能代码补全建议，支持IDE插件集成", priority: "P2", status: "待设计", owner: USERS[4], estimate: 8, spent: 1, remaining: 7, creator: USERS[1] },
          { key: "story-3202", type: "story", id: 3202, title: "代码质量检测", description: "自动检测代码质量问题并提供优化建议", priority: "P3", status: "待设计", owner: USERS[0], estimate: 7, spent: 1, remaining: 6, creator: USERS[1] },
        ]
      }
    ]
  }
];

export default function MockBoardPage() {
  const { message } = App.useApp();
  const [data, setData] = React.useState<RequirementItem[]>(initialData);
  const [keyword, setKeyword] = React.useState("");

  // 使用AI助手布局适应Hook
  const { getContentStyle } = useAIAssistantLayout();

  const [aiModalOpen, setAiModalOpen] = React.useState(false);
  const [aiOperationOpen, setAiOperationOpen] = React.useState(false);
  const [currentOperation, setCurrentOperation] = React.useState<string>('');
  const [documentUrl, setDocumentUrl] = React.useState('');
  const [uploadedFile, setUploadedFile] = React.useState<any>(null);
  const [parseProgress, setParseProgress] = React.useState(0);
  const [isParsing, setIsParsing] = React.useState(false);
  const [parseResult, setParseResult] = React.useState<any>(null);
  const [splitResult, setSplitResult] = React.useState<any>(null);
  const [correctionInput, setCorrectionInput] = React.useState('');
  const [adjustmentInput, setAdjustmentInput] = React.useState('');
  const [showAdjustmentInput, setShowAdjustmentInput] = React.useState(false);
  const [showDetailEditor, setShowDetailEditor] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [detailedItems, setDetailedItems] = React.useState<any[]>([]);
  const [editorChatOpen, setEditorChatOpen] = React.useState(false);
  const [editorChatMessages, setEditorChatMessages] = React.useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [editorInputMessage, setEditorInputMessage] = React.useState('');
  const [editorIsLoading, setEditorIsLoading] = React.useState(false);
  const [editingItemId, setEditingItemId] = React.useState<string | null>(null);
  const [editingTitle, setEditingTitle] = React.useState('');
  const [isGeneratingDetails, setIsGeneratingDetails] = React.useState(false);
  const [generationProgress, setGenerationProgress] = React.useState<{[key: string]: 'pending' | 'generating' | 'completed'}>({});
  const [currentGeneratingEpic, setCurrentGeneratingEpic] = React.useState<string | null>(null);
  const [showResplitModal, setShowResplitModal] = React.useState(false);
  const [resplitInput, setResplitInput] = React.useState('');
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [addModalType, setAddModalType] = React.useState<'epic' | 'story'>('epic');
  const [addModalParentId, setAddModalParentId] = React.useState<string>('');
  const [addInput, setAddInput] = React.useState('');
  const [isResplitting, setIsResplitting] = React.useState(false);
  const [isAiAdding, setIsAiAdding] = React.useState(false);
  const [showEvaluationModal, setShowEvaluationModal] = React.useState(false);
  const [evaluationRules, setEvaluationRules] = React.useState([
    { id: '1', name: '完整性', description: '需求是否包含所有必要的信息', selected: true },
    { id: '2', name: '一致性', description: '需求之间是否存在矛盾或冲突', selected: true },
    { id: '3', name: '可测试性', description: '需求是否可以被验证和测试', selected: true },
    { id: '4', name: '明确性', description: '需求描述是否清晰明确', selected: true },
    { id: '5', name: '可追溯性', description: '需求是否可以追溯到业务目标', selected: true }
  ]);
  const [showAddRuleModal, setShowAddRuleModal] = React.useState(false);
  const [newRuleName, setNewRuleName] = React.useState('');
  const [newRuleDescription, setNewRuleDescription] = React.useState('');
  const [isEvaluating, setIsEvaluating] = React.useState(false);
  const [evaluationProgress, setEvaluationProgress] = React.useState<{[key: string]: number}>({});
  const [currentEvaluatingRule, setCurrentEvaluatingRule] = React.useState<string>('');
  const [evaluationResult, setEvaluationResult] = React.useState<any>(null);
  const [showEvaluationResult, setShowEvaluationResult] = React.useState(false);
  const [selectedProblem, setSelectedProblem] = React.useState<any>(null);
  const [showCreateTaskModal, setShowCreateTaskModal] = React.useState(false);
  const [taskTitle, setTaskTitle] = React.useState('');
  const [taskDescription, setTaskDescription] = React.useState('');
  const [taskPriority, setTaskPriority] = React.useState('中');
  const [taskAssignee, setTaskAssignee] = React.useState('');
  const [summaryText, setSummaryText] = React.useState('');
  const [showStandaloneEvaluation, setShowStandaloneEvaluation] = React.useState(false);
  const [standaloneDocUrl, setStandaloneDocUrl] = React.useState('');
  const [standaloneUploadedFile, setStandaloneUploadedFile] = React.useState<any>(null);
  const [isStandaloneParsing, setIsStandaloneParsing] = React.useState(false);
  const [showSummaryModal, setShowSummaryModal] = React.useState(false);
  const [showStoryGeneratorModal, setShowStoryGeneratorModal] = React.useState(false);
  const [storyPrompt, setStoryPrompt] = React.useState('');
  const [showStoryGeneratorPage, setShowStoryGeneratorPage] = React.useState(false);
  const [generatedStories, setGeneratedStories] = React.useState<any[]>([]);
  const [selectedStory, setSelectedStory] = React.useState<any>(null);
  const [showDependencyMode, setShowDependencyMode] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [showDependencyResult, setShowDependencyResult] = React.useState(false);
  const [dependencyGroups, setDependencyGroups] = React.useState<any[]>([]);
  const [dependencyPrompt, setDependencyPrompt] = React.useState('');
  const [showPriorityMode, setShowPriorityMode] = React.useState(false);
  const [selectedStories, setSelectedStories] = React.useState<string[]>([]);
  const [showPriorityResult, setShowPriorityResult] = React.useState(false);
  const [prioritizedStories, setPrioritizedStories] = React.useState<any[]>([]);
  const [showMoreFeaturesModal, setShowMoreFeaturesModal] = React.useState(false);
  const [reevaluationPrompt, setReevaluationPrompt] = React.useState('');
  const [showReevaluationModal, setShowReevaluationModal] = React.useState(false);
  const [selectedProblemsForTask, setSelectedProblemsForTask] = React.useState<string[]>([]);
  const [showEpicStorySelector, setShowEpicStorySelector] = React.useState(false);
  const [selectedEpicsStories, setSelectedEpicsStories] = React.useState<string[]>([]);
  const [shareDropdownOpen, setShareDropdownOpen] = React.useState(false);
  const [showEpicContextSelector, setShowEpicContextSelector] = React.useState(false);
  const [selectedContextItems, setSelectedContextItems] = React.useState<any[]>([]);
  const [requirementType, setRequirementType] = React.useState<'epic' | 'story'>('story');
  const [savedDrafts, setSavedDrafts] = React.useState<any[]>([]);
  const [showSaveDraftModal, setShowSaveDraftModal] = React.useState(false);
  const [draftName, setDraftName] = React.useState('');
  const [evaluationSource, setEvaluationSource] = React.useState<'document' | 'epic-story' | null>(null);
  const [evaluationContent, setEvaluationContent] = React.useState<any>(null);
  const [showRegenerateModal, setShowRegenerateModal] = React.useState(false);
  const [regeneratePrompt, setRegeneratePrompt] = React.useState('');
  const [includeEvaluationProblems, setIncludeEvaluationProblems] = React.useState(false);
  const [evaluationProblems, setEvaluationProblems] = React.useState<string[]>([]);
  const [showOptimizeModal, setShowOptimizeModal] = React.useState(false);
  const [optimizePrompt, setOptimizePrompt] = React.useState('');
  const [includeEvaluationInOptimize, setIncludeEvaluationInOptimize] = React.useState(false);
  const [showEvaluationOptimizeModal, setShowEvaluationOptimizeModal] = React.useState(false);
  const [evaluationOptimizePrompt, setEvaluationOptimizePrompt] = React.useState('');

  // 需求补充生成的文档上传功能
  const [storyGeneratorDocUrl, setStoryGeneratorDocUrl] = React.useState('');
  const [storyGeneratorUploadedFile, setStoryGeneratorUploadedFile] = React.useState<any>(null);
  const [showStoryGeneratorDocSection, setShowStoryGeneratorDocSection] = React.useState(true);

  // 测试API连接
  const testApiConnection = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      console.log('API Key存在:', !!apiKey);
      console.log('API Key前缀:', apiKey?.substring(0, 10) + '...');

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Hello, this is a test message."
            }]
          }]
        })
      });

      console.log('测试API响应状态:', response.status);
      const data = await response.json();
      console.log('测试API响应:', data);

      if (response.ok) {
        message.success('API连接测试成功！');
      } else {
        message.error(`API连接测试失败: ${data.error?.message || '未知错误'}`);
      }
    } catch (error) {
      console.error('API测试错误:', error);
      message.error('API连接测试失败，请检查网络连接');
    }
  };

  // 处理AI功能点击
  const handleAiFeatureClick = (featureName: string) => {
    if (featureName === '需求质量评估') {
      setAiModalOpen(false);
      // 跳转到独立的需求质量评估页面
      window.open('/scenarios/requirement-quality-assessment', '_blank');
      return;
    }

    if (featureName === '补充需求生成') {
      setAiModalOpen(false);
      setShowEpicContextSelector(true);
      return;
    }

    if (featureName === '依赖识别') {
      setAiModalOpen(false);
      setShowDependencyMode(true);
      message.info('请在需求列表中勾选要分析依赖关系的Epic或Story');
      return;
    }

    if (featureName === '优先级排序') {
      setAiModalOpen(false);
      setShowPriorityMode(true);
      message.info('请在需求列表中勾选要进行优先级排序的Story');
      return;
    }

    if (featureName === '更多功能') {
      // 不关闭主Modal，显示更多功能的子菜单
      setShowMoreFeaturesModal(true);
      return;
    }

    setCurrentOperation(featureName);
    setAiOperationOpen(true);
    setAiModalOpen(false);
    message.info(`启动${featureName}功能...`);
  };

  // 处理更多功能中的子功能点击
  const handleMoreFeatureClick = (featureName: string) => {
    setShowMoreFeaturesModal(false);
    setAiModalOpen(false);

    if (featureName === '依赖识别') {
      setShowDependencyMode(true);
      message.info('请在需求列表中勾选要分析依赖关系的Epic或Story');
      return;
    }

    if (featureName === '优先级排序') {
      setShowPriorityMode(true);
      message.info('请在需求列表中勾选要进行优先级排序的Story');
      return;
    }
  };

  // 模拟文档解析
  const simulateDocumentParse = async () => {
    setIsParsing(true);
    setParseProgress(0);
    setParseResult(null);
    setSplitResult(null);

    // 模拟进度条
    const progressInterval = setInterval(() => {
      setParseProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // 模拟解析延迟
    setTimeout(() => {
      clearInterval(progressInterval);
      setParseProgress(100);
      setIsParsing(false);

      // 模拟解析结果
      setParseResult({
        documentSummary: "这是一个电商平台的需求文档，主要描述了用户管理、商品管理、订单处理等核心功能模块。",
        keyPoints: [
          "用户注册登录功能",
          "商品浏览和搜索",
          "购物车管理",
          "订单创建和支付",
          "用户评价系统"
        ],
        scenarios: [
          "用户注册新账户",
          "用户浏览商品列表",
          "用户添加商品到购物车",
          "用户下单并支付",
          "用户查看订单状态",
          "用户对商品进行评价"
        ],
        features: [
          "用户认证模块",
          "商品展示模块",
          "购物车模块",
          "支付模块",
          "订单管理模块",
          "评价系统模块"
        ]
      });
    }, 3000);
  };

  // 拆分Epic
  const handleSplitEpic = () => {
    setSplitResult({
      type: 'epic',
      items: [
        {
          title: "用户管理系统",
          description: "实现用户注册、登录、个人信息管理等功能"
        },
        {
          title: "商品管理系统",
          description: "实现商品展示、搜索、分类管理等功能"
        },
        {
          title: "订单处理系统",
          description: "实现购物车、下单、支付、订单跟踪等功能"
        },
        {
          title: "评价系统",
          description: "实现用户对商品和服务的评价功能"
        }
      ]
    });
    message.success('Epic拆分完成！');
  };

  // 拆分Epic+Story
  const handleSplitEpicStory = () => {
    setSplitResult({
      type: 'epic_story',
      items: [
        {
          title: "用户管理系统",
          description: "实现用户注册、登录、个人信息管理等功能",
          stories: [
            { title: "用户注册", description: "新用户可以通过邮箱或手机号注册账户" },
            { title: "用户登录", description: "已注册用户可以通过账号密码登录系统" },
            { title: "个人信息管理", description: "用户可以查看和修改个人基本信息" }
          ]
        },
        {
          title: "商品管理系统",
          description: "实现商品展示、搜索、分类管理等功能",
          stories: [
            { title: "商品列表展示", description: "用户可以浏览商品列表，查看商品基本信息" },
            { title: "商品搜索", description: "用户可以通过关键词搜索商品" },
            { title: "商品详情查看", description: "用户可以查看商品的详细信息和图片" }
          ]
        }
      ]
    });
    message.success('Epic+Story拆分完成！');
  };

  // 修正解析结果
  const handleCorrectParse = () => {
    if (!correctionInput.trim()) {
      message.warning('请输入修正信息');
      return;
    }

    message.info('正在重新解析...');
    setTimeout(() => {
      setParseResult({
        ...parseResult,
        documentSummary: `${parseResult.documentSummary} (已根据用户反馈进行修正: ${correctionInput})`
      });
      setCorrectionInput('');
      message.success('解析结果已修正！');
    }, 1500);
  };

  // 调整拆分结果
  const handleAdjustSplit = () => {
    if (!adjustmentInput.trim()) {
      message.warning('请输入调整信息');
      return;
    }

    message.info('正在调整拆分结果...');
    setTimeout(() => {
      // 模拟调整后的结果
      const adjustedItems = splitResult.items.map((item: any, index: number) => ({
        ...item,
        title: `${item.title} (已调整)`,
        description: `${item.description} (根据用户反馈进行了调整: ${adjustmentInput})`
      }));

      setSplitResult({
        ...splitResult,
        items: adjustedItems
      });

      setAdjustmentInput('');
      setShowAdjustmentInput(false);
      message.success('拆分结果已调整！');
    }, 1500);
  };

  // 生成单个Epic的详细内容
  const generateSingleEpicDetail = async (item: any, index: number): Promise<any> => {
    return new Promise((resolve) => {
      // 模拟AI生成时间（1.5-3秒随机）
      const generateTime = 1500 + Math.random() * 1500;

      setTimeout(() => {
        const epicDetail = {
          id: `epic-${index}`,
          type: 'epic',
          title: item.title,
          originalTitle: item.title,
          description: item.description,
          detailedContent: {
            title: item.title,
            description: `${item.description}\n\n这个Epic旨在为用户提供完整的${item.title.toLowerCase()}解决方案，通过现代化的技术架构和用户友好的界面设计，提升整体用户体验和业务价值。`,
            goals: `业务目标：\n• 提升用户满意度至85%以上\n• 减少用户操作时间30%\n• 增加功能使用率50%\n\n关键绩效指标：\n• 用户完成率（%）\n• 平均操作时间（秒）\n• 用户反馈评分`,
            personas: `主要用户群体：\n• 新注册用户：需要快速上手的用户\n• 活跃用户：经常使用系统的用户\n• 管理员：负责系统维护的用户`,
            themes: `功能主题：\n• 核心功能模块\n• 用户界面优化\n• 数据处理能力\n• 安全性保障`,
            dependencies: `依赖关系：\n• 用户认证系统\n• 数据库架构\n• 第三方API集成\n\n风险评估：\n• 技术复杂度：中等\n• 时间风险：低\n• 资源依赖：中等`,
            estimation: '预估规模：L (大型) - 约4-6个开发周期'
          },
          stories: item.stories ? item.stories.map((story: any, storyIndex: number) => ({
            id: `story-${index}-${storyIndex}`,
            type: 'story',
            title: story.title,
            originalTitle: story.title,
            description: story.description,
            parentId: `epic-${index}`,
            detailedContent: {
              card: `作为一个注册用户，我想要${story.title.toLowerCase()}，以便于提升我的使用体验和工作效率。`,
              acceptanceCriteria: `验收标准：\n\nAC1: Given 用户已登录系统\nWhen 用户访问${story.title}功能\nThen 系统应正确显示相关界面和选项\n\nAC2: Given 用户执行${story.title}操作\nWhen 操作成功完成\nThen 系统应提供明确的成功反馈\n\nAC3: Given 用户输入无效数据\nWhen 用户尝试提交\nThen 系统应显示清晰的错误提示`,
              priority: 'P1',
              estimation: '3 Story Points',
              dependencies: '依赖于用户认证模块和基础数据模型'
            }
          })) : []
        };
        resolve(epicDetail);
      }, generateTime);
    });
  };

  // 分批生成最终结果
  const handleGenerateResult = async () => {
    // 立即打开详细编辑器
    setShowDetailEditor(true);
    setIsGeneratingDetails(true);
    setDetailedItems([]);
    setSelectedItem(null);

    // 初始化进度状态
    const initialProgress: {[key: string]: 'pending' | 'generating' | 'completed'} = {};
    splitResult.items.forEach((item: any, index: number) => {
      initialProgress[`epic-${index}`] = 'pending';
    });
    setGenerationProgress(initialProgress);

    message.info(`开始生成${splitResult.items.length}个Epic的详细内容...`);

    const generatedItems: any[] = [];

    try {
      // 逐个生成Epic
      for (let index = 0; index < splitResult.items.length; index++) {
        const item = splitResult.items[index];
        const epicId = `epic-${index}`;

        // 更新当前生成状态
        setCurrentGeneratingEpic(epicId);
        setGenerationProgress(prev => ({
          ...prev,
          [epicId]: 'generating'
        }));

        message.info(`正在生成第${index + 1}个Epic: ${item.title}`);

        // 生成单个Epic
        const epicDetail = await generateSingleEpicDetail(item, index);
        generatedItems.push(epicDetail);

        // 更新完成状态
        setGenerationProgress(prev => ({
          ...prev,
          [epicId]: 'completed'
        }));

        // 实时更新已生成的内容
        setDetailedItems([...generatedItems]);

        // 如果是第一个生成完成的，设置为选中项
        if (index === 0) {
          setSelectedItem(epicDetail);
        }

        message.success(`第${index + 1}个Epic生成完成: ${item.title}`);
      }

      setCurrentGeneratingEpic(null);
      message.success(`所有${splitResult.items.length}个Epic详细内容生成完成！`);

    } catch (error) {
      message.error('生成过程中出现错误，请重试');
      console.error('Generation error:', error);
    } finally {
      setIsGeneratingDetails(false);
    }
  };

  // 导入需求池
  const handleImportToPool = () => {
    // 将拆分结果转换为需求数据格式
    const newRequirements = splitResult.items.map((item: any, index: number) => {
      const baseId = data.length + index + 1;
      const epicData = {
        key: `epic-${baseId}`,
        id: baseId,
        title: item.title,
        description: item.description,
        type: "epic" as const,
        status: "待开始" as const,
        priority: "中" as const,
        assignee: "未分配",
        creator: "AI助手",
        createTime: new Date().toLocaleDateString(),
        children: [] as any[]
      };

      // 如果有Stories，也添加到children中
      if (item.stories) {
        epicData.children = item.stories.map((story: any, storyIndex: number) => ({
          key: `story-${baseId}-${storyIndex}`,
          id: baseId * 100 + storyIndex + 1,
          title: story.title,
          description: story.description,
          type: "story" as const,
          status: "待开始" as const,
          priority: "中" as const,
          assignee: "未分配",
          creator: "AI助手",
          createTime: new Date().toLocaleDateString(),
          parentId: baseId
        }));
      }

      return epicData;
    });

    // 更新数据
    setData(prevData => [...prevData, ...newRequirements]);

    // 关闭操作区域
    setAiOperationOpen(false);

    // 重置状态
    setParseResult(null);
    setSplitResult(null);
    setUploadedFile(null);
    setDocumentUrl('');

    message.success(`已成功导入${newRequirements.length}个Epic${splitResult.type === 'epic_story' ? '及其Story' : ''}到需求池！`);
  };

  // 编辑器AI助手聊天功能
  const sendToEditorAI = async (message: string) => {
    setEditorIsLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API密钥未配置，请检查环境变量设置。');
      }

      // 构建上下文信息
      const contextInfo = selectedItem ? `
当前正在编辑的${selectedItem.type === 'epic' ? 'Epic' : 'Story'}信息：
标题：${selectedItem.title}
${selectedItem.type === 'epic' ?
  `描述：${selectedItem.detailedContent.description}
目标：${selectedItem.detailedContent.goals}` :
  `用户故事：${selectedItem.detailedContent.card}
验收标准：${selectedItem.detailedContent.acceptanceCriteria}`
}
` : '';

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `你是一个专业的产品经理和需求分析专家，正在帮助用户完善Epic和Story的内容。

${contextInfo}

用户问题：${message}

请提供专业的建议，帮助用户改进Epic或Story的内容。如果用户要求修改具体内容，请提供具体的修改建议。`
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API请求失败: ${response.status} - ${errorData.error?.message || '未知错误'}`);
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '抱歉，我无法处理您的请求。';

      setEditorChatMessages(prev => [...prev,
        { role: 'user', content: message },
        { role: 'assistant', content: aiResponse }
      ]);
    } catch (error) {
      console.error('Editor AI Error:', error);
      let errorMessage = '抱歉，连接AI服务时出现错误，请稍后重试。';

      if (error instanceof Error) {
        if (error.message.includes('403')) {
          errorMessage = 'API密钥无效或已过期，请检查配置。';
        } else if (error.message.includes('429')) {
          errorMessage = 'API请求频率过高，请稍后重试。';
        }
      }

      setEditorChatMessages(prev => [...prev,
        { role: 'user', content: message },
        { role: 'assistant', content: errorMessage }
      ]);
    } finally {
      setEditorIsLoading(false);
    }
  };

  const handleEditorSendMessage = () => {
    if (!editorInputMessage.trim()) return;
    sendToEditorAI(editorInputMessage);
    setEditorInputMessage('');
  };

  // 手动添加新Epic
  const addNewEpic = () => {
    const newEpicId = `epic-${detailedItems.length}`;
    const newEpic = {
      id: newEpicId,
      type: 'epic',
      title: '新Epic',
      originalTitle: '新Epic',
      description: '新Epic描述',
      detailedContent: {
        title: '新Epic',
        description: '请描述这个Epic的业务背景和价值...',
        goals: '业务目标：\n• 目标1\n• 目标2\n\n关键绩效指标：\n• KPI1\n• KPI2',
        personas: '主要用户群体：\n• 用户群体1\n• 用户群体2',
        themes: '功能主题：\n• 主题1\n• 主题2',
        dependencies: '依赖关系：\n• 依赖项1\n\n风险评估：\n• 风险1',
        estimation: '预估规模：M (中型)'
      },
      stories: []
    };

    setDetailedItems([...detailedItems, newEpic]);
    setSelectedItem(newEpic);
    message.success('新Epic已添加');
  };

  // 手动添加新Story
  const addNewStory = (epicId: string) => {
    const epic = detailedItems.find(item => item.id === epicId);
    if (!epic) return;

    const newStoryId = `story-${epicId}-${epic.stories?.length || 0}`;
    const newStory = {
      id: newStoryId,
      type: 'story',
      title: '新Story',
      originalTitle: '新Story',
      description: '新Story描述',
      parentId: epicId,
      detailedContent: {
        card: '作为一个用户，我想要实现某个功能，以便于获得某种价值。',
        acceptanceCriteria: 'Given 某个前提条件\nWhen 我执行某个动作\nThen 我期望看到某个结果',
        priority: 'P1',
        estimation: '3 Story Points',
        dependencies: '依赖于其他Story或模块'
      }
    };

    const updatedItems = detailedItems.map(item =>
      item.id === epicId
        ? { ...item, stories: [...(item.stories || []), newStory] }
        : item
    );

    setDetailedItems(updatedItems);
    setSelectedItem(newStory);
    message.success('新Story已添加');
  };

  // 显示添加选择
  const showAddOptions = (type: 'epic' | 'story', parentId?: string) => {
    setAddModalType(type);
    setAddModalParentId(parentId || '');
    setShowAddModal(true);
  };

  // 添加自定义评估规则
  const handleAddRule = () => {
    if (!newRuleName.trim()) {
      message.warning('请输入规则名称');
      return;
    }

    const newRule = {
      id: Date.now().toString(),
      name: newRuleName.trim(),
      description: newRuleDescription.trim() || '用户自定义评估规则',
      selected: true
    };

    setEvaluationRules([...evaluationRules, newRule]);
    setNewRuleName('');
    setNewRuleDescription('');
    setShowAddRuleModal(false);
    message.success('评估规则已添加');
  };

  // 切换评估规则选中状态
  const toggleRuleSelection = (ruleId: string) => {
    setEvaluationRules(rules =>
      rules.map(rule =>
        rule.id === ruleId ? { ...rule, selected: !rule.selected } : rule
      )
    );
  };

  // 开始需求评估
  const handleStartEvaluation = async () => {
    const selectedRules = evaluationRules.filter(rule => rule.selected);
    if (selectedRules.length === 0) {
      message.warning('请至少选择一个评估规则');
      return;
    }

    setIsEvaluating(true);
    setEvaluationProgress({});
    setCurrentEvaluatingRule('');
    setEvaluationResult(null);

    message.info(`开始评估需求质量，共${selectedRules.length}个规则...`);

    try {
      // 逐个评估规则
      for (let i = 0; i < selectedRules.length; i++) {
        const rule = selectedRules[i];
        setCurrentEvaluatingRule(rule.name);

        message.info(`正在评估: ${rule.name}`);

        // 模拟评估过程
        for (let progress = 0; progress <= 100; progress += 10) {
          setEvaluationProgress(prev => ({
            ...prev,
            [rule.id]: progress
          }));
          await new Promise(resolve => setTimeout(resolve, 100));
        }

        message.success(`${rule.name} 评估完成`);
      }

      setCurrentEvaluatingRule('');

      // 生成详细的评估结果
      const mockProblems = [
        {
          id: '1',
          type: '完整性',
          severity: 'high',
          title: '缺少用户权限管理需求',
          description: '文档中未明确描述用户权限管理的具体需求，包括角色定义、权限分配等关键信息。',
          suggestion: '建议补充用户角色定义、权限矩阵、权限验证流程等详细需求。',
          location: { start: 120, end: 180 },
          originalText: '用户可以登录系统进行操作...'
        },
        {
          id: '2',
          type: '明确性',
          severity: 'medium',
          title: '业务流程描述模糊',
          description: '订单处理流程的描述过于抽象，缺乏具体的操作步骤和异常处理说明。',
          suggestion: '建议使用流程图或详细的步骤说明来描述业务流程，包括正常流程和异常处理。',
          location: { start: 250, end: 320 },
          originalText: '系统应该能够处理订单...'
        },
        {
          id: '3',
          type: '可测试性',
          severity: 'low',
          title: '性能要求缺乏量化指标',
          description: '文档中提到系统性能要求，但没有具体的量化指标，难以进行测试验证。',
          suggestion: '建议添加具体的性能指标，如响应时间、并发用户数、吞吐量等。',
          location: { start: 450, end: 500 },
          originalText: '系统应具有良好的性能...'
        }
      ];

      const ruleResults = selectedRules.map(rule => {
        const ruleProblems = mockProblems.filter(p => p.type === rule.name);
        const score = Math.max(60, 100 - ruleProblems.length * 15);
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          score: score,
          problemCount: ruleProblems.length,
          problems: ruleProblems
        };
      });

      const overallScore = Math.round(ruleResults.reduce((sum, r) => sum + r.score, 0) / ruleResults.length);
      const totalProblems = mockProblems.length;

      const result = {
        overallScore,
        totalProblems,
        ruleResults,
        problems: mockProblems,
        originalText: parseResult?.documentSummary || '这是一个电商平台的需求文档，主要描述了用户管理、商品管理、订单处理等核心功能模块。用户可以登录系统进行操作，系统应该能够处理订单，同时系统应具有良好的性能。',
        timestamp: new Date().toLocaleString(),
        recommendations: [
          '建议补充用户权限管理的详细需求',
          '优化业务流程描述的清晰度',
          '添加具体的性能量化指标'
        ]
      };

      setEvaluationResult(result);
      setShowEvaluationModal(false);
      setShowEvaluationResult(true);

      message.success('需求评估完成！');

    } catch (error) {
      message.error('评估过程中出现错误，请重试');
    } finally {
      setIsEvaluating(false);
    }
  };

  // 总结问题
  const handleSummarizeProblems = () => {
    if (!evaluationResult) return;

    const summary = `需求评估结果总结
评估时间: ${evaluationResult.timestamp}
总体评分: ${evaluationResult.overallScore}/100
问题总数: ${evaluationResult.totalProblems}个

各维度评分:
${evaluationResult.ruleResults.map((rule: any) =>
  `• ${rule.ruleName}: ${rule.score}/100 (${rule.problemCount}个问题)`
).join('\n')}

主要问题:
${evaluationResult.problems.map((problem: any, index: number) =>
  `${index + 1}. [${problem.type}] ${problem.title}\n   ${problem.description}`
).join('\n\n')}

改进建议:
${evaluationResult.recommendations.map((rec: string, index: number) =>
  `${index + 1}. ${rec}`
).join('\n')}`;

    setSummaryText(summary);
    setShowSummaryModal(true);
  };

  // 复制总结内容
  const handleCopySummary = () => {
    navigator.clipboard.writeText(summaryText).then(() => {
      message.success('问题总结已复制到剪贴板');
    }).catch(() => {
      message.error('复制失败，请手动复制');
    });
  };

  // 创建改进任务
  const handleCreateTask = () => {
    if (!taskTitle.trim()) {
      message.warning('请输入任务标题');
      return;
    }

    if (selectedProblemsForTask.length === 0) {
      message.warning('请选择要改进的问题');
      return;
    }

    // 模拟创建任务
    const selectedProblemTitles = selectedProblemsForTask.map(problemId => {
      const problem = evaluationResult?.problems.find((p: any) => p.id === problemId);
      return problem?.title || '';
    }).filter(Boolean);

    message.success(`改进任务已创建到ONES系统，包含${selectedProblemTitles.length}个问题`);
    setShowCreateTaskModal(false);
    setTaskTitle('');
    setTaskDescription('');
    setTaskPriority('中');
    setTaskAssignee('');
    setSelectedProblemsForTask([]);
  };

  // 定位到问题
  const handleLocateProblem = (problem: any) => {
    setSelectedProblem(problem);
    // 这里可以添加滚动到对应位置的逻辑
  };

  // 独立需求评估入口
  const handleStandaloneEvaluation = () => {
    setShowStandaloneEvaluation(true);
  };

  // 独立评估文档解析
  const handleStandaloneDocParse = async () => {
    if (!standaloneUploadedFile && !standaloneDocUrl.trim()) {
      message.warning('请选择文档或输入URL');
      return;
    }

    setIsStandaloneParsing(true);
    message.info('正在解析文档...');

    try {
      // 模拟文档解析
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 设置解析结果并直接进入评估
      const mockParseResult = {
        documentSummary: "这是通过独立评估入口上传的需求文档，包含了系统的核心功能需求和业务流程描述。",
        keyPoints: ["核心功能需求", "业务流程", "系统架构", "用户界面", "数据管理"],
        scenarios: ["用户注册登录", "数据处理", "报表生成"],
        features: ["用户管理", "数据分析", "报表系统"]
      };

      // 设置评估来源为文档
      setEvaluationSource('document');
      setEvaluationContent({
        type: 'document',
        file: standaloneUploadedFile,
        url: standaloneDocUrl,
        fileName: standaloneUploadedFile?.name || '在线文档',
        content: mockParseResult.documentSummary,
        fullContent: `文档摘要：\n${mockParseResult.documentSummary}\n\n关键点：\n${mockParseResult.keyPoints.join('\n')}\n\n业务场景：\n${mockParseResult.scenarios.join('\n')}\n\n功能模块：\n${mockParseResult.features.join('\n')}`
      });

      setParseResult(mockParseResult);
      setShowStandaloneEvaluation(false);
      setShowEvaluationModal(true);

      message.success('文档解析完成，可以开始评估');

    } catch (error) {
      message.error('文档解析失败，请重试');
    } finally {
      setIsStandaloneParsing(false);
    }
  };

  // 重新评估（带提示词）
  const handleReevaluateWithPrompt = async () => {
    if (!reevaluationPrompt.trim()) {
      message.warning('请输入重新评估的提示词');
      return;
    }

    setShowReevaluationModal(false);
    setShowEvaluationResult(false);
    setShowEvaluationModal(true);

    message.info(`基于提示词"${reevaluationPrompt}"重新评估需求质量...`);
    setReevaluationPrompt('');
  };

  // 处理Epic/Story选择
  const handleEpicStorySelection = (itemKey: string, checked: boolean) => {
    let newSelection = [...selectedEpicsStories];
    if (checked) {
      newSelection.push(itemKey);
    } else {
      newSelection = newSelection.filter(key => key !== itemKey);
    }
    setSelectedEpicsStories(newSelection);
  };

  // 确认选择Epic/Story并开始评估
  const handleConfirmEpicStorySelection = () => {
    if (selectedEpicsStories.length === 0) {
      message.warning('请至少选择一个Epic或Story');
      return;
    }

    setShowEpicStorySelector(false);
    setShowStandaloneEvaluation(false);
    setShowEvaluationModal(true);

    message.success(`已选择${selectedEpicsStories.length}个需求项，开始质量评估`);
  };

  // 获取所有Epic和Story的扁平列表
  const getAllEpicsAndStories = () => {
    const items: any[] = [];

    data.forEach(requirement => {
      if (requirement.children) {
        requirement.children.forEach(epic => {
          items.push({
            ...epic,
            parentTitle: requirement.title
          });

          if (epic.children) {
            epic.children.forEach(story => {
              items.push({
                ...story,
                parentTitle: `${requirement.title} > ${epic.title}`
              });
            });
          }
        });
      }
    });

    return items;
  };

  // 复制分享链接
  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/evaluation-result/${Date.now()}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      message.success('评估结果链接已复制到剪贴板');
    }).catch(() => {
      message.error('复制失败，请手动复制');
    });
    setShareDropdownOpen(false);
  };

  // 导出PDF
  const handleExportPDF = () => {
    message.info('正在生成PDF文件...');

    // 模拟PDF生成过程
    setTimeout(() => {
      // 创建一个虚拟的下载链接
      const link = document.createElement('a');
      link.href = '#'; // 实际应用中这里应该是PDF文件的URL
      link.download = `需求评估报告_${new Date().toLocaleDateString()}.pdf`;

      message.success('PDF文件已生成并开始下载');
    }, 2000);

    setShareDropdownOpen(false);
  };

  // 保存草稿
  const handleSaveDraft = () => {
    if (!draftName.trim()) {
      message.warning('请输入草稿名称');
      return;
    }

    const draftData = {
      id: `draft-${Date.now()}`,
      name: draftName,
      type: showStoryGeneratorPage ? 'story-generation' : 'epic-story-editing',
      data: showStoryGeneratorPage ? {
        generatedStories,
        selectedStory,
        storyPrompt,
        requirementType,
        selectedContextItems
      } : {
        detailedItems,
        selectedDetailItem,
        splitResult
      },
      createdAt: new Date().toLocaleString(),
      description: showStoryGeneratorPage
        ? `${requirementType === 'epic' ? 'Epic' : 'Story'}生成结果草稿`
        : 'Epic+Story详细编辑草稿'
    };

    setSavedDrafts(prev => [...prev, draftData]);
    setShowSaveDraftModal(false);
    setDraftName('');

    message.success(`草稿"${draftData.name}"已保存`);
  };

  // 评估当前生成结果
  const handleEvaluateCurrentResult = () => {
    let contentData: any = null;

    if (showStoryGeneratorPage) {
      // 评估Story生成结果
      contentData = {
        type: 'story-generation',
        items: generatedStories.map((story: any) => ({
          type: story.type,
          title: story.title,
          description: story.description,
          card: story.detailedContent.card,
          acceptanceCriteria: story.detailedContent.acceptanceCriteria,
          priority: story.detailedContent.priority,
          estimation: story.detailedContent.estimation,
          dependencies: story.detailedContent.dependencies
        })),
        context: {
          prompt: storyPrompt,
          requirementType,
          selectedContextItems
        }
      };
    } else if (showDetailEditor) {
      // 评估Epic+Story详细编辑结果
      contentData = {
        type: 'epic-story-editing',
        items: detailedItems.map((item: any) => ({
          type: item.type,
          title: item.title,
          description: item.description,
          card: item.detailedContent?.card || '',
          acceptanceCriteria: item.detailedContent?.acceptanceCriteria || '',
          priority: item.detailedContent?.priority || '',
          estimation: item.detailedContent?.estimation || '',
          dependencies: item.detailedContent?.dependencies || '',
          stories: item.stories?.map((story: any) => ({
            type: story.type,
            title: story.title,
            description: story.description,
            card: story.detailedContent?.card || '',
            acceptanceCriteria: story.detailedContent?.acceptanceCriteria || '',
            priority: story.detailedContent?.priority || '',
            estimation: story.detailedContent?.estimation || '',
            dependencies: story.detailedContent?.dependencies || ''
          })) || []
        }))
      };
    }

    // 设置评估来源和内容
    setEvaluationSource('epic-story');
    setEvaluationContent(contentData);

    // 清除其他评估输入
    setStandaloneDocUrl('');
    setStandaloneUploadedFile(null);
    setSelectedEpicsStories([]);

    // 模拟将当前内容作为评估输入
    message.info('正在准备当前生成结果进行质量评估...');

    setTimeout(() => {
      setShowStoryGeneratorPage(false);
      setShowDetailEditor(false);
      setShowEvaluationModal(true);

      // 模拟评估问题，供重新生成时使用
      const mockProblems = [
        '需求描述不够具体，缺少明确的功能边界',
        '验收标准过于宽泛，难以量化验证',
        '缺少异常情况的处理说明',
        '用户故事的价值描述不够清晰'
      ];
      setEvaluationProblems(mockProblems);
    }, 1000);
  };

  // 获取所有Epic和Story列表
  const getAllEpicsAndStoriesForContext = () => {
    const items: any[] = [];
    data.forEach(requirement => {
      if (requirement.children) {
        requirement.children.forEach(epic => {
          if (epic.type === 'epic') {
            // 添加Epic
            items.push({
              ...epic,
              parentTitle: requirement.title,
              itemType: 'epic',
              stories: epic.children || []
            });

            // 添加Epic下的Story
            if (epic.children) {
              epic.children.forEach(story => {
                if (story.type === 'story') {
                  items.push({
                    ...story,
                    parentTitle: `${requirement.title} > ${epic.title}`,
                    itemType: 'story',
                    epicTitle: epic.title
                  });
                }
              });
            }
          }
        });
      }
    });
    return items;
  };

  // 处理上下文项目选择（支持多选）
  const handleContextItemSelection = (item: any, checked: boolean) => {
    let newSelection = [...selectedContextItems];
    if (checked) {
      newSelection.push(item);
    } else {
      newSelection = newSelection.filter(selected => selected.key !== item.key);
    }
    setSelectedContextItems(newSelection);
  };

  // 确认上下文选择并进入需求生成
  const handleConfirmContext = () => {
    if (selectedContextItems.length === 0) {
      message.warning('请至少选择一个Epic或Story作为生成上下文');
      return;
    }

    setShowEpicContextSelector(false);
    setShowStoryGeneratorModal(true);

    const epicCount = selectedContextItems.filter(item => item.itemType === 'epic').length;
    const storyCount = selectedContextItems.filter(item => item.itemType === 'story').length;

    message.success(`已选择${epicCount}个Epic和${storyCount}个Story作为生成上下文`);
  };

  // 跳过上下文选择，直接生成
  const handleSkipContext = () => {
    setSelectedContextItems([]);
    setShowEpicContextSelector(false);
    setShowStoryGeneratorModal(true);

    message.info('已跳过上下文选择，将基于通用上下文生成需求');
  };

  // 生成需求（Epic或Story）
  const handleGenerateStories = async () => {
    if (!storyPrompt.trim()) {
      message.warning('请输入需求生成提示词');
      return;
    }

    const contextInfo = selectedContextItems.length > 0
      ? `基于${selectedContextItems.length}个上下文项目（${selectedContextItems.filter(item => item.itemType === 'epic').length}个Epic，${selectedContextItems.filter(item => item.itemType === 'story').length}个Story）`
      : '基于通用上下文';

    const docInfo = storyGeneratorUploadedFile || storyGeneratorDocUrl.trim()
      ? `，并结合提供的参考文档`
      : '';

    message.info(`AI正在${contextInfo}${docInfo}根据提示词生成${requirementType === 'epic' ? 'Epic' : 'Story'}...`);

    try {
      // 模拟AI生成需求
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 根据需求类型和上下文生成不同的内容
      const mockStories = requirementType === 'epic' ?
        generateEpicRequirements() :
        generateStoryRequirements();

      setGeneratedStories(mockStories);
      setSelectedStory(mockStories[0]);
      setShowStoryGeneratorModal(false);
      setShowStoryGeneratorPage(true);

      // 清理文档相关状态
      setStoryGeneratorDocUrl('');
      setStoryGeneratorUploadedFile(null);
      setShowStoryGeneratorDocSection(false);

      const docMessage = storyGeneratorUploadedFile || storyGeneratorDocUrl.trim()
        ? '，已结合参考文档信息优化生成质量'
        : '';

      message.success(`${requirementType === 'epic' ? 'Epic' : 'Story'}生成完成！${docMessage}`);

    } catch (error) {
      message.error('需求生成失败，请重试');
    }
  };

  // 生成Epic需求
  const generateEpicRequirements = () => {
    if (selectedContextItems.length > 0) {
      const contextTitles = selectedContextItems.map(item => item.title).join('、');
      return [
        {
          id: `epic-gen-1`,
          type: 'epic',
          title: `${storyPrompt} - 核心Epic`,
          originalTitle: `${storyPrompt} - 核心Epic`,
          description: `基于上下文"${contextTitles}"，围绕"${storyPrompt}"构建的核心Epic功能模块`,
          detailedContent: {
            card: `作为产品负责人，我需要${storyPrompt}相关的完整功能模块，以便于为用户提供完整的业务价值。`,
            acceptanceCriteria: `Epic验收标准：\n\n1. 功能完整性：包含${storyPrompt}的所有核心功能\n2. 用户价值：为目标用户群体提供明确的业务价值\n3. 技术可行性：在现有技术架构下可实现\n4. 与现有功能集成：与"${contextTitles}"等现有功能无缝集成`,
            priority: 'P1',
            estimation: '20-30 Story Points',
            dependencies: `与现有功能模块的集成：${contextTitles}`
          }
        },
        {
          id: `epic-gen-2`,
          type: 'epic',
          title: `${storyPrompt} - 扩展Epic`,
          originalTitle: `${storyPrompt} - 扩展Epic`,
          description: `基于核心功能的扩展Epic，提供${storyPrompt}的高级功能和优化体验`,
          detailedContent: {
            card: `作为产品负责人，我需要${storyPrompt}的扩展功能模块，以便于提升用户体验和产品竞争力。`,
            acceptanceCriteria: `Epic验收标准：\n\n1. 功能扩展性：在核心功能基础上提供高级特性\n2. 用户体验：显著提升用户使用体验\n3. 性能优化：相比基础功能有明显的性能提升\n4. 可选实现：不影响核心功能的独立运行`,
            priority: 'P2',
            estimation: '15-25 Story Points',
            dependencies: `依赖于${storyPrompt}核心Epic的完成`
          }
        }
      ];
    } else {
      return [
        {
          id: `epic-gen-1`,
          type: 'epic',
          title: `${storyPrompt} - 通用Epic`,
          originalTitle: `${storyPrompt} - 通用Epic`,
          description: `基于通用需求构建的${storyPrompt}功能Epic`,
          detailedContent: {
            card: `作为产品负责人，我需要${storyPrompt}功能模块，以便于满足用户的基本需求。`,
            acceptanceCriteria: `Epic验收标准：\n\n1. 基础功能完整\n2. 用户体验良好\n3. 技术架构合理\n4. 可扩展性强`,
            priority: 'P1',
            estimation: '15-25 Story Points',
            dependencies: '依赖于基础架构和通用组件'
          }
        }
      ];
    }
  };

  // 生成Story需求
  const generateStoryRequirements = () => {
    const hasDoc = storyGeneratorUploadedFile || storyGeneratorDocUrl.trim();
    const docFileName = storyGeneratorUploadedFile?.name || '参考文档';

    if (selectedContextItems.length > 0) {
      const contextTitles = selectedContextItems.map(item => item.title).join('、');
      const docInfo = hasDoc ? `，并参考了${docFileName}中的详细需求` : '';

      return [
        {
          id: `story-gen-1`,
          type: 'story',
          title: `${storyPrompt} - 核心功能Story${hasDoc ? '（文档优化）' : ''}`,
          originalTitle: `${storyPrompt} - 核心功能Story${hasDoc ? '（文档优化）' : ''}`,
          description: `基于上下文"${contextTitles}"${docInfo}，实现${storyPrompt}的核心功能Story`,
          detailedContent: {
            card: `作为用户，我想要${storyPrompt}功能，以便于在现有的"${contextTitles}"基础上获得更好的体验${hasDoc ? '，并满足参考文档中的具体需求' : ''}。`,
            acceptanceCriteria: `验收标准：\n\nAC1: Given 用户在现有功能环境中\nWhen 用户使用${storyPrompt}功能\nThen 系统应与"${contextTitles}"无缝集成${hasDoc ? '，并符合参考文档的规范要求' : ''}\n\nAC2: Given 系统处理${storyPrompt}请求\nWhen 处理完成\nThen 用户应获得与现有功能一致的体验${hasDoc ? '，同时满足文档中定义的质量标准' : ''}\n\nAC3: Given 与现有功能存在数据交互\nWhen 执行相关操作\nThen 应保持数据一致性和完整性${hasDoc ? '\n\nAC4: Given 参考文档中的特定要求\nWhen 实现相关功能\nThen 应严格按照文档规范执行，确保功能完整性和准确性' : ''}`,
            priority: 'P1',
            estimation: '5 Story Points',
            dependencies: `依赖于现有功能：${contextTitles}`
          }
        },
        {
          id: `story-gen-2`,
          type: 'story',
          title: `${storyPrompt} - 增强功能Story`,
          originalTitle: `${storyPrompt} - 增强功能Story`,
          description: `基于核心功能的${storyPrompt}增强Story，提供更高级的用户体验`,
          detailedContent: {
            card: `作为高级用户，我想要${storyPrompt}的增强功能，以便于提升工作效率和使用体验。`,
            acceptanceCriteria: `验收标准：\n\nAC1: Given 用户已熟悉基础功能\nWhen 用户使用${storyPrompt}增强功能\nThen 系统应提供更多高级选项\n\nAC2: Given 增强功能与现有功能结合使用\nWhen 执行复合操作\nThen 系统应提供统一的用户界面`,
            priority: 'P2',
            estimation: '3 Story Points',
            dependencies: `依赖于${storyPrompt}核心功能的完成`
          }
        }
      ];
    } else {
      const docInfo = hasDoc ? `，并参考了${docFileName}中的详细需求` : '';

      return [
        {
          id: `story-gen-1`,
          type: 'story',
          title: `${storyPrompt} - 基础Story${hasDoc ? '（文档优化）' : ''}`,
          originalTitle: `${storyPrompt} - 基础Story${hasDoc ? '（文档优化）' : ''}`,
          description: `基于通用需求${docInfo}的${storyPrompt}功能Story`,
          detailedContent: {
            card: `作为用户，我想要${storyPrompt}，以便于提升我的工作效率和用户体验${hasDoc ? '，并满足参考文档中的具体要求' : ''}。`,
            acceptanceCriteria: `验收标准：\n\nAC1: Given 用户有明确需求\nWhen 用户执行${storyPrompt}相关操作\nThen 系统应正确响应并提供预期功能${hasDoc ? '，符合参考文档的规范' : ''}\n\nAC2: Given 系统处理用户请求\nWhen 处理完成\nThen 用户应获得清晰的反馈${hasDoc ? '，满足文档中定义的质量标准' : ''}${hasDoc ? '\n\nAC3: Given 参考文档中的特定要求\nWhen 实现相关功能\nThen 应严格按照文档规范执行，确保功能的准确性和完整性' : ''}`,
            priority: 'P1',
            estimation: '5 Story Points',
            dependencies: '依赖于基础架构和相关模块'
          }
        }
      ];
    }
  };

  // 显示重新生成弹窗
  const handleShowRegenerateModal = () => {
    setRegeneratePrompt(storyPrompt);
    setIncludeEvaluationProblems(false);
    setShowRegenerateModal(true);
  };

  // 重新生成Story
  const handleRegenerateStories = async () => {
    if (!regeneratePrompt.trim()) {
      message.warning('请输入新的提示词');
      return;
    }

    setShowRegenerateModal(false);

    let finalPrompt = regeneratePrompt;

    // 如果选择包含评估问题，将问题总结加入提示词
    if (includeEvaluationProblems && evaluationProblems.length > 0) {
      const problemsSummary = evaluationProblems.join('\n• ');
      finalPrompt = `${regeneratePrompt}\n\n请特别注意解决以下评估发现的问题：\n• ${problemsSummary}`;
    }

    message.info('正在基于优化提示词重新生成...');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 重新生成逻辑
      const updatedStories = generatedStories.map((story, index) => ({
        ...story,
        title: `优化生成：${regeneratePrompt}功能${index + 1}`,
        detailedContent: {
          ...story.detailedContent,
          card: `作为一个用户，我想要${regeneratePrompt}，以便于获得更优质的功能体验。`,
          acceptanceCriteria: includeEvaluationProblems && evaluationProblems.length > 0
            ? `基于评估优化的验收标准：\n\nAC1: Given 基于优化提示词"${regeneratePrompt}"\nWhen 用户执行相关操作\nThen 系统应满足新的需求定义并解决已识别的问题\n\nAC2: Given 系统处理优化需求\nWhen 处理完成\nThen 用户应获得解决了质量问题的优化体验\n\nAC3: Given 针对评估问题的改进\nWhen 实施相关功能\nThen 应避免之前识别的质量问题`
            : `重新生成的验收标准：\n\nAC1: Given 基于新提示词"${regeneratePrompt}"\nWhen 用户执行相关操作\nThen 系统应满足新的需求定义\n\nAC2: Given 系统处理新需求\nWhen 处理完成\nThen 用户应获得优化的体验`
        }
      }));

      setGeneratedStories(updatedStories);
      setSelectedStory(updatedStories[0]);
      setStoryPrompt(regeneratePrompt); // 更新主提示词

      message.success(includeEvaluationProblems && evaluationProblems.length > 0
        ? '基于评估问题优化生成完成！'
        : 'Story重新生成完成！');

    } catch (error) {
      message.error('重新生成失败，请重试');
    }
  };

  // 显示Epic+Story结果优化弹窗
  const handleShowOptimizeModal = () => {
    setOptimizePrompt('请优化当前Epic和Story的内容，提升需求质量和完整性');
    setIncludeEvaluationInOptimize(false);
    setShowOptimizeModal(true);
  };

  // 执行Epic+Story结果优化
  const handleOptimizeEpicStory = async () => {
    if (!optimizePrompt.trim()) {
      message.warning('请输入优化指令');
      return;
    }

    setShowOptimizeModal(false);

    let finalPrompt = optimizePrompt;

    // 如果选择包含评估问题，将问题总结加入优化指令
    if (includeEvaluationInOptimize && evaluationProblems.length > 0) {
      const problemsSummary = evaluationProblems.join('\n• ');
      finalPrompt = `${optimizePrompt}\n\n请特别注意解决以下评估发现的问题：\n• ${problemsSummary}`;
    }

    message.info('正在基于优化指令优化Epic和Story内容...');

    try {
      await new Promise(resolve => setTimeout(resolve, 2500));

      // 优化Epic和Story内容
      const optimizedItems = detailedItems.map((item: any) => ({
        ...item,
        title: `${item.title}（已优化）`,
        description: `${item.description}\n\n[优化说明] 基于"${optimizePrompt}"进行了内容优化，提升了需求的清晰度和完整性。`,
        detailedContent: {
          ...item.detailedContent,
          card: item.detailedContent?.card ?
            `${item.detailedContent.card}\n\n[优化] 基于用户反馈和质量评估进行了优化。` :
            `作为用户，我需要优化后的${item.title}功能，以便获得更好的使用体验。`,
          acceptanceCriteria: includeEvaluationInOptimize && evaluationProblems.length > 0 ?
            `优化后的验收标准：\n\nAC1: Given 基于优化指令"${optimizePrompt}"\nWhen 实施优化后的功能\nThen 系统应满足提升后的质量要求\n\nAC2: Given 针对评估问题的改进\nWhen 执行相关操作\nThen 应解决之前识别的质量问题\n\nAC3: Given 优化后的需求实现\nWhen 用户使用功能\nThen 应提供更好的用户体验和功能完整性` :
            `优化后的验收标准：\n\nAC1: Given 基于优化指令"${optimizePrompt}"\nWhen 实施优化后的功能\nThen 系统应满足提升后的质量要求\n\nAC2: Given 优化后的需求实现\nWhen 用户使用功能\nThen 应提供更好的用户体验`
        },
        stories: item.stories?.map((story: any) => ({
          ...story,
          title: `${story.title}（已优化）`,
          description: `${story.description}\n\n[优化说明] 基于优化指令进行了内容完善。`,
          detailedContent: {
            ...story.detailedContent,
            card: story.detailedContent?.card ?
              `${story.detailedContent.card}\n\n[优化] 提升了用户故事的价值描述。` :
              `作为用户，我需要优化后的${story.title}，以便获得更好的功能体验。`,
            acceptanceCriteria: story.detailedContent?.acceptanceCriteria ?
              `${story.detailedContent.acceptanceCriteria}\n\n[优化] 增强了验收标准的可测试性和完整性。` :
              `优化后的验收标准：\n\nAC1: Given 优化后的Story实现\nWhen 用户执行相关操作\nThen 应满足提升后的功能要求`
          }
        })) || []
      }));

      setDetailedItems(optimizedItems);
      if (optimizedItems.length > 0) {
        setSelectedDetailItem(optimizedItems[0]);
      }

      message.success(includeEvaluationInOptimize && evaluationProblems.length > 0
        ? '基于评估问题的内容优化完成！'
        : 'Epic和Story内容优化完成！');

    } catch (error) {
      message.error('内容优化失败，请重试');
    }
  };

  // 处理评估结果优化
  const handleEvaluationOptimize = async () => {
    if (!evaluationOptimizePrompt.trim()) {
      message.warning('请输入优化提示词');
      return;
    }

    if (!evaluationResult) {
      message.warning('没有可用的评估结果');
      return;
    }

    setShowEvaluationOptimizeModal(false);

    // 构建包含评估问题的优化指令
    const problemsSummary = evaluationResult.problems.map((p: any) =>
      `${p.title}: ${p.description}`
    ).join('\n• ');

    const finalPrompt = `${evaluationOptimizePrompt}\n\n请特别注意解决以下评估发现的问题：\n• ${problemsSummary}`;

    message.info('正在基于评估结果和优化指令优化需求内容...');

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      // 根据评估来源进行不同的优化处理
      if (evaluationSource === 'epic-story' && evaluationContent?.items) {
        // 优化Epic/Story内容
        const optimizedItems = evaluationContent.items.map((item: any) => ({
          ...item,
          title: `${item.title}（已优化）`,
          description: `${item.description}\n\n[基于评估优化] ${evaluationOptimizePrompt}`,
          card: item.card ?
            `${item.card}\n\n[优化] 基于质量评估结果进行了改进，提升了用户故事的清晰度。` :
            `作为用户，我需要优化后的${item.title}功能，以便获得更好的使用体验。`,
          acceptanceCriteria: `优化后的验收标准：\n\nAC1: Given 基于评估优化指令"${evaluationOptimizePrompt}"\nWhen 实施优化后的功能\nThen 系统应满足提升后的质量要求\n\nAC2: Given 针对评估问题的改进\nWhen 执行相关操作\nThen 应解决之前识别的质量问题：\n${problemsSummary}\n\nAC3: Given 优化后的需求实现\nWhen 用户使用功能\nThen 应提供更好的用户体验和功能完整性`
        }));

        // 更新评估内容
        setEvaluationContent({
          ...evaluationContent,
          items: optimizedItems
        });

        // 如果当前在详细编辑页面，也更新详细项目
        if (showDetailEditor && detailedItems.length > 0) {
          const updatedDetailedItems = detailedItems.map((item: any, index: number) => {
            const optimizedItem = optimizedItems[index];
            if (optimizedItem) {
              return {
                ...item,
                title: optimizedItem.title,
                description: optimizedItem.description,
                detailedContent: {
                  ...item.detailedContent,
                  card: optimizedItem.card,
                  acceptanceCriteria: optimizedItem.acceptanceCriteria
                }
              };
            }
            return item;
          });
          setDetailedItems(updatedDetailedItems);
          if (updatedDetailedItems.length > 0) {
            setSelectedDetailItem(updatedDetailedItems[0]);
          }
        }
      }

      message.success('基于评估结果的内容优化完成！需求质量得到显著提升。');

    } catch (error) {
      message.error('评估结果优化失败，请重试');
    }

    // 清理状态
    setEvaluationOptimizePrompt('');
  };

  // 导入生成的Story到需求池
  const handleImportGeneratedStories = () => {
    const newRequirements = generatedStories.map((story, index) => ({
      key: `story-imported-${Date.now()}-${index}`,
      id: data.length + index + 1,
      title: story.detailedContent.card.split('，我想要')[1]?.split('，以便于')[0] || story.title,
      description: story.detailedContent.acceptanceCriteria,
      type: "story" as const,
      status: "待开始" as const,
      priority: story.detailedContent.priority === 'P0' ? "高" : story.detailedContent.priority === 'P1' ? "中" : "低" as const,
      assignee: "未分配",
      creator: "AI助手",
      createTime: new Date().toLocaleDateString()
    }));

    setData(prevData => [...prevData, ...newRequirements]);
    setShowStoryGeneratorPage(false);
    setGeneratedStories([]);
    setSelectedStory(null);
    setStoryPrompt('');

    message.success(`已成功导入${newRequirements.length}个Story到需求池！`);
  };

  // 查找项目（包括在children中的项目）- 递归查找所有层级
  const findItemInData = (itemKey: string): RequirementItem | null => {
    const searchInItem = (item: RequirementItem): RequirementItem | null => {
      if (item.key === itemKey) {
        return item;
      }
      if (item.children) {
        for (const child of item.children) {
          const found = searchInItem(child);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };

    for (const item of data) {
      const found = searchInItem(item);
      if (found) {
        return found;
      }
    }
    return null;
  };

  // 处理依赖识别选择
  const handleItemSelection = (itemKey: string, checked: boolean) => {
    const item = findItemInData(itemKey);
    if (!item) {
      console.log('未找到项目:', itemKey);
      return;
    }

    let newSelection = [...selectedItems];

    if (item.type === 'epic') {
      // 选择Epic时，自动选择其下所有Story
      if (checked) {
        newSelection.push(itemKey);
        const childStories = item.children?.map(child => child.key) || [];
        childStories.forEach(childKey => {
          if (!newSelection.includes(childKey)) {
            newSelection.push(childKey);
          }
        });
      } else {
        newSelection = newSelection.filter(key => key !== itemKey);
        const childStories = item.children?.map(child => child.key) || [];
        newSelection = newSelection.filter(key => !childStories.includes(key));
      }
    } else {
      // 选择Story
      if (checked) {
        newSelection.push(itemKey);
      } else {
        newSelection = newSelection.filter(key => key !== itemKey);
      }
    }

    console.log('选择更新:', { itemKey, checked, newSelection });
    setSelectedItems(newSelection);
  };

  // 识别依赖关系
  const handleIdentifyDependencies = async () => {
    if (selectedItems.length < 2) {
      message.warning('请至少选择2个需求项进行依赖分析');
      return;
    }

    message.info('AI正在分析依赖关系...');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 模拟生成依赖关系
      const mockDependencyGroups = [
        {
          id: 'group-1',
          title: '用户认证依赖组',
          description: '用户相关功能的依赖关系',
          dependencies: [
            {
              from: { key: 'req-1', title: '用户注册功能', type: 'story' },
              to: { key: 'req-2', title: '用户管理系统', type: 'epic' },
              relationship: '依赖',
              description: '用户注册功能依赖于用户管理系统的基础架构'
            },
            {
              from: { key: 'req-3', title: '用户登录验证', type: 'story' },
              to: { key: 'req-1', title: '用户注册功能', type: 'story' },
              relationship: '依赖',
              description: '登录验证需要先完成用户注册功能'
            }
          ]
        },
        {
          id: 'group-2',
          title: '数据处理依赖组',
          description: '数据相关功能的依赖关系',
          dependencies: [
            {
              from: { key: 'req-4', title: '数据分析报表', type: 'story' },
              to: { key: 'req-5', title: '数据收集模块', type: 'story' },
              relationship: '依赖',
              description: '报表生成需要先有数据收集功能'
            },
            {
              from: { key: 'req-6', title: '实时数据展示', type: 'story' },
              to: { key: 'req-4', title: '数据分析报表', type: 'story' },
              relationship: '冲突',
              description: '实时展示与批量报表在资源使用上存在冲突'
            }
          ]
        },
        {
          id: 'group-3',
          title: '功能关联组',
          description: '相关联的功能模块',
          dependencies: [
            {
              from: { key: 'req-7', title: '消息推送功能', type: 'story' },
              to: { key: 'req-8', title: '邮件通知功能', type: 'story' },
              relationship: '替代',
              description: '消息推送可以替代邮件通知的部分功能'
            },
            {
              from: { key: 'req-9', title: '用户偏好设置', type: 'story' },
              to: { key: 'req-7', title: '消息推送功能', type: 'story' },
              relationship: '关联',
              description: '用户偏好设置与消息推送功能密切关联'
            }
          ]
        }
      ];

      setDependencyGroups(mockDependencyGroups);
      setShowDependencyMode(false);
      setShowDependencyResult(true);

      message.success('依赖关系分析完成！');

    } catch (error) {
      message.error('依赖分析失败，请重试');
    }
  };

  // 重新生成依赖关系
  const handleRegenerateDependencies = async () => {
    if (!dependencyPrompt.trim()) {
      message.warning('请输入重新生成的提示词');
      return;
    }

    message.info('正在重新分析依赖关系...');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 基于提示词重新生成依赖关系
      const updatedGroups = dependencyGroups.map(group => ({
        ...group,
        title: `${group.title} (基于: ${dependencyPrompt})`,
        description: `根据用户提示"${dependencyPrompt}"重新分析的依赖关系`,
        dependencies: group.dependencies.map(dep => ({
          ...dep,
          description: `${dep.description} (已根据"${dependencyPrompt}"进行调整)`
        }))
      }));

      setDependencyGroups(updatedGroups);
      message.success('依赖关系重新生成完成！');

    } catch (error) {
      message.error('重新生成失败，请重试');
    }
  };

  // 同步单个依赖组到ONES
  const handleSyncGroupToOnes = (groupId: string) => {
    const group = dependencyGroups.find(g => g.id === groupId);
    if (group) {
      message.success(`"${group.title}"已同步到ONES系统`);
      // 可以在这里添加实际的同步逻辑
    }
  };

  // 批量同步到ONES
  const handleSyncToOnes = () => {
    message.success('所有依赖关系已批量同步到ONES系统，相关Epic和Story的依赖信息已更新');
    setShowDependencyResult(false);
    setDependencyGroups([]);
    setSelectedItems([]);
    setDependencyPrompt('');
  };

  // 处理Story选择（仅用于优先级排序）
  const handleStorySelection = (itemKey: string, checked: boolean) => {
    const item = findItemInData(itemKey);
    if (!item || item.type !== 'story') {
      return; // 只允许选择Story
    }

    let newSelection = [...selectedStories];
    if (checked) {
      newSelection.push(itemKey);
    } else {
      newSelection = newSelection.filter(key => key !== itemKey);
    }

    console.log('Story选择更新:', { itemKey, checked, newSelection });
    setSelectedStories(newSelection);
  };

  // 生成优先级建议
  const handleGeneratePrioritySuggestion = async () => {
    if (selectedStories.length < 2) {
      message.warning('请至少选择2个Story进行优先级排序');
      return;
    }

    message.info('AI正在分析Story优先级...');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 获取选中的Story详细信息
      const selectedStoryItems = selectedStories.map(storyKey => {
        const item = findItemInData(storyKey);
        return item;
      }).filter(Boolean);

      // 模拟AI优先级分析
      const mockPrioritizedStories = selectedStoryItems.map((story, index) => {
        // 模拟不同的优先级分配逻辑
        let priority = 'P1';
        let reason = '';

        if (story.title.includes('登录') || story.title.includes('注册') || story.title.includes('认证')) {
          priority = 'P0';
          reason = '用户认证是系统基础功能，必须优先实现';
        } else if (story.title.includes('管理') || story.title.includes('核心') || story.title.includes('基础')) {
          priority = 'P0';
          reason = '核心管理功能，影响系统主要业务流程';
        } else if (story.title.includes('数据') || story.title.includes('分析') || story.title.includes('报表')) {
          priority = 'P1';
          reason = '数据功能重要但不紧急，可在基础功能完成后实现';
        } else if (story.title.includes('优化') || story.title.includes('扩展') || story.title.includes('高级')) {
          priority = 'P2';
          reason = '功能优化和扩展，可在后续版本中实现';
        } else {
          // 随机分配优先级作为示例
          const priorities = ['P0', 'P1', 'P2'];
          const reasons = [
            '业务核心功能，直接影响用户体验',
            '重要功能，需要在主要功能完成后实现',
            '辅助功能，可在后续迭代中完善'
          ];
          const randomIndex = index % 3;
          priority = priorities[randomIndex];
          reason = reasons[randomIndex];
        }

        return {
          ...story,
          suggestedPriority: priority,
          currentPriority: story.priority || 'P1',
          reason: reason,
          originalIndex: index
        };
      });

      // 按优先级排序：P0 > P1 > P2
      const sortedStories = mockPrioritizedStories.sort((a, b) => {
        const priorityOrder = { 'P0': 0, 'P1': 1, 'P2': 2 };
        return priorityOrder[a.suggestedPriority] - priorityOrder[b.suggestedPriority];
      });

      setPrioritizedStories(sortedStories);
      setShowPriorityMode(false);
      setShowPriorityResult(true);

      message.success('优先级分析完成！');

    } catch (error) {
      message.error('优先级分析失败，请重试');
    }
  };

  // 更新Story优先级
  const handleUpdateStoryPriority = (storyKey: string, newPriority: string) => {
    const updatedStories = prioritizedStories.map(story =>
      story.key === storyKey
        ? { ...story, suggestedPriority: newPriority }
        : story
    );

    // 重新排序
    const sortedStories = updatedStories.sort((a, b) => {
      const priorityOrder = { 'P0': 0, 'P1': 1, 'P2': 2 };
      return priorityOrder[a.suggestedPriority] - priorityOrder[b.suggestedPriority];
    });

    setPrioritizedStories(sortedStories);
  };

  // 同步优先级到ONES
  const handleSyncPriorityToOnes = () => {
    // 更新原始数据中的优先级
    const updatedData = data.map(item => {
      if (item.children) {
        const updatedChildren = item.children.map(child => {
          if (child.children) {
            const updatedGrandChildren = child.children.map(grandChild => {
              const prioritizedStory = prioritizedStories.find(ps => ps.key === grandChild.key);
              if (prioritizedStory) {
                const priorityMap = { 'P0': '高', 'P1': '中', 'P2': '低' };
                return {
                  ...grandChild,
                  priority: priorityMap[prioritizedStory.suggestedPriority] || grandChild.priority
                };
              }
              return grandChild;
            });
            return { ...child, children: updatedGrandChildren };
          }

          const prioritizedStory = prioritizedStories.find(ps => ps.key === child.key);
          if (prioritizedStory) {
            const priorityMap = { 'P0': '高', 'P1': '中', 'P2': '低' };
            return {
              ...child,
              priority: priorityMap[prioritizedStory.suggestedPriority] || child.priority
            };
          }
          return child;
        });
        return { ...item, children: updatedChildren };
      }
      return item;
    });

    setData(updatedData);
    message.success('优先级已同步到ONES系统，相关Story的优先级信息已更新');
    setShowPriorityResult(false);
    setPrioritizedStories([]);
    setSelectedStories([]);
  };

  // 删除Epic或Story
  const deleteItem = (itemId: string, itemType: string) => {
    if (itemType === 'epic') {
      const updatedItems = detailedItems.filter(item => item.id !== itemId);
      setDetailedItems(updatedItems);
      if (selectedItem?.id === itemId) {
        setSelectedItem(updatedItems[0] || null);
      }
      message.success('Epic已删除');
    } else {
      const updatedItems = detailedItems.map(item => {
        if (item.stories) {
          const updatedStories = item.stories.filter((story: any) => story.id !== itemId);
          return { ...item, stories: updatedStories };
        }
        return item;
      });
      setDetailedItems(updatedItems);
      if (selectedItem?.id === itemId) {
        setSelectedItem(updatedItems[0] || null);
      }
      message.success('Story已删除');
    }
  };

  // 开始编辑标题
  const startEditTitle = (item: any) => {
    setEditingItemId(item.id);
    setEditingTitle(item.title);
  };

  // 保存标题编辑
  const saveEditTitle = () => {
    if (!editingItemId || !editingTitle.trim()) return;

    const updatedItems = detailedItems.map(item => {
      if (item.id === editingItemId) {
        return { ...item, title: editingTitle };
      }
      if (item.stories) {
        const updatedStories = item.stories.map((story: any) =>
          story.id === editingItemId ? { ...story, title: editingTitle } : story
        );
        return { ...item, stories: updatedStories };
      }
      return item;
    });

    setDetailedItems(updatedItems);

    if (selectedItem?.id === editingItemId) {
      setSelectedItem({ ...selectedItem, title: editingTitle });
    }

    setEditingItemId(null);
    setEditingTitle('');
    message.success('标题已更新');
  };

  // 取消编辑标题
  const cancelEditTitle = () => {
    setEditingItemId(null);
    setEditingTitle('');
  };

  // 关闭编辑器AI助手
  const closeEditorChat = () => {
    setEditorChatOpen(false);
    // 可选：清空聊天记录
    // setEditorChatMessages([]);
    // setEditorInputMessage('');
  };

  // 重新拆分Story
  const handleResplitStories = async () => {
    if (!resplitInput.trim()) {
      message.warning('请输入重新拆分的意向');
      return;
    }

    setIsResplitting(true);
    message.info('AI正在根据您的意向重新拆分Story...');

    try {
      // 模拟AI重新拆分过程
      await new Promise(resolve => setTimeout(resolve, 2000));

      const updatedItems = detailedItems.map(item => {
        if (item.type === 'epic') {
          // 为每个Epic重新生成Story
          const newStories = [
            {
              id: `${item.id}-story-new-1`,
              type: 'story',
              title: `${item.title}核心功能`,
              originalTitle: `${item.title}核心功能`,
              description: `基于用户意向重新拆分的核心功能Story`,
              parentId: item.id,
              detailedContent: {
                card: `作为一个用户，我想要使用${item.title}的核心功能，以便于${resplitInput}。`,
                acceptanceCriteria: `验收标准（基于用户意向重新生成）：\n\nAC1: Given 用户访问${item.title}功能\nWhen 用户执行核心操作\nThen 系统应满足用户意向：${resplitInput}\n\nAC2: Given 用户完成操作\nWhen 系统处理完成\nThen 用户应获得预期的结果`,
                priority: 'P1',
                estimation: '5 Story Points',
                dependencies: '依赖于基础架构和用户认证'
              }
            },
            {
              id: `${item.id}-story-new-2`,
              type: 'story',
              title: `${item.title}扩展功能`,
              originalTitle: `${item.title}扩展功能`,
              description: `基于用户意向重新拆分的扩展功能Story`,
              parentId: item.id,
              detailedContent: {
                card: `作为一个高级用户，我想要使用${item.title}的扩展功能，以便于进一步${resplitInput}。`,
                acceptanceCriteria: `验收标准（基于用户意向重新生成）：\n\nAC1: Given 用户是高级用户\nWhen 用户访问扩展功能\nThen 系统应提供更多选项来满足：${resplitInput}\n\nAC2: Given 用户使用扩展功能\nWhen 操作完成\nThen 系统应提供详细的反馈和结果`,
                priority: 'P2',
                estimation: '3 Story Points',
                dependencies: '依赖于核心功能的完成'
              }
            }
          ];

          return {
            ...item,
            stories: newStories
          };
        }
        return item;
      });

      setDetailedItems(updatedItems);
      setShowResplitModal(false);
      setResplitInput('');
      message.success('Story重新拆分完成！');

    } catch (error) {
      message.error('重新拆分过程中出现错误，请重试');
    } finally {
      setIsResplitting(false);
    }
  };

  // AI添加Epic或Story
  const handleAiAdd = async () => {
    if (!addInput.trim()) {
      message.warning('请输入您的意图');
      return;
    }

    setIsAiAdding(true);
    message.info(`AI正在根据您的意图生成${addModalType === 'epic' ? 'Epic' : 'Story'}...`);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (addModalType === 'epic') {
        // AI生成Epic
        const newEpicId = `epic-ai-${Date.now()}`;
        const newEpic = {
          id: newEpicId,
          type: 'epic',
          title: `AI生成：${addInput.substring(0, 20)}...`,
          originalTitle: `AI生成：${addInput.substring(0, 20)}...`,
          description: `基于用户意图生成的Epic`,
          detailedContent: {
            title: `AI生成：${addInput.substring(0, 20)}...`,
            description: `基于用户意图"${addInput}"生成的Epic。\n\n这个Epic旨在满足用户的具体需求，通过AI分析用户意图，自动生成相应的功能模块和实现方案。`,
            goals: `业务目标：\n• 满足用户意图：${addInput}\n• 提升用户满意度\n• 优化业务流程\n\n关键绩效指标：\n• 功能使用率\n• 用户反馈评分\n• 业务指标改善`,
            personas: `目标用户：\n• 有特定需求的用户\n• 希望实现"${addInput}"的用户群体`,
            themes: `功能主题：\n• 核心功能实现\n• 用户体验优化\n• 业务价值创造`,
            dependencies: `依赖关系：\n• 基础技术架构\n• 相关业务模块\n\n风险评估：\n• 需求理解准确性\n• 技术实现复杂度`,
            estimation: '预估规模：M (中型)'
          },
          stories: []
        };

        setDetailedItems([...detailedItems, newEpic]);
        setSelectedItem(newEpic);
        message.success('AI Epic生成完成！');

      } else {
        // AI生成Story
        const parentEpic = detailedItems.find(item => item.id === addModalParentId);
        if (!parentEpic) return;

        const newStoryId = `story-ai-${Date.now()}`;
        const newStory = {
          id: newStoryId,
          type: 'story',
          title: `AI生成：${addInput.substring(0, 15)}...`,
          originalTitle: `AI生成：${addInput.substring(0, 15)}...`,
          description: `基于用户意图生成的Story`,
          parentId: addModalParentId,
          detailedContent: {
            card: `作为一个用户，我想要${addInput}，以便于实现我的目标。`,
            acceptanceCriteria: `验收标准（基于用户意图生成）：\n\nAC1: Given 用户有明确意图\nWhen 用户执行相关操作\nThen 系统应满足用户意图：${addInput}\n\nAC2: Given 系统处理用户请求\nWhen 处理完成\nThen 用户应获得预期结果\n\nAC3: Given 出现异常情况\nWhen 系统检测到问题\nThen 应提供清晰的错误提示和解决方案`,
            priority: 'P1',
            estimation: '3 Story Points',
            dependencies: `依赖于${parentEpic.title}的基础功能`
          }
        };

        const updatedItems = detailedItems.map(item =>
          item.id === addModalParentId
            ? { ...item, stories: [...(item.stories || []), newStory] }
            : item
        );

        setDetailedItems(updatedItems);
        setSelectedItem(newStory);
        message.success('AI Story生成完成！');
      }

      setShowAddModal(false);
      setAddInput('');

    } catch (error) {
      message.error('AI生成过程中出现错误，请重试');
    } finally {
      setIsAiAdding(false);
    }
  };




  const [detailOpen, setDetailOpen] = React.useState(false);
  const [detailItem, setDetailItem] = React.useState<RequirementItem | null>(null);

  // 打开需求详情
  const openDetail = (item: RequirementItem) => {
    setDetailItem(item);
    setDetailOpen(true);
  };





  // ====== 列定义 ======
  const columns = [
    ...(showDependencyMode ? [{
      title: '选择',
      key: 'select',
      width: 60,
      render: (_: any, record: RequirementItem) => {
        console.log('渲染依赖勾选框:', record.key, record.type, record.title);
        return (
          <input
            type="checkbox"
            checked={selectedItems.includes(record.key)}
            onChange={(e) => {
              e.stopPropagation();
              console.log('依赖勾选框点击:', record.key, e.target.checked);
              handleItemSelection(record.key, e.target.checked);
            }}
            onClick={(e) => e.stopPropagation()}
          />
        );
      },
    }] : []),
    ...(showPriorityMode ? [{
      title: '选择',
      key: 'select',
      width: 60,
      render: (_: any, record: RequirementItem) => {
        console.log('渲染优先级勾选框:', record.key, record.type, record.title);
        // 只有Story可以勾选
        if (record.type !== 'story') {
          return null;
        }
        return (
          <input
            type="checkbox"
            checked={selectedStories.includes(record.key)}
            onChange={(e) => {
              e.stopPropagation();
              console.log('优先级勾选框点击:', record.key, e.target.checked);
              handleStorySelection(record.key, e.target.checked);
            }}
            onClick={(e) => e.stopPropagation()}
          />
        );
      },
    }] : []),
    {
      title: "类型",
      dataIndex: "type",
      width: 80,
      align: "left" as const,
      render: (type: ItemType) => {
        const typeConfig = {
          requirement: { text: "原始需求", color: "purple" },
          epic: { text: "Epic", color: "blue" },
          story: { text: "Story", color: "green" }
        };
        const config = typeConfig[type];
        return (
          <div className="flex items-center">
            <Tag color={config.color}>{config.text}</Tag>
          </div>
        );
      }
    },
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      align: "left" as const,
      render: (v: number) => (
        <div className="flex items-center">
          <Text type="secondary">#{v}</Text>
        </div>
      )
    },
    {
      title: "标题",
      dataIndex: "title",
      ellipsis: true,
      align: "left" as const,
      render: (text: string, record: RequirementItem) => {
        const className = record.type === "requirement" ? "font-bold" :
                         record.type === "epic" ? "font-medium" : "";
        return (
          <div className="flex items-center">
            <Button
              type="link"
              className={`p-0 text-left ${className}`}
              onClick={() => openDetail(record)}
            >
              {text}
            </Button>
          </div>
        );
      }
    },
    {
      title: "描述",
      dataIndex: "description",
      ellipsis: true,
      align: "left" as const,
      render: (desc?: string) => (
        <div className="flex items-center">
          <Text type="secondary" className="text-sm">
            {desc || "-"}
          </Text>
        </div>
      )
    },
    {
      title: "优先级",
      dataIndex: "priority",
      width: 80,
      align: "left" as const,
      render: (p: Priority) => (
        <div className="flex items-center">
          <Tag color={priorityColor[p]}>{p}</Tag>
        </div>
      )
    },
    {
      title: "状态",
      dataIndex: "status",
      width: 100,
      align: "left" as const,
      render: (s: Status) => (
        <div className="flex items-center">
          <Tag color={statusColor[s]}>{s}</Tag>
        </div>
      )
    },
    {
      title: "负责人",
      dataIndex: "owner",
      width: 100,
      align: "left" as const,
      render: (owner?: string) => (
        <div className="flex items-center">
          {owner || "-"}
        </div>
      )
    },
    {
      title: "预计",
      dataIndex: "estimate",
      width: 80,
      align: "left" as const,
      render: (v?: number) => (
        <div className="flex items-center">
          {(v ?? 0) + "人天"}
        </div>
      )
    },
    {
      title: "已花",
      dataIndex: "spent",
      width: 80,
      align: "left" as const,
      render: (v?: number) => (
        <div className="flex items-center">
          {(v ?? 0) + "人天"}
        </div>
      )
    },
    {
      title: "剩余",
      dataIndex: "remaining",
      width: 80,
      align: "left" as const,
      render: (v?: number) => (
        <div className="flex items-center">
          {(v ?? 0) + "人天"}
        </div>
      )
    },
    {
      title: "创建者",
      dataIndex: "creator",
      width: 100,
      align: "left" as const,
      render: (creator?: string) => (
        <div className="flex items-center">
          {creator || "-"}
        </div>
      )
    }
  ];

  // 过滤（按关键词匹配标题）
  const filtered = React.useMemo(() => {
    if (!keyword.trim()) return data;
    const match = (item: RequirementItem): RequirementItem | null => {
      const hit = item.title.includes(keyword) || String(item.id).includes(keyword);
      const children = item.children?.map(match).filter(Boolean) as RequirementItem[] | undefined;
      if (hit || (children && children.length)) return { ...item, children };
      return null;
    };
    return data.map(match).filter(Boolean) as RequirementItem[];
  }, [data, keyword]);

  // AI自动化工具菜单
  const aiAutomationItems = [
    {
      key: "doc-parse",
      label: "文档解析",
      onClick: () => message.info("文档解析功能开发中...")
    },
    {
      key: "priority-sort",
      label: "优先级排序",
      onClick: () => message.info("优先级排序功能开发中...")
    },
    {
      key: "dependency-detect",
      label: "依赖识别",
      onClick: () => message.info("依赖识别功能开发中...")
    },
    {
      key: "generate-story",
      label: "生成Story",
      onClick: () => message.info("生成Story功能开发中...")
    }
  ];

  return (
    <Layout className="min-h-screen">
      <Header />
      <Content style={getContentStyle({ padding: '16px 24px' })}>
        <div className="mx-auto max-w-[1400px]">
          <Breadcrumb
            className="mb-4"
            items={[
              { title: '首页' },
              { title: 'AI需求自动化' },
              { title: 'Mock需求管理' }
            ]}
          />

          <div className="flex items-center justify-between mb-3">
            <Title level={2} className="mb-0">需求管理（Mock）</Title>
            <Space>
              {showDependencyMode && (
                <>
                  <Button
                    type="primary"
                    onClick={handleIdentifyDependencies}
                    disabled={selectedItems.length < 2}
                    style={{
                      background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                      border: 'none',
                      borderRadius: '0px',
                      height: '40px',
                      fontWeight: '500'
                    }}
                  >
                    识别依赖 ({selectedItems.length})
                  </Button>
                  <Button
                    onClick={() => {
                      setShowDependencyMode(false);
                      setSelectedItems([]);
                    }}
                    style={{ borderRadius: '0px', height: '40px' }}
                  >
                    取消选择
                  </Button>
                </>
              )}
              {showPriorityMode && (
                <>
                  <Button
                    type="primary"
                    onClick={handleGeneratePrioritySuggestion}
                    disabled={selectedStories.length < 2}
                    style={{
                      background: 'linear-gradient(135deg, #52c41a, #73d13d)',
                      border: 'none',
                      borderRadius: '0px',
                      height: '40px',
                      fontWeight: '500'
                    }}
                  >
                    优先级建议 ({selectedStories.length})
                  </Button>
                  <Button
                    onClick={() => {
                      setShowPriorityMode(false);
                      setSelectedStories([]);
                    }}
                    style={{ borderRadius: '0px', height: '40px' }}
                  >
                    取消选择
                  </Button>
                </>
              )}
              {!showDependencyMode && !showPriorityMode && (
                <>
                  <Input allowClear prefix={<SearchOutlined />} placeholder="搜索ID或标题" onChange={(e) => setKeyword(e.target.value)} />
                  <Button
                    type="primary"
                    onClick={() => setAiModalOpen(true)}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '0px',
                      height: '40px',
                      fontWeight: '500',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <div style={{
                      width: '20px',
                      height: '20px',
                      background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1)',
                      borderRadius: '0px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        background: 'white',
                        borderRadius: '0px'
                      }} />
                    </div>
                    AI自动化
                  </Button>
                </>
              )}

              <Button
                type="default"
                onClick={testApiConnection}
                size="small"
                style={{
                  marginLeft: '8px',
                  borderRadius: '0px'
                }}
              >
                测试API
              </Button>
            </Space>
          </div>


          <Table
            size="middle"
            columns={columns as any}
            dataSource={filtered}
            rowClassName={(_, idx) => (idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
            pagination={{ pageSize: 50, hideOnSinglePage: true }}
            expandable={{
              defaultExpandAllRows: true,
              indentSize: 0,
              expandIcon: ({ expanded, onExpand, record }) => {
                if (!record.children || record.children.length === 0) return null;
                return (
                  <Button
                    type="text"
                    size="small"
                    className="p-0 w-4 h-4 flex items-center justify-center"
                    onClick={(e) => onExpand(record, e)}
                    icon={expanded ? <span>−</span> : <span>+</span>}
                  />
                );
              }
            }}
            bordered
            scroll={{ x: false }}
          />



          {/* AI自动化弹窗 */}
          <Modal
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    background: 'white',
                    borderRadius: '0px'
                  }} />
                </div>
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>AI自动化</span>
              </div>
            }
            open={aiModalOpen}
            onCancel={() => setAiModalOpen(false)}
            width={700}
            footer={null}
            styles={{
              header: {
                borderBottom: '1px solid #f0f0f0',
                paddingBottom: '16px'
              }
            }}
          >
            <div style={{ padding: '20px 0' }}>
              {/* AI自动化功能 */}
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  AI自动化功能
                </div>

                {/* AI功能卡片 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {[
                    {
                      title: '需求自动规划',
                      icon: '📄',
                      color: '#667eea',
                      description: '根据用户提供的业务需求或PRD文档，自动理解、分析、拆分、生成 EPIC & 开发任务'
                    },
                    {
                      title: '补充需求生成',
                      icon: '✍️',
                      color: '#96ceb4',
                      description: '根据用户提供的需求上下文（EPIC & 用户故事 & 补充文档）对现有需求池进行补充生成'
                    },
                    {
                      title: '需求质量评估',
                      icon: '📊',
                      color: '#f5576c',
                      description: '根据需求质量评估标准和规则，对用户提供的需求清单进行质量评估，并生成评估报告和改进建议'
                    },
                    {
                      title: '更多功能',
                      icon: '⚙️',
                      color: '#9c88ff',
                      description: '依赖识别、优先级排序等高级功能'
                    }
                  ].map((feature, index) => (
                    <Card
                      key={index}
                      style={{
                        borderRadius: '0px',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                      }}
                      styles={{ body: { padding: '20px' } }}
                      hoverable
                      onClick={() => handleAiFeatureClick(feature.title)}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}40)`,
                          borderRadius: '0px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                          flexShrink: 0
                        }}>
                          {feature.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontWeight: '600',
                            fontSize: '16px',
                            color: '#333',
                            marginBottom: '8px'
                          }}>
                            {feature.title}
                          </div>
                          <div style={{
                            fontSize: '14px',
                            color: '#666',
                            lineHeight: '1.4'
                          }}>
                            {feature.description}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Modal>

          <Drawer
            title="需求详情"
            open={detailOpen}
            onClose={() => setDetailOpen(false)}
            width={600}
          >
            {detailItem && (
              <div className="space-y-4">
                <div>
                  <Text strong className="text-lg">{detailItem.title}</Text>
                  <div className="mt-2">
                    <Tag color={detailItem.type === "requirement" ? "purple" : detailItem.type === "epic" ? "blue" : "green"}>
                      {detailItem.type === "requirement" ? "原始需求" : detailItem.type === "epic" ? "Epic" : "Story"}
                    </Tag>
                    <Tag color={priorityColor[detailItem.priority]} className="ml-2">{detailItem.priority}</Tag>
                    <Tag color={statusColor[detailItem.status]} className="ml-2">{detailItem.status}</Tag>
                  </div>
                </div>

                <div>
                  <Text strong>描述：</Text>
                  <Paragraph className="mt-1">{detailItem.description || "暂无描述"}</Paragraph>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Text strong>负责人：</Text>
                    <div>{detailItem.owner || "-"}</div>
                  </div>
                  <div>
                    <Text strong>创建者：</Text>
                    <div>{detailItem.creator || "-"}</div>
                  </div>
                  <div>
                    <Text strong>预计工时：</Text>
                    <div>{(detailItem.estimate ?? 0)}人天</div>
                  </div>
                  <div>
                    <Text strong>已花工时：</Text>
                    <div>{(detailItem.spent ?? 0)}人天</div>
                  </div>
                  <div>
                    <Text strong>剩余工时：</Text>
                    <div>{(detailItem.remaining ?? 0)}人天</div>
                  </div>
                  <div>
                    <Text strong>Ones Key：</Text>
                    <div>{detailItem.onesKey || "未同步"}</div>
                  </div>
                </div>

                {detailItem.children && detailItem.children.length > 0 && (
                  <div>
                    <Text strong>子项目：</Text>
                    <div className="mt-2 space-y-2">
                      {detailItem.children.map(child => (
                        <div key={child.key} className="p-2 border cursor-pointer hover:bg-gray-50" onClick={() => openDetail(child)}>
                          <div className="flex items-center gap-2">
                            <Tag color={child.type === "epic" ? "blue" : "green"} size="small">
                              {child.type === "epic" ? "Epic" : "Story"}
                            </Tag>
                            <Text>#{child.id} {child.title}</Text>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Drawer>

          {/* AI操作区域 */}
          <Drawer
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    background: 'white',
                    borderRadius: '0px'
                  }} />
                </div>
                <span style={{ fontSize: '16px', fontWeight: '600' }}>{currentOperation}</span>
              </div>
            }
            placement="right"
            onClose={() => setAiOperationOpen(false)}
            open={aiOperationOpen}
            width={600}
            styles={{
              header: {
                borderBottom: '1px solid #f0f0f0',
                paddingBottom: '16px'
              },
              body: {
                padding: '24px'
              }
            }}
          >
            {currentOperation === '需求自动规划' && (
              <div>
                {/* 文档输入区域 */}
                {!parseResult && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong style={{ fontSize: '16px' }}>选择文档来源</Text>
                    </div>

                    {/* 上传文档 */}
                    <Card
                      style={{
                        marginBottom: '16px',
                        borderRadius: '0px',
                        border: uploadedFile ? '2px solid #667eea' : '1px solid #e5e7eb'
                      }}
                      styles={{ body: { padding: '20px' } }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: 'linear-gradient(135deg, #667eea20, #667eea40)',
                          borderRadius: '0px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <UploadOutlined style={{ fontSize: '20px', color: '#667eea' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '500', marginBottom: '4px' }}>上传文档</div>
                          <div style={{ fontSize: '14px', color: '#666' }}>支持 PDF, DOC, DOCX, TXT 格式</div>
                        </div>
                        <Upload
                          accept=".pdf,.doc,.docx,.txt"
                          showUploadList={false}
                          beforeUpload={(file) => {
                            setUploadedFile(file);
                            message.success(`文件 ${file.name} 已选择`);
                            return false;
                          }}
                        >
                          <Button type="primary" style={{ borderRadius: '0px' }}>
                            选择文件
                          </Button>
                        </Upload>
                      </div>
                      {uploadedFile && (
                        <div style={{
                          marginTop: '12px',
                          padding: '8px 12px',
                          background: '#f0f4ff',
                          borderRadius: '0px',
                          fontSize: '14px'
                        }}>
                          <FileTextOutlined style={{ marginRight: '8px', color: '#667eea' }} />
                          {uploadedFile.name}
                        </div>
                      )}
                    </Card>

                    {/* 导入URL */}
                    <Card
                      style={{
                        marginBottom: '16px',
                        borderRadius: '0px',
                        border: documentUrl ? '2px solid #667eea' : '1px solid #e5e7eb'
                      }}
                      styles={{ body: { padding: '20px' } }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: 'linear-gradient(135deg, #4ecdc420, #4ecdc440)',
                          borderRadius: '0px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <LinkOutlined style={{ fontSize: '20px', color: '#4ecdc4' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '500', marginBottom: '4px' }}>导入文档URL</div>
                          <div style={{ fontSize: '14px', color: '#666' }}>从在线文档链接导入</div>
                        </div>
                      </div>
                      <Input
                        placeholder="请输入文档URL地址"
                        value={documentUrl}
                        onChange={(e) => setDocumentUrl(e.target.value)}
                        style={{ borderRadius: '0px' }}
                      />
                    </Card>

                    {/* 从文档库导入 */}
                    <Card
                      style={{
                        marginBottom: '24px',
                        borderRadius: '0px',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer'
                      }}
                      styles={{ body: { padding: '20px' } }}
                      hoverable
                      onClick={() => message.info('文档库功能开发中...')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: 'linear-gradient(135deg, #45b7d120, #45b7d140)',
                          borderRadius: '0px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <FolderOutlined style={{ fontSize: '20px', color: '#45b7d1' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '500', marginBottom: '4px' }}>从文档库导入</div>
                          <div style={{ fontSize: '14px', color: '#666' }}>从已有的文档库中选择</div>
                        </div>
                      </div>
                    </Card>

                    {/* 开始解析按钮 */}
                    <Button
                      type="primary"
                      size="large"
                      block
                      disabled={!uploadedFile && !documentUrl}
                      onClick={simulateDocumentParse}
                      style={{
                        height: '48px',
                        borderRadius: '0px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: '500'
                      }}
                    >
                      开始解析文档
                    </Button>
                  </div>
                )}

                {/* 解析进度 */}
                {isParsing && (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      borderRadius: '0px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(90deg, transparent ${parseProgress}%, rgba(255,255,255,0.3) ${parseProgress}%)`,
                        animation: 'pulse 2s infinite'
                      }} />
                      <BulbOutlined style={{ fontSize: '32px', color: 'white', zIndex: 1 }} />
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>
                      AI正在解析文档...
                    </div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                      正在提取关键信息和功能点
                    </div>
                    <Progress
                      percent={Math.round(parseProgress)}
                      strokeColor={{
                        '0%': '#667eea',
                        '100%': '#764ba2',
                      }}
                      style={{ maxWidth: '300px', margin: '0 auto' }}
                    />
                  </div>
                )}

                {/* 解析结果 */}
                {parseResult && !splitResult && (
                  <div>
                    <div style={{ marginBottom: '24px' }}>
                      <Text strong style={{ fontSize: '16px', color: '#333' }}>解析结果</Text>
                    </div>

                    {/* 文档要点 */}
                    <Card style={{ marginBottom: '16px', borderRadius: '0px' }} styles={{ body: { padding: '16px' } }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <FileTextOutlined style={{ color: '#667eea' }} />
                        <Text strong>文档要点</Text>
                      </div>
                      <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                        {parseResult.documentSummary}
                      </div>
                      <div style={{ marginTop: '12px' }}>
                        {parseResult.keyPoints.map((point: string, index: number) => (
                          <Tag key={index} style={{ margin: '4px 4px 4px 0', borderRadius: '0px' }}>
                            {point}
                          </Tag>
                        ))}
                      </div>
                    </Card>

                    {/* 场景清单 */}
                    <Card style={{ marginBottom: '16px', borderRadius: '0px' }} styles={{ body: { padding: '16px' } }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <AppstoreOutlined style={{ color: '#4ecdc4' }} />
                        <Text strong>场景清单</Text>
                      </div>
                      <div>
                        {parseResult.scenarios.map((scenario: string, index: number) => (
                          <div key={index} style={{
                            padding: '8px 0',
                            borderBottom: index < parseResult.scenarios.length - 1 ? '1px solid #f0f0f0' : 'none',
                            fontSize: '14px'
                          }}>
                            • {scenario}
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* 功能清单 */}
                    <Card style={{ marginBottom: '24px', borderRadius: '0px' }} styles={{ body: { padding: '16px' } }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <ToolOutlined style={{ color: '#45b7d1' }} />
                        <Text strong>功能清单</Text>
                      </div>
                      <div>
                        {parseResult.features.map((feature: string, index: number) => (
                          <div key={index} style={{
                            padding: '8px 0',
                            borderBottom: index < parseResult.features.length - 1 ? '1px solid #f0f0f0' : 'none',
                            fontSize: '14px'
                          }}>
                            • {feature}
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* 操作按钮 */}
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                      <Button
                        type="primary"
                        onClick={handleSplitEpic}
                        style={{ flex: 1, height: '40px', borderRadius: '0px' }}
                      >
                        拆分Epic
                      </Button>
                      <Button
                        type="primary"
                        onClick={handleSplitEpicStory}
                        style={{
                          flex: 1,
                          height: '40px',
                          borderRadius: '0px',
                          background: 'linear-gradient(135deg, #4ecdc4, #45b7d1)',
                          border: 'none'
                        }}
                      >
                        拆分Epic+Story
                      </Button>
                    </div>

                    {/* 修正解析结果 */}
                    <Card style={{ borderRadius: '0px' }} styles={{ body: { padding: '16px' } }}>
                      <div style={{ marginBottom: '12px' }}>
                        <Text strong>修正解析结果</Text>
                      </div>
                      <Input.TextArea
                        placeholder="请输入需要修正的信息或补充说明..."
                        value={correctionInput}
                        onChange={(e) => setCorrectionInput(e.target.value)}
                        rows={3}
                        style={{ marginBottom: '12px', borderRadius: '0px' }}
                      />
                      <Button
                        type="default"
                        onClick={handleCorrectParse}
                        style={{ borderRadius: '0px' }}
                      >
                        重新解析
                      </Button>
                    </Card>
                  </div>
                )}

                {/* 拆分结果 */}
                {splitResult && (
                  <div>
                    <div style={{ marginBottom: '24px' }}>
                      <Text strong style={{ fontSize: '16px', color: '#333' }}>
                        {splitResult.type === 'epic' ? 'Epic拆分结果' : 'Epic+Story拆分结果'}
                      </Text>
                    </div>



                    {splitResult.items.map((item: any, index: number) => (
                      <Card key={index} style={{ marginBottom: '16px', borderRadius: '0px' }} styles={{ body: { padding: '16px' } }}>
                        <div style={{ marginBottom: '8px' }}>
                          <Tag color="blue" style={{ borderRadius: '0px' }}>Epic</Tag>
                          <Text strong style={{ fontSize: '16px' }}>{item.title}</Text>
                        </div>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                          {item.description}
                        </div>

                        {item.stories && (
                          <div>
                            <Divider style={{ margin: '12px 0' }} />
                            <div style={{ marginBottom: '8px' }}>
                              <Text strong style={{ fontSize: '14px' }}>Stories:</Text>
                            </div>
                            {item.stories.map((story: any, storyIndex: number) => (
                              <div key={storyIndex} style={{
                                marginLeft: '16px',
                                marginBottom: '8px',
                                padding: '8px',
                                background: '#f8f9fa',
                                borderRadius: '0px'
                              }}>
                                <div style={{ fontWeight: '500', fontSize: '14px', marginBottom: '4px' }}>
                                  <Tag size="small" color="green" style={{ borderRadius: '0px' }}>Story</Tag>
                                  {story.title}
                                </div>
                                <div style={{ fontSize: '13px', color: '#666' }}>
                                  {story.description}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </Card>
                    ))}

                    {/* 调整拆分结果 */}
                    <Card style={{ marginBottom: '16px', borderRadius: '0px' }} styles={{ body: { padding: '16px' } }}>
                      <div style={{ marginBottom: '12px' }}>
                        <Text strong>调整拆分结果</Text>
                      </div>
                      {!showAdjustmentInput ? (
                        <Button
                          type="default"
                          icon={<EditOutlined />}
                          onClick={() => setShowAdjustmentInput(true)}
                          style={{ borderRadius: '0px' }}
                        >
                          调整拆分结果
                        </Button>
                      ) : (
                        <div>
                          <Input.TextArea
                            placeholder="请输入调整信息，例如：需要增加用户权限管理功能，或者合并某些相似的Epic..."
                            value={adjustmentInput}
                            onChange={(e) => setAdjustmentInput(e.target.value)}
                            rows={3}
                            style={{ marginBottom: '12px', borderRadius: '0px' }}
                          />
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <Button
                              type="primary"
                              icon={<CheckOutlined />}
                              onClick={handleAdjustSplit}
                              style={{ borderRadius: '0px' }}
                            >
                              确认调整
                            </Button>
                            <Button
                              type="default"
                              onClick={() => {
                                setShowAdjustmentInput(false);
                                setAdjustmentInput('');
                              }}
                              style={{ borderRadius: '0px' }}
                            >
                              取消
                            </Button>
                          </div>
                        </div>
                      )}
                    </Card>

                    {/* 操作按钮组 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                      {/* 第一行：生成和导入按钮 */}
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <Button
                          type="primary"
                          icon={<RocketOutlined />}
                          onClick={handleGenerateResult}
                          loading={isGeneratingDetails}
                          disabled={isGeneratingDetails}
                          style={{
                            flex: 1,
                            height: '40px',
                            borderRadius: '0px',
                            background: isGeneratingDetails ? '#d9d9d9' : 'linear-gradient(135deg, #667eea, #764ba2)',
                            border: 'none'
                          }}
                        >
                          {isGeneratingDetails ? '生成中...' : `生成${splitResult.type === 'epic' ? 'Epic' : 'Epic+Story'}`}
                        </Button>
                        <Button
                          type="primary"
                          icon={<ImportOutlined />}
                          onClick={handleImportToPool}
                          style={{
                            flex: 1,
                            height: '40px',
                            borderRadius: '0px',
                            background: 'linear-gradient(135deg, #4ecdc4, #45b7d1)',
                            border: 'none'
                          }}
                        >
                          导入需求池
                        </Button>
                      </div>

                      {/* 第二行：返回按钮 */}
                      <Button
                        type="default"
                        onClick={() => setSplitResult(null)}
                        style={{ borderRadius: '0px' }}
                      >
                        返回解析结果
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Drawer>

          {/* 详细内容编辑器 */}
          <Modal
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '0px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    background: 'white',
                    borderRadius: '0px'
                  }} />
                </div>
                <span style={{ fontSize: '18px', fontWeight: '600' }}>
                  {splitResult?.type === 'epic' ? 'Epic详细内容编辑' : 'Epic+Story详细内容编辑'}
                </span>
              </div>
            }
            open={showDetailEditor}
            onCancel={() => setShowDetailEditor(false)}
            width="90%"
            style={{ top: 20 }}
            footer={null}
            zIndex={1000}
            styles={{
              header: {
                borderBottom: '1px solid #f0f0f0',
                paddingBottom: '16px'
              },
              body: {
                padding: '0',
                height: 'calc(100vh - 200px)',
                overflow: 'hidden'
              }
            }}
          >
            {/* 页面顶部操作栏 */}
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid #f0f0f0',
              background: '#fafafa'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong style={{ fontSize: '16px' }}>
                    {splitResult?.type === 'epic' ? 'Epic详细内容编辑' : 'Epic+Story详细内容编辑'}
                  </Text>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                    共 {detailedItems.length} 个Epic
                    {splitResult?.type === 'epic_story' && ` • ${detailedItems.reduce((total, item) => total + (item.stories?.length || 0), 0)} 个Story`}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button
                    onClick={handleShowOptimizeModal}
                    style={{
                      borderRadius: '0px',
                      background: 'linear-gradient(135deg, #4ecdc4, #45b7d1)',
                      border: 'none',
                      color: 'white'
                    }}
                  >
                    结果优化
                  </Button>
                  <Button
                    onClick={() => setShowSaveDraftModal(true)}
                    style={{
                      borderRadius: '0px',
                      background: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
                      border: 'none',
                      color: '#8b4513'
                    }}
                  >
                    保存草稿
                  </Button>
                  <Button
                    onClick={handleEvaluateCurrentResult}
                    style={{
                      borderRadius: '0px',
                      background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                      border: 'none',
                      color: 'white'
                    }}
                  >
                    需求评估
                  </Button>
                  {splitResult?.type === 'epic_story' && (
                    <Button
                      type="primary"
                      onClick={() => setShowResplitModal(true)}
                      disabled={isResplitting}
                      style={{
                        background: 'linear-gradient(135deg, #96ceb4, #4ecdc4)',
                        border: 'none',
                        borderRadius: '0px'
                      }}
                    >
                      重新拆分Story
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              height: 'calc(100% - 80px)',
              transition: 'all 0.3s ease'
            }}>
              {/* 左侧列表 */}
              <div style={{
                width: '300px',
                borderRight: '1px solid #f0f0f0',
                background: '#fafafa',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <Text strong style={{ fontSize: '14px' }}>Epic & Story 列表</Text>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => setEditorChatOpen(true)}
                      style={{
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        border: 'none',
                        borderRadius: '0px',
                        fontSize: '12px'
                      }}
                    >
                      AI助手
                    </Button>
                  </div>

                  {/* 生成进度显示 */}
                  {isGeneratingDetails && (
                    <div style={{
                      marginBottom: '12px',
                      padding: '12px',
                      background: '#f0f4ff',
                      borderRadius: '0px',
                      border: '1px solid #d6e4ff'
                    }}>
                      <div style={{ marginBottom: '8px' }}>
                        <Text strong style={{ fontSize: '12px', color: '#1890ff' }}>AI生成进度</Text>
                      </div>

                      {/* 总体进度条 */}
                      <div style={{ marginBottom: '8px' }}>
                        <Progress
                          percent={Math.round((Object.values(generationProgress).filter(status => status === 'completed').length / Object.keys(generationProgress).length) * 100)}
                          strokeColor={{
                            '0%': '#667eea',
                            '100%': '#764ba2',
                          }}
                          size="small"
                          format={(percent) => `${Object.values(generationProgress).filter(status => status === 'completed').length}/${Object.keys(generationProgress).length}`}
                        />
                      </div>

                      {/* 当前生成状态 */}
                      {currentGeneratingEpic && (
                        <div style={{ fontSize: '11px', color: '#666' }}>
                          <div className="animate-spin w-3 h-3 border border-blue-500 border-t-transparent inline-block mr-2"></div>
                          正在生成中...
                        </div>
                      )}
                    </div>
                  )}

                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'manual',
                          label: '手动添加Epic',
                          onClick: addNewEpic
                        },
                        {
                          key: 'ai',
                          label: 'AI生成Epic',
                          onClick: () => showAddOptions('epic')
                        }
                      ]
                    }}
                    disabled={isGeneratingDetails}
                  >
                    <Button
                      type="default"
                      size="small"
                      block
                      style={{ borderRadius: '0px' }}
                    >
                      + 添加Epic
                    </Button>
                  </Dropdown>
                </div>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  {/* 显示所有Epic，包括正在生成的 */}
                  {splitResult && isGeneratingDetails && Object.keys(generationProgress).map((epicId, index) => {
                    const status = generationProgress[epicId];
                    const originalItem = splitResult.items[index];
                    const generatedItem = detailedItems.find(item => item.id === epicId);
                    const item = generatedItem || originalItem;

                    return (
                      <div key={epicId}>
                        {/* Epic项 */}
                        <div
                          style={{
                            padding: '12px 16px',
                            background: selectedItem?.id === epicId ? '#e6f4ff' : 'transparent',
                            borderLeft: selectedItem?.id === epicId ? '3px solid #1890ff' : '3px solid transparent',
                            borderBottom: '1px solid #f0f0f0',
                            opacity: status === 'pending' ? 0.6 : 1
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div
                              style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, cursor: status === 'completed' ? 'pointer' : 'default' }}
                              onClick={() => status === 'completed' && setSelectedItem(generatedItem)}
                            >
                              <Tag color="blue" size="small" style={{ borderRadius: '0px' }}>Epic</Tag>
                              <Text strong style={{ fontSize: '14px' }}>{item.title}</Text>

                              {/* 状态指示器 */}
                              <div style={{ marginLeft: '8px' }}>
                                {status === 'completed' && (
                                  <CheckOutlined style={{ color: '#52c41a', fontSize: '12px' }} />
                                )}
                                {status === 'generating' && (
                                  <div className="animate-spin w-3 h-3 border border-blue-500 border-t-transparent inline-block"></div>
                                )}
                                {status === 'pending' && (
                                  <Tag size="small" color="default" style={{ borderRadius: '0px', fontSize: '10px' }}>等待中</Tag>
                                )}
                              </div>
                            </div>

                            {status === 'completed' && (
                              <div style={{ display: 'flex', gap: '4px' }}>
                                <Button
                                  type="text"
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startEditTitle(generatedItem);
                                  }}
                                  style={{ padding: '2px 4px' }}
                                >
                                  <EditOutlined style={{ fontSize: '12px' }} />
                                </Button>
                                <Button
                                  type="text"
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteItem(generatedItem.id, 'epic');
                                  }}
                                  style={{ padding: '2px 4px', color: '#ff4d4f' }}
                                >
                                  <CloseOutlined style={{ fontSize: '12px' }} />
                                </Button>
                              </div>
                            )}
                          </div>

                          {/* 添加Story按钮 - 只有完成生成的Epic才显示 */}
                          {status === 'completed' && (
                            <div style={{ marginTop: '8px' }}>
                              <Dropdown
                                menu={{
                                  items: [
                                    {
                                      key: 'manual',
                                      label: '手动添加Story',
                                      onClick: () => addNewStory(generatedItem.id)
                                    },
                                    {
                                      key: 'ai',
                                      label: 'AI生成Story',
                                      onClick: () => showAddOptions('story', generatedItem.id)
                                    }
                                  ]
                                }}
                              >
                                <Button
                                  type="dashed"
                                  size="small"
                                  onClick={(e) => e.stopPropagation()}
                                  style={{ borderRadius: '0px', fontSize: '12px' }}
                                >
                                  + 添加Story
                                </Button>
                              </Dropdown>
                            </div>
                          )}
                        </div>

                        {/* Story项 - 只有完成生成的Epic才显示Story */}
                        {status === 'completed' && generatedItem?.stories?.map((story: any) => (
                          <div
                            key={story.id}
                            style={{
                              padding: '8px 16px 8px 32px',
                              background: selectedItem?.id === story.id ? '#f6ffed' : 'transparent',
                              borderLeft: selectedItem?.id === story.id ? '3px solid #52c41a' : '3px solid transparent',
                              borderBottom: '1px solid #f5f5f5'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, cursor: 'pointer' }}
                                onClick={() => setSelectedItem(story)}
                              >
                                <Tag color="green" size="small" style={{ borderRadius: '0px' }}>Story</Tag>
                                {editingItemId === story.id ? (
                                  <Input
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                    onPressEnter={saveEditTitle}
                                    onBlur={saveEditTitle}
                                    style={{ fontSize: '13px', borderRadius: '0px' }}
                                    size="small"
                                    autoFocus
                                  />
                                ) : (
                                  <Text style={{ fontSize: '13px' }}>{story.title}</Text>
                                )}
                              </div>
                              <div style={{ display: 'flex', gap: '4px' }}>
                                <Button
                                  type="text"
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startEditTitle(story);
                                  }}
                                  style={{ padding: '2px 4px' }}
                                >
                                  <EditOutlined style={{ fontSize: '12px' }} />
                                </Button>
                                <Button
                                  type="text"
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteItem(story.id, 'story');
                                  }}
                                  style={{ padding: '2px 4px', color: '#ff4d4f' }}
                                >
                                  <CloseOutlined style={{ fontSize: '12px' }} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}

                  {/* 生成完成后显示正常的Epic列表 */}
                  {!isGeneratingDetails && detailedItems.map((item: any) => (
                    <div key={item.id}>
                      {/* Epic项 */}
                      <div
                        style={{
                          padding: '12px 16px',
                          background: selectedItem?.id === item.id ? '#e6f4ff' : 'transparent',
                          borderLeft: selectedItem?.id === item.id ? '3px solid #1890ff' : '3px solid transparent',
                          borderBottom: '1px solid #f0f0f0'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, cursor: 'pointer' }}
                            onClick={() => setSelectedItem(item)}
                          >
                            <Tag color="blue" size="small" style={{ borderRadius: '0px' }}>Epic</Tag>
                            {editingItemId === item.id ? (
                              <Input
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                                onPressEnter={saveEditTitle}
                                onBlur={saveEditTitle}
                                style={{ fontSize: '14px', borderRadius: '0px' }}
                                size="small"
                                autoFocus
                              />
                            ) : (
                              <Text strong style={{ fontSize: '14px' }}>{item.title}</Text>
                            )}
                          </div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <Button
                              type="text"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                startEditTitle(item);
                              }}
                              style={{ padding: '2px 4px' }}
                            >
                              <EditOutlined style={{ fontSize: '12px' }} />
                            </Button>
                            <Button
                              type="text"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteItem(item.id, 'epic');
                              }}
                              style={{ padding: '2px 4px', color: '#ff4d4f' }}
                            >
                              <CloseOutlined style={{ fontSize: '12px' }} />
                            </Button>
                          </div>
                        </div>

                        {/* 添加Story按钮 */}
                        <div style={{ marginTop: '8px' }}>
                          <Dropdown
                            menu={{
                              items: [
                                {
                                  key: 'manual',
                                  label: '手动添加Story',
                                  onClick: () => addNewStory(item.id)
                                },
                                {
                                  key: 'ai',
                                  label: 'AI生成Story',
                                  onClick: () => showAddOptions('story', item.id)
                                }
                              ]
                            }}
                          >
                            <Button
                              type="dashed"
                              size="small"
                              onClick={(e) => e.stopPropagation()}
                              style={{ borderRadius: '0px', fontSize: '12px' }}
                            >
                              + 添加Story
                            </Button>
                          </Dropdown>
                        </div>
                      </div>

                      {/* Story项 */}
                      {item.stories?.map((story: any) => (
                        <div
                          key={story.id}
                          style={{
                            padding: '8px 16px 8px 32px',
                            background: selectedItem?.id === story.id ? '#f6ffed' : 'transparent',
                            borderLeft: selectedItem?.id === story.id ? '3px solid #52c41a' : '3px solid transparent',
                            borderBottom: '1px solid #f5f5f5'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div
                              style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, cursor: 'pointer' }}
                              onClick={() => setSelectedItem(story)}
                            >
                              <Tag color="green" size="small" style={{ borderRadius: '0px' }}>Story</Tag>
                              {editingItemId === story.id ? (
                                <Input
                                  value={editingTitle}
                                  onChange={(e) => setEditingTitle(e.target.value)}
                                  onPressEnter={saveEditTitle}
                                  onBlur={saveEditTitle}
                                  style={{ fontSize: '13px', borderRadius: '0px' }}
                                  size="small"
                                  autoFocus
                                />
                              ) : (
                                <Text style={{ fontSize: '13px' }}>{story.title}</Text>
                              )}
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <Button
                                type="text"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startEditTitle(story);
                                }}
                                style={{ padding: '2px 4px' }}
                              >
                                <EditOutlined style={{ fontSize: '12px' }} />
                              </Button>
                              <Button
                                type="text"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteItem(story.id, 'story');
                                }}
                                style={{ padding: '2px 4px', color: '#ff4d4f' }}
                              >
                                <CloseOutlined style={{ fontSize: '12px' }} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* 导入需求池按钮 */}
                <div style={{ padding: '16px' }}>
                  <Button
                    type="primary"
                    block
                    icon={<ImportOutlined />}
                    onClick={() => {
                      // 从详细编辑器导入需求池
                      const newRequirements = detailedItems.map((item: any, index: number) => {
                        const baseId = data.length + index + 1;
                        const epicData = {
                          key: `epic-${baseId}`,
                          id: baseId,
                          title: item.detailedContent.title,
                          description: item.detailedContent.description,
                          type: "epic" as const,
                          status: "待开始" as const,
                          priority: "中" as const,
                          assignee: "未分配",
                          creator: "AI助手",
                          createTime: new Date().toLocaleDateString(),
                          children: [] as any[]
                        };

                        if (item.stories) {
                          epicData.children = item.stories.map((story: any, storyIndex: number) => ({
                            key: `story-${baseId}-${storyIndex}`,
                            id: baseId * 100 + storyIndex + 1,
                            title: story.detailedContent.card.split('，我想要')[1]?.split('，以便于')[0] || story.title,
                            description: story.detailedContent.acceptanceCriteria,
                            type: "story" as const,
                            status: "待开始" as const,
                            priority: story.detailedContent.priority === 'P0' ? "高" : story.detailedContent.priority === 'P1' ? "中" : "低" as const,
                            assignee: "未分配",
                            creator: "AI助手",
                            createTime: new Date().toLocaleDateString(),
                            parentId: baseId
                          }));
                        }

                        return epicData;
                      });

                      setData(prevData => [...prevData, ...newRequirements]);
                      setShowDetailEditor(false);
                      setAiOperationOpen(false);

                      // 重置状态
                      setParseResult(null);
                      setSplitResult(null);
                      setDetailedItems([]);
                      setSelectedItem(null);
                      setUploadedFile(null);
                      setDocumentUrl('');

                      message.success(`已成功导入${newRequirements.length}个详细Epic${splitResult?.type === 'epic_story' ? '及其Story' : ''}到需求池！`);
                    }}
                    style={{
                      height: '40px',
                      borderRadius: '0px',
                      background: 'linear-gradient(135deg, #4ecdc4, #45b7d1)',
                      border: 'none'
                    }}
                  >
                    导入需求池
                  </Button>
                </div>
              </div>

              {/* 右侧内容编辑区 */}
              <div style={{
                flex: 1,
                padding: '24px',
                overflowY: 'auto',
                marginRight: editorChatOpen ? '400px' : '0',
                transition: 'margin-right 0.3s ease'
              }}>
                {selectedItem && (
                  <div>
                    {selectedItem.type === 'epic' ? (
                      // Epic编辑界面
                      <div>
                        <div style={{ marginBottom: '24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <Tag color="blue" style={{ borderRadius: '0px' }}>Epic</Tag>
                            <Text strong style={{ fontSize: '18px' }}>{selectedItem.title}</Text>
                          </div>
                        </div>

                        {/* 标题 */}
                        <div style={{ marginBottom: '24px' }}>
                          <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                            1. 标题 (Title)
                          </Text>
                          <Input.TextArea
                            value={selectedItem.detailedContent.title}
                            onChange={(e) => {
                              const updatedItems = detailedItems.map(item =>
                                item.id === selectedItem.id
                                  ? { ...item, detailedContent: { ...item.detailedContent, title: e.target.value } }
                                  : item
                              );
                              setDetailedItems(updatedItems);
                              setSelectedItem({ ...selectedItem, detailedContent: { ...selectedItem.detailedContent, title: e.target.value } });
                            }}
                            rows={2}
                            style={{ borderRadius: '0px' }}
                            placeholder="为[谁] + 实现[什么价值] + 达到[什么目的]"
                          />
                        </div>

                        {/* 描述 */}
                        <div style={{ marginBottom: '24px' }}>
                          <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                            2. 描述 (Description)
                          </Text>
                          <Input.TextArea
                            value={selectedItem.detailedContent.description}
                            onChange={(e) => {
                              const updatedItems = detailedItems.map(item =>
                                item.id === selectedItem.id
                                  ? { ...item, detailedContent: { ...item.detailedContent, description: e.target.value } }
                                  : item
                              );
                              setDetailedItems(updatedItems);
                              setSelectedItem({ ...selectedItem, detailedContent: { ...selectedItem.detailedContent, description: e.target.value } });
                            }}
                            rows={4}
                            style={{ borderRadius: '0px' }}
                            placeholder="用2-3句话从业务角度描述Epic的宏观背景和价值..."
                          />
                        </div>

                        {/* 目标与成功标准 */}
                        <div style={{ marginBottom: '24px' }}>
                          <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                            3. 目标与成功标准 (Goals & Success Metrics)
                          </Text>
                          <Input.TextArea
                            value={selectedItem.detailedContent.goals}
                            onChange={(e) => {
                              const updatedItems = detailedItems.map(item =>
                                item.id === selectedItem.id
                                  ? { ...item, detailedContent: { ...item.detailedContent, goals: e.target.value } }
                                  : item
                              );
                              setDetailedItems(updatedItems);
                              setSelectedItem({ ...selectedItem, detailedContent: { ...selectedItem.detailedContent, goals: e.target.value } });
                            }}
                            rows={6}
                            style={{ borderRadius: '0px' }}
                            placeholder="业务目标和关键绩效指标..."
                          />
                        </div>

                        {/* 用户画像 */}
                        <div style={{ marginBottom: '24px' }}>
                          <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                            4. 用户画像/受众 (Personas / Audience)
                          </Text>
                          <Input.TextArea
                            value={selectedItem.detailedContent.personas}
                            onChange={(e) => {
                              const updatedItems = detailedItems.map(item =>
                                item.id === selectedItem.id
                                  ? { ...item, detailedContent: { ...item.detailedContent, personas: e.target.value } }
                                  : item
                              );
                              setDetailedItems(updatedItems);
                              setSelectedItem({ ...selectedItem, detailedContent: { ...selectedItem.detailedContent, personas: e.target.value } });
                            }}
                            rows={4}
                            style={{ borderRadius: '0px' }}
                            placeholder="明确这个Epic是为哪类用户服务的..."
                          />
                        </div>

                        {/* 功能主题 */}
                        <div style={{ marginBottom: '24px' }}>
                          <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                            5. 功能主题/子领域 (Themes / Sub-domains)
                          </Text>
                          <Input.TextArea
                            value={selectedItem.detailedContent.themes}
                            onChange={(e) => {
                              const updatedItems = detailedItems.map(item =>
                                item.id === selectedItem.id
                                  ? { ...item, detailedContent: { ...item.detailedContent, themes: e.target.value } }
                                  : item
                              );
                              setDetailedItems(updatedItems);
                              setSelectedItem({ ...selectedItem, detailedContent: { ...selectedItem.detailedContent, themes: e.target.value } });
                            }}
                            rows={4}
                            style={{ borderRadius: '0px' }}
                            placeholder="描述Epic涵盖的主要功能模块..."
                          />
                        </div>

                        {/* 依赖关系与风险 */}
                        <div style={{ marginBottom: '24px' }}>
                          <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                            6. 依赖关系与风险 (Dependencies & Risks)
                          </Text>
                          <Input.TextArea
                            value={selectedItem.detailedContent.dependencies}
                            onChange={(e) => {
                              const updatedItems = detailedItems.map(item =>
                                item.id === selectedItem.id
                                  ? { ...item, detailedContent: { ...item.detailedContent, dependencies: e.target.value } }
                                  : item
                              );
                              setDetailedItems(updatedItems);
                              setSelectedItem({ ...selectedItem, detailedContent: { ...selectedItem.detailedContent, dependencies: e.target.value } });
                            }}
                            rows={5}
                            style={{ borderRadius: '0px' }}
                            placeholder="识别外部依赖和潜在风险..."
                          />
                        </div>

                        {/* 粗略估算 */}
                        <div style={{ marginBottom: '24px' }}>
                          <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                            7. 粗略估算/初步规模 (Rough Order of Magnitude)
                          </Text>
                          <Input.TextArea
                            value={selectedItem.detailedContent.estimation}
                            onChange={(e) => {
                              const updatedItems = detailedItems.map(item =>
                                item.id === selectedItem.id
                                  ? { ...item, detailedContent: { ...item.detailedContent, estimation: e.target.value } }
                                  : item
                              );
                              setDetailedItems(updatedItems);
                              setSelectedItem({ ...selectedItem, detailedContent: { ...selectedItem.detailedContent, estimation: e.target.value } });
                            }}
                            rows={2}
                            style={{ borderRadius: '0px' }}
                            placeholder="XL, L, M, S 或理想人天/人周..."
                          />
                        </div>
                      </div>
                    ) : (
                      // Story编辑界面
                      <div>
                        <div style={{ marginBottom: '24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <Tag color="green" style={{ borderRadius: '0px' }}>Story</Tag>
                            <Text strong style={{ fontSize: '18px' }}>{selectedItem.title}</Text>
                          </div>
                        </div>

                        {/* 卡片格式 */}
                        <div style={{ marginBottom: '24px' }}>
                          <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                            1. 卡片 (Card) - 用户故事格式
                          </Text>
                          <Input.TextArea
                            value={selectedItem.detailedContent.card}
                            onChange={(e) => {
                              const updatedItems = detailedItems.map(item => {
                                if (item.stories) {
                                  const updatedStories = item.stories.map((story: any) =>
                                    story.id === selectedItem.id
                                      ? { ...story, detailedContent: { ...story.detailedContent, card: e.target.value } }
                                      : story
                                  );
                                  return { ...item, stories: updatedStories };
                                }
                                return item;
                              });
                              setDetailedItems(updatedItems);
                              setSelectedItem({ ...selectedItem, detailedContent: { ...selectedItem.detailedContent, card: e.target.value } });
                            }}
                            rows={3}
                            style={{ borderRadius: '0px' }}
                            placeholder="作为一个[某类用户]，我想要[完成某个动作]，以便于[达成某个目标/获得某种收益]"
                          />
                        </div>

                        {/* 验收标准 */}
                        <div style={{ marginBottom: '24px' }}>
                          <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                            2. 确认 (Confirmation) - 验收标准 (Acceptance Criteria)
                          </Text>
                          <Input.TextArea
                            value={selectedItem.detailedContent.acceptanceCriteria}
                            onChange={(e) => {
                              const updatedItems = detailedItems.map(item => {
                                if (item.stories) {
                                  const updatedStories = item.stories.map((story: any) =>
                                    story.id === selectedItem.id
                                      ? { ...story, detailedContent: { ...story.detailedContent, acceptanceCriteria: e.target.value } }
                                      : story
                                  );
                                  return { ...item, stories: updatedStories };
                                }
                                return item;
                              });
                              setDetailedItems(updatedItems);
                              setSelectedItem({ ...selectedItem, detailedContent: { ...selectedItem.detailedContent, acceptanceCriteria: e.target.value } });
                            }}
                            rows={8}
                            style={{ borderRadius: '0px' }}
                            placeholder="Given [某个前提条件] When [我执行某个动作] Then [我期望看到某个结果]"
                          />
                        </div>

                        {/* 优先级 */}
                        <div style={{ marginBottom: '24px' }}>
                          <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                            3. 优先级 (Priority)
                          </Text>
                          <Input
                            value={selectedItem.detailedContent.priority}
                            onChange={(e) => {
                              const updatedItems = detailedItems.map(item => {
                                if (item.stories) {
                                  const updatedStories = item.stories.map((story: any) =>
                                    story.id === selectedItem.id
                                      ? { ...story, detailedContent: { ...story.detailedContent, priority: e.target.value } }
                                      : story
                                  );
                                  return { ...item, stories: updatedStories };
                                }
                                return item;
                              });
                              setDetailedItems(updatedItems);
                              setSelectedItem({ ...selectedItem, detailedContent: { ...selectedItem.detailedContent, priority: e.target.value } });
                            }}
                            style={{ borderRadius: '0px' }}
                            placeholder="P0 (最高优先级), P1 (高优先级), P2 (中优先级)"
                          />
                        </div>

                        {/* 估算 */}
                        <div style={{ marginBottom: '24px' }}>
                          <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                            4. 估算 (Estimation)
                          </Text>
                          <Input
                            value={selectedItem.detailedContent.estimation}
                            onChange={(e) => {
                              const updatedItems = detailedItems.map(item => {
                                if (item.stories) {
                                  const updatedStories = item.stories.map((story: any) =>
                                    story.id === selectedItem.id
                                      ? { ...story, detailedContent: { ...story.detailedContent, estimation: e.target.value } }
                                      : story
                                  );
                                  return { ...item, stories: updatedStories };
                                }
                                return item;
                              });
                              setDetailedItems(updatedItems);
                              setSelectedItem({ ...selectedItem, detailedContent: { ...selectedItem.detailedContent, estimation: e.target.value } });
                            }}
                            style={{ borderRadius: '0px' }}
                            placeholder="Story Points 或理想人天"
                          />
                        </div>

                        {/* 依赖关系 */}
                        <div style={{ marginBottom: '24px' }}>
                          <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                            5. 依赖关系 (Dependencies)
                          </Text>
                          <Input.TextArea
                            value={selectedItem.detailedContent.dependencies}
                            onChange={(e) => {
                              const updatedItems = detailedItems.map(item => {
                                if (item.stories) {
                                  const updatedStories = item.stories.map((story: any) =>
                                    story.id === selectedItem.id
                                      ? { ...story, detailedContent: { ...story.detailedContent, dependencies: e.target.value } }
                                      : story
                                  );
                                  return { ...item, stories: updatedStories };
                                }
                                return item;
                              });
                              setDetailedItems(updatedItems);
                              setSelectedItem({ ...selectedItem, detailedContent: { ...selectedItem.detailedContent, dependencies: e.target.value } });
                            }}
                            rows={3}
                            style={{ borderRadius: '0px' }}
                            placeholder="此Story依赖的其他Story或外部任务"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Modal>

          {/* 编辑器AI助手聊天框 */}
          {editorChatOpen && (
            <div
              className="fixed right-0 top-0 h-full w-[400px] bg-white border-l shadow-lg flex flex-col"
              style={{
                zIndex: 9999,
                boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.15)',
                transform: editorChatOpen ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s ease'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <div style={{
                    width: '24px',
                    height: '24px',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    borderRadius: '0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '10px',
                      height: '10px',
                      background: 'white',
                      borderRadius: '0px'
                    }} />
                  </div>
                  <Text strong style={{ fontSize: '16px' }}>AI助手</Text>
                </div>
                <Button type="text" icon={<CloseOutlined />} onClick={closeEditorChat} />
              </div>

              {/* Chat Content */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                {editorChatMessages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#666', marginTop: '60px' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      borderRadius: '0px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px'
                    }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        background: 'white',
                        borderRadius: '0px'
                      }} />
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>AI助手已就绪</p>
                    <p style={{ fontSize: '14px', color: '#999' }}>我可以帮助您完善Epic和Story的内容</p>
                    {selectedItem && (
                      <div style={{
                        marginTop: '16px',
                        padding: '12px',
                        background: '#f0f4ff',
                        borderRadius: '0px',
                        textAlign: 'left'
                      }}>
                        <Text strong style={{ fontSize: '14px' }}>
                          当前编辑：{selectedItem.type === 'epic' ? 'Epic' : 'Story'}
                        </Text>
                        <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                          {selectedItem.title}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {editorChatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                        <div style={{
                          maxWidth: '80%',
                          padding: '12px 16px',
                          borderRadius: '0px',
                          backgroundColor: msg.role === 'user' ? '#667eea' : '#f8f9fa',
                          color: msg.role === 'user' ? 'white' : '#333',
                          fontSize: '14px',
                          lineHeight: '1.4'
                        }}>
                          <div className="whitespace-pre-wrap">{msg.content}</div>
                        </div>
                      </div>
                    ))}
                    {editorIsLoading && (
                      <div className="flex justify-start mb-4">
                        <div style={{
                          maxWidth: '80%',
                          padding: '12px 16px',
                          borderRadius: '0px',
                          backgroundColor: '#f8f9fa',
                          color: '#333',
                          fontSize: '14px'
                        }}>
                          <div className="flex items-center gap-2">
                            <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent"></div>
                            <span>AI正在思考...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div style={{
                padding: '20px',
                borderTop: '1px solid #f0f0f0',
                background: 'white'
              }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Input
                    value={editorInputMessage}
                    onChange={(e) => setEditorInputMessage(e.target.value)}
                    placeholder="询问AI如何改进Epic或Story内容..."
                    onPressEnter={handleEditorSendMessage}
                    disabled={editorIsLoading}
                    style={{
                      borderRadius: '0px',
                      fontSize: '14px'
                    }}
                  />
                  <Button
                    type="primary"
                    onClick={handleEditorSendMessage}
                    loading={editorIsLoading}
                    disabled={!editorInputMessage.trim()}
                    style={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      border: 'none',
                      borderRadius: '0px',
                      height: '32px'
                    }}
                  >
                    <SendOutlined />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 重新拆分Story Modal */}
          <Modal
            title="重新拆分Story"
            open={showResplitModal}
            onCancel={() => {
              setShowResplitModal(false);
              setResplitInput('');
            }}
            footer={[
              <Button key="cancel" onClick={() => {
                setShowResplitModal(false);
                setResplitInput('');
              }}>
                取消
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={isResplitting}
                onClick={handleResplitStories}
                style={{
                  background: 'linear-gradient(135deg, #4ecdc4, #45b7d1)',
                  border: 'none',
                  borderRadius: '0px'
                }}
              >
                重新拆分
              </Button>
            ]}
            width={500}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>请描述您希望如何重新拆分Story：</Text>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  例如：更注重用户体验、按照技术模块拆分、增加安全性考虑等
                </div>
              </div>
              <Input.TextArea
                value={resplitInput}
                onChange={(e) => setResplitInput(e.target.value)}
                placeholder="请输入您的拆分意向，AI将根据您的描述重新生成Story..."
                rows={4}
                style={{ borderRadius: '0px' }}
              />
            </div>
          </Modal>

          {/* AI添加Epic/Story Modal */}
          <Modal
            title={`AI生成${addModalType === 'epic' ? 'Epic' : 'Story'}`}
            open={showAddModal}
            onCancel={() => {
              setShowAddModal(false);
              setAddInput('');
            }}
            footer={[
              <Button key="cancel" onClick={() => {
                setShowAddModal(false);
                setAddInput('');
              }}>
                取消
              </Button>,
              <Button
                key="manual"
                onClick={() => {
                  setShowAddModal(false);
                  setAddInput('');
                  if (addModalType === 'epic') {
                    addNewEpic();
                  } else {
                    addNewStory(addModalParentId);
                  }
                }}
              >
                手动添加
              </Button>,
              <Button
                key="ai"
                type="primary"
                loading={isAiAdding}
                onClick={handleAiAdd}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  borderRadius: '0px'
                }}
              >
                AI生成
              </Button>
            ]}
            width={500}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>请描述您想要添加的{addModalType === 'epic' ? 'Epic' : 'Story'}：</Text>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  {addModalType === 'epic'
                    ? '例如：用户权限管理系统、数据分析平台、移动端适配等'
                    : '例如：用户登录验证、数据导出功能、消息推送等'
                  }
                </div>
              </div>
              <Input.TextArea
                value={addInput}
                onChange={(e) => setAddInput(e.target.value)}
                placeholder={`请描述您的意图，AI将自动生成${addModalType === 'epic' ? 'Epic' : 'Story'}的详细内容...`}
                rows={4}
                style={{ borderRadius: '0px' }}
              />
            </div>
          </Modal>

          {/* 需求评估Modal */}
          <Modal
            title="需求评估"
            open={showEvaluationModal}
            onCancel={() => {
              if (!isEvaluating) {
                setShowEvaluationModal(false);
                setEvaluationResult(null);
              }
            }}
            footer={null}
            width={700}
            closable={!isEvaluating}
            maskClosable={!isEvaluating}
          >
            <div style={{ padding: '16px 0' }}>
              {!evaluationResult ? (
                <>
                  {/* 评估规则选择 */}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <Text strong style={{ fontSize: '16px' }}>评估规则</Text>
                      <Button
                        type="dashed"
                        size="small"
                        onClick={() => setShowAddRuleModal(true)}
                        disabled={isEvaluating}
                        style={{ borderRadius: '0px' }}
                      >
                        + 添加规则
                      </Button>
                    </div>

                    <div style={{
                      maxHeight: '300px',
                      overflowY: 'auto',
                      border: '1px solid #f0f0f0',
                      borderRadius: '0px',
                      padding: '12px'
                    }}>
                      {evaluationRules.map(rule => (
                        <div key={rule.id} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '12px 0',
                          borderBottom: '1px solid #f5f5f5'
                        }}>
                          <input
                            type="checkbox"
                            checked={rule.selected}
                            onChange={() => toggleRuleSelection(rule.id)}
                            disabled={isEvaluating}
                            style={{ marginTop: '2px' }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                              {rule.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                              {rule.description}
                            </div>

                            {/* 评估进度 */}
                            {isEvaluating && evaluationProgress[rule.id] !== undefined && (
                              <div style={{ marginTop: '8px' }}>
                                <Progress
                                  percent={evaluationProgress[rule.id]}
                                  size="small"
                                  strokeColor={{
                                    '0%': '#f093fb',
                                    '100%': '#f5576c',
                                  }}
                                  format={(percent) =>
                                    currentEvaluatingRule === rule.name ? `${percent}%` :
                                    percent === 100 ? '完成' : `${percent}%`
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 开始评估按钮 */}
                  <div style={{ textAlign: 'center' }}>
                    <Button
                      type="primary"
                      size="large"
                      loading={isEvaluating}
                      onClick={handleStartEvaluation}
                      disabled={evaluationRules.filter(rule => rule.selected).length === 0}
                      style={{
                        height: '48px',
                        paddingLeft: '32px',
                        paddingRight: '32px',
                        borderRadius: '0px',
                        background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: '500'
                      }}
                    >
                      {isEvaluating ? '评估中...' : '开始评估'}
                    </Button>

                    {isEvaluating && (
                      <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
                        {currentEvaluatingRule ? `正在评估: ${currentEvaluatingRule}` : '准备开始评估...'}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* 评估结果展示 - 暂时为空 */
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                    borderRadius: '0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px'
                  }}>
                    <CheckOutlined style={{ fontSize: '32px', color: 'white' }} />
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>
                    需求评估完成
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
                    评估时间: {evaluationResult.timestamp}
                  </div>
                  <div style={{
                    padding: '20px',
                    background: '#f8f9fa',
                    borderRadius: '0px',
                    marginBottom: '24px'
                  }}>
                    <Text style={{ fontSize: '14px', color: '#666' }}>
                      评估结果详情将在下次对话中设计和实现
                    </Text>
                  </div>
                  <Button
                    type="primary"
                    onClick={() => {
                      setShowEvaluationModal(false);
                      setEvaluationResult(null);
                    }}
                    style={{
                      borderRadius: '0px',
                      background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                      border: 'none'
                    }}
                  >
                    关闭
                  </Button>
                </div>
              )}
            </div>
          </Modal>

          {/* 添加自定义规则Modal */}
          <Modal
            title="添加评估规则"
            open={showAddRuleModal}
            onCancel={() => {
              setShowAddRuleModal(false);
              setNewRuleName('');
              setNewRuleDescription('');
            }}
            footer={[
              <Button key="cancel" onClick={() => {
                setShowAddRuleModal(false);
                setNewRuleName('');
                setNewRuleDescription('');
              }}>
                取消
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={handleAddRule}
                style={{
                  background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                  border: 'none',
                  borderRadius: '0px'
                }}
              >
                添加规则
              </Button>
            ]}
            width={500}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  规则名称 *
                </Text>
                <Input
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  placeholder="请输入评估规则名称"
                  style={{ borderRadius: '0px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  规则描述
                </Text>
                <Input.TextArea
                  value={newRuleDescription}
                  onChange={(e) => setNewRuleDescription(e.target.value)}
                  placeholder="请输入评估规则的详细描述（可选）"
                  rows={3}
                  style={{ borderRadius: '0px' }}
                />
              </div>

              <div style={{ fontSize: '12px', color: '#666' }}>
                * 必填项。添加后的规则将默认选中，您可以在评估时取消选择。
              </div>
            </div>
          </Modal>

          {/* 需求评估结果页面 */}
          <Modal
            title="需求评估结果"
            open={showEvaluationResult}
            onCancel={() => setShowEvaluationResult(false)}
            footer={null}
            width="95%"
            style={{ top: 20 }}
            styles={{
              body: { padding: '0', height: 'calc(100vh - 200px)', overflow: 'hidden' }
            }}
          >
            {evaluationResult && (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* 功能区 */}
                <div style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid #f0f0f0',
                  background: '#fafafa'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Text strong style={{ fontSize: '18px' }}>需求评估结果</Text>
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                        评估时间: {evaluationResult.timestamp}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <Button
                        onClick={() => setShowReevaluationModal(true)}
                        style={{ borderRadius: '0px' }}
                      >
                        重新评估
                      </Button>

                      <Button
                        onClick={() => setShowEvaluationOptimizeModal(true)}
                        style={{
                          borderRadius: '0px',
                          background: 'linear-gradient(135deg, #4ecdc4, #45b7d1)',
                          border: 'none',
                          color: 'white'
                        }}
                      >
                        结果优化
                      </Button>
                      <Dropdown
                        open={shareDropdownOpen}
                        onOpenChange={setShareDropdownOpen}
                        menu={{
                          items: [
                            {
                              key: 'copy-link',
                              label: (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <CopyOutlined />
                                  <span>复制链接</span>
                                </div>
                              ),
                              onClick: handleCopyLink
                            },
                            {
                              key: 'export-pdf',
                              label: (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <FilePdfOutlined />
                                  <span>导出PDF</span>
                                </div>
                              ),
                              onClick: handleExportPDF
                            }
                          ]
                        }}
                        trigger={['click']}
                      >
                        <Button
                          style={{
                            borderRadius: '0px',
                            background: 'linear-gradient(135deg, #52c41a, #73d13d)',
                            border: 'none',
                            color: 'white'
                          }}
                        >
                          <ShareAltOutlined />
                          分享
                          <DownOutlined style={{ fontSize: '12px', marginLeft: '4px' }} />
                        </Button>
                      </Dropdown>
                    </div>
                  </div>
                </div>

                {/* 评分区 */}
                <div style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid #f0f0f0',
                  background: 'white'
                }}>
                  <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                    {/* 总分 */}
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '36px',
                        fontWeight: 'bold',
                        color: evaluationResult.overallScore >= 80 ? '#52c41a' :
                               evaluationResult.overallScore >= 60 ? '#faad14' : '#ff4d4f'
                      }}>
                        {evaluationResult.overallScore}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>总分</div>
                    </div>

                    {/* 问题数 */}
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ff4d4f' }}>
                        {evaluationResult.totalProblems}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>问题数</div>
                    </div>

                    {/* 各维度得分 */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
                        {evaluationResult.ruleResults.map((rule: any) => (
                          <div key={rule.ruleId} style={{ textAlign: 'center' }}>
                            <div style={{
                              fontSize: '24px',
                              fontWeight: 'bold',
                              color: rule.score >= 80 ? '#52c41a' :
                                     rule.score >= 60 ? '#faad14' : '#ff4d4f'
                            }}>
                              {rule.score}
                            </div>
                            <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>
                              {rule.ruleName}
                            </div>
                            <div style={{ fontSize: '11px', color: '#999' }}>
                              {rule.problemCount}个问题
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 正文区 */}
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                  {/* 左侧原文 */}
                  <div style={{
                    width: '50%',
                    padding: '20px',
                    borderRight: '1px solid #f0f0f0',
                    overflowY: 'auto'
                  }}>
                    <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '16px' }}>
                      {evaluationSource === 'document' ? '原文内容' : '评估内容'}
                    </Text>

                    {evaluationSource === 'document' ? (
                      // 文档评估 - 显示文档原文
                      <div style={{
                        fontSize: '14px',
                        lineHeight: '1.8',
                        color: '#333',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {evaluationContent?.fullContent || evaluationResult.originalText}
                      </div>
                    ) : evaluationSource === 'epic-story' ? (
                      // Epic/Story评估 - 按Section显示
                      <div>
                        {evaluationContent?.items?.map((item: any, index: number) => (
                          <div key={index} style={{ marginBottom: '24px' }}>
                            {/* Epic/Story标题 */}
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '12px',
                              paddingBottom: '8px',
                              borderBottom: '2px solid #f0f0f0'
                            }}>
                              <Tag
                                color={item.type === 'epic' ? 'blue' : 'green'}
                                style={{ borderRadius: '0px' }}
                              >
                                {item.type === 'epic' ? 'Epic' : 'Story'}
                              </Tag>
                              <Text strong style={{ fontSize: '15px' }}>{item.title}</Text>
                            </div>

                            {/* Epic/Story内容 */}
                            <div style={{
                              fontSize: '14px',
                              lineHeight: '1.6',
                              color: '#333',
                              marginLeft: '16px'
                            }}>
                              <div style={{ marginBottom: '12px' }}>
                                <Text strong style={{ color: '#1890ff' }}>描述：</Text>
                                <div style={{ marginTop: '4px' }}>{item.description}</div>
                              </div>

                              {item.card && (
                                <div style={{ marginBottom: '12px' }}>
                                  <Text strong style={{ color: '#1890ff' }}>用户故事：</Text>
                                  <div style={{ marginTop: '4px', fontStyle: 'italic' }}>{item.card}</div>
                                </div>
                              )}

                              {item.acceptanceCriteria && (
                                <div style={{ marginBottom: '12px' }}>
                                  <Text strong style={{ color: '#1890ff' }}>验收标准：</Text>
                                  <div style={{
                                    marginTop: '4px',
                                    whiteSpace: 'pre-wrap',
                                    background: '#f8f9fa',
                                    padding: '8px',
                                    borderRadius: '0px'
                                  }}>
                                    {item.acceptanceCriteria}
                                  </div>
                                </div>
                              )}

                              <div style={{ display: 'flex', gap: '16px', fontSize: '13px' }}>
                                {item.priority && (
                                  <div>
                                    <Text strong style={{ color: '#1890ff' }}>优先级：</Text>
                                    <Tag color="orange" size="small" style={{ borderRadius: '0px' }}>
                                      {item.priority}
                                    </Tag>
                                  </div>
                                )}
                                {item.estimation && (
                                  <div>
                                    <Text strong style={{ color: '#1890ff' }}>估算：</Text>
                                    <span>{item.estimation}</span>
                                  </div>
                                )}
                              </div>

                              {item.dependencies && (
                                <div style={{ marginTop: '8px', fontSize: '13px' }}>
                                  <Text strong style={{ color: '#1890ff' }}>依赖：</Text>
                                  <div style={{ marginTop: '4px', color: '#666' }}>{item.dependencies}</div>
                                </div>
                              )}
                            </div>

                            {/* 如果是Epic且有Story，显示子Story */}
                            {item.type === 'epic' && item.stories && item.stories.length > 0 && (
                              <div style={{ marginTop: '16px', marginLeft: '16px' }}>
                                <Text strong style={{ fontSize: '14px', color: '#52c41a' }}>
                                  包含的Story ({item.stories.length}个):
                                </Text>
                                {item.stories.map((story: any, storyIndex: number) => (
                                  <div key={storyIndex} style={{
                                    marginTop: '12px',
                                    marginLeft: '16px',
                                    paddingLeft: '12px',
                                    borderLeft: '3px solid #52c41a'
                                  }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                      <Tag color="green" size="small" style={{ borderRadius: '0px' }}>Story</Tag>
                                      <Text strong style={{ fontSize: '14px' }}>{story.title}</Text>
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                                      {story.description}
                                    </div>
                                    {story.card && (
                                      <div style={{ fontSize: '13px', fontStyle: 'italic', color: '#1890ff' }}>
                                        {story.card}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      // 默认显示原文
                      <div style={{
                        fontSize: '14px',
                        lineHeight: '1.8',
                        color: '#333',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {evaluationResult.originalText}
                      </div>
                    )}
                  </div>

                  {/* 右侧问题列表 */}
                  <div style={{
                    width: '50%',
                    padding: '20px',
                    overflowY: 'auto'
                  }}>
                    <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '16px' }}>
                      问题列表 ({evaluationResult.problems.length})
                    </Text>

                    {evaluationResult.problems.map((problem: any) => (
                      <Card
                        key={problem.id}
                        style={{
                          marginBottom: '16px',
                          borderRadius: '0px',
                          cursor: 'pointer',
                          border: selectedProblem?.id === problem.id ? '2px solid #f5576c' : '1px solid #e5e7eb'
                        }}
                        styles={{ body: { padding: '16px' } }}
                        onClick={() => handleLocateProblem(problem)}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                          <Tag
                            color={problem.severity === 'high' ? 'red' :
                                   problem.severity === 'medium' ? 'orange' : 'blue'}
                            style={{ borderRadius: '0px' }}
                          >
                            {problem.type}
                          </Tag>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '500', marginBottom: '8px' }}>
                              {problem.title}
                            </div>
                            <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                              {problem.description}
                            </div>

                            {selectedProblem?.id === problem.id && (
                              <div style={{
                                marginTop: '12px',
                                padding: '12px',
                                background: '#f8f9fa',
                                borderRadius: '0px'
                              }}>
                                <Text strong style={{ fontSize: '13px', display: 'block', marginBottom: '8px' }}>
                                  修改建议:
                                </Text>
                                <div style={{ fontSize: '13px', color: '#333' }}>
                                  {problem.suggestion}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Modal>

          {/* 创建改进任务Modal */}
          <Modal
            title="创建改进任务"
            open={showCreateTaskModal}
            onCancel={() => setShowCreateTaskModal(false)}
            footer={[
              <Button key="cancel" onClick={() => setShowCreateTaskModal(false)}>
                取消
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={handleCreateTask}
                style={{
                  background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                  border: 'none',
                  borderRadius: '0px'
                }}
              >
                创建任务
              </Button>
            ]}
            width={600}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  选择要改进的问题 *
                </Text>
                <div style={{
                  maxHeight: '200px',
                  overflowY: 'auto',
                  border: '1px solid #d9d9d9',
                  borderRadius: '0px',
                  padding: '8px'
                }}>
                  {evaluationResult?.problems.map((problem: any) => (
                    <div key={problem.id} style={{
                      padding: '8px',
                      marginBottom: '4px',
                      background: selectedProblemsForTask.includes(problem.id) ? '#f0f9ff' : 'transparent',
                      border: selectedProblemsForTask.includes(problem.id) ? '1px solid #1890ff' : '1px solid transparent',
                      borderRadius: '0px',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      const newSelection = selectedProblemsForTask.includes(problem.id)
                        ? selectedProblemsForTask.filter(id => id !== problem.id)
                        : [...selectedProblemsForTask, problem.id];
                      setSelectedProblemsForTask(newSelection);
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="checkbox"
                          checked={selectedProblemsForTask.includes(problem.id)}
                          onChange={() => {}}
                        />
                        <Tag
                          color={problem.severity === 'high' ? 'red' :
                                 problem.severity === 'medium' ? 'orange' : 'blue'}
                          size="small"
                          style={{ borderRadius: '0px' }}
                        >
                          {problem.type}
                        </Tag>
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>
                          {problem.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  已选择 {selectedProblemsForTask.length} 个问题
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  任务标题 *
                </Text>
                <Input
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="请输入改进任务标题"
                  style={{ borderRadius: '0px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  任务描述
                </Text>
                <Input.TextArea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="请描述需要改进的具体内容和要求"
                  rows={4}
                  style={{ borderRadius: '0px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    优先级
                  </Text>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                    style={{
                      width: '100%',
                      height: '32px',
                      border: '1px solid #d9d9d9',
                      borderRadius: '0px',
                      padding: '0 8px'
                    }}
                  >
                    <option value="高">高</option>
                    <option value="中">中</option>
                    <option value="低">低</option>
                  </select>
                </div>

                <div style={{ flex: 1 }}>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                    指派给
                  </Text>
                  <Input
                    value={taskAssignee}
                    onChange={(e) => setTaskAssignee(e.target.value)}
                    placeholder="输入用户名或邮箱"
                    style={{ borderRadius: '0px' }}
                  />
                </div>
              </div>
            </div>
          </Modal>

          {/* 独立需求评估入口Modal */}
          <Modal
            title="需求评估"
            open={showStandaloneEvaluation}
            onCancel={() => setShowStandaloneEvaluation(false)}
            footer={null}
            width={600}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '24px' }}>
                <Text strong style={{ fontSize: '16px' }}>选择文档来源</Text>
              </div>

              {/* 上传文档 */}
              <Card
                style={{
                  marginBottom: '16px',
                  borderRadius: '0px',
                  border: standaloneUploadedFile ? '2px solid #f5576c' : '1px solid #e5e7eb'
                }}
                styles={{ body: { padding: '20px' } }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #f093fb20, #f5576c40)',
                    borderRadius: '0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <UploadOutlined style={{ fontSize: '20px', color: '#f5576c' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>上传文档</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>支持 PDF, DOC, DOCX, TXT 格式</div>
                  </div>
                  <Upload
                    accept=".pdf,.doc,.docx,.txt"
                    showUploadList={false}
                    beforeUpload={(file) => {
                      setStandaloneUploadedFile(file);
                      message.success(`文件 ${file.name} 已选择`);
                      return false;
                    }}
                  >
                    <Button type="primary" style={{ borderRadius: '0px' }}>
                      选择文件
                    </Button>
                  </Upload>
                </div>
                {standaloneUploadedFile && (
                  <div style={{
                    marginTop: '12px',
                    padding: '8px 12px',
                    background: '#fff2f0',
                    borderRadius: '0px',
                    fontSize: '14px'
                  }}>
                    <FileTextOutlined style={{ marginRight: '8px', color: '#f5576c' }} />
                    {standaloneUploadedFile.name}
                  </div>
                )}
              </Card>

              {/* 导入URL */}
              <Card
                style={{
                  marginBottom: '16px',
                  borderRadius: '0px',
                  border: standaloneDocUrl ? '2px solid #f5576c' : '1px solid #e5e7eb'
                }}
                styles={{ body: { padding: '20px' } }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #4ecdc420, #4ecdc440)',
                    borderRadius: '0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <LinkOutlined style={{ fontSize: '20px', color: '#4ecdc4' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>导入文档URL</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>从在线文档链接导入</div>
                  </div>
                </div>
                <Input
                  placeholder="请输入文档URL地址"
                  value={standaloneDocUrl}
                  onChange={(e) => setStandaloneDocUrl(e.target.value)}
                  style={{ borderRadius: '0px' }}
                />
              </Card>

              {/* 选择Epic或Story */}
              <Card
                style={{
                  marginBottom: '16px',
                  borderRadius: '0px',
                  border: selectedEpicsStories.length > 0 ? '2px solid #f5576c' : '1px solid #e5e7eb',
                  cursor: 'pointer'
                }}
                styles={{ body: { padding: '20px' } }}
                hoverable
                onClick={() => setShowEpicStorySelector(true)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #f5576c20, #f5576c40)',
                    borderRadius: '0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{ fontSize: '20px' }}>🎯</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>选择Epic或Story</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>从现有需求池中选择要评估的Epic或Story</div>
                  </div>
                </div>
                {selectedEpicsStories.length > 0 && (
                  <div style={{
                    marginTop: '12px',
                    padding: '8px 12px',
                    background: '#fff2f0',
                    borderRadius: '0px',
                    fontSize: '14px'
                  }}>
                    <span style={{ color: '#f5576c' }}>已选择 {selectedEpicsStories.length} 个需求项</span>
                  </div>
                )}
              </Card>

              {/* 从文档库导入 */}
              <Card
                style={{
                  marginBottom: '24px',
                  borderRadius: '0px',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer'
                }}
                styles={{ body: { padding: '20px' } }}
                hoverable
                onClick={() => message.info('文档库功能开发中...')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #45b7d120, #45b7d140)',
                    borderRadius: '0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FolderOutlined style={{ fontSize: '20px', color: '#45b7d1' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>从文档库导入</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>从已有的文档库中选择</div>
                  </div>
                </div>
              </Card>

              {/* 开始解析按钮 */}
              <Button
                type="primary"
                size="large"
                block
                loading={isStandaloneParsing}
                disabled={!standaloneUploadedFile && !standaloneDocUrl && selectedEpicsStories.length === 0}
                onClick={selectedEpicsStories.length > 0 ? handleConfirmEpicStorySelection : handleStandaloneDocParse}
                style={{
                  height: '48px',
                  borderRadius: '0px',
                  background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
              >
                {isStandaloneParsing ? '解析中...' :
                 selectedEpicsStories.length > 0 ? '开始评估选中需求' : '开始解析并评估'}
              </Button>
            </div>
          </Modal>

          {/* 总结问题Modal */}
          <Modal
            title="问题总结"
            open={showSummaryModal}
            onCancel={() => setShowSummaryModal(false)}
            footer={[
              <Button key="close" onClick={() => setShowSummaryModal(false)}>
                关闭
              </Button>,
              <Button
                key="copy"
                type="primary"
                onClick={handleCopySummary}
                style={{
                  background: 'linear-gradient(135deg, #4ecdc4, #45b7d1)',
                  border: 'none',
                  borderRadius: '0px'
                }}
              >
                一键复制
              </Button>
            ]}
            width={700}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{
                background: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '0px',
                padding: '16px',
                maxHeight: '500px',
                overflowY: 'auto'
              }}>
                <pre style={{
                  margin: 0,
                  fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: '#333',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {summaryText}
                </pre>
              </div>

              <div style={{
                marginTop: '16px',
                padding: '12px',
                background: '#e6f4ff',
                borderRadius: '0px',
                fontSize: '14px',
                color: '#1890ff'
              }}>
                💡 提示：点击"一键复制"按钮将总结内容复制到剪贴板，便于分享给团队成员或保存到文档中。
              </div>
            </div>
          </Modal>

          {/* Story生成器输入Modal */}
          <Modal
            title="生成Story"
            open={showStoryGeneratorModal}
            onCancel={() => setShowStoryGeneratorModal(false)}
            footer={[
              <Button key="cancel" onClick={() => setShowStoryGeneratorModal(false)}>
                取消
              </Button>,
              <Button
                key="generate"
                type="primary"
                onClick={handleGenerateStories}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  border: 'none',
                  borderRadius: '0px'
                }}
              >
                确认生成
              </Button>
            ]}
            width={500}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  选择需求类型
                </Text>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="story"
                        checked={requirementType === 'story'}
                        onChange={(e) => setRequirementType(e.target.value as 'epic' | 'story')}
                      />
                      <Tag color="green" style={{ borderRadius: '0px' }}>Story</Tag>
                      <span>用户故事 - 具体的功能需求</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        value="epic"
                        checked={requirementType === 'epic'}
                        onChange={(e) => setRequirementType(e.target.value as 'epic' | 'story')}
                      />
                      <Tag color="blue" style={{ borderRadius: '0px' }}>Epic</Tag>
                      <span>史诗需求 - 大型功能模块</span>
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  请输入{requirementType === 'epic' ? 'Epic' : 'Story'}生成提示词
                </Text>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                  {requirementType === 'epic'
                    ? '例如：用户管理系统、数据分析平台、消息通知中心等'
                    : '例如：用户登录功能、数据导出、消息推送、权限管理等'
                  }
                </div>
                <Input.TextArea
                  value={storyPrompt}
                  onChange={(e) => setStoryPrompt(e.target.value)}
                  placeholder={`请描述您想要生成的${requirementType === 'epic' ? 'Epic功能模块' : 'Story功能'}...`}
                  rows={4}
                  style={{ borderRadius: '0px' }}
                />
              </div>

              {/* 参考文档区域 */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <Text strong>参考文档</Text>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => setShowStoryGeneratorDocSection(!showStoryGeneratorDocSection)}
                    style={{ padding: 0, fontSize: '12px' }}
                  >
                    {showStoryGeneratorDocSection ? '收起' : '展开'}
                  </Button>
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  提供参考文档可以让AI生成更准确、更符合实际需求的内容
                </div>

                {showStoryGeneratorDocSection && (
                  <div style={{ border: '1px solid #f0f0f0', borderRadius: '6px', padding: '16px', background: '#fafafa' }}>
                    {/* 上传文档 */}
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <UploadOutlined style={{ color: '#1890ff' }} />
                        <Text strong style={{ fontSize: '14px' }}>上传文档</Text>
                      </div>
                      <Upload
                        accept=".pdf,.doc,.docx,.txt"
                        showUploadList={false}
                        beforeUpload={(file) => {
                          setStoryGeneratorUploadedFile(file);
                          setStoryGeneratorDocUrl(''); // 清空URL输入
                          message.success(`文件 ${file.name} 已选择`);
                          return false;
                        }}
                      >
                        <Button style={{ borderRadius: '6px' }}>
                          选择文件
                        </Button>
                      </Upload>
                      {storyGeneratorUploadedFile && (
                        <div style={{
                          marginTop: '8px',
                          padding: '8px 12px',
                          background: '#e6f4ff',
                          borderRadius: '4px',
                          fontSize: '13px',
                          color: '#1890ff'
                        }}>
                          <FileTextOutlined style={{ marginRight: '6px' }} />
                          {storyGeneratorUploadedFile.name}
                        </div>
                      )}
                    </div>

                    {/* URL导入 */}
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <LinkOutlined style={{ color: '#1890ff' }} />
                        <Text strong style={{ fontSize: '14px' }}>从URL导入</Text>
                      </div>
                      <Input
                        placeholder="请输入文档URL"
                        value={storyGeneratorDocUrl}
                        onChange={(e) => {
                          setStoryGeneratorDocUrl(e.target.value);
                          if (e.target.value.trim()) {
                            setStoryGeneratorUploadedFile(null); // 清空文件上传
                          }
                        }}
                        style={{ borderRadius: '6px' }}
                      />
                    </div>

                    {/* 文档库导入 */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <FolderOutlined style={{ color: '#1890ff' }} />
                        <Text strong style={{ fontSize: '14px' }}>从文档库导入</Text>
                      </div>
                      <Button
                        style={{ borderRadius: '6px' }}
                        onClick={() => message.info('文档库功能开发中...')}
                      >
                        选择文档
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {selectedContextItems.length > 0 && (
                <div style={{
                  marginBottom: '16px',
                  padding: '12px',
                  background: '#f0f9ff',
                  borderRadius: '0px'
                }}>
                  <Text strong style={{ fontSize: '13px', color: '#1890ff', display: 'block', marginBottom: '8px' }}>
                    已选择的上下文 ({selectedContextItems.length}个):
                  </Text>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {selectedContextItems.map((item: any) => (
                      <Tag
                        key={item.key}
                        color={item.itemType === 'epic' ? 'blue' : 'green'}
                        size="small"
                        style={{ borderRadius: '0px' }}
                      >
                        {item.title}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Modal>

          {/* Story生成器页面 */}
          <Modal
            title="Story生成结果"
            open={showStoryGeneratorPage}
            onCancel={() => setShowStoryGeneratorPage(false)}
            footer={null}
            width="90%"
            style={{ top: 20 }}
            styles={{
              body: { padding: '0', height: 'calc(100vh - 200px)', overflow: 'hidden' }
            }}
          >
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* 功能区 */}
              <div style={{
                padding: '20px 24px',
                borderBottom: '1px solid #f0f0f0',
                background: '#fafafa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong style={{ fontSize: '18px' }}>补充需求生成结果</Text>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                      {selectedContextItems.length > 0 ? (
                        <>
                          类型: {requirementType === 'epic' ? 'Epic' : 'Story'} |
                          上下文: {selectedContextItems.length}个项目 |
                          提示词: "{storyPrompt}"
                        </>
                      ) : (
                        <>类型: {requirementType === 'epic' ? 'Epic' : 'Story'} | 基于提示词: "{storyPrompt}"</>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Button
                      onClick={handleShowRegenerateModal}
                      style={{
                        borderRadius: '0px',
                        background: 'linear-gradient(135deg, #4ecdc4, #45b7d1)',
                        border: 'none',
                        color: 'white'
                      }}
                    >
                      结果优化
                    </Button>
                    <Button
                      onClick={() => setShowSaveDraftModal(true)}
                      style={{
                        borderRadius: '0px',
                        background: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
                        border: 'none',
                        color: '#8b4513'
                      }}
                    >
                      保存草稿
                    </Button>
                    <Button
                      onClick={handleEvaluateCurrentResult}
                      style={{
                        borderRadius: '0px',
                        background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                        border: 'none',
                        color: 'white'
                      }}
                    >
                      需求评估
                    </Button>
                    <Button
                      type="primary"
                      onClick={handleImportGeneratedStories}
                      style={{
                        borderRadius: '0px',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        border: 'none'
                      }}
                    >
                      导入需求池
                    </Button>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                height: 'calc(100% - 80px)',
                transition: 'all 0.3s ease'
              }}>
                {/* 左侧Story列表 */}
                <div style={{
                  width: '300px',
                  borderRight: '1px solid #f0f0f0',
                  background: '#fafafa',
                  overflowY: 'auto'
                }}>
                  <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                    <Text strong style={{ fontSize: '14px' }}>生成的Story列表</Text>
                  </div>

                  {generatedStories.map((story: any) => (
                    <div
                      key={story.id}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        background: selectedStory?.id === story.id ? '#e6f4ff' : 'transparent',
                        borderLeft: selectedStory?.id === story.id ? '3px solid #1890ff' : '3px solid transparent',
                        borderBottom: '1px solid #f0f0f0'
                      }}
                      onClick={() => setSelectedStory(story)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Tag color="green" size="small" style={{ borderRadius: '0px' }}>Story</Tag>
                        <Text strong style={{ fontSize: '14px' }}>{story.title}</Text>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 右侧Story详情编辑 */}
                <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
                  {selectedStory && (
                    <div>
                      <div style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                          <Tag color="green" style={{ borderRadius: '0px' }}>Story</Tag>
                          <Text strong style={{ fontSize: '18px' }}>{selectedStory.title}</Text>
                        </div>
                      </div>

                      {/* Story编辑界面 - 复用之前的结构 */}
                      <div style={{ marginBottom: '24px' }}>
                        <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                          1. 卡片 (Card) - 用户故事格式
                        </Text>
                        <Input.TextArea
                          value={selectedStory.detailedContent.card}
                          onChange={(e) => {
                            const updatedStories = generatedStories.map(story =>
                              story.id === selectedStory.id
                                ? { ...story, detailedContent: { ...story.detailedContent, card: e.target.value } }
                                : story
                            );
                            setGeneratedStories(updatedStories);
                            setSelectedStory({ ...selectedStory, detailedContent: { ...selectedStory.detailedContent, card: e.target.value } });
                          }}
                          rows={3}
                          style={{ borderRadius: '0px' }}
                          placeholder="作为一个[某类用户]，我想要[完成某个动作]，以便于[达成某个目标/获得某种收益]"
                        />
                      </div>

                      <div style={{ marginBottom: '24px' }}>
                        <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                          2. 确认 (Confirmation) - 验收标准 (Acceptance Criteria)
                        </Text>
                        <Input.TextArea
                          value={selectedStory.detailedContent.acceptanceCriteria}
                          onChange={(e) => {
                            const updatedStories = generatedStories.map(story =>
                              story.id === selectedStory.id
                                ? { ...story, detailedContent: { ...story.detailedContent, acceptanceCriteria: e.target.value } }
                                : story
                            );
                            setGeneratedStories(updatedStories);
                            setSelectedStory({ ...selectedStory, detailedContent: { ...selectedStory.detailedContent, acceptanceCriteria: e.target.value } });
                          }}
                          rows={8}
                          style={{ borderRadius: '0px' }}
                          placeholder="Given [某个前提条件] When [我执行某个动作] Then [我期望看到某个结果]"
                        />
                      </div>

                      <div style={{ marginBottom: '24px' }}>
                        <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                          3. 优先级 (Priority)
                        </Text>
                        <Input
                          value={selectedStory.detailedContent.priority}
                          onChange={(e) => {
                            const updatedStories = generatedStories.map(story =>
                              story.id === selectedStory.id
                                ? { ...story, detailedContent: { ...story.detailedContent, priority: e.target.value } }
                                : story
                            );
                            setGeneratedStories(updatedStories);
                            setSelectedStory({ ...selectedStory, detailedContent: { ...selectedStory.detailedContent, priority: e.target.value } });
                          }}
                          style={{ borderRadius: '0px' }}
                          placeholder="P0 (最高优先级), P1 (高优先级), P2 (中优先级)"
                        />
                      </div>

                      <div style={{ marginBottom: '24px' }}>
                        <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                          4. 估算 (Estimation)
                        </Text>
                        <Input
                          value={selectedStory.detailedContent.estimation}
                          onChange={(e) => {
                            const updatedStories = generatedStories.map(story =>
                              story.id === selectedStory.id
                                ? { ...story, detailedContent: { ...story.detailedContent, estimation: e.target.value } }
                                : story
                            );
                            setGeneratedStories(updatedStories);
                            setSelectedStory({ ...selectedStory, detailedContent: { ...selectedStory.detailedContent, estimation: e.target.value } });
                          }}
                          style={{ borderRadius: '0px' }}
                          placeholder="Story Points 或理想人天"
                        />
                      </div>

                      <div style={{ marginBottom: '24px' }}>
                        <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                          5. 依赖关系 (Dependencies)
                        </Text>
                        <Input.TextArea
                          value={selectedStory.detailedContent.dependencies}
                          onChange={(e) => {
                            const updatedStories = generatedStories.map(story =>
                              story.id === selectedStory.id
                                ? { ...story, detailedContent: { ...story.detailedContent, dependencies: e.target.value } }
                                : story
                            );
                            setGeneratedStories(updatedStories);
                            setSelectedStory({ ...selectedStory, detailedContent: { ...selectedStory.detailedContent, dependencies: e.target.value } });
                          }}
                          rows={3}
                          style={{ borderRadius: '0px' }}
                          placeholder="此Story依赖的其他Story或外部任务"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Modal>

          {/* 依赖识别结果页面 */}
          <Modal
            title="依赖关系分析结果"
            open={showDependencyResult}
            onCancel={() => setShowDependencyResult(false)}
            footer={null}
            width="90%"
            style={{ top: 20 }}
            styles={{
              body: { padding: '0', height: 'calc(100vh - 200px)', overflow: 'hidden' }
            }}
          >
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* 功能区 */}
              <div style={{
                padding: '20px 24px',
                borderBottom: '1px solid #f0f0f0',
                background: '#fafafa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong style={{ fontSize: '18px' }}>依赖关系分析结果</Text>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                      已分析 {selectedItems.length} 个需求项的依赖关系
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Input
                      placeholder="输入提示词重新生成依赖关系..."
                      value={dependencyPrompt}
                      onChange={(e) => setDependencyPrompt(e.target.value)}
                      style={{ width: '300px', borderRadius: '0px' }}
                      onPressEnter={handleRegenerateDependencies}
                    />
                    <Button
                      onClick={handleRegenerateDependencies}
                      style={{
                        borderRadius: '0px',
                        background: 'linear-gradient(135deg, #4ecdc4, #45b7d1)',
                        border: 'none',
                        color: 'white'
                      }}
                    >
                      重新生成
                    </Button>
                    <Button
                      type="primary"
                      onClick={handleSyncToOnes}
                      style={{
                        borderRadius: '0px',
                        background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                        border: 'none'
                      }}
                    >
                      批量同步至ONES
                    </Button>
                  </div>
                </div>
              </div>

              {/* 依赖关系展示区 */}
              <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
                {dependencyGroups.map((group: any) => (
                  <Card
                    key={group.id}
                    style={{
                      marginBottom: '24px',
                      borderRadius: '0px',
                      border: '1px solid #e5e7eb'
                    }}
                    styles={{ body: { padding: '20px' } }}
                  >
                    <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                          {group.title}
                        </Text>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                          {group.description}
                        </div>
                      </div>
                      <Button
                        type="primary"
                        size="small"
                        onClick={() => handleSyncGroupToOnes(group.id)}
                        style={{
                          borderRadius: '0px',
                          background: 'linear-gradient(135deg, #52c41a, #73d13d)',
                          border: 'none',
                          marginLeft: '16px'
                        }}
                      >
                        同步至ONES
                      </Button>
                    </div>

                    {group.dependencies.map((dep: any, index: number) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          padding: '16px',
                          background: '#f8f9fa',
                          borderRadius: '0px',
                          marginBottom: '12px'
                        }}
                      >
                        {/* 源项目 */}
                        <div style={{
                          flex: 1,
                          padding: '12px',
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0px'
                        }}>
                          <Tag
                            color={dep.from.type === 'epic' ? 'blue' : 'green'}
                            size="small"
                            style={{ borderRadius: '0px', marginBottom: '8px' }}
                          >
                            {dep.from.type === 'epic' ? 'Epic' : 'Story'}
                          </Tag>
                          <div style={{ fontWeight: '500' }}>{dep.from.title}</div>
                        </div>

                        {/* 关系箭头 */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          minWidth: '120px'
                        }}>
                          <div style={{
                            fontSize: '24px',
                            color: dep.relationship === '依赖' ? '#1890ff' :
                                   dep.relationship === '关联' ? '#52c41a' :
                                   dep.relationship === '冲突' ? '#ff4d4f' :
                                   dep.relationship === '替代' ? '#faad14' : '#f5576c',
                            marginBottom: '4px'
                          }}>
                            {dep.relationship === '冲突' ? '⚡' :
                             dep.relationship === '替代' ? '⇄' :
                             dep.relationship === '关联' ? '↔' : '→'}
                          </div>
                          <Tag
                            color={dep.relationship === '依赖' ? 'blue' :
                                   dep.relationship === '关联' ? 'green' :
                                   dep.relationship === '冲突' ? 'red' :
                                   dep.relationship === '替代' ? 'orange' : 'purple'}
                            style={{ borderRadius: '0px', fontSize: '12px' }}
                          >
                            {dep.relationship}
                          </Tag>
                        </div>

                        {/* 目标项目 */}
                        <div style={{
                          flex: 1,
                          padding: '12px',
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0px'
                        }}>
                          <Tag
                            color={dep.to.type === 'epic' ? 'blue' : 'green'}
                            size="small"
                            style={{ borderRadius: '0px', marginBottom: '8px' }}
                          >
                            {dep.to.type === 'epic' ? 'Epic' : 'Story'}
                          </Tag>
                          <div style={{ fontWeight: '500' }}>{dep.to.title}</div>
                        </div>
                      </div>
                    ))}

                    {/* 依赖说明 */}
                    {group.dependencies.map((dep: any, index: number) => (
                      <div
                        key={`desc-${index}`}
                        style={{
                          padding: '12px',
                          background: '#e6f4ff',
                          borderRadius: '0px',
                          marginBottom: '8px',
                          fontSize: '14px',
                          color: '#1890ff'
                        }}
                      >
                        💡 {dep.description}
                      </div>
                    ))}
                  </Card>
                ))}
              </div>
            </div>
          </Modal>

          {/* 优先级排序结果页面 */}
          <Modal
            title="优先级排序建议"
            open={showPriorityResult}
            onCancel={() => setShowPriorityResult(false)}
            footer={null}
            width="80%"
            style={{ top: 20 }}
            styles={{
              body: { padding: '0', height: 'calc(100vh - 200px)', overflow: 'hidden' }
            }}
          >
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* 功能区 */}
              <div style={{
                padding: '20px 24px',
                borderBottom: '1px solid #f0f0f0',
                background: '#fafafa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong style={{ fontSize: '18px' }}>优先级排序建议</Text>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                      已分析 {prioritizedStories.length} 个Story的优先级
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Button
                      type="primary"
                      onClick={handleSyncPriorityToOnes}
                      style={{
                        borderRadius: '0px',
                        background: 'linear-gradient(135deg, #52c41a, #73d13d)',
                        border: 'none'
                      }}
                    >
                      同步至ONES
                    </Button>
                  </div>
                </div>
              </div>

              {/* 优先级列表 */}
              <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
                {/* P0 优先级 */}
                {prioritizedStories.filter(story => story.suggestedPriority === 'P0').length > 0 && (
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px',
                      paddingBottom: '8px',
                      borderBottom: '2px solid #ff4d4f'
                    }}>
                      <Tag
                        color="red"
                        style={{
                          borderRadius: '0px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          padding: '4px 12px'
                        }}
                      >
                        P0 - 最高优先级
                      </Tag>
                      <Text style={{ fontSize: '14px', color: '#666' }}>
                        ({prioritizedStories.filter(story => story.suggestedPriority === 'P0').length} 个Story)
                      </Text>
                    </div>

                    {prioritizedStories
                      .filter(story => story.suggestedPriority === 'P0')
                      .map((story, index) => (
                        <Card
                          key={story.key}
                          style={{
                            marginBottom: '16px',
                            borderRadius: '0px',
                            border: '1px solid #ff4d4f',
                            borderLeft: '4px solid #ff4d4f'
                          }}
                          styles={{ body: { padding: '16px' } }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <Text strong style={{ fontSize: '16px' }}>{story.title}</Text>
                                <Tag color="green" size="small" style={{ borderRadius: '0px' }}>Story</Tag>
                              </div>
                              <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                                {story.description}
                              </div>
                              <div style={{
                                padding: '8px 12px',
                                background: '#fff2f0',
                                borderRadius: '0px',
                                fontSize: '13px',
                                color: '#ff4d4f'
                              }}>
                                💡 {story.reason}
                              </div>
                            </div>
                            <div style={{ marginLeft: '16px' }}>
                              <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
                                调整优先级:
                              </div>
                              <select
                                value={story.suggestedPriority}
                                onChange={(e) => handleUpdateStoryPriority(story.key, e.target.value)}
                                style={{
                                  padding: '4px 8px',
                                  borderRadius: '0px',
                                  border: '1px solid #d9d9d9',
                                  fontSize: '12px'
                                }}
                              >
                                <option value="P0">P0 - 最高</option>
                                <option value="P1">P1 - 高</option>
                                <option value="P2">P2 - 中</option>
                              </select>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                )}

                {/* P1 优先级 */}
                {prioritizedStories.filter(story => story.suggestedPriority === 'P1').length > 0 && (
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px',
                      paddingBottom: '8px',
                      borderBottom: '2px solid #faad14'
                    }}>
                      <Tag
                        color="orange"
                        style={{
                          borderRadius: '0px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          padding: '4px 12px'
                        }}
                      >
                        P1 - 高优先级
                      </Tag>
                      <Text style={{ fontSize: '14px', color: '#666' }}>
                        ({prioritizedStories.filter(story => story.suggestedPriority === 'P1').length} 个Story)
                      </Text>
                    </div>

                    {prioritizedStories
                      .filter(story => story.suggestedPriority === 'P1')
                      .map((story, index) => (
                        <Card
                          key={story.key}
                          style={{
                            marginBottom: '16px',
                            borderRadius: '0px',
                            border: '1px solid #faad14',
                            borderLeft: '4px solid #faad14'
                          }}
                          styles={{ body: { padding: '16px' } }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <Text strong style={{ fontSize: '16px' }}>{story.title}</Text>
                                <Tag color="green" size="small" style={{ borderRadius: '0px' }}>Story</Tag>
                              </div>
                              <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                                {story.description}
                              </div>
                              <div style={{
                                padding: '8px 12px',
                                background: '#fffbe6',
                                borderRadius: '0px',
                                fontSize: '13px',
                                color: '#faad14'
                              }}>
                                💡 {story.reason}
                              </div>
                            </div>
                            <div style={{ marginLeft: '16px' }}>
                              <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
                                调整优先级:
                              </div>
                              <select
                                value={story.suggestedPriority}
                                onChange={(e) => handleUpdateStoryPriority(story.key, e.target.value)}
                                style={{
                                  padding: '4px 8px',
                                  borderRadius: '0px',
                                  border: '1px solid #d9d9d9',
                                  fontSize: '12px'
                                }}
                              >
                                <option value="P0">P0 - 最高</option>
                                <option value="P1">P1 - 高</option>
                                <option value="P2">P2 - 中</option>
                              </select>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                )}

                {/* P2 优先级 */}
                {prioritizedStories.filter(story => story.suggestedPriority === 'P2').length > 0 && (
                  <div style={{ marginBottom: '32px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px',
                      paddingBottom: '8px',
                      borderBottom: '2px solid #1890ff'
                    }}>
                      <Tag
                        color="blue"
                        style={{
                          borderRadius: '0px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          padding: '4px 12px'
                        }}
                      >
                        P2 - 中优先级
                      </Tag>
                      <Text style={{ fontSize: '14px', color: '#666' }}>
                        ({prioritizedStories.filter(story => story.suggestedPriority === 'P2').length} 个Story)
                      </Text>
                    </div>

                    {prioritizedStories
                      .filter(story => story.suggestedPriority === 'P2')
                      .map((story, index) => (
                        <Card
                          key={story.key}
                          style={{
                            marginBottom: '16px',
                            borderRadius: '0px',
                            border: '1px solid #1890ff',
                            borderLeft: '4px solid #1890ff'
                          }}
                          styles={{ body: { padding: '16px' } }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <Text strong style={{ fontSize: '16px' }}>{story.title}</Text>
                                <Tag color="green" size="small" style={{ borderRadius: '0px' }}>Story</Tag>
                              </div>
                              <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                                {story.description}
                              </div>
                              <div style={{
                                padding: '8px 12px',
                                background: '#e6f4ff',
                                borderRadius: '0px',
                                fontSize: '13px',
                                color: '#1890ff'
                              }}>
                                💡 {story.reason}
                              </div>
                            </div>
                            <div style={{ marginLeft: '16px' }}>
                              <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
                                调整优先级:
                              </div>
                              <select
                                value={story.suggestedPriority}
                                onChange={(e) => handleUpdateStoryPriority(story.key, e.target.value)}
                                style={{
                                  padding: '4px 8px',
                                  borderRadius: '0px',
                                  border: '1px solid #d9d9d9',
                                  fontSize: '12px'
                                }}
                              >
                                <option value="P0">P0 - 最高</option>
                                <option value="P1">P1 - 高</option>
                                <option value="P2">P2 - 中</option>
                              </select>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </Modal>

          {/* 更多功能Modal */}
          <Modal
            title="更多功能"
            open={showMoreFeaturesModal}
            onCancel={() => setShowMoreFeaturesModal(false)}
            footer={null}
            width={600}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ fontSize: '16px' }}>高级AI功能</Text>
                <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
                  更多专业的需求管理AI工具
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                {[
                  {
                    title: '依赖识别',
                    icon: '🔗',
                    color: '#45b7d1',
                    description: '识别任务间的依赖关系和阻塞项'
                  },
                  {
                    title: '优先级排序',
                    icon: '🎯',
                    color: '#52c41a',
                    description: 'AI智能分析Story优先级，提供排序建议'
                  }
                ].map((feature, index) => (
                  <Card
                    key={index}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '0px',
                      border: '1px solid #e5e7eb',
                      transition: 'all 0.2s ease'
                    }}
                    styles={{ body: { padding: '16px' } }}
                    hoverable
                    onClick={() => handleMoreFeatureClick(feature.title)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: `${feature.color}20`,
                        borderRadius: '0px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px'
                      }}>
                        {feature.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontWeight: '500',
                          fontSize: '16px',
                          color: '#333',
                          marginBottom: '4px'
                        }}>
                          {feature.title}
                        </div>
                        <div style={{
                          fontSize: '14px',
                          color: '#666',
                          lineHeight: '1.4'
                        }}>
                          {feature.description}
                        </div>
                      </div>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        background: feature.color,
                        borderRadius: '0px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          background: 'white',
                          borderRadius: '0px'
                        }} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div style={{
                marginTop: '20px',
                padding: '12px',
                background: '#f0f9ff',
                borderRadius: '0px',
                fontSize: '14px',
                color: '#1890ff'
              }}>
                💡 提示：这些高级功能需要先在需求列表中选择相应的需求项，然后进行AI分析。
              </div>
            </div>
          </Modal>

          {/* 重新评估提示词Modal */}
          <Modal
            title="重新评估"
            open={showReevaluationModal}
            onCancel={() => setShowReevaluationModal(false)}
            footer={[
              <Button key="cancel" onClick={() => setShowReevaluationModal(false)}>
                取消
              </Button>,
              <Button
                key="confirm"
                type="primary"
                onClick={handleReevaluateWithPrompt}
                style={{
                  background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                  border: 'none',
                  borderRadius: '0px'
                }}
              >
                开始重新评估
              </Button>
            ]}
            width={500}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  请输入重新评估的提示词
                </Text>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                  例如：重点关注安全性要求、强调性能指标、增加用户体验评估等
                </div>
                <Input.TextArea
                  value={reevaluationPrompt}
                  onChange={(e) => setReevaluationPrompt(e.target.value)}
                  placeholder="请描述您希望重新评估时重点关注的方面..."
                  rows={4}
                  style={{ borderRadius: '0px' }}
                />
              </div>
            </div>
          </Modal>

          {/* Epic/Story选择器Modal */}
          <Modal
            title="选择Epic或Story"
            open={showEpicStorySelector}
            onCancel={() => setShowEpicStorySelector(false)}
            footer={[
              <Button key="cancel" onClick={() => setShowEpicStorySelector(false)}>
                取消
              </Button>,
              <Button
                key="confirm"
                type="primary"
                onClick={handleConfirmEpicStorySelection}
                disabled={selectedEpicsStories.length === 0}
                style={{
                  background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                  border: 'none',
                  borderRadius: '0px'
                }}
              >
                确认选择 ({selectedEpicsStories.length})
              </Button>
            ]}
            width={800}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ fontSize: '16px' }}>从需求池中选择要评估的Epic或Story</Text>
                <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
                  可以同时选择多个Epic和Story进行质量评估
                </div>
              </div>

              <div style={{
                maxHeight: '400px',
                overflowY: 'auto',
                border: '1px solid #e5e7eb',
                borderRadius: '0px'
              }}>
                {getAllEpicsAndStories().map((item: any) => (
                  <div
                    key={item.key}
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid #f0f0f0',
                      cursor: 'pointer',
                      background: selectedEpicsStories.includes(item.key) ? '#f0f9ff' : 'white'
                    }}
                    onClick={() => handleEpicStorySelection(item.key, !selectedEpicsStories.includes(item.key))}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="checkbox"
                        checked={selectedEpicsStories.includes(item.key)}
                        onChange={() => {}}
                      />
                      <Tag
                        color={item.type === 'epic' ? 'blue' : 'green'}
                        size="small"
                        style={{ borderRadius: '0px' }}
                      >
                        {item.type === 'epic' ? 'Epic' : 'Story'}
                      </Tag>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {item.parentTitle}
                        </div>
                        <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
                          {item.description}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Tag color="orange" size="small" style={{ borderRadius: '0px' }}>
                          {item.priority}
                        </Tag>
                        <Tag color="default" size="small" style={{ borderRadius: '0px' }}>
                          {item.status}
                        </Tag>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '16px',
                padding: '12px',
                background: '#e6f4ff',
                borderRadius: '0px',
                fontSize: '14px',
                color: '#1890ff'
              }}>
                💡 提示：选择的Epic和Story将作为需求质量评估的输入，AI会分析其完整性、一致性、可测试性等质量指标。
              </div>
            </div>
          </Modal>

          {/* 上下文选择器Modal */}
          <Modal
            title="选择上下文"
            open={showEpicContextSelector}
            onCancel={() => setShowEpicContextSelector(false)}
            footer={[
              <Button key="skip" onClick={handleSkipContext}>
                跳过选择
              </Button>,
              <Button
                key="confirm"
                type="primary"
                onClick={handleConfirmContext}
                disabled={selectedContextItems.length === 0}
                style={{
                  background: 'linear-gradient(135deg, #96ceb4, #4ecdc4)',
                  border: 'none',
                  borderRadius: '0px'
                }}
              >
                确认选择 ({selectedContextItems.length})
              </Button>
            ]}
            width={900}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '20px' }}>
                <Text strong style={{ fontSize: '16px' }}>为补充需求生成选择上下文</Text>
                <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                  选择Epic或Story作为上下文，AI将基于选择的项目生成更精准的补充需求。
                  支持多选，如果不选择，将基于通用上下文生成。
                </div>
              </div>

              <div style={{
                maxHeight: '400px',
                overflowY: 'auto',
                border: '1px solid #e5e7eb',
                borderRadius: '0px'
              }}>
                {getAllEpicsAndStoriesForContext().map((item: any) => (
                  <div
                    key={item.key}
                    style={{
                      padding: '16px',
                      borderBottom: '1px solid #f0f0f0',
                      cursor: 'pointer',
                      background: selectedContextItems.some(selected => selected.key === item.key) ? '#e6f4ff' : 'white',
                      border: selectedContextItems.some(selected => selected.key === item.key) ? '2px solid #1890ff' : '2px solid transparent'
                    }}
                    onClick={() => handleContextItemSelection(item, !selectedContextItems.some(selected => selected.key === item.key))}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <input
                        type="checkbox"
                        checked={selectedContextItems.some(selected => selected.key === item.key)}
                        onChange={() => {}}
                        style={{ marginTop: '4px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <Tag
                            color={item.itemType === 'epic' ? 'blue' : 'green'}
                            size="small"
                            style={{ borderRadius: '0px' }}
                          >
                            {item.itemType === 'epic' ? 'Epic' : 'Story'}
                          </Tag>
                          <Text strong style={{ fontSize: '16px' }}>{item.title}</Text>
                          <Tag color="orange" size="small" style={{ borderRadius: '0px' }}>
                            {item.priority}
                          </Tag>
                          <Tag color="default" size="small" style={{ borderRadius: '0px' }}>
                            {item.status}
                          </Tag>
                        </div>

                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                          归属: {item.parentTitle}
                        </div>

                        <div style={{ fontSize: '14px', color: '#333', marginBottom: '12px' }}>
                          {item.description}
                        </div>

                        {item.itemType === 'epic' && item.stories && item.stories.length > 0 && (
                          <div>
                            <Text strong style={{ fontSize: '13px', color: '#1890ff' }}>
                              包含Story ({item.stories.length}个):
                            </Text>
                            <div style={{
                              marginTop: '8px',
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '6px'
                            }}>
                              {item.stories.slice(0, 3).map((story: any, index: number) => (
                                <Tag
                                  key={story.key}
                                  color="green"
                                  size="small"
                                  style={{ borderRadius: '0px', fontSize: '11px' }}
                                >
                                  {story.title}
                                </Tag>
                              ))}
                              {item.stories.length > 3 && (
                                <Tag
                                  color="default"
                                  size="small"
                                  style={{ borderRadius: '0px', fontSize: '11px' }}
                                >
                                  +{item.stories.length - 3}个
                                </Tag>
                              )}
                            </div>
                          </div>
                        )}

                        {item.itemType === 'story' && (
                          <div style={{
                            padding: '8px 12px',
                            background: '#f6ffed',
                            borderRadius: '0px',
                            fontSize: '12px',
                            color: '#52c41a'
                          }}>
                            💡 选择此Story作为上下文，将生成与其相关的补充需求
                          </div>
                        )}

                        {item.itemType === 'epic' && (!item.stories || item.stories.length === 0) && (
                          <div style={{
                            padding: '8px 12px',
                            background: '#fff7e6',
                            borderRadius: '0px',
                            fontSize: '12px',
                            color: '#fa8c16'
                          }}>
                            💡 该Epic暂无Story，选择后将基于Epic信息生成补充需求
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '16px',
                padding: '12px',
                background: '#f0f9ff',
                borderRadius: '0px',
                fontSize: '14px',
                color: '#1890ff'
              }}>
                💡 提示：支持多选Epic和Story作为上下文。AI将基于选择的项目信息生成更贴合的补充需求。
                选择的Epic和Story越相关，生成的需求质量越高，与现有需求的一致性和互补性越好。
              </div>
            </div>
          </Modal>

          {/* 保存草稿Modal */}
          <Modal
            title="保存草稿"
            open={showSaveDraftModal}
            onCancel={() => setShowSaveDraftModal(false)}
            footer={[
              <Button key="cancel" onClick={() => setShowSaveDraftModal(false)}>
                取消
              </Button>,
              <Button
                key="save"
                type="primary"
                onClick={handleSaveDraft}
                style={{
                  background: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
                  border: 'none',
                  borderRadius: '0px',
                  color: '#8b4513'
                }}
              >
                保存草稿
              </Button>
            ]}
            width={500}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  草稿名称 *
                </Text>
                <Input
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  placeholder="请输入草稿名称，例如：用户管理需求草稿"
                  style={{ borderRadius: '0px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  草稿内容预览
                </Text>
                <div style={{
                  padding: '12px',
                  background: '#f8f9fa',
                  borderRadius: '0px',
                  border: '1px solid #e5e7eb',
                  fontSize: '14px',
                  color: '#666'
                }}>
                  {showStoryGeneratorPage ? (
                    <>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>类型:</strong> {requirementType === 'epic' ? 'Epic生成结果' : 'Story生成结果'}
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>生成数量:</strong> {generatedStories.length} 个
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>提示词:</strong> {storyPrompt}
                      </div>
                      {selectedContextItems.length > 0 && (
                        <div>
                          <strong>上下文:</strong> {selectedContextItems.length} 个项目
                        </div>
                      )}
                    </>
                  ) : showDetailEditor ? (
                    <>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>类型:</strong> Epic+Story详细编辑
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Epic数量:</strong> {detailedItems.length} 个
                      </div>
                      <div>
                        <strong>Story数量:</strong> {detailedItems.reduce((total, item) => total + (item.stories?.length || 0), 0)} 个
                      </div>
                    </>
                  ) : (
                    <div>暂无内容</div>
                  )}
                </div>
              </div>

              <div style={{
                padding: '12px',
                background: '#fff7e6',
                borderRadius: '0px',
                fontSize: '14px',
                color: '#fa8c16'
              }}>
                💡 提示：草稿将保存当前的编辑状态，包括所有内容和配置信息。您可以随时加载草稿继续编辑。
              </div>
            </div>
          </Modal>

          {/* 结果优化Modal */}
          <Modal
            title="结果优化"
            open={showRegenerateModal}
            onCancel={() => setShowRegenerateModal(false)}
            footer={[
              <Button key="cancel" onClick={() => setShowRegenerateModal(false)}>
                取消
              </Button>,
              <Button
                key="regenerate"
                type="primary"
                onClick={handleRegenerateStories}
                style={{
                  background: 'linear-gradient(135deg, #4ecdc4, #45b7d1)',
                  border: 'none',
                  borderRadius: '0px'
                }}
              >
                开始优化
              </Button>
            ]}
            width={600}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  优化指令 *
                </Text>
                <Input.TextArea
                  value={regeneratePrompt}
                  onChange={(e) => setRegeneratePrompt(e.target.value)}
                  placeholder="请输入优化指令，描述您希望如何改进当前需求..."
                  rows={4}
                  style={{ borderRadius: '0px' }}
                />
              </div>

              {evaluationProblems.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <input
                      type="checkbox"
                      checked={includeEvaluationProblems}
                      onChange={(e) => setIncludeEvaluationProblems(e.target.checked)}
                    />
                    <Text strong style={{ color: '#1890ff' }}>
                      包含评估发现的问题进行优化生成
                    </Text>
                  </div>

                  {includeEvaluationProblems && (
                    <div style={{
                      padding: '12px',
                      background: '#f0f9ff',
                      borderRadius: '0px',
                      border: '1px solid #e6f4ff'
                    }}>
                      <Text strong style={{ fontSize: '13px', color: '#1890ff', display: 'block', marginBottom: '8px' }}>
                        将包含以下评估问题进行优化:
                      </Text>
                      <div style={{ fontSize: '14px', color: '#333' }}>
                        {evaluationProblems.map((problem, index) => (
                          <div key={index} style={{ marginBottom: '4px' }}>
                            • {problem}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div style={{
                padding: '12px',
                background: '#fff7e6',
                borderRadius: '0px',
                fontSize: '14px',
                color: '#fa8c16'
              }}>
                💡 提示：
                {evaluationProblems.length > 0
                  ? '勾选"包含评估问题"可以让AI基于之前的评估结果进行针对性优化，提升需求质量。'
                  : '输入优化指令来改进当前需求，AI将基于您的指令优化内容质量和完整性。'
                }
              </div>
            </div>
          </Modal>

          {/* Epic+Story结果优化Modal */}
          <Modal
            title="Epic+Story结果优化"
            open={showOptimizeModal}
            onCancel={() => setShowOptimizeModal(false)}
            footer={[
              <Button key="cancel" onClick={() => setShowOptimizeModal(false)}>
                取消
              </Button>,
              <Button
                key="optimize"
                type="primary"
                onClick={handleOptimizeEpicStory}
                style={{
                  background: 'linear-gradient(135deg, #4ecdc4, #45b7d1)',
                  border: 'none',
                  borderRadius: '0px'
                }}
              >
                开始优化
              </Button>
            ]}
            width={600}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  优化指令 *
                </Text>
                <Input.TextArea
                  value={optimizePrompt}
                  onChange={(e) => setOptimizePrompt(e.target.value)}
                  placeholder="请输入优化指令，描述您希望如何改进当前Epic和Story..."
                  rows={4}
                  style={{ borderRadius: '0px' }}
                />
              </div>

              {evaluationProblems.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <input
                      type="checkbox"
                      checked={includeEvaluationInOptimize}
                      onChange={(e) => setIncludeEvaluationInOptimize(e.target.checked)}
                    />
                    <Text strong style={{ color: '#1890ff' }}>
                      包含评估发现的问题进行优化
                    </Text>
                  </div>

                  {includeEvaluationInOptimize && (
                    <div style={{
                      padding: '12px',
                      background: '#f0f9ff',
                      borderRadius: '0px',
                      border: '1px solid #e6f4ff'
                    }}>
                      <Text strong style={{ fontSize: '13px', color: '#1890ff', display: 'block', marginBottom: '8px' }}>
                        将包含以下评估问题进行优化:
                      </Text>
                      <div style={{ fontSize: '14px', color: '#333' }}>
                        {evaluationProblems.map((problem, index) => (
                          <div key={index} style={{ marginBottom: '4px' }}>
                            • {problem}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div style={{
                padding: '12px',
                background: '#fff7e6',
                borderRadius: '0px',
                fontSize: '14px',
                color: '#fa8c16'
              }}>
                💡 提示：
                {evaluationProblems.length > 0
                  ? '勾选"包含评估问题"可以让AI基于之前的评估结果进行针对性优化，提升Epic和Story的质量。'
                  : '输入优化指令来改进当前Epic和Story，AI将基于您的指令优化内容的完整性和质量。'
                }
              </div>
            </div>
          </Modal>

          {/* 评估结果优化Modal */}
          <Modal
            title="评估结果优化"
            open={showEvaluationOptimizeModal}
            onCancel={() => {
              setShowEvaluationOptimizeModal(false);
              setEvaluationOptimizePrompt('');
            }}
            footer={[
              <Button key="cancel" onClick={() => {
                setShowEvaluationOptimizeModal(false);
                setEvaluationOptimizePrompt('');
              }}>
                取消
              </Button>,
              <Button
                key="optimize"
                type="primary"
                onClick={handleEvaluationOptimize}
                style={{
                  background: 'linear-gradient(135deg, #4ecdc4, #45b7d1)',
                  border: 'none',
                  borderRadius: '0px'
                }}
              >
                开始优化
              </Button>
            ]}
            width={700}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                  优化指令
                </Text>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
                  请输入优化提示词，AI将基于评估发现的问题和您的指令对需求内容进行优化
                </div>
                <Input.TextArea
                  placeholder="例如：请优化需求描述的清晰度，补充缺失的功能细节，完善验收标准..."
                  value={evaluationOptimizePrompt}
                  onChange={(e) => setEvaluationOptimizePrompt(e.target.value)}
                  rows={4}
                  style={{ borderRadius: '0px' }}
                />
              </div>

              {evaluationResult && evaluationResult.problems.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                    将要解决的评估问题
                  </Text>
                  <div style={{
                    maxHeight: '200px',
                    overflowY: 'auto',
                    border: '1px solid #f0f0f0',
                    borderRadius: '4px',
                    padding: '12px',
                    background: '#fafafa'
                  }}>
                    {evaluationResult.problems.map((problem: any, index: number) => (
                      <div key={problem.id} style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <Tag
                            color={problem.severity === 'high' ? 'red' :
                                   problem.severity === 'medium' ? 'orange' : 'blue'}
                            size="small"
                            style={{ borderRadius: '0px' }}
                          >
                            {problem.type}
                          </Tag>
                          <Text strong style={{ fontSize: '14px' }}>{problem.title}</Text>
                        </div>
                        <Text style={{ fontSize: '13px', color: '#666' }}>
                          {problem.description}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{
                padding: '12px',
                background: '#e6f4ff',
                borderRadius: '4px',
                fontSize: '14px',
                color: '#1890ff'
              }}>
                💡 优化将基于评估发现的问题和您的指令，自动改进需求内容的质量和完整性
              </div>
            </div>
          </Modal>
        </div>
      </Content>
    </Layout>
  );
}

