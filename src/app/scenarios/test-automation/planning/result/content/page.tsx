'use client';

import React, { useState } from 'react';
import { Layout, Card, Typography, Tree, Button, Space, Tag, Form, Input, Select, InputNumber, message, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftOutlined,
  FolderOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SaveOutlined,
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  ReloadOutlined
} from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// 测试步骤接口
interface TestStep {
  id: string;
  stepNumber: number;
  stepName: string;
  stepType: string;
  params: string;
  description?: string;
  expectedResult?: string;
}

// 步骤类型接口
interface StepType {
  id: string;
  name: string;
  category: string;
  description: string;
  defaultParams: string;
}

// Mock数据 - 测试任务和用例
const mockTestData = [
  {
    key: '1',
    title: '用户登录功能测试',
    type: 'folder',
    children: [
      {
        key: '1-1',
        title: '正常登录流程测试',
        type: 'file',
        priority: 'High',
        status: 'Exists'
      },
      {
        key: '1-2',
        title: '错误密码登录测试',
        type: 'file',
        priority: 'High',
        status: 'Exists'
      },
      {
        key: '1-3',
        title: '账号锁定机制测试',
        type: 'file',
        priority: 'Medium',
        status: 'Missing'
      }
    ]
  },
  {
    key: '2',
    title: '用户注册功能测试',
    type: 'folder',
    children: [
      {
        key: '2-1',
        title: '正常注册流程测试',
        type: 'file',
        priority: 'High',
        status: 'Exists'
      },
      {
        key: '2-2',
        title: '邮箱验证测试',
        type: 'file',
        priority: 'High',
        status: 'Missing'
      }
    ]
  }
];

// Mock数据 - 测试用例详细内容
const mockTestCaseContent = {
  '1-1': {
    title: '正常登录流程测试',
    description: '验证用户使用正确的用户名和密码能够成功登录系统',
    testType: '功能测试',
    priority: 'High',
    estimatedTime: 15,
    preconditions: '1. 系统已启动\n2. 用户已注册账号\n3. 浏览器已打开登录页面',
    testSteps: [
      {
        id: '1',
        stepNumber: 1,
        stepName: '打开登录页面',
        stepType: '页面导航',
        params: 'URL: /login',
        description: '导航到系统登录页面',
        expectedResult: '页面正常加载，显示登录表单'
      },
      {
        id: '2',
        stepNumber: 2,
        stepName: '输入用户名',
        stepType: '输入操作',
        params: 'testuser@example.com',
        description: '在用户名输入框中输入有效的用户名',
        expectedResult: '用户名正确显示在输入框中'
      },
      {
        id: '3',
        stepNumber: 3,
        stepName: '输入密码',
        stepType: '输入操作',
        params: 'password123',
        description: '在密码输入框中输入正确的密码',
        expectedResult: '密码以掩码形式显示'
      },
      {
        id: '4',
        stepNumber: 4,
        stepName: '点击登录按钮',
        stepType: '点击操作',
        params: '#login-button',
        description: '点击登录按钮提交表单',
        expectedResult: '系统验证用户信息并跳转到主页面'
      }
    ]
  }
};

