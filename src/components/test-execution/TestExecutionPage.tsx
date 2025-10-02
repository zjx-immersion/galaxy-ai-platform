'use client';

import React from 'react';
import { 
  Card, 
  Button, 
  Select, 
  Checkbox, 
  InputNumber, 
  Progress, 
  Typography, 
  Space, 
  Divider,
  Image,
  List,
  Tag,
  Modal,
  message
} from 'antd';
import { 
  PlayCircleOutlined, 
  StopOutlined, 
  SettingOutlined,
  ReloadOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

// 模拟测试用例数据
const mockTestCases = [
  {
    id: 'TC001',
    title: '用户登录功能测试',
    description: '测试用户登录的完整流程',
    stepCount: 5,
    status: '待测试'
  },
  {
    id: 'TC002', 
    title: '商品搜索功能测试',
    description: '测试商品搜索和筛选功能',
    stepCount: 8,
    status: '待测试'
  },
  {
    id: 'TC003',
    title: '购物车功能测试', 
    description: '测试添加商品到购物车的流程',
    stepCount: 6,
    status: '待测试'
  }
];

// 执行日志数据类型
interface ExecutionLog {
  id: string;
  timestamp: string;
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
  stepNumber?: number;
}

// 截图历史数据类型
interface ScreenshotHistory {
  id: string;
  stepNumber: number;
  stepName: string;
  timestamp: string;
  imageUrl: string;
  status: 'success' | 'failed' | 'warning';
}

const TestExecutionPage: React.FC = () => {
  // 状态管理
  const [selectedTestCases, setSelectedTestCases] = React.useState<string[]>([]);
  const [executionMode, setExecutionMode] = React.useState<'headless' | 'browser'>('browser');
  const [isExecuting, setIsExecuting] = React.useState(false);
  const [pageTimeout, setPageTimeout] = React.useState(30);
  const [operationTimeout, setOperationTimeout] = React.useState(10);
  const [executionProgress, setExecutionProgress] = React.useState(0);
  const [executionLogs, setExecutionLogs] = React.useState<ExecutionLog[]>([]);
  const [currentScreenshot, setCurrentScreenshot] = React.useState<string>('');
  const [screenshotHistory, setScreenshotHistory] = React.useState<ScreenshotHistory[]>([]);
  const [previewImage, setPreviewImage] = React.useState<string>('');

  // 开始执行
  const handleStartExecution = () => {
    if (selectedTestCases.length === 0) {
      message.warning('请先选择要执行的测试用例');
      return;
    }
    
    setIsExecuting(true);
    setExecutionProgress(0);
    setExecutionLogs([]);
    setScreenshotHistory([]);
    
    // 添加开始执行日志
    const startLog: ExecutionLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      level: 'info',
      message: `开始执行 ${selectedTestCases.length} 个测试用例，执行模式：${executionMode === 'headless' ? '无头模式' : '浏览器模式'}`
    };
    setExecutionLogs([startLog]);
    
    // 模拟执行过程
    simulateExecution();
  };

  // 停止执行
  const handleStopExecution = () => {
    setIsExecuting(false);
    const stopLog: ExecutionLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      level: 'warning',
      message: '用户手动停止执行'
    };
    setExecutionLogs(prev => [...prev, stopLog]);
  };

  // 重置超时设置
  const handleResetTimeout = () => {
    setPageTimeout(30);
    setOperationTimeout(10);
    message.success('超时设置已重置为默认值');
  };

  // 模拟执行过程
  const simulateExecution = () => {
    let progress = 0;
    let stepCount = 0;

    // Mock截图数据 - 使用真实的网页截图示例
    const mockScreenshots = [
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
        stepName: '打开登录页面',
        description: '导航到用户登录页面'
      },
      {
        url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
        stepName: '输入用户名',
        description: '在用户名输入框中输入测试账号'
      },
      {
        url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
        stepName: '输入密码',
        description: '在密码输入框中输入密码'
      },
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
        stepName: '点击登录按钮',
        description: '点击登录按钮提交表单'
      },
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
        stepName: '验证登录成功',
        description: '检查是否成功跳转到首页'
      },
      {
        url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
        stepName: '搜索商品',
        description: '在搜索框中输入商品关键词'
      },
      {
        url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
        stepName: '查看搜索结果',
        description: '验证搜索结果页面显示正确'
      },
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80',
        stepName: '添加到购物车',
        description: '点击商品添加到购物车'
      }
    ];

    const interval = setInterval(() => {
      if (!isExecuting) {
        clearInterval(interval);
        return;
      }

      progress += Math.random() * 12 + 8; // 8-20的随机增长
      stepCount++;

      if (progress >= 100 || stepCount > mockScreenshots.length) {
        progress = 100;
        setExecutionProgress(progress);
        setIsExecuting(false);

        // 添加完成日志
        const completeLog: ExecutionLog = {
          id: `log_${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'success',
          message: '所有测试用例执行完成'
        };
        setExecutionLogs(prev => [...prev, completeLog]);

        clearInterval(interval);
        return;
      }

      setExecutionProgress(progress);

      // 获取当前步骤的mock数据
      const currentMockData = mockScreenshots[stepCount - 1] || mockScreenshots[0];

      // 添加执行日志
      const logs: ExecutionLog[] = [
        {
          id: `log_${Date.now()}_1`,
          timestamp: new Date().toLocaleTimeString(),
          level: 'info',
          message: `执行步骤 ${stepCount}: ${currentMockData.stepName}`,
          stepNumber: stepCount
        },
        {
          id: `log_${Date.now()}_2`,
          timestamp: new Date().toLocaleTimeString(),
          level: Math.random() > 0.85 ? 'warning' : 'success',
          message: `步骤 ${stepCount} ${Math.random() > 0.85 ? '执行完成但有警告' : '执行成功'}`,
          stepNumber: stepCount
        }
      ];

      setExecutionLogs(prev => [...prev, ...logs]);

      // 添加截图历史
      const screenshot: ScreenshotHistory = {
        id: `screenshot_${stepCount}`,
        stepNumber: stepCount,
        stepName: currentMockData.stepName,
        timestamp: new Date().toLocaleTimeString(),
        imageUrl: currentMockData.url,
        status: Math.random() > 0.9 ? 'failed' : Math.random() > 0.8 ? 'warning' : 'success'
      };

      setScreenshotHistory(prev => [...prev, screenshot]);
      setCurrentScreenshot(screenshot.imageUrl);

    }, 2500); // 稍微慢一点，让用户能看清楚截图变化
  };

  // 获取日志级别对应的颜色和图标
  const getLogLevelConfig = (level: ExecutionLog['level']) => {
    switch (level) {
      case 'success':
        return { color: '#52c41a', icon: <CheckCircleOutlined /> };
      case 'warning':
        return { color: '#faad14', icon: <ExclamationCircleOutlined /> };
      case 'error':
        return { color: '#ff4d4f', icon: <ExclamationCircleOutlined /> };
      default:
        return { color: '#1890ff', icon: <ClockCircleOutlined /> };
    }
  };

  return (
    <div style={{ display: 'flex', gap: '24px', height: 'calc(100vh - 200px)' }}>
      {/* 左侧操作区 */}
      <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* 用例选择 */}
        <Card title="测试用例选择" size="small">
          <div style={{ marginBottom: '16px' }}>
            <Checkbox.Group
              value={selectedTestCases}
              onChange={setSelectedTestCases}
              style={{ width: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                {mockTestCases.map(testCase => (
                  <Checkbox key={testCase.id} value={testCase.id} style={{ width: '100%' }}>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{testCase.title}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {testCase.description} ({testCase.stepCount} 步骤)
                      </div>
                    </div>
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </div>
          
          <Divider style={{ margin: '12px 0' }} />
          
          <div>
            <Text strong>执行模式：</Text>
            <Select
              value={executionMode}
              onChange={setExecutionMode}
              style={{ width: '100%', marginTop: '8px' }}
              disabled={isExecuting}
            >
              <Option value="browser">浏览器模式</Option>
              <Option value="headless">无头模式</Option>
            </Select>
          </div>
        </Card>

        {/* 执行控制 */}
        <Card title="执行控制" size="small">
          <Space style={{ width: '100%', justifyContent: 'center' }}>
            <Button
              type="primary"
              icon={<PlayCircleOutlined />}
              onClick={handleStartExecution}
              disabled={isExecuting}
              size="large"
            >
              开始执行
            </Button>
            <Button
              danger
              icon={<StopOutlined />}
              onClick={handleStopExecution}
              disabled={!isExecuting}
              size="large"
            >
              停止执行
            </Button>
          </Space>
        </Card>

        {/* 超时设置 */}
        <Card 
          title="超时设置" 
          size="small"
          extra={
            <Button 
              type="link" 
              icon={<ReloadOutlined />} 
              onClick={handleResetTimeout}
              size="small"
            >
              重置
            </Button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <Text>页面加载超时：</Text>
              <InputNumber
                value={pageTimeout}
                onChange={(value) => setPageTimeout(value || 30)}
                min={5}
                max={300}
                addonAfter="秒"
                style={{ width: '100%', marginTop: '4px' }}
                disabled={isExecuting}
              />
            </div>
            <div>
              <Text>操作超时：</Text>
              <InputNumber
                value={operationTimeout}
                onChange={(value) => setOperationTimeout(value || 10)}
                min={1}
                max={60}
                addonAfter="秒"
                style={{ width: '100%', marginTop: '4px' }}
                disabled={isExecuting}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* 右侧执行区域 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* 执行日志Section */}
        <Card 
          title="执行日志" 
          size="small"
          style={{ flex: 1 }}
          extra={
            isExecuting && <LoadingOutlined style={{ color: '#1890ff' }} />
          }
        >
          {/* 进度条 */}
          <div style={{ marginBottom: '16px' }}>
            <Progress 
              percent={Math.round(executionProgress)} 
              status={isExecuting ? 'active' : executionProgress === 100 ? 'success' : 'normal'}
              strokeColor={isExecuting ? '#1890ff' : '#52c41a'}
            />
          </div>
          
          {/* 日志列表 */}
          <div style={{ height: '150px', overflowY: 'auto', border: '1px solid #f0f0f0', borderRadius: '4px', padding: '8px' }}>
            {executionLogs.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
                暂无执行日志
              </div>
            ) : (
              <List
                size="small"
                dataSource={executionLogs}
                renderItem={(log) => {
                  const config = getLogLevelConfig(log.level);
                  return (
                    <List.Item style={{ padding: '4px 0', borderBottom: 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                        <span style={{ color: config.color }}>{config.icon}</span>
                        <Text style={{ fontSize: '12px', color: '#666' }}>{log.timestamp}</Text>
                        {log.stepNumber && (
                          <Tag size="small" color="blue">步骤{log.stepNumber}</Tag>
                        )}
                        <Text style={{ flex: 1, fontSize: '13px' }}>{log.message}</Text>
                      </div>
                    </List.Item>
                  );
                }}
              />
            )}
          </div>
        </Card>

        {/* 当前截图Section */}
        <Card title="当前截图" size="small" style={{ marginBottom: '16px' }}>
          <div style={{
            textAlign: 'center',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8f9fa',
            borderRadius: '6px',
            border: '1px solid #e9ecef'
          }}>
            {currentScreenshot ? (
              <Image
                src={currentScreenshot}
                alt="当前截图"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
                preview={{
                  mask: (
                    <div style={{
                      background: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <EyeOutlined />
                      <span>查看大图</span>
                    </div>
                  )
                }}
              />
            ) : (
              <div style={{
                color: '#999',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}>
                <EyeOutlined style={{ fontSize: '24px' }} />
                <span>暂无截图</span>
              </div>
            )}
          </div>
        </Card>

        {/* 步骤截图历史Section */}
        <Card title="步骤截图历史" size="small">
          <div style={{ height: '200px', overflowY: 'auto' }}>
            {screenshotHistory.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
                暂无历史截图
              </div>
            ) : (
              <List
                size="small"
                dataSource={screenshotHistory}
                renderItem={(screenshot) => (
                  <List.Item style={{
                    padding: '8px 0',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                      <div style={{ position: 'relative' }}>
                        <Image
                          src={screenshot.imageUrl}
                          alt={screenshot.stepName}
                          width={80}
                          height={60}
                          style={{
                            borderRadius: '4px',
                            cursor: 'pointer',
                            border: '1px solid #e9ecef',
                            objectFit: 'cover'
                          }}
                          preview={{
                            mask: (
                              <div style={{
                                background: 'rgba(0,0,0,0.6)',
                                color: 'white',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px'
                              }}>
                                <EyeOutlined />
                                <span>预览</span>
                              </div>
                            )
                          }}
                        />
                        {/* 状态指示器 */}
                        <div style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: screenshot.status === 'success' ? '#52c41a' :
                                     screenshot.status === 'failed' ? '#ff4d4f' : '#faad14',
                          border: '1px solid white',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                        }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <Text strong style={{ fontSize: '13px' }}>
                            步骤 {screenshot.stepNumber}
                          </Text>
                          <Tag
                            size="small"
                            color={screenshot.status === 'success' ? 'green' : screenshot.status === 'failed' ? 'red' : 'orange'}
                          >
                            {screenshot.status === 'success' ? '成功' : screenshot.status === 'failed' ? '失败' : '警告'}
                          </Tag>
                        </div>
                        <div style={{ marginBottom: '2px' }}>
                          <Text style={{ fontSize: '12px', color: '#333' }} ellipsis>
                            {screenshot.stepName}
                          </Text>
                        </div>
                        <Text style={{ fontSize: '11px', color: '#999' }}>
                          {screenshot.timestamp}
                        </Text>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TestExecutionPage;
