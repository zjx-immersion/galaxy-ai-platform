'use client';

import React from 'react';
import { Layout, Typography, Card, Button, Table, Tag, Space, Dropdown, Input, Select, DatePicker, Badge, Modal, Form, InputNumber, message } from 'antd';
import { useAIAssistantLayout } from '@/hooks/useAIAssistantLayout';
import {
  PlusOutlined,
  ImportOutlined,
  SettingOutlined,
  EditOutlined,
  PlayCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
  MoreOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BugOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import TestExecutionPage from '@/components/test-execution/TestExecutionPage';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

// 测试用例接口定义
interface TestCase {
  id: string;
  title: string;
  description: string;
  testType: string;
  priority: string;
  status: string;
  createTime: string;
  stepCount: number;
  executeCount: number;
  successRate: number;
  // 新增属性
  creator: string;
  assignee: string;
  module: string;
  tags: string[];
  estimatedTime: number; // 预计执行时间（分钟）
  actualTime?: number; // 实际执行时间（分钟）
  preconditions: string;
  testSteps: TestStep[];
  expectedResult: string;
  environment: string;
  version: string;
  lastExecuteTime?: string;
  defectCount: number;
}

interface TestStep {
  id: string;
  stepNumber: number;
  action: string;
  expectedResult: string;
}

// 模拟测试用例数据
const mockTestCases: TestCase[] = [
  {
    id: 'TC001',
    title: '用户登录功能测试',
    description: '验证用户使用正确的用户名和密码能够成功登录系统',
    testType: '功能测试',
    priority: 'P0',
    status: '待测试',
    createTime: '2024-01-15',
    stepCount: 8,
    executeCount: 0,
    successRate: 0,
    creator: '张三',
    assignee: '李四',
    module: '用户管理',
    tags: ['登录', '认证', '核心功能'],
    estimatedTime: 15,
    preconditions: '系统正常运行，用户账号已创建',
    testSteps: [
      { id: 'step1', stepNumber: 1, action: '打开登录页面', expectedResult: '显示登录表单' },
      { id: 'step2', stepNumber: 2, action: '输入正确的用户名和密码', expectedResult: '输入框显示内容' },
      { id: 'step3', stepNumber: 3, action: '点击登录按钮', expectedResult: '成功登录并跳转到首页' }
    ],
    expectedResult: '用户成功登录系统',
    environment: '测试环境',
    version: 'v1.0.0',
    defectCount: 0,
  },
  {
    id: 'TC002',
    title: '密码重置流程测试',
    description: '验证用户通过邮箱重置密码的完整流程',
    testType: '功能测试',
    priority: 'P1',
    status: '测试中',
    createTime: '2024-01-14',
    stepCount: 12,
    executeCount: 3,
    successRate: 67,
    creator: '王五',
    assignee: '赵六',
    module: '用户管理',
    tags: ['密码', '邮箱', '重置'],
    estimatedTime: 25,
    actualTime: 30,
    preconditions: '用户已注册且邮箱有效',
    testSteps: [
      { id: 'step1', stepNumber: 1, action: '点击忘记密码链接', expectedResult: '跳转到密码重置页面' },
      { id: 'step2', stepNumber: 2, action: '输入注册邮箱', expectedResult: '邮箱格式验证通过' }
    ],
    expectedResult: '用户成功重置密码',
    environment: '测试环境',
    version: 'v1.0.0',
    lastExecuteTime: '2024-01-16 10:30:00',
    defectCount: 1,
  },
  {
    id: 'TC003',
    title: '系统性能压力测试',
    description: '验证系统在高并发情况下的性能表现',
    testType: '性能测试',
    priority: 'P1',
    status: '测试完成',
    createTime: '2024-01-13',
    stepCount: 15,
    executeCount: 5,
    successRate: 80,
    creator: '刘七',
    assignee: '陈八',
    module: '系统核心',
    tags: ['性能', '并发', '压力测试'],
    estimatedTime: 120,
    actualTime: 150,
    preconditions: '系统部署完成，测试数据准备就绪',
    testSteps: [
      { id: 'step1', stepNumber: 1, action: '配置压力测试参数', expectedResult: '参数配置成功' },
      { id: 'step2', stepNumber: 2, action: '启动并发用户模拟', expectedResult: '模拟用户正常运行' }
    ],
    expectedResult: '系统在高并发下稳定运行',
    environment: '性能测试环境',
    version: 'v1.0.0',
    lastExecuteTime: '2024-01-17 14:20:00',
    defectCount: 2,
  },
  {
    id: 'TC004',
    title: '数据安全性测试',
    description: '验证系统对敏感数据的保护机制',
    testType: '安全测试',
    priority: 'P0',
    status: '测试完成',
    createTime: '2024-01-12',
    stepCount: 20,
    executeCount: 8,
    successRate: 95,
    creator: '孙九',
    assignee: '周十',
    module: '安全模块',
    tags: ['安全', '数据保护', '加密'],
    estimatedTime: 180,
    actualTime: 200,
    preconditions: '安全测试工具准备完成',
    testSteps: [
      { id: 'step1', stepNumber: 1, action: '尝试SQL注入攻击', expectedResult: '系统成功防御' },
      { id: 'step2', stepNumber: 2, action: '检查数据传输加密', expectedResult: '数据已加密传输' }
    ],
    expectedResult: '系统安全防护机制有效',
    environment: '安全测试环境',
    version: 'v1.0.0',
    lastExecuteTime: '2024-01-18 09:15:00',
    defectCount: 0,
  },
  {
    id: 'TC005',
    title: '跨浏览器兼容性测试',
    description: '验证系统在不同浏览器中的兼容性',
    testType: '兼容性测试',
    priority: 'P2',
    status: '待测试',
    createTime: '2024-01-11',
    stepCount: 10,
    executeCount: 0,
    successRate: 0,
    creator: '吴十一',
    assignee: '郑十二',
    module: '前端界面',
    tags: ['兼容性', '浏览器', 'UI'],
    estimatedTime: 60,
    preconditions: '多种浏览器环境准备完成',
    testSteps: [
      { id: 'step1', stepNumber: 1, action: '在Chrome浏览器中打开系统', expectedResult: '页面正常显示' },
      { id: 'step2', stepNumber: 2, action: '在Firefox浏览器中打开系统', expectedResult: '页面正常显示' }
    ],
    expectedResult: '系统在各浏览器中正常运行',
    environment: '兼容性测试环境',
    version: 'v1.0.0',
    defectCount: 0,
  },
];

const IntelligentManualTestingPage: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<'management' | 'execution'>('management');
  const [testCases, setTestCases] = React.useState<TestCase[]>(mockTestCases);

  // 使用AI助手布局适应Hook
  const { getContentStyle } = useAIAssistantLayout();

  // 处理创建用例
  const handleCreateTestCase = () => {
    router.push('/scenarios/intelligent-manual-testing/create');
  };



  // 获取状态对应的颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case '待测试': return 'default';
      case '测试中': return 'processing';
      case '测试完成': return 'success';
      default: return 'default';
    }
  };

  // 获取优先级颜色
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P0': return 'red';
      case 'P1': return 'orange';
      case 'P2': return 'blue';
      default: return 'default';
    }
  };

  // 获取测试类型颜色
  const getTestTypeColor = (type: string) => {
    switch (type) {
      case '功能测试': return 'blue';
      case '性能测试': return 'purple';
      case '安全测试': return 'red';
      case '兼容性测试': return 'green';
      default: return 'default';
    }
  };

  // 获取成功率颜色
  const getSuccessRateColor = (rate: number) => {
    if (rate >= 90) return 'success';
    if (rate >= 70) return 'warning';
    if (rate > 0) return 'error';
    return 'default';
  };

  // 表格列定义
  const columns = [
    {
      title: '测试用例',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Badge 
              status={record.status === '待测试' ? 'default' : record.status === '测试中' ? 'processing' : 'success'} 
            />
            <Text strong style={{ fontSize: '14px' }}>{text}</Text>
          </div>
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.description}</Text>
        </div>
      ),
    },
    {
      title: '关键信息',
      key: 'info',
      render: (record: any) => (
        <Space wrap>
          <Tag color={getTestTypeColor(record.testType)}>{record.testType}</Tag>
          <Tag color={getPriorityColor(record.priority)}>{record.priority}</Tag>
          <Tag color={getStatusColor(record.status)}>{record.status}</Tag>
          <Tag color="default">{record.createTime}</Tag>
          <Tag color="cyan">{record.stepCount}步骤</Tag>
          <Tag color="geekblue">{record.executeCount}次执行</Tag>
          <Tag color={getSuccessRateColor(record.successRate)}>
            {record.successRate > 0 ? `${record.successRate}%成功率` : '未执行'}
          </Tag>
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      width: 150,
      render: (record: any) => (
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
    <Layout className="min-h-screen">
      <Header />
      <Content style={getContentStyle({ padding: '24px', background: '#f5f5f5' })}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* 页面标题 */}
          <div style={{ marginBottom: '24px' }}>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              智能化手工测试
            </Title>
            <Text type="secondary" style={{ fontSize: '16px' }}>
              AI驱动的测试用例管理与执行平台
            </Text>
          </div>

          {/* 功能选择卡片 */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <Card
              hoverable
              style={{ 
                flex: 1, 
                cursor: 'pointer',
                border: activeTab === 'management' ? '2px solid #1890ff' : '1px solid #d9d9d9',
                background: activeTab === 'management' ? '#f0f9ff' : 'white'
              }}
              onClick={() => setActiveTab('management')}
            >
              <div style={{ textAlign: 'center', padding: '16px' }}>
                <SettingOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '12px' }} />
                <Title level={4} style={{ margin: '0 0 6px 0' }}>测试用例管理</Title>
                <Text type="secondary" style={{ fontSize: '12px' }}>创建、导入、编辑和管理测试用例</Text>
              </div>
            </Card>
            
            <Card
              hoverable
              style={{ 
                flex: 1, 
                cursor: 'pointer',
                border: activeTab === 'execution' ? '2px solid #1890ff' : '1px solid #d9d9d9',
                background: activeTab === 'execution' ? '#f0f9ff' : 'white'
              }}
              onClick={() => setActiveTab('execution')}
            >
              <div style={{ textAlign: 'center', padding: '16px' }}>
                <PlayCircleOutlined style={{ fontSize: '32px', color: '#52c41a', marginBottom: '12px' }} />
                <Title level={4} style={{ margin: '0 0 6px 0' }}>测试执行</Title>
                <Text type="secondary" style={{ fontSize: '12px' }}>执行测试用例，记录结果和缺陷</Text>
              </div>
            </Card>
          </div>

          {/* 测试用例管理页面 */}
          {activeTab === 'management' && (
            <Card>
              {/* 操作栏 */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '16px',
                padding: '16px 0'
              }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleCreateTestCase}
                    style={{ borderRadius: '6px' }}
                  >
                    创建用例
                  </Button>
                  <Button 
                    icon={<ImportOutlined />}
                    style={{ borderRadius: '6px' }}
                  >
                    导入用例
                  </Button>
                  <Dropdown
                    menu={{
                      items: [
                        { key: 'batch-edit', label: '批量编辑' },
                        { key: 'batch-delete', label: '批量删除' },
                        { key: 'batch-execute', label: '批量执行' },
                        { key: 'export', label: '导出用例' },
                      ]
                    }}
                  >
                    <Button icon={<MoreOutlined />} style={{ borderRadius: '6px' }}>
                      批量操作
                    </Button>
                  </Dropdown>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Search
                    placeholder="搜索测试用例..."
                    style={{ width: 250 }}
                    allowClear
                  />
                  <Select
                    placeholder="测试类型"
                    style={{ width: 120 }}
                    allowClear
                  >
                    <Option value="功能测试">功能测试</Option>
                    <Option value="性能测试">性能测试</Option>
                    <Option value="安全测试">安全测试</Option>
                    <Option value="兼容性测试">兼容性测试</Option>
                  </Select>
                  <Select
                    placeholder="优先级"
                    style={{ width: 100 }}
                    allowClear
                  >
                    <Option value="P0">P0</Option>
                    <Option value="P1">P1</Option>
                    <Option value="P2">P2</Option>
                  </Select>
                  <Select
                    placeholder="状态"
                    style={{ width: 120 }}
                    allowClear
                  >
                    <Option value="待测试">待测试</Option>
                    <Option value="测试中">测试中</Option>
                    <Option value="测试完成">测试完成</Option>
                  </Select>
                </div>
              </div>

              {/* 测试用例列表 */}
              <Table
                columns={columns}
                dataSource={testCases}
                rowKey="id"
                pagination={{
                  total: testCases.length,
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total) => `共 ${total} 条测试用例`,
                }}
                rowSelection={{
                  type: 'checkbox',
                }}
              />
            </Card>
          )}

          {/* 测试执行页面 */}
          {activeTab === 'execution' && (
            <TestExecutionPage />
          )}
        </div>


      </Content>
    </Layout>
  );
};

export default IntelligentManualTestingPage;