// 步骤类型库数据
const stepTypeLibrary: StepType[] = [
  // 页面导航
  { id: 'goto', name: 'goto', category: '页面导航', description: '导航到页面', defaultParams: 'https://example.com' },
  { id: 'refresh', name: 'refresh', category: '页面导航', description: '刷新页面', defaultParams: '' },
  { id: 'back', name: 'back', category: '页面导航', description: '返回上一页', defaultParams: '' },
  { id: 'evaluateJS', name: 'evaluateJS', category: '页面导航', description: '执行JS', defaultParams: 'console.log("test")' },

  // 智能交互
  { id: 'ai', name: 'ai', category: '智能交互', description: '智能操作', defaultParams: '点击登录按钮' },
  { id: 'aiTap', name: 'aiTap', category: '智能交互', description: '点击元素', defaultParams: '登录按钮' },
  { id: 'aiInput', name: 'aiInput', category: '智能交互', description: '输入文本', defaultParams: 'username' },
  { id: 'aiHover', name: 'aiHover', category: '智能交互', description: '悬停元素', defaultParams: '菜单项' },
  { id: 'aiScroll', name: 'aiScroll', category: '智能交互', description: '滚动页面', defaultParams: '向下滚动' },
  { id: 'aiKeyPress', name: 'aiKeyPress', category: '智能交互', description: '键盘按键', defaultParams: 'Enter' },
  { id: 'aiRightClick', name: 'aiRightClick', category: '智能交互', description: '右键点击', defaultParams: '文件' },

  // 数据提取
  { id: 'aiQuery', name: 'aiQuery', category: '数据提取', description: '查询化数据', defaultParams: '获取用户信息' },
  { id: 'aiAsk', name: 'aiAsk', category: '数据提取', description: '询问信息', defaultParams: '当前页面标题' },
  { id: 'aiBoolean', name: 'aiBoolean', category: '数据提取', description: '布尔值', defaultParams: '是否显示错误信息' },
  { id: 'aiNumber', name: 'aiNumber', category: '数据提取', description: '提取数值', defaultParams: '商品价格' },
  { id: 'aiString', name: 'aiString', category: '数据提取', description: '提取文本', defaultParams: '页面标题' },
  { id: 'aiLocate', name: 'aiLocate', category: '数据提取', description: '元素定位', defaultParams: '登录按钮' },

  // 验证等待
  { id: 'aiAssert', name: 'aiAssert', category: '验证等待', description: '断言验证', defaultParams: '页面包含"成功"' },
  { id: 'aiWaitFor', name: 'aiWaitFor', category: '验证等待', description: '等待条件', defaultParams: '页面加载完成' },

  // 工具操作
  { id: 'screenshot', name: 'screenshot', category: '工具操作', description: '截图记录', defaultParams: 'step_screenshot' },
  { id: 'sleep', name: 'sleep', category: '工具操作', description: '延时等待', defaultParams: '2000' },
  { id: 'runYaml', name: 'runYaml', category: '工具操作', description: 'YAML脚本', defaultParams: 'script.yaml' },
];

