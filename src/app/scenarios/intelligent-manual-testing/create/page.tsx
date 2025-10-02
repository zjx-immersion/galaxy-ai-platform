'use client';

import React from 'react';
import { Layout, Typography, Card, Button, Form, Input, Select, InputNumber, message, Space, Modal } from 'antd';
import {
  ArrowLeftOutlined,
  SaveOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CopyOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// 步骤类型定义
interface StepType {
  id: string;
  name: string;
  category: string;
  description: string;
  defaultParams?: string;
}

// 测试步骤定义
interface TestStep {
  id: string;
  stepNumber: number;
  stepName: string;
  stepType: string;
  params: string;
  description?: string;
  expectedResult?: string;
}

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

const CreateTestCasePage: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [testSteps, setTestSteps] = React.useState<TestStep[]>([]);
  const [editingStep, setEditingStep] = React.useState<string | null>(null);
  const [editForm] = Form.useForm();
  const [showPreview, setShowPreview] = React.useState(false);

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

  // 添加步骤
  const addStep = (stepType?: StepType) => {
    const newStep: TestStep = {
      id: `step_${Date.now()}`,
      stepNumber: testSteps.length + 1,
      stepName: stepType ? `${stepType.name}操作` : '新步骤',
      stepType: stepType ? stepType.name : '',
      params: stepType ? stepType.defaultParams || '' : '',
      description: stepType ? stepType.description : '',
      expectedResult: '操作成功执行'
    };
    setTestSteps([...testSteps, newStep]);
  };

  // 从步骤类型库拖拽添加步骤
  const handleDragStart = (e: React.DragEvent, stepType: StepType) => {
    e.dataTransfer.setData('stepType', JSON.stringify(stepType));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const stepTypeData = e.dataTransfer.getData('stepType');
    if (stepTypeData) {
      const stepType: StepType = JSON.parse(stepTypeData);
      addStep(stepType);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // 步骤操作
  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...testSteps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newSteps.length) {
      [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
      // 重新编号
      newSteps.forEach((step, idx) => {
        step.stepNumber = idx + 1;
      });
      setTestSteps(newSteps);
    }
  };

  const copyStep = (index: number) => {
    const stepToCopy = testSteps[index];
    const newStep: TestStep = {
      ...stepToCopy,
      id: `step_${Date.now()}`,
      stepNumber: testSteps.length + 1,
      stepName: `${stepToCopy.stepName}(副本)`
    };
    setTestSteps([...testSteps, newStep]);
  };

  const deleteStep = (index: number) => {
    const newSteps = testSteps.filter((_, idx) => idx !== index);
    // 重新编号
    newSteps.forEach((step, idx) => {
      step.stepNumber = idx + 1;
    });
    setTestSteps(newSteps);
  };

  // 编辑步骤
  const startEditStep = (step: TestStep) => {
    setEditingStep(step.id);
    editForm.setFieldsValue({
      stepName: step.stepName,
      stepType: step.stepType,
      params: step.params,
      description: step.description,
      expectedResult: step.expectedResult
    });
  };

  const saveStepEdit = async () => {
    try {
      const values = await editForm.validateFields();
      setTestSteps(testSteps.map(step => 
        step.id === editingStep 
          ? { ...step, ...values }
          : step
      ));
      setEditingStep(null);
      message.success('步骤保存成功');
    } catch (error) {
      message.error('请填写完整信息');
    }
  };

  const cancelStepEdit = () => {
    setEditingStep(null);
    editForm.resetFields();
  };

  // 预览执行
  const handlePreviewExecution = () => {
    if (testSteps.length === 0) {
      message.warning('请先添加测试步骤');
      return;
    }
    setShowPreview(true);
  };

  // 提交创建
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // 这里应该调用API保存测试用例
      console.log('创建测试用例:', {
        ...values,
        testSteps: testSteps,
        stepCount: testSteps.length
      });
      
      message.success('测试用例创建成功！');
      router.push('/scenarios/intelligent-manual-testing');
    } catch (error) {
      message.error('请填写完整的用例信息');
    }
  };

  return (
    <Layout className="min-h-screen">
      <Header />
      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
                创建测试用例
              </Title>
              <Text type="secondary" style={{ fontSize: '14px' }}>
                填写测试用例信息并设计测试步骤
              </Text>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <Button 
                type="primary" 
                icon={<SaveOutlined />}
                onClick={handleSubmit}
                size="large"
                style={{ borderRadius: '6px' }}
              >
                创建用例
              </Button>
            </div>
          </div>

          {/* 表单区域 */}
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
            <Form
              form={form}
              layout="vertical"
            >
                {/* 基本信息 */}
                <div style={{ marginBottom: '32px' }}>
                  <Title level={4} style={{ marginBottom: '16px', color: '#1890ff' }}>
                    <FileTextOutlined /> 基本信息
                  </Title>
                  
                  <Form.Item
                    label="用例标题"
                    name="title"
                    rules={[{ required: true, message: '请输入用例标题' }]}
                  >
                    <Input placeholder="请输入测试用例标题" size="large" />
                  </Form.Item>

                  <Form.Item
                    label="用例描述"
                    name="description"
                    rules={[{ required: true, message: '请输入用例描述' }]}
                  >
                    <Input.TextArea 
                      rows={3} 
                      placeholder="请详细描述测试用例的目的和范围"
                    />
                  </Form.Item>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <Form.Item
                      label="测试类型"
                      name="testType"
                      rules={[{ required: true, message: '请选择测试类型' }]}
                      style={{ flex: 1 }}
                    >
                      <Select placeholder="选择测试类型" size="large">
                        <Option value="功能测试">功能测试</Option>
                        <Option value="性能测试">性能测试</Option>
                        <Option value="安全测试">安全测试</Option>
                        <Option value="兼容性测试">兼容性测试</Option>
                        <Option value="接口测试">接口测试</Option>
                        <Option value="UI测试">UI测试</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="优先级"
                      name="priority"
                      rules={[{ required: true, message: '请选择优先级' }]}
                      style={{ flex: 1 }}
                    >
                      <Select placeholder="选择优先级" size="large">
                        <Option value="P0">P0 - 最高</Option>
                        <Option value="P1">P1 - 高</Option>
                        <Option value="P2">P2 - 中</Option>
                        <Option value="P3">P3 - 低</Option>
                      </Select>
                    </Form.Item>
                  </div>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <Form.Item
                      label="所属模块"
                      name="module"
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="如：用户管理、订单系统等（可选）" size="large" />
                    </Form.Item>

                    <Form.Item
                      label="预计执行时间"
                      name="estimatedTime"
                      style={{ flex: 1 }}
                    >
                      <InputNumber
                        placeholder="分钟（可选）"
                        min={1}
                        size="large"
                        style={{ width: '100%' }}
                        addonAfter="分钟"
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* 人员信息 */}
                <div style={{ marginBottom: '32px' }}>
                  <Title level={4} style={{ marginBottom: '16px', color: '#1890ff' }}>
                    <UserOutlined /> 人员信息
                  </Title>
                  
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <Form.Item
                      label="创建人"
                      name="creator"
                      rules={[{ required: true, message: '请输入创建人' }]}
                      style={{ flex: 1 }}
                      initialValue="张三"
                    >
                      <Input placeholder="创建人姓名" size="large" />
                    </Form.Item>

                    <Form.Item
                      label="指派给"
                      name="assignee"
                      rules={[{ required: true, message: '请输入执行人' }]}
                      style={{ flex: 1 }}
                      initialValue="李四"
                    >
                      <Input placeholder="执行人姓名" size="large" />
                    </Form.Item>
                  </div>
                </div>

                {/* 环境信息 */}
                <div style={{ marginBottom: '32px' }}>
                  <Title level={4} style={{ marginBottom: '16px', color: '#1890ff' }}>
                    <SettingOutlined /> 环境信息
                  </Title>
                  
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <Form.Item
                      label="测试环境"
                      name="environment"
                      rules={[{ required: true, message: '请输入测试环境' }]}
                      style={{ flex: 1 }}
                      initialValue="测试环境"
                    >
                      <Select placeholder="选择测试环境" size="large">
                        <Option value="开发环境">开发环境</Option>
                        <Option value="测试环境">测试环境</Option>
                        <Option value="预发布环境">预发布环境</Option>
                        <Option value="生产环境">生产环境</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="版本号"
                      name="version"
                      rules={[{ required: true, message: '请输入版本号' }]}
                      style={{ flex: 1 }}
                      initialValue="v1.0.0"
                    >
                      <Input placeholder="如：v1.0.0" size="large" />
                    </Form.Item>
                  </div>
                </div>

                {/* 前置条件 */}
                <div>
                  <Form.Item
                    label="前置条件"
                    name="preconditions"
                  >
                    <Input.TextArea
                      rows={3}
                      placeholder="执行此测试用例前需要满足的条件（可选）"
                    />
                  </Form.Item>
                </div>
            </Form>
          </div>

          {/* 测试步骤Section */}
          <div style={{ background: 'white', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '24px' }}>
              {/* 左侧测试步骤区域 */}
              <div style={{ flex: 1, padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
                    <CheckCircleOutlined style={{ marginRight: '8px' }} />
                    测试步骤
                  </Title>
                  <Space>
                    <Button
                      icon={<EyeOutlined />}
                      onClick={handlePreviewExecution}
                      disabled={testSteps.length === 0}
                    >
                      预览执行
                    </Button>
                    <Button
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={() => addStep()}
                    >
                      添加步骤
                    </Button>
                  </Space>
                </div>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  style={{
                    minHeight: '300px',
                    border: testSteps.length === 0 ? '2px dashed #d9d9d9' : '1px solid #f0f0f0',
                    borderRadius: '6px',
                    padding: testSteps.length === 0 ? '40px' : '16px',
                    textAlign: testSteps.length === 0 ? 'center' : 'left',
                    color: testSteps.length === 0 ? '#999' : 'inherit',
                    background: testSteps.length === 0 ? '#fafafa' : 'white'
                  }}
                >
                  {testSteps.length === 0 ? (
                    <div>
                      <Text type="secondary">
                        拖拽右侧步骤类型到此处，或点击"添加步骤"按钮
                      </Text>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {testSteps.map((step, index) => (
                        <div key={step.id}>
                          {/* 步骤列表项 */}
                          <div
                            style={{
                              border: '1px solid #e8e8e8',
                              borderRadius: '6px',
                              padding: '16px',
                              background: editingStep === step.id ? '#f0f9ff' : 'white',
                              cursor: 'pointer'
                            }}
                            onClick={() => editingStep !== step.id && startEditStep(step)}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ flex: 1, display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <Text strong style={{ minWidth: '60px' }}>
                                  步骤 {step.stepNumber}
                                </Text>
                                <div style={{ flex: 1 }}>
                                  <Text strong>{step.stepName}</Text>
                                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                                    类型: {step.stepType} | 参数: {step.params}
                                  </div>
                                </div>
                              </div>

                              <Space size="small">
                                <Button
                                  type="text"
                                  icon={<ArrowUpOutlined />}
                                  size="small"
                                  disabled={index === 0}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    moveStep(index, 'up');
                                  }}
                                  title="上移"
                                />
                                <Button
                                  type="text"
                                  icon={<ArrowDownOutlined />}
                                  size="small"
                                  disabled={index === testSteps.length - 1}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    moveStep(index, 'down');
                                  }}
                                  title="下移"
                                />
                                <Button
                                  type="text"
                                  icon={<EyeInvisibleOutlined />}
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // TODO: 实现跳过功能
                                  }}
                                  title="跳过"
                                />
                                <Button
                                  type="text"
                                  icon={<CopyOutlined />}
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    copyStep(index);
                                  }}
                                  title="复制"
                                />
                                <Button
                                  type="text"
                                  icon={<EditOutlined />}
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startEditStep(step);
                                  }}
                                  title="编辑"
                                />
                                <Button
                                  type="text"
                                  icon={<DeleteOutlined />}
                                  size="small"
                                  danger
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteStep(index);
                                  }}
                                  title="删除"
                                />
                              </Space>
                            </div>
                          </div>

                          {/* 步骤编辑详情 */}
                          {editingStep === step.id && (
                            <Card
                              size="small"
                              style={{
                                marginTop: '8px',
                                border: '2px solid #1890ff',
                                borderRadius: '6px'
                              }}
                              title="编辑步骤详情"
                              extra={
                                <Space>
                                  <Button size="small" onClick={cancelStepEdit}>
                                    取消编辑
                                  </Button>
                                  <Button type="primary" size="small" onClick={saveStepEdit}>
                                    保存编辑
                                  </Button>
                                </Space>
                              }
                            >
                              <Form form={editForm} layout="vertical">
                                <div style={{ display: 'flex', gap: '12px' }}>
                                  <Form.Item
                                    label="步骤名称"
                                    name="stepName"
                                    rules={[{ required: true, message: '请输入步骤名称' }]}
                                    style={{ flex: 1 }}
                                  >
                                    <Input placeholder="步骤名称" />
                                  </Form.Item>
                                  <Form.Item
                                    label="步骤类型"
                                    name="stepType"
                                    rules={[{ required: true, message: '请选择步骤类型' }]}
                                    style={{ flex: 1 }}
                                  >
                                    <Select placeholder="选择步骤类型">
                                      {stepTypeLibrary.map(type => (
                                        <Option key={type.id} value={type.name}>
                                          {type.name} - {type.description}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </div>

                                <Form.Item
                                  label="参数（目标URL）"
                                  name="params"
                                  rules={[{ required: true, message: '请输入参数' }]}
                                >
                                  <Input placeholder="输入参数，如URL、元素选择器等" />
                                </Form.Item>

                                <Form.Item
                                  label="步骤描述"
                                  name="description"
                                >
                                  <Input.TextArea
                                    rows={2}
                                    placeholder="详细描述此步骤的操作内容"
                                  />
                                </Form.Item>

                                <Form.Item
                                  label="预期结果"
                                  name="expectedResult"
                                >
                                  <Input.TextArea
                                    rows={2}
                                    placeholder="描述执行此步骤后的预期结果"
                                  />
                                </Form.Item>
                              </Form>
                            </Card>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 右侧步骤类型库 */}
              <div style={{ width: '320px', padding: '24px', borderLeft: '1px solid #f0f0f0' }}>
                <div style={{ marginBottom: '16px' }}>
                  <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
                    步骤类型库
                  </Title>
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '4px' }}>
                    拖拽到左侧添加步骤
                  </Text>
                </div>

                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                
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
          </div>

          {/* 预览执行Modal */}
          <Modal
            title="预览测试步骤执行"
            open={showPreview}
            onCancel={() => setShowPreview(false)}
            width={800}
            footer={[
              <Button key="close" onClick={() => setShowPreview(false)}>
                关闭
              </Button>
            ]}
          >
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {testSteps.map((step, index) => (
                <div key={step.id} style={{
                  marginBottom: '16px',
                  padding: '16px',
                  border: '1px solid #f0f0f0',
                  borderRadius: '6px',
                  background: '#fafafa'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#1890ff',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      marginRight: '12px'
                    }}>
                      {step.stepNumber}
                    </div>
                    <Text strong style={{ fontSize: '16px' }}>{step.stepName}</Text>
                  </div>

                  <div style={{ marginLeft: '36px' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>步骤类型：</Text>
                      <Text code>{step.stepType}</Text>
                    </div>

                    <div style={{ marginBottom: '8px' }}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>参数：</Text>
                      <Text>{step.params}</Text>
                    </div>

                    {step.description && (
                      <div style={{ marginBottom: '8px' }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>描述：</Text>
                        <Text>{step.description}</Text>
                      </div>
                    )}

                    {step.expectedResult && (
                      <div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>预期结果：</Text>
                        <Text>{step.expectedResult}</Text>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {testSteps.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                  暂无测试步骤
                </div>
              )}
            </div>
          </Modal>
        </div>
      </Content>
    </Layout>
  );
};

export default CreateTestCasePage;
