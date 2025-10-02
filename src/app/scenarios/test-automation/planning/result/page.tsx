'use client';

import React, { useState } from 'react';
import { Layout, Card, Typography, Table, Tag, Button, Space, Badge, Modal, Input, message, Progress } from 'antd';
import { useRouter } from 'next/navigation';
import {
  RocketOutlined,
  CalendarOutlined,
  FolderOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ArrowLeftOutlined,
  DownloadOutlined,
  ReloadOutlined,
  FileAddOutlined,
  EditOutlined,
  PlayCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

// Mock数据
const mockTestPlan = {
  testObjective: '验证用户认证系统的核心功能，确保系统安全性和用户体验',
  completionDate: '2024-03-15',
  testScope: '用户认证系统包含登录、注册、密码重置等功能模块',
  testStrategy: '采用功能测试为主，自动化测试为辅的策略，重点关注安全性和性能'
};

const mockTestTasks = [
  {
    key: '1',
    name: '手工测试任务',
    testType: '手工测试',
    plannedCompletionTime: '2024-02-20',
    testLevel: '系统测试',
    testEnvironment: '测试环境A',
    testData: '手工测试数据集',
    testCaseCount: 15,
    status: '待测试',
    testCases: [
      {
        key: '1-1',
        name: '用户登录功能测试',
        priority: 'High',
        status: 'Exists',
        description: '手工验证用户登录流程的各种场景',
        estimatedTime: 30
      },
      {
        key: '1-2',
        name: '用户注册功能测试',
        priority: 'High',
        status: 'Exists',
        description: '手工验证用户注册流程',
        estimatedTime: 25
      },
      {
        key: '1-3',
        name: '密码重置功能测试',
        priority: 'Medium',
        status: 'Missing',
        description: '手工验证密码重置功能',
        estimatedTime: 20
      }
    ]
  },
  {
    key: '2',
    name: 'UI自动化测试任务',
    testType: 'UI自动化',
    plannedCompletionTime: '2024-02-25',
    testLevel: '系统测试',
    testEnvironment: '测试环境B',
    testData: 'UI自动化测试数据',
    testCaseCount: 20,
    status: '测试中',
    testCases: [
      {
        key: '2-1',
        name: '登录页面UI自动化测试',
        priority: 'High',
        status: 'Exists',
        description: '自动化测试登录页面的UI交互',
        estimatedTime: 45
      },
      {
        key: '2-2',
        name: '主页面UI自动化测试',
        priority: 'High',
        status: 'Missing',
        description: '自动化测试主页面的UI功能',
        estimatedTime: 60
      },
      {
        key: '2-3',
        name: '表单提交UI自动化测试',
        priority: 'Medium',
        status: 'Exists',
        description: '自动化测试各种表单的提交功能',
        estimatedTime: 40
      }
    ]
  },
  {
    key: '3',
    name: '接口自动化测试任务',
    testType: '接口自动化',
    plannedCompletionTime: '2024-02-28',
    testLevel: '接口测试',
    testEnvironment: '测试环境C',
    testData: 'API测试数据集',
    testCaseCount: 25,
    status: '测试完成',
    testCases: [
      {
        key: '3-1',
        name: '用户认证API测试',
        priority: 'High',
        status: 'Exists',
        description: '自动化测试用户认证相关API',
        estimatedTime: 35
      },
      {
        key: '3-2',
        name: '数据查询API测试',
        priority: 'High',
        status: 'Exists',
        description: '自动化测试数据查询API接口',
        estimatedTime: 40
      },
      {
        key: '3-3',
        name: '数据更新API测试',
        priority: 'Medium',
        status: 'Missing',
        description: '自动化测试数据更新API接口',
        estimatedTime: 30
      }
    ]
  },
  {
    key: '4',
    name: '安全测试任务',
    testType: '安全测试',
    plannedCompletionTime: '2024-03-05',
    testLevel: '安全测试',
    testEnvironment: '安全测试环境',
    testData: '安全测试数据集',
    testCaseCount: 12,
    status: '待测试',
    testCases: [
      {
        key: '4-1',
        name: 'SQL注入安全测试',
        priority: 'High',
        status: 'Missing',
        description: '测试系统对SQL注入攻击的防护能力',
        estimatedTime: 50
      },
      {
        key: '4-2',
        name: 'XSS攻击安全测试',
        priority: 'High',
        status: 'Missing',
        description: '测试系统对XSS攻击的防护能力',
        estimatedTime: 45
      },
      {
        key: '4-3',
        name: '权限控制安全测试',
        priority: 'Medium',
        status: 'Exists',
        description: '测试系统的权限控制机制',
        estimatedTime: 40
      }
    ]
  },
  {
    key: '5',
    name: '性能测试任务',
    testType: '性能测试',
    plannedCompletionTime: '2024-03-10',
    testLevel: '性能测试',
    testEnvironment: '性能测试环境',
    testData: '性能测试数据集',
    testCaseCount: 10,
    status: '待测试',
    testCases: [
      {
        key: '5-1',
        name: '系统负载性能测试',
        priority: 'High',
        status: 'Missing',
        description: '测试系统在高负载下的性能表现',
        estimatedTime: 120
      },
      {
        key: '5-2',
        name: '并发用户性能测试',
        priority: 'High',
        status: 'Missing',
        description: '测试系统支持的最大并发用户数',
        estimatedTime: 90
      },
      {
        key: '5-3',
        name: '响应时间性能测试',
        priority: 'Medium',
        status: 'Exists',
        description: '测试系统各功能的响应时间',
        estimatedTime: 60
      }
    ]
  }
];

export default function TestPlanningResultPage() {
  const router = useRouter();
  const [showResplitModal, setShowResplitModal] = useState(false);
  const [resplitPrompt, setResplitPrompt] = useState('');
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showTestCasePromptModal, setShowTestCasePromptModal] = useState(false);
  const [testCasePrompt, setTestCasePrompt] = useState('');
  const [selectedTestCaseForGeneration, setSelectedTestCaseForGeneration] = useState(null);

  // 重新拆分测试用例
  const handleResplitTestCases = async () => {
    if (!resplitPrompt.trim()) {
      message.warning('请输入拆分提示词');
      return;
    }

    setShowResplitModal(false);
    message.success('开始重新拆分测试用例...');

    // 模拟重新拆分过程
    setTimeout(() => {
      message.success('测试用例拆分完成！');
      setResplitPrompt('');
    }, 2000);
  };

  // 生成测试用例内容
  const handleGenerateTestContent = async () => {
    setIsGeneratingContent(true);
    setGenerationProgress(0);

    // 模拟生成进度
    const steps = [
      { progress: 20, message: '分析测试任务...' },
      { progress: 40, message: '生成测试步骤...' },
      { progress: 60, message: '创建测试数据...' },
      { progress: 80, message: '完善测试内容...' },
      { progress: 100, message: '生成完成' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress(step.progress);
      message.info(step.message);
    }

    // 跳转到测试用例内容页面
    router.push('/scenarios/test-automation/planning/result/content');
  };

  // 点击测试用例，直接跳转到内容页面
  const handleTestCaseClick = (testCase) => {
    router.push(`/scenarios/test-automation/planning/result/content?caseId=${testCase.key}`);
  };

  // 点击生成测试用例内容（针对待创建的用例）
  const handleGenerateSpecificTestCase = (testCase) => {
    setSelectedTestCaseForGeneration(testCase);
    setShowTestCasePromptModal(true);
  };

  // 确认生成特定测试用例内容
  const handleConfirmGenerateTestCase = async () => {
    if (!testCasePrompt.trim()) {
      message.warning('请输入生成提示词');
      return;
    }

    setShowTestCasePromptModal(false);
    message.success(`开始为"${selectedTestCaseForGeneration?.name}"生成测试用例内容...`);

    // 模拟生成过程
    setTimeout(() => {
      message.success('测试用例内容生成完成！');
      // 跳转到测试用例内容页面
      router.push(`/scenarios/test-automation/planning/result/content?caseId=${selectedTestCaseForGeneration?.key}`);
      setTestCasePrompt('');
      setSelectedTestCaseForGeneration(null);
    }, 2000);
  };

  // 颜色函数（支持新的测试类型）
  const getTestTypeColor = (type: string) => {
    switch (type) {
      case '手工测试': return 'blue';
      case 'UI自动化': return 'cyan';
      case '接口自动化': return 'green';
      case '安全测试': return 'red';
      case '性能测试': return 'orange';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P0': return 'red';
      case 'P1': return 'orange';
      case 'P2': return 'blue';
      case 'P3': return 'default';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '待测试': return 'default';
      case '测试中': return 'processing';
      case '测试完成': return 'success';
      case '测试失败': return 'error';
      default: return 'default';
    }
  };

  // 测试任务表格列定义（参考智能化手工测试的设计）
  const taskColumns = [
    {
      title: '测试任务',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Badge
              status={record.status === '待测试' ? 'default' : record.status === '测试中' ? 'processing' : 'success'}
            />
            <Text strong style={{ fontSize: '14px' }}>{text}</Text>
          </div>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.testCases ? `包含${record.testCases.length}个测试用例` : '测试任务描述'}
          </Text>
        </div>
      ),
    },
    {
      title: '关键信息',
      key: 'info',
      render: (record) => (
        <Space wrap>
          <Tag color={getTestTypeColor(record.testType)}>{record.testType}</Tag>
          <Tag color={record.testLevel === '系统测试' ? 'blue' : 'green'}>{record.testLevel}</Tag>
          <Tag color="default">{record.plannedCompletionTime}</Tag>
          <Tag color="cyan">{record.testCaseCount}个用例</Tag>
          <Tag color="purple">{record.testEnvironment}</Tag>
          {record.testCases && (
            <Tag color="geekblue">
              {record.testCases.filter(tc => tc.status === 'Exists').length}已存在 / {record.testCases.filter(tc => tc.status === 'Missing').length}待创建
            </Tag>
          )}
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      width: 150,
      render: (record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            style={{ color: '#1890ff' }}
          >
            编辑
          </Button>
          <Button
            type="text"
            icon={<PlayCircleOutlined />}
            size="small"
            style={{ color: '#52c41a' }}
          >
            执行
          </Button>
          <Button
            type="text"
            icon={<DeleteOutlined />}
            size="small"
            style={{ color: '#ff4d4f' }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* 页面头部 */}
      <Header style={{ 
        background: '#fff', 
        padding: '0 24px', 
        borderBottom: '1px solid #e8e8e8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => window.history.back()}
          >
            返回
          </Button>
          <RocketOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          <Title level={3} style={{ margin: 0, color: '#262626' }}>
            测试规划结果
          </Title>
        </div>
        
        <Space>
          <Button icon={<DownloadOutlined />}>
            导出规划
          </Button>
          <Button type="primary">
            开始执行
          </Button>
        </Space>
      </Header>

      <Content style={{ padding: '24px', overflow: 'auto' }}>
        {/* 页面标题 */}
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
            测试规划
          </Title>
        </div>

        {/* 测试目标和测试范围总结 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <Card>
            <Title level={5} style={{ marginBottom: '12px' }}>
              <RocketOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
              测试目标
            </Title>
            <Paragraph>{mockTestPlan.testObjective}</Paragraph>
          </Card>

          <Card>
            <Title level={5} style={{ marginBottom: '12px' }}>
              <FolderOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
              测试范围总结
            </Title>
            <Paragraph>{mockTestPlan.testScope}</Paragraph>
          </Card>
        </div>

        {/* 计划完成日期 */}
        <Card style={{ marginBottom: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={5} style={{ marginBottom: '12px' }}>
              <CalendarOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
              计划完成日期
            </Title>
            <Text strong style={{ fontSize: '18px', color: '#52c41a' }}>
              {mockTestPlan.completionDate}
            </Text>
          </div>
        </Card>

        {/* 测试任务列表 */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Title level={4} style={{ margin: 0 }}>
              测试任务列表
            </Title>
            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => setShowResplitModal(true)}
              >
                重新拆分测试用例
              </Button>
              <Button
                type="primary"
                icon={<FileAddOutlined />}
                onClick={handleGenerateTestContent}
                loading={isGeneratingContent}
              >
                生成测试用例内容
              </Button>
            </Space>
          </div>

          {/* 生成进度 */}
          {isGeneratingContent && (
            <div style={{ marginBottom: '16px', textAlign: 'center' }}>
              <Progress
                percent={generationProgress}
                status="active"
                strokeColor={{
                  '0%': '#667eea',
                  '100%': '#764ba2',
                }}
              />
              <Typography.Text type="secondary" style={{ marginTop: '8px', display: 'block' }}>
                正在生成测试用例内容...
              </Typography.Text>
            </div>
          )}

          <Table
            columns={taskColumns}
            dataSource={mockTestTasks}
            pagination={false}
            defaultExpandAllRows={true}
            expandable={{
              expandedRowRender: (record) => (
                <div style={{ padding: '16px', background: '#fafafa' }}>
                  <Title level={5} style={{ marginBottom: '12px' }}>
                    测试用例详情 ({record.testCases.length}个)
                  </Title>
                  <Table
                    columns={[
                      {
                        title: '用例名称',
                        dataIndex: 'name',
                        key: 'name',
                        render: (text, testCase) => (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {testCase.status === 'Exists' ?
                              <CheckCircleOutlined style={{ color: '#52c41a' }} /> :
                              <ExclamationCircleOutlined style={{ color: '#faad14' }} />
                            }
                            <Button
                              type="link"
                              style={{ padding: 0, height: 'auto', fontSize: '14px' }}
                              onClick={() => handleTestCaseClick(testCase)}
                            >
                              {text}
                            </Button>
                          </div>
                        )
                      },
                      {
                        title: '优先级',
                        dataIndex: 'priority',
                        key: 'priority',
                        width: 80,
                        render: (priority) => {
                          const color = priority === 'High' ? 'red' : priority === 'Medium' ? 'orange' : 'blue';
                          return <Tag color={color}>{priority}</Tag>;
                        }
                      },
                      {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
                        width: 80,
                        render: (status) => (
                          <Tag color={status === 'Exists' ? 'green' : 'orange'}>
                            {status === 'Exists' ? '已存在' : '待创建'}
                          </Tag>
                        )
                      },
                      {
                        title: '预估时间(分钟)',
                        dataIndex: 'estimatedTime',
                        key: 'estimatedTime',
                        width: 120
                      },
                      {
                        title: '描述',
                        dataIndex: 'description',
                        key: 'description'
                      },
                      {
                        title: '操作',
                        key: 'actions',
                        width: 150,
                        render: (_, testCase) => (
                          <Space>
                            <Button
                              type="text"
                              icon={<FileTextOutlined />}
                              size="small"
                              style={{ color: '#1890ff' }}
                              onClick={() => handleTestCaseClick(testCase)}
                            >
                              查看内容
                            </Button>
                            {testCase.status === 'Missing' && (
                              <Button
                                type="text"
                                icon={<FileAddOutlined />}
                                size="small"
                                style={{ color: '#52c41a' }}
                                onClick={() => handleGenerateSpecificTestCase(testCase)}
                              >
                                生成内容
                              </Button>
                            )}
                          </Space>
                        )
                      }
                    ]}
                    dataSource={record.testCases}
                    pagination={false}
                    size="small"
                  />
                </div>
              ),
              expandIcon: ({ expanded, onExpand, record }) => (
                <Button
                  type="text"
                  size="small"
                  onClick={e => onExpand(record, e)}
                >
                  {expanded ? '收起' : '展开'}用例
                </Button>
              )
            }}
          />
        </Card>
      </Content>

      {/* 重新拆分测试用例Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ReloadOutlined style={{ color: '#1890ff' }} />
            <span>重新拆分测试用例</span>
          </div>
        }
        open={showResplitModal}
        onCancel={() => {
          setShowResplitModal(false);
          setResplitPrompt('');
        }}
        onOk={handleResplitTestCases}
        width={600}
        okText="确认拆分"
        cancelText="取消"
      >
        <div style={{ padding: '16px 0' }}>
          <Typography.Text style={{ marginBottom: '12px', display: 'block' }}>
            请输入拆分提示词，AI将根据您的要求重新拆分测试用例：
          </Typography.Text>
          <Input.TextArea
            placeholder="例如：请将登录功能测试拆分得更细致，包含更多边界条件和异常场景..."
            value={resplitPrompt}
            onChange={(e) => setResplitPrompt(e.target.value)}
            rows={4}
            style={{ marginBottom: '12px' }}
          />
          <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
            提示：您可以指定拆分的粒度、关注的测试场景、或特殊的测试要求
          </Typography.Text>
        </div>
      </Modal>

      {/* 生成测试用例内容Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileAddOutlined style={{ color: '#52c41a' }} />
            <span>生成测试用例内容</span>
          </div>
        }
        open={showTestCasePromptModal}
        onCancel={() => {
          setShowTestCasePromptModal(false);
          setTestCasePrompt('');
          setSelectedTestCaseForGeneration(null);
        }}
        onOk={handleConfirmGenerateTestCase}
        width={600}
        okText="确认生成"
        cancelText="取消"
      >
        <div style={{ padding: '16px 0' }}>
          {selectedTestCaseForGeneration && (
            <div style={{ marginBottom: '16px', padding: '12px', background: '#f6ffed', borderRadius: '6px', border: '1px solid #b7eb8f' }}>
              <Text strong>测试用例：</Text>
              <Text>{selectedTestCaseForGeneration.name}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {selectedTestCaseForGeneration.description}
              </Text>
            </div>
          )}
          <Typography.Text style={{ marginBottom: '12px', display: 'block' }}>
            请输入生成提示词，AI将根据您的要求生成详细的测试用例内容：
          </Typography.Text>
          <Input.TextArea
            placeholder="例如：请生成详细的测试步骤，包含具体的操作步骤、测试数据和预期结果..."
            value={testCasePrompt}
            onChange={(e) => setTestCasePrompt(e.target.value)}
            rows={4}
            style={{ marginBottom: '12px' }}
          />
          <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
            提示：您可以指定测试步骤的详细程度、关注的测试点、或特殊的测试要求
          </Typography.Text>
        </div>
      </Modal>
    </Layout>
  );
}
