'use client';

import React, { useState } from 'react';
import { Layout, Menu, Card, Row, Col, Statistic, List, Badge, Typography, Avatar, Tag, Progress, Button, Modal, Form, Input, Upload, Select, Checkbox, message, Space, Divider } from 'antd';
import { useRouter } from 'next/navigation';
import {
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ApiOutlined,
  BranchesOutlined,
  BulbOutlined,
  CodeOutlined,
  ExperimentOutlined,
  BugOutlined,
  RocketOutlined,
  FileAddOutlined,
  CheckCircleOutlined,
  RobotOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
  UserOutlined,
  NotificationOutlined,
  UploadOutlined,
  LinkOutlined,
  FolderOutlined,
  FileTextOutlined,
  CalendarOutlined,
  EditOutlined
} from '@ant-design/icons';
import Header from '@/components/layout/Header';
import { useAIAssistantLayout } from '@/hooks/useAIAssistantLayout';

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

// 导航菜单项
const menuItems = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: '首页',
  },
  {
    key: 'ai-scenarios',
    icon: <AppstoreOutlined />,
    label: 'AI场景',
    children: [
      { key: 'req-automation', icon: <BulbOutlined />, label: '需求自动化' },
      { key: 'history-tracing', icon: <BranchesOutlined />, label: '历史需求追溯' },
      { key: 'code-analysis', icon: <CodeOutlined />, label: 'AI辅助代码分析' },
      { key: 'precise-testing', icon: <ExperimentOutlined />, label: 'AI赋能精准测试' },
      { key: 'manual-testing', icon: <BugOutlined />, label: '智能化手工测试' },
      { key: 'test-automation', icon: <RobotOutlined />, label: '测试自动化' },
    ],
  },
  {
    key: 'model-config',
    icon: <ApiOutlined />,
    label: '模型配置',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: '设置',
  },
];

