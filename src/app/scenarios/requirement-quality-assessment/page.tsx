'use client';

import React from 'react';
import {
  Layout,
  Typography,
  Card,
  Button,
  Modal,
  Form,
  Select,
  Input,
  message,
  Upload,
  Checkbox,
  Progress,
  Tag,
  Dropdown
} from 'antd';
import {
  ArrowLeftOutlined,
  FileSearchOutlined,
  UploadOutlined,
  LinkOutlined,
  FolderOutlined,
  FileTextOutlined,
  CopyOutlined,
  FilePdfOutlined,
  ShareAltOutlined,
  DownOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const RequirementQualityAssessmentPage: React.FC = () => {
  const router = useRouter();
  
  // 完全复制原来的状态
  const [showStandaloneEvaluation, setShowStandaloneEvaluation] = React.useState(false);
  const [standaloneDocUrl, setStandaloneDocUrl] = React.useState('');
  const [standaloneUploadedFile, setStandaloneUploadedFile] = React.useState<any>(null);
  const [isStandaloneParsing, setIsStandaloneParsing] = React.useState(false);
  const [showEpicStorySelector, setShowEpicStorySelector] = React.useState(false);
  const [selectedEpicsStories, setSelectedEpicsStories] = React.useState<string[]>([]);
  const [showEvaluationModal, setShowEvaluationModal] = React.useState(false);
  const [evaluationRules, setEvaluationRules] = React.useState([
    { id: 'completeness', name: '完整性', description: '检查需求是否完整覆盖所有必要信息', selected: true },
    { id: 'clarity', name: '清晰性', description: '评估需求描述是否清晰明确', selected: true },
    { id: 'consistency', name: '一致性', description: '检查需求之间是否存在冲突或矛盾', selected: true },
    { id: 'feasibility', name: '可行性', description: '评估需求的技术和业务可行性', selected: true },
    { id: 'testability', name: '可测试性', description: '检查需求是否可以被有效测试', selected: false },
    { id: 'priority', name: '优先级合理性', description: '评估需求优先级设置是否合理', selected: false }
  ]);
  const [isEvaluating, setIsEvaluating] = React.useState(false);
  const [evaluationProgress, setEvaluationProgress] = React.useState<{[key: string]: number}>({});
  const [currentEvaluatingRule, setCurrentEvaluatingRule] = React.useState('');
  const [evaluationResult, setEvaluationResult] = React.useState<any>(null);
  const [showEvaluationResult, setShowEvaluationResult] = React.useState(false);
  const [parseResult, setParseResult] = React.useState<any>(null);
  const [evaluationSource, setEvaluationSource] = React.useState<'document' | 'epic-story' | null>(null);
  const [evaluationContent, setEvaluationContent] = React.useState<any>(null);
  const [showAddRuleModal, setShowAddRuleModal] = React.useState(false);
  const [newRuleName, setNewRuleName] = React.useState('');
  const [newRuleDescription, setNewRuleDescription] = React.useState('');
  const [showReevaluationModal, setShowReevaluationModal] = React.useState(false);
  const [reevaluationPrompt, setReevaluationPrompt] = React.useState('');
  const [showCreateTaskModal, setShowCreateTaskModal] = React.useState(false);
  const [selectedProblemsForTask, setSelectedProblemsForTask] = React.useState<string[]>([]);
  const [selectedProblem, setSelectedProblem] = React.useState<any>(null);
  const [taskTitle, setTaskTitle] = React.useState('');
  const [taskDescription, setTaskDescription] = React.useState('');
  const [taskPriority, setTaskPriority] = React.useState('中');
  const [taskAssignee, setTaskAssignee] = React.useState('');
  const [summaryText, setSummaryText] = React.useState('');
  const [shareDropdownOpen, setShareDropdownOpen] = React.useState(false);

  // Mock数据 - 待办列表
  const [todoList] = React.useState([
    {
      id: 'todo_1',
      name: '用户管理系统PRD评估',
      type: 'PRD',
      priority: 'high',
      createTime: '2024-01-15 09:30',
      creator: '张敏'
    },
    {
      id: 'todo_2',
      name: '订单处理API文档评估',
      type: 'API',
      priority: 'medium',
      createTime: '2024-01-14 16:20',
      creator: '李强'
    },
    {
      id: 'todo_3',
      name: '支付模块BRD评估',
      type: 'BRD',
      priority: 'low',
      createTime: '2024-01-13 11:45',
      creator: '王伟'
    }
  ]);

  // Mock数据 - 评估历史列表
  const [evaluationHistory] = React.useState([
    {
      id: 'eval_1',
      name: '电商平台需求文档质量评估',
      status: 'completed',
      evaluator: '朱凡',
      evaluateTime: '2024-01-15 14:30',
      score: 85,
      totalProblems: 12,
      remainingProblems: 3
    },
    {
      id: 'eval_2',
      name: '用户权限管理Epic评估',
      status: 'in_progress',
      evaluator: '张敏',
      evaluateTime: '2024-01-15 10:15',
      score: 72,
      totalProblems: 8,
      remainingProblems: 5
    },
    {
      id: 'eval_3',
      name: '订单处理流程Story评估',
      status: 'completed',
      evaluator: '李强',
      evaluateTime: '2024-01-14 16:45',
      score: 91,
      totalProblems: 6,
      remainingProblems: 0
    },
    {
      id: 'eval_4',
      name: '支付接口API文档评估',
      status: 'pending',
      evaluator: '王伟',
      evaluateTime: '2024-01-14 09:20',
      score: 68,
      totalProblems: 15,
      remainingProblems: 12
    },
    {
      id: 'eval_5',
      name: '数据分析需求评估',
      status: 'completed',
      evaluator: '赵丽',
      evaluateTime: '2024-01-13 15:30',
      score: 88,
      totalProblems: 9,
      remainingProblems: 1
    }
  ]);

  // 独立需求评估入口 - 完全复制原来的函数
  const handleStandaloneEvaluation = () => {
    setShowStandaloneEvaluation(true);
  };

  // 独立评估文档解析 - 完全复制原来的函数
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

  // 处理Epic/Story选择 - 完全复制原来的函数
  const handleEpicStorySelection = (itemKey: string, checked: boolean) => {
    let newSelection = [...selectedEpicsStories];
    if (checked) {
      newSelection.push(itemKey);
    } else {
      newSelection = newSelection.filter(key => key !== itemKey);
    }
    setSelectedEpicsStories(newSelection);
  };

  // 确认选择Epic/Story并开始评估 - 完全复制原来的函数
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

  // 切换评估规则选中状态 - 完全复制原来的函数
  const toggleRuleSelection = (ruleId: string) => {
    setEvaluationRules(rules =>
      rules.map(rule =>
        rule.id === ruleId ? { ...rule, selected: !rule.selected } : rule
      )
    );
  };

  // 开始需求评估 - 完全复制原来的函数
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

      const ruleResults = selectedRules.map(rule => ({
        ruleId: rule.id,
        ruleName: rule.name,
        score: Math.floor(Math.random() * 30) + 70, // 70-100分
        problemCount: mockProblems.filter(p => p.type === rule.name).length
      }));

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

  // 添加自定义评估规则 - 完全复制原来的函数
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

  // 重新评估（带提示词） - 完全复制原来的函数
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

  // 总结问题 - 完全复制原来的函数
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

    // 复制到剪贴板
    navigator.clipboard.writeText(summary).then(() => {
      message.success('问题总结已复制到剪贴板');
    }).catch(() => {
      // 如果复制失败，显示在Modal中
      Modal.info({
        title: '需求评估结果总结',
        content: (
          <div style={{ whiteSpace: 'pre-wrap', fontSize: '12px', maxHeight: '400px', overflow: 'auto' }}>
            {summary}
          </div>
        ),
        width: 600
      });
    });
  };

  // 提醒改进
  const handleCreateImprovementTask = () => {
    setShowCreateTaskModal(true);
  };

  // 分享结果 - 完全复制原来的函数
  const handleShareResult = () => {
    if (!evaluationResult) return;

    const shareUrl = `${window.location.origin}/scenarios/requirement-quality-assessment/result/shared_${Date.now()}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      message.success('分享链接已复制到剪贴板');
    }).catch(() => {
      message.info(`分享链接: ${shareUrl}`);
    });
  };

  // 复制分享链接 - 完全复制原来的函数
  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/evaluation-result/${Date.now()}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      message.success('评估结果链接已复制到剪贴板');
    }).catch(() => {
      message.error('复制失败，请手动复制');
    });
    setShareDropdownOpen(false);
  };

  // 导出PDF - 完全复制原来的函数
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

  // 处理点击评估报告
  const handleViewEvaluationReport = (evaluation: any) => {
    // 根据评估报告生成对应的评估结果
    const mockResult = {
      overallScore: evaluation.score,
      totalProblems: evaluation.totalProblems,
      ruleResults: [
        { ruleId: 'completeness', ruleName: '完整性', score: evaluation.score + Math.floor(Math.random() * 10) - 5, problemCount: Math.floor(evaluation.totalProblems * 0.3) },
        { ruleId: 'clarity', ruleName: '清晰性', score: evaluation.score + Math.floor(Math.random() * 10) - 5, problemCount: Math.floor(evaluation.totalProblems * 0.2) },
        { ruleId: 'consistency', ruleName: '一致性', score: evaluation.score + Math.floor(Math.random() * 10) - 5, problemCount: Math.floor(evaluation.totalProblems * 0.25) },
        { ruleId: 'feasibility', ruleName: '可行性', score: evaluation.score + Math.floor(Math.random() * 10) - 5, problemCount: Math.floor(evaluation.totalProblems * 0.15) },
        { ruleId: 'testability', ruleName: '可测试性', score: evaluation.score + Math.floor(Math.random() * 10) - 5, problemCount: Math.floor(evaluation.totalProblems * 0.1) }
      ],
      problems: Array.from({ length: evaluation.totalProblems }, (_, index) => ({
        id: `problem_${index + 1}`,
        type: ['完整性', '清晰性', '一致性', '可行性', '可测试性'][Math.floor(Math.random() * 5)],
        severity: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
        title: [
          '缺少用户权限管理需求',
          '业务流程描述模糊',
          '性能要求缺乏量化指标',
          '异常处理说明不完整',
          '数据验证规则不明确',
          '接口定义缺少错误码',
          '用户体验要求不具体'
        ][Math.floor(Math.random() * 7)],
        description: '这是一个示例问题描述，说明了需求文档中存在的具体问题和改进建议。',
        suggestion: '建议补充相关的详细信息，提升需求的完整性和可执行性。',
        location: { start: Math.floor(Math.random() * 500) + 100, end: Math.floor(Math.random() * 100) + 600 },
        originalText: '相关的原文内容片段...'
      })),
      originalText: `这是${evaluation.name}的需求文档内容。文档包含了系统的核心功能需求和业务流程描述，经过AI分析发现了${evaluation.totalProblems}个需要改进的问题。`,
      timestamp: evaluation.evaluateTime,
      recommendations: [
        '建议补充缺失的功能详细描述',
        '优化业务流程的清晰度和完整性',
        '添加具体的性能和质量指标',
        '完善异常情况的处理说明'
      ]
    };

    setEvaluationResult(mockResult);
    setShowEvaluationResult(true);
  };

  // 发送改进提醒
  const handleCreateTask = () => {
    if (!taskAssignee.trim()) {
      message.warning('请输入要提醒的人员');
      return;
    }

    if (selectedProblemsForTask.length === 0) {
      message.warning('请选择需要改进的问题');
      return;
    }

    // 模拟发送提醒
    const selectedProblemTitles = selectedProblemsForTask.map(problemId => {
      const problem = evaluationResult?.problems.find((p: any) => p.id === problemId);
      return problem?.title || '';
    }).filter(Boolean);

    message.success(`已向 ${taskAssignee} 发送改进提醒，包含${selectedProblemTitles.length}个问题`);
    setShowCreateTaskModal(false);
    setTaskAssignee('');
    setSelectedProblemsForTask([]);
  };

  return (
    <Layout className="min-h-screen">
      <Header />
      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* 页面标题 */}
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => router.back()}
              style={{ borderRadius: '6px' }}
            >
              返回
            </Button>
            <div>
              <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
                需求质量评估
              </Title>
              <Text type="secondary" style={{ fontSize: '14px' }}>
                评估需求文档质量，识别潜在问题和改进建议
              </Text>
            </div>
          </div>

          {/* 主要内容区域 */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
            {/* 左侧待办列表 - 宽度比例1 */}
            <div style={{ flex: '1', background: 'white', borderRadius: '6px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
                  待办列表
                </Title>
                <Button
                  type="primary"
                  icon={<FileSearchOutlined />}
                  onClick={handleStandaloneEvaluation}
                  style={{
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                    border: 'none'
                  }}
                >
                  新建评估
                </Button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {todoList.map((todo) => (
                  <Card
                    key={todo.id}
                    style={{
                      borderRadius: '6px',
                      border: '1px solid #f0f0f0',
                      cursor: 'pointer'
                    }}
                    styles={{ body: { padding: '16px' } }}
                    hoverable
                    onClick={handleStandaloneEvaluation}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <Text strong style={{ fontSize: '14px', color: '#333' }}>
                        {todo.name}
                      </Text>
                      <Tag
                        color={todo.priority === 'high' ? 'red' : todo.priority === 'medium' ? 'orange' : 'green'}
                        style={{ borderRadius: '4px' }}
                      >
                        {todo.priority === 'high' ? '高' : todo.priority === 'medium' ? '中' : '低'}
                      </Tag>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Tag style={{ borderRadius: '4px', fontSize: '12px' }}>{todo.type}</Tag>
                        <Text style={{ fontSize: '12px', color: '#666' }}>
                          {todo.creator}
                        </Text>
                      </div>
                      <Text style={{ fontSize: '12px', color: '#999' }}>
                        {todo.createTime}
                      </Text>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* 右侧评估历史列表 - 宽度比例3 */}
            <div style={{ flex: '3', background: 'white', borderRadius: '6px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Title level={4} style={{ margin: '0 0 20px 0', color: '#1890ff' }}>
                评估历史
              </Title>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {evaluationHistory.map((evaluation) => (
                  <Card
                    key={evaluation.id}
                    style={{
                      borderRadius: '6px',
                      border: '1px solid #f0f0f0',
                      cursor: 'pointer'
                    }}
                    styles={{ body: { padding: '20px' } }}
                    hoverable
                    onClick={() => handleViewEvaluationReport(evaluation)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <Text strong style={{ fontSize: '16px', color: '#333' }}>
                            {evaluation.name}
                          </Text>
                          <Tag
                            color={evaluation.status === 'completed' ? 'green' :
                                   evaluation.status === 'in_progress' ? 'blue' : 'orange'}
                            style={{ borderRadius: '4px' }}
                          >
                            {evaluation.status === 'completed' ? '已完成' :
                             evaluation.status === 'in_progress' ? '进行中' : '待处理'}
                          </Tag>
                        </div>
                        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                          <Text style={{ fontSize: '14px', color: '#666' }}>
                            评估人员：{evaluation.evaluator}
                          </Text>
                          <Text style={{ fontSize: '14px', color: '#666' }}>
                            评估时间：{evaluation.evaluateTime}
                          </Text>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: evaluation.score >= 80 ? '#52c41a' : evaluation.score >= 60 ? '#faad14' : '#ff4d4f'
                          }}>
                            {evaluation.score}
                          </div>
                          <div style={{ fontSize: '12px', color: '#999' }}>评分</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1890ff' }}>
                            {evaluation.totalProblems}
                          </div>
                          <div style={{ fontSize: '12px', color: '#999' }}>问题数</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#ff4d4f' }}>
                            {evaluation.remainingProblems}
                          </div>
                          <div style={{ fontSize: '12px', color: '#999' }}>剩余</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* 独立需求评估入口Modal - 完全复制原来的Modal */}
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
                    <LinkOutlined style={{ fontSize: '20px', color: '#f5576c' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>导入URL</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>从在线文档导入</div>
                  </div>
                </div>
                <Input
                  placeholder="请输入文档URL"
                  value={standaloneDocUrl}
                  onChange={(e) => setStandaloneDocUrl(e.target.value)}
                  style={{ marginTop: '12px', borderRadius: '0px' }}
                />
              </Card>

              {/* 选择Epic或Story */}
              <Card
                style={{
                  marginBottom: '16px',
                  borderRadius: '0px',
                  border: '1px solid #e5e7eb',
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
                    已选择 {selectedEpicsStories.length} 个需求项
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

          {/* Epic/Story选择器Modal - 完全复制原来的Modal */}
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { key: 'epic_1', type: 'epic', title: '用户管理系统', parentTitle: '', description: '完整的用户管理功能模块，包括用户注册、登录、权限管理等' },
                  { key: 'story_1', type: 'story', title: '用户注册功能', parentTitle: '用户管理系统', description: '用户可以通过邮箱注册账号，需要验证邮箱有效性' },
                  { key: 'story_2', type: 'story', title: '用户登录功能', parentTitle: '用户管理系统', description: '用户可以通过用户名密码登录系统' },
                  { key: 'epic_2', type: 'epic', title: '订单管理系统', parentTitle: '', description: '订单处理和管理功能，包括订单创建、支付、发货等' },
                  { key: 'story_3', type: 'story', title: '创建订单', parentTitle: '订单管理系统', description: '用户可以创建新订单，选择商品和数量' },
                  { key: 'story_4', type: 'story', title: '订单支付', parentTitle: '订单管理系统', description: '用户可以通过多种方式支付订单' }
                ].map((item) => (
                  <div
                    key={item.key}
                    style={{
                      padding: '16px',
                      border: selectedEpicsStories.includes(item.key) ? '2px solid #f5576c' : '1px solid #e5e7eb',
                      borderRadius: '0px',
                      cursor: 'pointer',
                      background: selectedEpicsStories.includes(item.key) ? '#fff2f0' : 'white'
                    }}
                    onClick={() => handleEpicStorySelection(item.key, !selectedEpicsStories.includes(item.key))}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="checkbox"
                        checked={selectedEpicsStories.includes(item.key)}
                        onChange={() => {}}
                      />
                      <div style={{
                        padding: '2px 8px',
                        background: item.type === 'epic' ? '#1890ff' : '#52c41a',
                        color: 'white',
                        borderRadius: '0px',
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
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            {item.parentTitle}
                          </div>
                        )}
                        <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
                          {item.description}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          padding: '2px 6px',
                          background: '#faad14',
                          color: 'white',
                          borderRadius: '0px',
                          fontSize: '11px'
                        }}>
                          中等优先级
                        </div>
                        <div style={{
                          padding: '2px 6px',
                          background: '#d9d9d9',
                          color: '#666',
                          borderRadius: '0px',
                          fontSize: '11px'
                        }}>
                          待开发
                        </div>
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

          {/* 需求评估Modal - 完全复制原来的Modal */}
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
                            {isEvaluating && evaluationProgress[rule.id] !== undefined && (
                              <div style={{ marginTop: '8px' }}>
                                <Progress
                                  percent={evaluationProgress[rule.id]}
                                  size="small"
                                  strokeColor="#f5576c"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    marginBottom: '24px',
                    padding: '12px',
                    background: '#f0f9ff',
                    borderRadius: '0px',
                    fontSize: '14px',
                    color: '#1890ff'
                  }}>
                    💡 已选择 {evaluationRules.filter(rule => rule.selected).length} 个评估规则。建议至少选择3个规则以获得全面的质量评估结果。
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
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Text>评估完成，正在跳转到结果页面...</Text>
                </div>
              )}
            </div>
          </Modal>

          {/* 需求评估结果页面 - 完全复制原来的Modal */}
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
                        onClick={() => setShowCreateTaskModal(true)}
                        style={{
                          borderRadius: '0px',
                          background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                          border: 'none',
                          color: 'white'
                        }}
                      >
                        提醒改进
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

                {/* 内容区 */}
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                  {/* 左侧原文 */}
                  <div style={{
                    width: '50%',
                    padding: '20px',
                    borderRight: '1px solid #f0f0f0',
                    overflowY: 'auto'
                  }}>
                    <Text strong style={{ fontSize: '16px', display: 'block', marginBottom: '16px' }}>
                      需求原文
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
                              <div style={{
                                padding: '2px 8px',
                                background: item.type === 'epic' ? '#1890ff' : '#52c41a',
                                color: 'white',
                                borderRadius: '0px',
                                fontSize: '12px',
                                fontWeight: '500'
                              }}>
                                {item.type === 'epic' ? 'Epic' : 'Story'}
                              </div>
                              <Text strong style={{ fontSize: '16px' }}>{item.title}</Text>
                            </div>

                            {/* 内容 */}
                            <div style={{ paddingLeft: '16px' }}>
                              <div style={{ marginBottom: '12px' }}>
                                <Text strong style={{ fontSize: '14px', color: '#666' }}>描述：</Text>
                                <div style={{ fontSize: '14px', lineHeight: '1.6', marginTop: '4px' }}>
                                  {item.description}
                                </div>
                              </div>

                              {item.card && (
                                <div style={{ marginBottom: '12px' }}>
                                  <Text strong style={{ fontSize: '14px', color: '#666' }}>用户故事：</Text>
                                  <div style={{ fontSize: '14px', lineHeight: '1.6', marginTop: '4px' }}>
                                    {item.card}
                                  </div>
                                </div>
                              )}

                              {item.acceptanceCriteria && (
                                <div style={{ marginBottom: '12px' }}>
                                  <Text strong style={{ fontSize: '14px', color: '#666' }}>验收标准：</Text>
                                  <div style={{ fontSize: '14px', lineHeight: '1.6', marginTop: '4px' }}>
                                    {item.acceptanceCriteria}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )) || (
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
                    ) : (
                      // 默认显示
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

                  {/* 右侧问题列表 - 完全复制原来的代码 */}
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
                        onClick={() => setSelectedProblem(problem)}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                          <div style={{
                            padding: '2px 8px',
                            background: problem.severity === 'high' ? '#ff4d4f' :
                                       problem.severity === 'medium' ? '#faad14' : '#1890ff',
                            color: 'white',
                            borderRadius: '0px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {problem.type}
                          </div>
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

          {/* 提醒改进Modal */}
          <Modal
            title="提醒改进"
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
                发送提醒
              </Button>
            ]}
            width={600}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px' }}>
                  选择需要改进的问题 *
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
                  提醒人员 *
                </Text>
                <Input
                  value={taskAssignee}
                  onChange={(e) => setTaskAssignee(e.target.value)}
                  placeholder="请输入要提醒的人员姓名或邮箱"
                  style={{ borderRadius: '0px' }}
                />
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  系统将向该人员发送改进提醒通知
                </div>
              </div>
            </div>
          </Modal>

          {/* 重新评估Modal */}
          <Modal
            title="重新评估"
            open={showReevaluationModal}
            onCancel={() => {
              setShowReevaluationModal(false);
              setReevaluationPrompt('');
            }}
            footer={[
              <Button key="cancel" onClick={() => {
                setShowReevaluationModal(false);
                setReevaluationPrompt('');
              }}>
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
            width={600}
          >
            <div style={{ padding: '16px 0' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text strong>重新评估提示词</Text>
                <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
                  请输入重新评估的提示词，AI将基于此提示词重新分析需求质量
                </div>
              </div>
              <Input.TextArea
                placeholder="例如：请重点关注需求的可测试性和性能要求..."
                value={reevaluationPrompt}
                onChange={(e) => setReevaluationPrompt(e.target.value)}
                rows={4}
                style={{ borderRadius: '0px' }}
              />
            </div>
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

export default RequirementQualityAssessmentPage;