export default function TestCaseContentPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [selectedTestCase, setSelectedTestCase] = useState('1-1');
  const [testSteps, setTestSteps] = useState<TestStep[]>(mockTestCaseContent['1-1'].testSteps);
  const [editingStep, setEditingStep] = useState<string | null>(null);
  const [showStepLibrary, setShowStepLibrary] = useState(false);
  const [stepPrompt, setStepPrompt] = useState('');
  const [showEditCaseModal, setShowEditCaseModal] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [regeneratePrompt, setRegeneratePrompt] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState<'case' | 'task'>('case');
  const [showAddPromptModal, setShowAddPromptModal] = useState(false);
  const [addPrompt, setAddPrompt] = useState('');

  // 按分类分组步骤类型
  const stepTypesByCategory = React.useMemo(() => {
    const grouped: { [key: string]: StepType[] } = {};
    stepTypeLibrary.forEach(step => {
      if (!grouped[step.category]) {
        grouped[step.category] = [];
      }
      grouped[step.category].push(step);
    });
    return grouped;
  }, []);

  // 从步骤类型库拖拽添加步骤
  const handleDragStart = (e: React.DragEvent, stepType: StepType) => {
    e.dataTransfer.setData('stepType', JSON.stringify(stepType));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const stepTypeData = e.dataTransfer.getData('stepType');
    if (stepTypeData) {
      const stepType: StepType = JSON.parse(stepTypeData);
      const newStep: TestStep = {
        id: Date.now().toString(),
        stepNumber: testSteps.length + 1,
        stepName: stepType.description,
        stepType: stepType.name,
        params: stepType.defaultParams,
        description: stepType.description,
        expectedResult: '操作成功执行'
      };
      setTestSteps([...testSteps, newStep]);
      message.success(`已添加步骤：${stepType.description}`);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // 添加步骤按钮点击
  const handleAddStepClick = () => {
    setShowStepLibrary(true);
  };

  // 通过提示词生成步骤
  const handleGenerateStepFromPrompt = () => {
    if (!stepPrompt.trim()) {
      message.warning('请输入步骤描述');
      return;
    }

    const newStep: TestStep = {
      id: Date.now().toString(),
      stepNumber: testSteps.length + 1,
      stepName: stepPrompt,
      stepType: 'ai',
      params: stepPrompt,
      description: stepPrompt,
      expectedResult: '操作成功执行'
    };
    setTestSteps([...testSteps, newStep]);
    setStepPrompt('');
    message.success('步骤已添加');
  };

  // 树节点渲染
  const renderTreeNode = (nodeData: any) => {
    if (nodeData.type === 'folder') {
      return (
        <span>
          <FolderOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          {nodeData.title}
        </span>
      );
    } else {
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {nodeData.status === 'Exists' ?
            <CheckCircleOutlined style={{ color: '#52c41a' }} /> :
            <ExclamationCircleOutlined style={{ color: '#faad14' }} />
          }
          <span>{nodeData.title}</span>
          <Tag color={nodeData.priority === 'High' ? 'red' : nodeData.priority === 'Medium' ? 'orange' : 'blue'} size="small">
            {nodeData.priority}
          </Tag>
        </span>
      );
    }
  };

  // 选择测试用例
  const handleSelectTestCase = (selectedKeys: React.Key[]) => {
    if (selectedKeys.length > 0) {
      const key = selectedKeys[0] as string;
      if (key.includes('-') && !key.endsWith('-')) {
        setSelectedTestCase(key);
        // 这里应该根据选中的用例加载对应的内容
        if (mockTestCaseContent[key]) {
          setTestSteps(mockTestCaseContent[key].testSteps);
        }
      }
    }
  };

  // 添加测试步骤
  const handleAddStep = () => {
    const newStep: TestStep = {
      id: Date.now().toString(),
      stepNumber: testSteps.length + 1,
      stepName: '新测试步骤',
      stepType: '点击操作',
      params: '',
      description: '',
      expectedResult: ''
    };
    setTestSteps([...testSteps, newStep]);
    setEditingStep(newStep.id);
  };

  // 删除测试步骤
  const handleDeleteStep = (stepId: string) => {
    const updatedSteps = testSteps.filter(step => step.id !== stepId);
    // 重新编号
    const renumberedSteps = updatedSteps.map((step, index) => ({
      ...step,
      stepNumber: index + 1
    }));
    setTestSteps(renumberedSteps);
  };

  // 保存测试用例
  const handleSaveTestCase = () => {
    message.success('测试用例内容已保存！');
  };

  // 编辑用例
  const handleEditCase = () => {
    setShowEditCaseModal(true);
  };

  // 重新生成
  const handleRegenerate = () => {
    setShowRegenerateModal(true);
  };

  // 确认重新生成
  const handleConfirmRegenerate = () => {
    if (!regeneratePrompt.trim()) {
      message.warning('请输入重新生成的要求');
      return;
    }
    setShowRegenerateModal(false);
    message.success('正在重新生成测试用例内容...');
    setTimeout(() => {
      message.success('测试用例内容重新生成完成！');
      setRegeneratePrompt('');
    }, 2000);
  };

  // 添加用例或任务
  const handleAdd = (type: 'case' | 'task') => {
    setAddType(type);
    setShowAddModal(true);
  };

  // 手动添加
  const handleManualAdd = () => {
    setShowAddModal(false);
    message.success(`手动添加${addType === 'case' ? '测试用例' : '测试任务'}功能开发中...`);
  };

  // AI自动生成
  const handleAIAdd = () => {
    setShowAddModal(false);
    setShowAddPromptModal(true);
  };

  // 确认AI生成
  const handleConfirmAIAdd = () => {
    if (!addPrompt.trim()) {
      message.warning('请输入生成要求');
      return;
    }
    setShowAddPromptModal(false);
    message.success(`正在AI生成${addType === 'case' ? '测试用例' : '测试任务'}...`);
    setTimeout(() => {
      message.success(`${addType === 'case' ? '测试用例' : '测试任务'}生成完成！`);
      setAddPrompt('');
    }, 2000);
  };

  const currentTestCase = mockTestCaseContent[selectedTestCase] || mockTestCaseContent['1-1'];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Content style={{ padding: '24px' }}>
        {/* 页面头部 */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => router.back()}
          >
            返回
          </Button>
          <div>
            <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
              测试用例内容
            </Title>
            <Text type="secondary">
              查看和编辑生成的测试用例详细内容
            </Text>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Button 
              type="primary" 
              icon={<SaveOutlined />}
              onClick={handleSaveTestCase}
            >
              保存所有用例
            </Button>
          </div>
        </div>

        {/* 主要内容区域 - 左右布局 */}
        <div style={{ display: 'flex', gap: '24px', height: 'calc(100vh - 200px)' }}>
          {/* 左侧：测试任务和用例列表 */}
          <Card
            title="测试任务和用例列表"
            style={{ width: '350px', height: '100%', overflow: 'auto' }}
            extra={
              <Space>
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  size="small"
                  onClick={() => handleAdd('case')}
                  style={{ color: '#1890ff' }}
                >
                  添加用例
                </Button>
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  size="small"
                  onClick={() => handleAdd('task')}
                  style={{ color: '#52c41a' }}
                >
                  添加任务
                </Button>
              </Space>
            }
          >
            <Tree
              treeData={mockTestData}
              defaultExpandAll
              onSelect={handleSelectTestCase}
              selectedKeys={[selectedTestCase]}
              titleRender={renderTreeNode}
            />
          </Card>

          {/* 右侧：测试用例详细内容 */}
          <div style={{ display: 'flex', flex: 1, height: '100%' }}>
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileTextOutlined />
                  <span>{currentTestCase.title}</span>
                  <Tag color={currentTestCase.priority === 'High' ? 'red' : 'orange'}>
                    {currentTestCase.priority}
                  </Tag>
                </div>
              }
              style={{
                flex: showStepLibrary ? '1' : '1',
                height: '100%',
                overflow: 'auto',
                marginRight: showStepLibrary ? '16px' : '0'
              }}
              extra={
                <Space>
                  <Button
                    icon={<EditOutlined />}
                    size="small"
                    onClick={handleEditCase}
                  >
                    编辑用例
                  </Button>
                  <Button
                    icon={<ReloadOutlined />}
                    size="small"
                    onClick={handleRegenerate}
                  >
                    重新生成
                  </Button>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    size="small"
                    onClick={handleSaveTestCase}
                  >
                    保存
                  </Button>
                  {showStepLibrary && (
                    <Button
                      size="small"
                      onClick={() => setShowStepLibrary(false)}
                    >
                      关闭面板
                    </Button>
                  )}
                </Space>
              }
            >
            <div style={{ padding: '0 8px' }}>
              {/* 基本信息 */}
              <div style={{ marginBottom: '24px' }}>
                <Title level={5}>基本信息</Title>
                <div style={{ background: '#fafafa', padding: '16px', borderRadius: '6px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <Text strong>用例描述：</Text>
                    <Paragraph style={{ margin: '4px 0 0 0' }}>{currentTestCase.description}</Paragraph>
                  </div>
                  <div style={{ display: 'flex', gap: '24px', marginBottom: '12px' }}>
                    <div>
                      <Text strong>测试类型：</Text>
                      <Tag color="blue">{currentTestCase.testType}</Tag>
                    </div>
                    <div>
                      <Text strong>预估时间：</Text>
                      <Text>{currentTestCase.estimatedTime}分钟</Text>
                    </div>
                  </div>
                  <div>
                    <Text strong>前置条件：</Text>
                    <Paragraph style={{ margin: '4px 0 0 0', whiteSpace: 'pre-line' }}>
                      {currentTestCase.preconditions}
                    </Paragraph>
                  </div>
                </div>
              </div>

              {/* 测试步骤 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <Title level={5}>测试步骤</Title>
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={handleAddStepClick}
                    size="small"
                  >
                    添加步骤
                  </Button>
                </div>
                
                <div
                  style={{ maxHeight: '400px', overflow: 'auto' }}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {testSteps.map((step, index) => (
                    <Card
                      key={step.id}
                      size="small"
                      style={{ marginBottom: '12px' }}
                      title={`步骤 ${step.stepNumber}: ${step.stepName}`}
                      extra={
                        <Space>
                          <Button
                            type="text"
                            icon={<EditOutlined />}
                            size="small"
                            onClick={() => setEditingStep(step.id)}
                          />
                          <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            size="small"
                            danger
                            onClick={() => handleDeleteStep(step.id)}
                          />
                        </Space>
                      }
                    >
                      <div style={{ fontSize: '13px' }}>
                        <div style={{ marginBottom: '8px' }}>
                          <Text strong>操作类型：</Text>
                          <Tag color="green">{step.stepType}</Tag>
                        </div>
                        <div style={{ marginBottom: '8px' }}>
                          <Text strong>参数：</Text>
                          <Text code>{step.params}</Text>
                        </div>
                        <div style={{ marginBottom: '8px' }}>
                          <Text strong>描述：</Text>
                          <Text>{step.description}</Text>
                        </div>
                        <div>
                          <Text strong>预期结果：</Text>
                          <Text>{step.expectedResult}</Text>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* 右侧面板：提示词输入和步骤类型库 */}
          {showStepLibrary && (
            <div style={{ width: '350px', borderLeft: '1px solid #f0f0f0', background: '#fafafa' }}>
              {/* 提示词输入区域 */}
              <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0' }}>
                <Title level={5} style={{ marginBottom: '12px', color: '#1890ff' }}>
                  <EditOutlined style={{ marginRight: '8px' }} />
                  智能生成步骤
                </Title>
                <Input.TextArea
                  placeholder="请描述要添加的测试步骤，如：点击登录按钮、输入用户名等..."
                  value={stepPrompt}
                  onChange={(e) => setStepPrompt(e.target.value)}
                  rows={3}
                  style={{ marginBottom: '12px' }}
                />
                <Button
                  type="primary"
                  size="small"
                  block
                  onClick={handleGenerateStepFromPrompt}
                  disabled={!stepPrompt.trim()}
                >
                  生成步骤
                </Button>
              </div>

              {/* 步骤类型库 */}
              <div style={{ padding: '16px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <Title level={5} style={{ margin: 0, color: '#1890ff' }}>
                    步骤类型库
                  </Title>
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '4px' }}>
                    拖拽到左侧添加步骤
                  </Text>
                </div>

                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {Object.entries(stepTypesByCategory).map(([category, steps]) => (
                    <div key={category} style={{ marginBottom: '20px' }}>
                      <Title level={5} style={{ fontSize: '14px', marginBottom: '8px', color: '#666' }}>
                        {category}
                      </Title>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        {steps.map(step => (
                          <div
                            key={step.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, step)}
                            style={{
                              padding: '8px',
                              border: '1px solid #e8e8e8',
                              borderRadius: '4px',
                              cursor: 'grab',
                              background: 'white',
                              fontSize: '12px',
                              textAlign: 'center'
                            }}
                            onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
                            onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
                          >
                            <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                              {step.name}
                            </div>
                            <div style={{ color: '#999', fontSize: '10px' }}>
                              {step.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </Content>

      {/* 编辑用例Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <EditOutlined style={{ color: '#1890ff' }} />
            <span>编辑测试用例</span>
          </div>
        }
        open={showEditCaseModal}
        onCancel={() => setShowEditCaseModal(false)}
        onOk={() => {
          setShowEditCaseModal(false);
          message.success('测试用例已更新！');
        }}
        width={800}
        okText="保存"
        cancelText="取消"
      >
        <Form layout="vertical" style={{ marginTop: '16px' }}>
          <Form.Item label="用例标题">
            <Input defaultValue={currentTestCase.title} />
          </Form.Item>
          <Form.Item label="用例描述">
            <Input.TextArea defaultValue={currentTestCase.description} rows={3} />
          </Form.Item>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item label="测试类型">
              <Select defaultValue={currentTestCase.testType}>
                <Select.Option value="功能测试">功能测试</Select.Option>
                <Select.Option value="性能测试">性能测试</Select.Option>
                <Select.Option value="接口测试">接口测试</Select.Option>
                <Select.Option value="安全测试">安全测试</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="优先级">
              <Select defaultValue={currentTestCase.priority}>
                <Select.Option value="High">High</Select.Option>
                <Select.Option value="Medium">Medium</Select.Option>
                <Select.Option value="Low">Low</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item label="预估时间(分钟)">
            <InputNumber defaultValue={currentTestCase.estimatedTime} min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="前置条件">
            <Input.TextArea defaultValue={currentTestCase.preconditions} rows={2} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 重新生成Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ReloadOutlined style={{ color: '#52c41a' }} />
            <span>重新生成测试用例</span>
          </div>
        }
        open={showRegenerateModal}
        onCancel={() => {
          setShowRegenerateModal(false);
          setRegeneratePrompt('');
        }}
        onOk={handleConfirmRegenerate}
        width={600}
        okText="确认重新生成"
        cancelText="取消"
      >
        <div style={{ padding: '16px 0' }}>
          <Typography.Text style={{ marginBottom: '12px', display: 'block' }}>
            请输入重新生成的要求，AI将根据您的要求重新生成测试用例内容：
          </Typography.Text>
          <Input.TextArea
            placeholder="例如：增加更多边界条件测试、优化测试步骤描述、添加异常场景测试..."
            value={regeneratePrompt}
            onChange={(e) => setRegeneratePrompt(e.target.value)}
            rows={4}
            style={{ marginBottom: '12px' }}
          />
          <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
            提示：您可以指定需要改进的方面、增加的测试场景、或特殊的测试要求
          </Typography.Text>
        </div>
      </Modal>

      {/* 添加用例/任务选择Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusOutlined style={{ color: '#1890ff' }} />
            <span>添加{addType === 'case' ? '测试用例' : '测试任务'}</span>
          </div>
        }
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        footer={null}
        width={400}
      >
        <div style={{ padding: '20px 0', textAlign: 'center' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Button
              size="large"
              style={{ width: '200px', height: '60px' }}
              onClick={handleManualAdd}
            >
              <div>
                <EditOutlined style={{ fontSize: '20px', display: 'block', marginBottom: '4px' }} />
                <span>手动添加</span>
              </div>
            </Button>
            <Button
              type="primary"
              size="large"
              style={{ width: '200px', height: '60px' }}
              onClick={handleAIAdd}
            >
              <div>
                <FileTextOutlined style={{ fontSize: '20px', display: 'block', marginBottom: '4px' }} />
                <span>AI自动生成</span>
              </div>
            </Button>
          </Space>
        </div>
      </Modal>

      {/* AI生成提示词Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileTextOutlined style={{ color: '#52c41a' }} />
            <span>AI生成{addType === 'case' ? '测试用例' : '测试任务'}</span>
          </div>
        }
        open={showAddPromptModal}
        onCancel={() => {
          setShowAddPromptModal(false);
          setAddPrompt('');
        }}
        onOk={handleConfirmAIAdd}
        width={600}
        okText="确认生成"
        cancelText="取消"
      >
        <div style={{ padding: '16px 0' }}>
          <Typography.Text style={{ marginBottom: '12px', display: 'block' }}>
            请描述您要生成的{addType === 'case' ? '测试用例' : '测试任务'}：
          </Typography.Text>
          <Input.TextArea
            placeholder={addType === 'case' ?
              "例如：生成用户密码修改功能的测试用例，包含正常修改、密码强度验证、确认密码不一致等场景..." :
              "例如：生成移动端兼容性测试任务，包含不同设备、不同分辨率的测试..."
            }
            value={addPrompt}
            onChange={(e) => setAddPrompt(e.target.value)}
            rows={4}
            style={{ marginBottom: '12px' }}
          />
          <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
            提示：请详细描述功能特点、测试重点、覆盖场景等要求
          </Typography.Text>
        </div>
      </Modal>
    </Layout>
  );
}