export default function Home() {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState('home');
  const [collapsed, setCollapsed] = useState(false);
  const [showTestPlan, setShowTestPlan] = useState(false);
  const [showTestPlanningConfig, setShowTestPlanningConfig] = useState(false);

  // 测试规划配置相关状态
  const [showEpicStorySelector, setShowEpicStorySelector] = useState(false);
  const [selectedEpicsStories, setSelectedEpicsStories] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [docUrl, setDocUrl] = useState('');
  const [selectedIterations, setSelectedIterations] = useState<string[]>([]);
  const [planDescription, setPlanDescription] = useState('');
  const [testObjectives, setTestObjectives] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  // 使用AI助手布局适应Hook
  const { getContentWithSidebarStyle } = useAIAssistantLayout();

  // 模拟统计数据
  const platformStats = [
    { title: '模型调用', value: 12580, change: '+12%', icon: <ApiOutlined />, color: '#2563eb' },
    { title: 'Agent数量', value: 24, change: '+3', icon: <RobotOutlined />, color: '#3b82f6' },
    { title: 'AI任务', value: 156, change: '+8', icon: <BarChartOutlined />, color: '#1d4ed8' },
    { title: '成功率', value: '98.5%', change: '+0.3%', icon: <CheckCircleOutlined />, color: '#1e40af' },
  ];

  // 最近活动数据
  const recentActivities = [
    { id: 1, action: '完成需求分析任务', time: '2分钟前', type: 'success', user: '张三', scenario: 'AI需求自动化' },
    { id: 2, action: '创建新的测试用例', time: '15分钟前', type: 'info', user: '李四', scenario: '智能化手工测试' },
    { id: 3, action: '模型调用成功', time: '30分钟前', type: 'processing', user: '系统', scenario: '代码分析' },
    { id: 4, action: '代码分析完成', time: '1小时前', type: 'success', user: '王五', scenario: 'AI辅助代码分析' },
    { id: 5, action: '测试执行完成', time: '2小时前', type: 'success', user: '赵六', scenario: '精准测试' },
  ];

  // 待办事项数据
  const todoItems = [
    { id: 1, title: '审核需求文档', priority: 'high', dueDate: '今天', progress: 60 },
    { id: 2, title: '完成测试用例编写', priority: 'medium', dueDate: '明天', progress: 30 },
    { id: 3, title: '更新API文档', priority: 'low', dueDate: '本周', progress: 0 },
    { id: 4, title: '模型配置优化', priority: 'medium', dueDate: '本周', progress: 80 },
  ];

  // 测试计划数据
  const testPlans = [
    { id: 1, name: '用户登录模块测试计划', status: '进行中', progress: 75, priority: 'P0', creator: '张三', createTime: '2024-01-15' },
    { id: 2, name: '支付系统集成测试计划', status: '待开始', progress: 0, priority: 'P1', creator: '李四', createTime: '2024-01-14' },
    { id: 3, name: 'API接口回归测试计划', status: '已完成', progress: 100, priority: 'P2', creator: '王五', createTime: '2024-01-13' },
    { id: 4, name: '移动端兼容性测试计划', status: '进行中', progress: 45, priority: 'P1', creator: '赵六', createTime: '2024-01-12' },
    { id: 5, name: '性能压力测试计划', status: '待开始', progress: 0, priority: 'P0', creator: '钱七', createTime: '2024-01-11' },
  ];

  // 处理获取测试计划
  const handleGetTestPlan = () => {
    setShowTestPlan(true);
  };

  // 处理测试规划卡片点击
  const handleTestPlanningClick = () => {
    setShowTestPlanningConfig(true);
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

  // 处理文件上传
  const handleFileUpload = (file: any) => {
    setUploadedFile(file);
    return false; // 阻止自动上传
  };

  // 处理迭代选择
  const handleIterationSelection = (iterationKey: string, checked: boolean) => {
    let newSelection = [...selectedIterations];
    if (checked) {
      newSelection.push(iterationKey);
    } else {
      newSelection = newSelection.filter(key => key !== iterationKey);
    }
    setSelectedIterations(newSelection);
  };

  // 开始生成测试规划
  const handleStartTestPlanning = async () => {
    // 验证必填项
    if (selectedEpicsStories.length === 0 && !uploadedFile && !docUrl) {
      message.warning('请至少选择一种测试范围（上传文档、输入链接或选择Epic/Story）');
      return;
    }

    if (!testObjectives.trim()) {
      message.warning('请填写测试目标');
      return;
    }

    // 开始生成进度
    setIsGeneratingPlan(true);
    setGenerationProgress(0);

    // 模拟生成进度
    const steps = [
      { progress: 20, message: '分析测试范围...' },
      { progress: 40, message: '生成测试策略...' },
      { progress: 60, message: '创建测试任务...' },
      { progress: 80, message: '生成测试用例...' },
      { progress: 100, message: '完成测试规划生成' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress(step.progress);
      message.info(step.message);
    }

    // 跳转到测试规划结果页面
    router.push('/scenarios/test-automation/planning/result');
  };

  const handleMenuClick = (e: any) => {
    const { key } = e;
    setSelectedKey(key);

    // 处理路由跳转
    switch (key) {
      case 'req-automation':
        router.push('/scenarios/ai-req-automation/mock-board');
        break;
      case 'manual-testing':
        router.push('/scenarios/intelligent-manual-testing');
        break;
      case 'test-automation':
        // 在当前页面显示测试自动化功能区域
        break;
      case 'home':
      case 'model-config':
      case 'settings':
      case 'history-tracing':
      case 'code-analysis':
      case 'precise-testing':
        // 这些保持在当前页面，只切换内容
        break;
      default:
        break;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'blue';
      default: return 'default';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'info': return <NotificationOutlined style={{ color: '#1890ff' }} />;
      case 'processing': return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      default: return <NotificationOutlined />;
    }
  };



  return (
    <Layout className="min-h-screen">
      <Header />
      <Layout>
        {/* 左侧导航栏 */}
        <Sider
          width={288}
          style={{
            background: '#fff',
            borderRight: '1px solid #e5e7eb',
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
            position: 'fixed',
            left: 0,
            top: '64px',
            zIndex: 100,
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          <div className="p-6">
            {/* 导航菜单 */}
            <nav className="space-y-2">
              {/* 首页 */}
              <div
                className={`${selectedKey === 'home' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'} rounded-lg p-3 cursor-pointer transition-colors`}
                onClick={() => handleMenuClick({ key: 'home' })}
              >
                <div className="flex items-center">
                  <HomeOutlined className="text-lg mr-3" />
                  <span className="font-medium">首页</span>
                </div>
              </div>

              {/* AI场景 */}
              <div className="group">
                <div className="flex items-center justify-between p-3 text-gray-700 hover:bg-blue-50 rounded-lg cursor-pointer">
                  <div className="flex items-center">
                    <AppstoreOutlined className="text-lg mr-3 text-blue-600" />
                    <span className="font-medium">AI场景</span>
                  </div>
                  <div className="text-sm transform transition-transform">▼</div>
                </div>
                <div className="ml-6 mt-2 space-y-1">
                  {[
                    { key: 'req-automation', icon: <BulbOutlined />, label: '需求自动化' },
                    { key: 'history-tracing', icon: <BranchesOutlined />, label: '历史需求追溯' },
                    { key: 'code-analysis', icon: <CodeOutlined />, label: 'AI辅助代码分析' },
                    { key: 'precise-testing', icon: <ExperimentOutlined />, label: 'AI赋能精准测试' },
                    { key: 'manual-testing', icon: <BugOutlined />, label: '智能化手工测试' },
                    { key: 'test-automation', icon: <RobotOutlined />, label: '测试自动化' },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                        selectedKey === item.key
                          ? 'text-blue-600 bg-blue-100'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                      onClick={() => handleMenuClick({ key: item.key })}
                    >
                      <span className="text-sm mr-2">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 模型配置 */}
              <div
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedKey === 'model-config'
                    ? 'text-blue-600 bg-blue-100'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
                onClick={() => handleMenuClick({ key: 'model-config' })}
              >
                <ApiOutlined className="text-lg mr-3 text-blue-500" />
                <span className="font-medium">模型配置</span>
              </div>

              {/* 设置 */}
              <div
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedKey === 'settings'
                    ? 'text-blue-600 bg-blue-100'
                    : 'text-gray-700 hover:bg-blue-50'
                }`}
                onClick={() => handleMenuClick({ key: 'settings' })}
              >
                <SettingOutlined className="text-lg mr-3 text-blue-500" />
                <span className="font-medium">设置</span>
              </div>
            </nav>

            {!collapsed && (
              <>
                {/* 平台统计信息 */}
                <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">平台统计</h3>
                  <div className="space-y-2">
                    {platformStats.map((stat, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{stat.title}</span>
                        <span className="font-medium" style={{ color: stat.color }}>
                          {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 最近活动 */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-3">最近活动</h3>
                  <div className="space-y-3">
                    {recentActivities.slice(0, 3).map((activity, index) => (
                      <div key={activity.id} className="flex items-center p-2 bg-gray-50 rounded">
                        <div
                          className="w-2 h-2 rounded-full mr-3"
                          style={{
                            backgroundColor: activity.type === 'success' ? '#10B981' :
                                           activity.type === 'info' ? '#3B82F6' :
                                           activity.type === 'processing' ? '#8B5CF6' : '#d9d9d9'
                          }}
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 我的待办 */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-800">我的待办</h3>
                    <Badge count={todoItems.filter(item => item.progress < 100).length} size="small" />
                  </div>
                  <div className="space-y-3">
                    {todoItems.slice(0, 3).map((item) => (
                      <div key={item.id} className="p-3 bg-gray-50 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <Tag color={getPriorityColor(item.priority)} size="small">
                            {item.priority === 'high' ? '高' : item.priority === 'medium' ? '中' : '低'}
                          </Tag>
                          <span className="text-xs text-gray-500">{item.dueDate}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{item.title}</p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full transition-all"
                            style={{
                              width: `${item.progress}%`,
                              backgroundColor: item.progress === 100 ? '#10B981' : item.progress > 50 ? '#3B82F6' : '#F59E0B'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </Sider>

        {/* 右侧功能区 */}
        <Content style={getContentWithSidebarStyle(collapsed, {
          padding: '32px',
          background: '#f9fafb'
        })}>
            {selectedKey === 'home' && (
              <>
                {/* Dashboard Header */}
                <section className="mb-8 relative overflow-hidden rounded-2xl shadow-2xl border border-gray-100"
                         style={{
                           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                         }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-48 translate-x-48" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-400/20 to-transparent rounded-full translate-y-32 -translate-x-32" />

                  <div className="relative p-8 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
                           style={{
                             background: 'linear-gradient(135deg, #00f5ff 0%, #ff00ff 100%)',
                           }}>
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                          <div className="w-4 h-4 rounded-sm"
                               style={{
                                 background: 'linear-gradient(45deg, #667eea, #764ba2)',
                               }} />
                        </div>
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                          Galaxy AI Platform
                        </h1>
                        <p className="text-xl text-white/90 font-medium">
                          智能化研发场景解决方案
                        </p>
                        <div className="flex items-center mt-3 space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-white/80 text-sm">AI服务在线</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                            <span className="text-white/80 text-sm">实时分析</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                {/* Key Metrics Cards */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="relative group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                         style={{
                           background: 'linear-gradient(135deg, #10b981/5 0%, #059669/5 100%)',
                         }} />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">今日任务完成</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">8 / 12</p>
                        <div className="flex items-center mt-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full mr-2 animate-pulse" />
                          <p className="text-sm text-green-600 font-medium">+15.3%</p>
                        </div>
                      </div>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                           style={{
                             background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                           }}>
                        <CheckCircleOutlined className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>

                  <div className="relative group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                         style={{
                           background: 'linear-gradient(135deg, #3b82f6/5 0%, #1d4ed8/5 100%)',
                         }} />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">AI模型成功率</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">98.5%</p>
                        <div className="flex items-center mt-2">
                          <div className="w-1 h-1 bg-blue-400 rounded-full mr-2 animate-pulse" />
                          <p className="text-sm text-blue-600 font-medium">+2.1%</p>
                        </div>
                      </div>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                           style={{
                             background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                           }}>
                        <ApiOutlined className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>

                  <div className="relative group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                         style={{
                           background: 'linear-gradient(135deg, #8b5cf6/5 0%, #7c3aed/5 100%)',
                         }} />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">活跃用户</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">156</p>
                        <div className="flex items-center mt-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mr-2 animate-pulse" />
                          <p className="text-sm text-purple-600 font-medium">+8.2%</p>
                        </div>
                      </div>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                           style={{
                             background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                           }}>
                        <UserOutlined className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>

                  <div className="relative group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                         style={{
                           background: 'linear-gradient(135deg, #06b6d4/5 0%, #0891b2/5 100%)',
                         }} />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">节省时间</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">2,156</p>
                        <div className="flex items-center mt-2">
                          <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2 animate-pulse" />
                          <p className="text-sm text-cyan-600 font-medium">小时</p>
                        </div>
                      </div>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                           style={{
                             background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                           }}>
                        <ClockCircleOutlined className="text-white text-2xl" />
                      </div>
                    </div>
                  </div>
                </section>

                {/* AI Scenarios Overview */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">AI场景概览</h2>
                    <button className="text-blue-500 hover:text-blue-600 font-medium">
                      查看全部 <span className="ml-1">→</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { icon: <BulbOutlined />, title: '需求自动化', desc: '基于AI的需求分析与自动化处理，提升需求管理效率', projects: 12, rate: 92, bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
                      { icon: <BranchesOutlined />, title: '历史需求追溯', desc: '智能化历史需求分析与追溯，快速定位问题根源', projects: 8, rate: 89, bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
                      { icon: <CodeOutlined />, title: 'AI辅助代码分析', desc: '深度代码分析与优化建议，提升代码质量', projects: 15, rate: 95, bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
                      { icon: <ExperimentOutlined />, title: 'AI赋能精准测试', desc: '基于AI的智能测试策略与精准测试执行', projects: 9, rate: 91, bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
                      { icon: <BugOutlined />, title: '智能化手工测试', desc: 'AI指导的智能化手工测试流程与质量保证', projects: 6, rate: 87, bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
                      { icon: <RobotOutlined />, title: '测试自动化', desc: '全流程自动化测试解决方案，提升测试效率', projects: 11, rate: 94, bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
                    ].map((scenario, index) => (
                      <div key={index} className="p-6 border border-gray-200 rounded-lg hover:border-blue-600 transition-colors cursor-pointer">
                        <div className="flex items-center mb-4">
                          <div className={`w-10 h-10 ${scenario.bgColor} rounded-lg flex items-center justify-center`}>
                            <span className={scenario.textColor}>{scenario.icon}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 ml-3">{scenario.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">{scenario.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">活跃项目: {scenario.projects}</span>
                          <span className="text-sm font-medium text-blue-600">{scenario.rate}% 成功率</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* AI场景功能区 */}
            {selectedKey === 'req-automation' && (
              <>
                <section className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">AI需求自动化</h1>
                  <p className="text-lg text-gray-600">从需求文档解析生成符合银河规范的EPIC与任务，智能推荐优先级与关联关系</p>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">需求解析</h2>
                    <p className="text-gray-600 mb-6">上传需求文档，AI自动解析并生成结构化需求</p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-600 transition-colors cursor-pointer">
                      <BulbOutlined className="text-4xl text-gray-400 mb-4" />
                      <p className="text-gray-500">点击或拖拽上传文档</p>
                      <p className="text-sm text-gray-400 mt-2">支持 PDF, DOC, DOCX 格式</p>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">EPIC管理</h2>
                    <p className="text-gray-600 mb-6">查看和管理已生成的EPIC和Story</p>
                    <div className="space-y-4">
                      {[
                        { title: 'EPIC-001: 用户管理系统', status: '进行中', color: 'blue' },
                        { title: 'EPIC-002: 订单处理流程', status: '待开始', color: 'orange' },
                        { title: 'EPIC-003: 支付集成', status: '已完成', color: 'green' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">{item.title}</span>
                          <Tag color={item.color} className="ml-2">{item.status}</Tag>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedKey === 'manual-testing' && (
              <>
                <section className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">智能化手工测试</h1>
                  <p className="text-lg text-gray-600">AI驱动的测试用例管理与执行，智能生成测试用例，自动化测试流程</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">测试用例</h3>
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BugOutlined className="text-blue-500" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-2">156</p>
                    <p className="text-sm text-gray-600 mb-4">总用例数</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">执行进度: 75%</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">执行结果</h3>
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircleOutlined className="text-green-500" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-green-600 mb-2">92%</p>
                    <p className="text-sm text-gray-600 mb-4">通过率</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>通过: 144</span>
                      <span>失败: 12</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">缺陷统计</h3>
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <ExperimentOutlined className="text-red-500" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-red-600 mb-2">8</p>
                    <p className="text-sm text-gray-600 mb-4">待修复缺陷</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>高: 2</span>
                      <span>中: 4</span>
                      <span>低: 2</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedKey === 'model-config' && (
              <>
                <section className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">模型配置</h1>
                  <p className="text-lg text-gray-600">配置和管理AI模型参数，监控模型性能</p>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">模型列表</h2>
                    <div className="space-y-4">
                      {[
                        { name: 'GPT-4', status: '运行中', calls: '12.5K', color: 'green' },
                        { name: 'Claude-3', status: '运行中', calls: '8.2K', color: 'green' },
                        { name: 'Gemini-Pro', status: '维护中', calls: '5.1K', color: 'orange' },
                      ].map((model, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h3 className="font-semibold text-gray-900">{model.name}</h3>
                            <p className="text-sm text-gray-500">调用: {model.calls}</p>
                          </div>
                          <Badge status={model.status === '运行中' ? 'processing' : 'default'} text={model.status} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">性能监控</h2>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">平均响应时间</p>
                        <p className="text-2xl font-bold text-gray-900">1.2s</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">成功率</p>
                        <p className="text-2xl font-bold text-green-600">98.5%</p>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">今日调用: 2,580 次</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedKey === 'test-automation' && (
              <>
                <section className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">测试自动化</h1>
                  <p className="text-lg text-gray-600">智能化测试流程，提升测试效率和质量</p>
                </section>

                {/* 获取测试计划按钮 */}
                <div className="mb-6">
                  <button
                    onClick={handleGetTestPlan}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    获取测试计划
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '24px' }}>
                  {/* 测试计划列表 */}
                  {showTestPlan && (
                    <div style={{ flex: 1 }}>
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">测试计划列表</h2>
                        <div className="space-y-4">
                          {testPlans.map((plan) => (
                            <div
                              key={plan.id}
                              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-gray-900">{plan.name}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  plan.status === '进行中' ? 'bg-blue-100 text-blue-800' :
                                  plan.status === '已完成' ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {plan.status}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                <span>优先级: <span className={`font-medium ${
                                  plan.priority === 'P0' ? 'text-red-600' :
                                  plan.priority === 'P1' ? 'text-orange-600' :
                                  'text-blue-600'
                                }`}>{plan.priority}</span></span>
                                <span>创建者: {plan.creator}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex-1 mr-4">
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                      style={{ width: `${plan.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <span className="text-sm text-gray-600">{plan.progress}%</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                创建时间: {plan.createTime}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 功能卡片列表 */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    width: showTestPlan ? '320px' : '800px',
                    transition: 'width 0.3s ease'
                  }}>
                    {/* 测试规划卡片 */}
                  <div
                    style={{
                      borderRadius: showTestPlan ? '12px' : '16px',
                      border: '1px solid #e8e8e8',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      background: 'white'
                    }}
                    className="hover:shadow-lg hover:-translate-y-1"
                    onClick={handleTestPlanningClick}
                  >
                    <div style={{
                      padding: showTestPlan ? '16px' : '24px',
                      display: 'flex',
                      alignItems: showTestPlan ? 'center' : 'flex-start',
                      gap: showTestPlan ? '12px' : '20px',
                      flexDirection: showTestPlan ? 'row' : 'row'
                    }}>
                      {/* 图标区域 */}
                      <div
                        style={{
                          width: showTestPlan ? '40px' : '64px',
                          height: showTestPlan ? '40px' : '64px',
                          borderRadius: showTestPlan ? '10px' : '16px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: showTestPlan ? '16px' : '24px',
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                      >
                        <RocketOutlined />
                      </div>

                      {/* 内容区域 */}
                      {showTestPlan ? (
                        <div>
                          <h3 style={{ margin: 0, color: '#262626', fontSize: '14px', fontWeight: '600' }}>
                            测试规划
                          </h3>
                        </div>
                      ) : (
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <h3 style={{ margin: 0, color: '#262626', fontSize: '18px', fontWeight: '600' }}>
                              测试规划
                            </h3>
                            <span
                              style={{
                                background: '#1890ff',
                                color: 'white',
                                borderRadius: '12px',
                                padding: '2px 8px',
                                fontSize: '12px',
                                fontWeight: '500'
                              }}
                            >
                              New
                            </span>
                          </div>

                          <p
                            style={{
                              color: '#666',
                              fontSize: '14px',
                              lineHeight: '1.6',
                              margin: '0 0 16px 0'
                            }}
                          >
                            基于需求文档和系统架构，智能生成全面的测试计划和测试策略。
                          </p>

                          {/* 功能特性列表 */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                            {['智能测试范围分析', '测试优先级排序', '资源需求评估'].map((item, idx) => (
                              <span
                                key={idx}
                                style={{
                                  background: '#f6f8fa',
                                  border: '1px solid #e1e4e8',
                                  borderRadius: '6px',
                                  color: '#586069',
                                  fontSize: '12px',
                                  padding: '4px 8px'
                                }}
                              >
                                {item}
                              </span>
                            ))}
                          </div>

                          {/* 操作按钮 */}
                          <button
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#1890ff',
                              padding: '0',
                              fontSize: '14px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            开始使用 →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 补充用例生成卡片 */}
                  <div
                    style={{
                      borderRadius: showTestPlan ? '12px' : '16px',
                      border: '1px solid #e8e8e8',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      background: 'white'
                    }}
                    className="hover:shadow-lg hover:-translate-y-1"
                  >
                    <div style={{
                      padding: showTestPlan ? '16px' : '24px',
                      display: 'flex',
                      alignItems: showTestPlan ? 'center' : 'flex-start',
                      gap: showTestPlan ? '12px' : '20px',
                      flexDirection: showTestPlan ? 'row' : 'row'
                    }}>
                      {/* 图标区域 */}
                      <div
                        style={{
                          width: showTestPlan ? '40px' : '64px',
                          height: showTestPlan ? '40px' : '64px',
                          borderRadius: showTestPlan ? '10px' : '16px',
                          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: showTestPlan ? '16px' : '24px',
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                      >
                        <FileAddOutlined />
                      </div>

                      {/* 内容区域 */}
                      {showTestPlan ? (
                        <div>
                          <h3 style={{ margin: 0, color: '#262626', fontSize: '14px', fontWeight: '600' }}>
                            补充用例生成
                          </h3>
                        </div>
                      ) : (
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <h3 style={{ margin: 0, color: '#262626', fontSize: '18px', fontWeight: '600' }}>
                              补充用例生成
                            </h3>
                            <span
                              style={{
                                background: '#1890ff',
                                color: 'white',
                                borderRadius: '12px',
                                padding: '2px 8px',
                                fontSize: '12px',
                                fontWeight: '500'
                              }}
                            >
                              New
                            </span>
                          </div>

                          <p
                            style={{
                              color: '#666',
                              fontSize: '14px',
                              lineHeight: '1.6',
                              margin: '0 0 16px 0'
                            }}
                          >
                            分析现有测试用例，识别覆盖盲区，自动生成补充测试用例。
                          </p>

                          {/* 功能特性列表 */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                            {['用例覆盖度分析', '边界条件识别', '异常场景补充'].map((item, idx) => (
                              <span
                                key={idx}
                                style={{
                                  background: '#f6f8fa',
                                  border: '1px solid #e1e4e8',
                                  borderRadius: '6px',
                                  color: '#586069',
                                  fontSize: '12px',
                                  padding: '4px 8px'
                                }}
                              >
                                {item}
                              </span>
                            ))}
                          </div>

                          {/* 操作按钮 */}
                          <button
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#1890ff',
                              padding: '0',
                              fontSize: '14px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            开始使用 →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 用例质量评估卡片 */}
                  <div
                    style={{
                      borderRadius: showTestPlan ? '12px' : '16px',
                      border: '1px solid #e8e8e8',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      background: 'white'
                    }}
                    className="hover:shadow-lg hover:-translate-y-1"
                  >
                    <div style={{
                      padding: showTestPlan ? '16px' : '24px',
                      display: 'flex',
                      alignItems: showTestPlan ? 'center' : 'flex-start',
                      gap: showTestPlan ? '12px' : '20px',
                      flexDirection: showTestPlan ? 'row' : 'row'
                    }}>
                      {/* 图标区域 */}
                      <div
                        style={{
                          width: showTestPlan ? '40px' : '64px',
                          height: showTestPlan ? '40px' : '64px',
                          borderRadius: showTestPlan ? '10px' : '16px',
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: showTestPlan ? '16px' : '24px',
                          flexShrink: 0,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                      >
                        <CheckCircleOutlined />
                      </div>

                      {/* 内容区域 */}
                      {showTestPlan ? (
                        <div>
                          <h3 style={{ margin: 0, color: '#262626', fontSize: '14px', fontWeight: '600' }}>
                            用例质量评估
                          </h3>
                        </div>
                      ) : (
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <h3 style={{ margin: 0, color: '#262626', fontSize: '18px', fontWeight: '600' }}>
                              用例质量评估
                            </h3>
                            <span
                              style={{
                                background: '#1890ff',
                                color: 'white',
                                borderRadius: '12px',
                                padding: '2px 8px',
                                fontSize: '12px',
                                fontWeight: '500'
                              }}
                            >
                              New
                            </span>
                          </div>

                          <p
                            style={{
                              color: '#666',
                              fontSize: '14px',
                              lineHeight: '1.6',
                              margin: '0 0 16px 0'
                            }}
                          >
                            评估测试用例的完整性、有效性和可维护性，提供优化建议。
                          </p>

                          {/* 功能特性列表 */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                            {['用例质量评分', '可维护性分析', '优化建议生成'].map((item, idx) => (
                              <span
                                key={idx}
                                style={{
                                  background: '#f6f8fa',
                                  border: '1px solid #e1e4e8',
                                  borderRadius: '6px',
                                  color: '#586069',
                                  fontSize: '12px',
                                  padding: '4px 8px'
                                }}
                              >
                                {item}
                              </span>
                            ))}
                          </div>

                          {/* 操作按钮 */}
                          <button
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#1890ff',
                              padding: '0',
                              fontSize: '14px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            开始使用 →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  </div>
                </div>
              </>
            )}

            {selectedKey === 'settings' && (
              <>
                <section className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">系统设置</h1>
                  <p className="text-lg text-gray-600">配置系统参数和用户偏好设置</p>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">用户设置</h2>
                    <div className="space-y-6">
                      {[
                        { label: '个人信息', desc: '修改用户名、邮箱等基本信息', icon: <UserOutlined /> },
                        { label: '通知设置', desc: '配置消息通知偏好', icon: <BellOutlined /> },
                        { label: '安全设置', desc: '密码修改、二次验证等', icon: <SettingOutlined /> },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <span className="text-blue-600">{item.icon}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{item.label}</h3>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">系统配置</h2>
                    <div className="space-y-6">
                      {[
                        { label: '界面主题', desc: '选择深色或浅色主题', icon: <SettingOutlined /> },
                        { label: '语言设置', desc: '选择界面显示语言', icon: <ApiOutlined /> },
                        { label: '数据备份', desc: '配置自动备份策略', icon: <BarChartOutlined /> },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <span className="text-blue-600">{item.icon}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{item.label}</h3>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 其他场景的占位内容 */}
            {!['home', 'req-automation', 'manual-testing', 'test-automation', 'model-config', 'settings'].includes(selectedKey) && (
              <div>
                <Title level={2}>功能开发中...</Title>
                <Text type="secondary">
                  您选择的功能正在开发中，敬请期待！
                </Text>
              </div>
            )}
        </Content>
      </Layout>

      {/* 测试规划配置Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RocketOutlined style={{ color: '#1890ff' }} />
            <span>测试规划配置</span>
          </div>
        }
        open={showTestPlanningConfig}
        onCancel={() => setShowTestPlanningConfig(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setShowTestPlanningConfig(false)}>
            取消
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={handleStartTestPlanning}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none'
            }}
          >
            开始生成测试规划
          </Button>
        ]}
      >
        <div style={{ padding: '16px 0' }}>
          {/* 生成进度 */}
          {isGeneratingPlan && (
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
              <Progress
                percent={generationProgress}
                status="active"
                strokeColor={{
                  '0%': '#667eea',
                  '100%': '#764ba2',
                }}
              />
              <Text type="secondary" style={{ marginTop: '8px', display: 'block' }}>
                正在生成测试规划...
              </Text>
            </div>
          )}

          {!isGeneratingPlan && (
            <>
              {/* 测试范围 */}
              <div style={{ marginBottom: '24px' }}>
                <Title level={5} style={{ marginBottom: '16px' }}>
                  <FolderOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                  测试范围
                </Title>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  {/* 上传文档 */}
                  <Card size="small" hoverable style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <UploadOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                      <div>
                        <div style={{ fontWeight: '500', marginBottom: '4px' }}>上传文档</div>
                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>支持需求文档、设计文档等</div>
                      </div>
                      <Upload
                        beforeUpload={handleFileUpload}
                        showUploadList={false}
                        accept=".pdf,.doc,.docx,.txt"
                      >
                        <Button icon={<UploadOutlined />} size="small">
                          {uploadedFile ? uploadedFile.name : '选择文件'}
                        </Button>
                      </Upload>
                    </div>
                  </Card>

                  {/* 输入链接 */}
                  <Card size="small" hoverable style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <LinkOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                      <div>
                        <div style={{ fontWeight: '500', marginBottom: '4px' }}>输入文档链接</div>
                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>在线文档或需求管理系统链接</div>
                      </div>
                      <Input
                        placeholder="请输入文档链接"
                        value={docUrl}
                        onChange={(e) => setDocUrl(e.target.value)}
                        size="small"
                      />
                    </div>
                  </Card>

                  {/* 选择Epic/Story */}
                  <Card
                    size="small"
                    hoverable
                    onClick={() => setShowEpicStorySelector(true)}
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <FileTextOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                      <div>
                        <div style={{ fontWeight: '500', marginBottom: '4px' }}>选择Epic或Story</div>
                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>从现有需求池中选择</div>
                      </div>
                      <Button size="small">
                        {selectedEpicsStories.length > 0 ? `已选择${selectedEpicsStories.length}项` : '点击选择'}
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>

              {/* 相关计划 */}
              <div style={{ marginBottom: '24px' }}>
                <Title level={5} style={{ marginBottom: '16px' }}>
                  <CalendarOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                  相关计划
                </Title>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* 选择迭代 */}
              <Card size="small">
                <div style={{ marginBottom: '8px', fontWeight: '500' }}>选择迭代</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { key: 'sprint-1', name: 'Sprint 1', date: '2024-02-01 ~ 2024-02-14' },
                    { key: 'sprint-2', name: 'Sprint 2', date: '2024-02-15 ~ 2024-02-28' },
                    { key: 'sprint-3', name: 'Sprint 3', date: '2024-03-01 ~ 2024-03-14' }
                  ].map(iteration => (
                    <div key={iteration.key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Checkbox
                        checked={selectedIterations.includes(iteration.key)}
                        onChange={(e) => handleIterationSelection(iteration.key, e.target.checked)}
                      />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '500' }}>{iteration.name}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{iteration.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* 计划描述 */}
              <Card size="small">
                <div style={{ marginBottom: '8px', fontWeight: '500' }}>计划描述</div>
                <Input.TextArea
                  placeholder="请描述测试计划的时间安排、里程碑等..."
                  value={planDescription}
                  onChange={(e) => setPlanDescription(e.target.value)}
                  rows={4}
                  size="small"
                />
              </Card>
            </div>
          </div>

          {/* 规划信息 */}
          <div style={{ marginBottom: '24px' }}>
            <Title level={5} style={{ marginBottom: '16px' }}>
              <EditOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
              规划信息
            </Title>

            <div>
              <div style={{ marginBottom: '8px', fontWeight: '500' }}>测试目标 *</div>
              <Input.TextArea
                placeholder="请填写测试目标，如：验证核心功能、确保系统稳定性等..."
                value={testObjectives}
                onChange={(e) => setTestObjectives(e.target.value)}
                rows={3}
                size="small"
              />
            </div>
          </div>

          {/* 用户提示词 */}
          <div>
            <Title level={5} style={{ marginBottom: '16px' }}>
              <EditOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
              用户提示词
            </Title>
            <Input.TextArea
              placeholder="请输入额外的要求或说明，AI将根据这些信息优化测试规划..."
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              rows={3}
            />
          </div>
            </>
          )}
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
            onClick={() => {
              setShowEpicStorySelector(false);
              message.success(`已选择${selectedEpicsStories.length}个需求项`);
            }}
            disabled={selectedEpicsStories.length === 0}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none'
            }}
          >
            确认选择 ({selectedEpicsStories.length})
          </Button>
        ]}
        width={600}
      >
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {[
            { key: 'epic_1', type: 'epic', title: '用户认证系统', parentTitle: '', description: '完整的用户登录、注册、权限管理功能' },
            { key: 'story_1', type: 'story', title: '用户登录', parentTitle: '用户认证系统', description: '用户可以通过邮箱和密码登录系统' },
            { key: 'story_2', type: 'story', title: '用户注册', parentTitle: '用户认证系统', description: '新用户可以创建账户并验证邮箱' },
            { key: 'epic_2', type: 'epic', title: '订单管理系统', parentTitle: '', description: '订单创建、处理、跟踪的完整流程' },
            { key: 'story_3', type: 'story', title: '创建订单', parentTitle: '订单管理系统', description: '用户可以选择商品并创建订单' },
            { key: 'story_4', type: 'story', title: '订单支付', parentTitle: '订单管理系统', description: '用户可以通过多种方式支付订单' }
          ].map((item) => (
            <div
              key={item.key}
              style={{
                padding: '16px',
                border: selectedEpicsStories.includes(item.key) ? '2px solid #667eea' : '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                background: selectedEpicsStories.includes(item.key) ? '#f0f4ff' : 'white',
                marginBottom: '8px'
              }}
              onClick={() => handleEpicStorySelection(item.key, !selectedEpicsStories.includes(item.key))}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Checkbox
                  checked={selectedEpicsStories.includes(item.key)}
                  onChange={() => {}}
                />
                <div style={{
                  padding: '2px 8px',
                  background: item.type === 'epic' ? '#1890ff' : '#52c41a',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {item.type === 'epic' ? 'Epic' : 'Story'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                    {item.title}
                  </div>
                  {item.parentTitle && (
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                      {item.parentTitle}
                    </div>
                  )}
                  <div style={{ fontSize: '13px', color: '#888' }}>
                    {item.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>

    </Layout>
  );
}
