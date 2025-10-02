'use client';

import React from 'react';
import { Layout, Typography, Card, Row, Col } from 'antd';
import { useRouter } from 'next/navigation';
import { useAIAssistantLayout } from '@/hooks/useAIAssistantLayout';
import {
  BranchesOutlined,
  BulbOutlined,
  CodeOutlined,
  ExperimentOutlined,
  BugOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import Header from '@/components/layout/Header';
import SiteFooter from '@/components/layout/Footer';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

// 场景数据
const scenarios = [
  {
    id: 'ai-history-tracing',
    title: 'AI历史需求追溯',
    description: '基于工程代码按功能维度自动梳理演进，跨仓库关联提交与需求，重构历史上下文，解决因需求缺失造成的断层。',
    icon: <BranchesOutlined />,
    iconBg: 'bg-blue-100 text-blue-600',
    status: '开发中',
    href: '#'
  },
  {
    id: 'ai-req-automation',
    title: 'AI需求自动化',
    description: '从需求文档解析生成符合银河规范的EPIC与任务，智能推荐优先级与关联关系，并按成熟度模型自动评估质量。',
    icon: <BulbOutlined />,
    iconBg: 'bg-green-100 text-green-600',
    status: '可用',
    href: '/scenarios/ai-req-automation/mock-board'
  },
  {
    id: 'ai-code-analysis',
    title: 'AI辅助代码分析',
    description: '结合需求与代码上下文进行设计、规范与质量预检，生成PR/代码审查计划，给出重点审查项与检查清单。',
    icon: <CodeOutlined />,
    iconBg: 'bg-purple-100 text-purple-600',
    status: '开发中',
    href: '#'
  },
  {
    id: 'ai-precise-testing',
    title: 'AI赋能精准测试',
    description: '理解代码Diff与影响范围，自动生成精准测试用例与测试计划，并根据改动调整现有用例优先级。',
    icon: <ExperimentOutlined />,
    iconBg: 'bg-orange-100 text-orange-600',
    status: '开发中',
    href: '#'
  },
  {
    id: 'intelligent-manual-testing',
    title: '智能化手工测试',
    description: 'AI驱动的测试用例管理与执行，智能生成测试用例，自动化测试流程，提升测试效率和质量。',
    icon: <BugOutlined />,
    iconBg: 'bg-red-100 text-red-600',
    status: '可用',
    href: '/scenarios/intelligent-manual-testing'
  },
  {
    id: 'requirement-quality-assessment',
    title: '需求质量评估',
    description: '基于成熟度模型对需求文档进行智能评估，识别质量问题，提供改进建议。',
    icon: <FileTextOutlined />,
    iconBg: 'bg-cyan-100 text-cyan-600',
    status: '可用',
    href: '/scenarios/requirement-quality-assessment'
  }
];

const ScenariosPage: React.FC = () => {
  const router = useRouter();

  // 使用AI助手布局适应Hook
  const { getContentStyle } = useAIAssistantLayout();

  const handleScenarioClick = (scenario: any) => {
    if (scenario.href && scenario.href !== '#') {
      router.push(scenario.href);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '可用': return 'success';
      case '开发中': return 'processing';
      case '计划中': return 'default';
      default: return 'default';
    }
  };

  return (
    <Layout className="min-h-screen">
      <Header />
      <Content style={getContentStyle({ padding: '24px', background: '#f5f5f5' })}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* 页面标题 */}
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <Title level={1} style={{ margin: '0 0 16px 0', color: '#2d5a4a' }}>
              AI场景中心
            </Title>
            <Paragraph style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              为特定研发流程打造的场景化 AI 能力，提升开发效率和质量
            </Paragraph>
          </div>

          {/* 场景卡片网格 */}
          <Row gutter={[24, 24]}>
            {scenarios.map((scenario) => (
              <Col xs={24} sm={12} lg={8} key={scenario.id}>
                <Card
                  hoverable={scenario.href !== '#'}
                  style={{ 
                    height: '100%',
                    cursor: scenario.href !== '#' ? 'pointer' : 'default',
                    opacity: scenario.href === '#' ? 0.7 : 1
                  }}
                  onClick={() => handleScenarioClick(scenario)}
                  styles={{ body: { padding: '24px' } }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* 图标和标题 */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                      <div className={`flex items-center justify-center w-12 h-12 ${scenario.iconBg} rounded-lg mr-3`}>
                        <span style={{ fontSize: '20px' }}>{scenario.icon}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <Title level={4} style={{ margin: '0 0 4px 0' }}>
                          {scenario.title}
                        </Title>
                        <div>
                          <span 
                            style={{ 
                              padding: '2px 8px', 
                              borderRadius: '12px', 
                              fontSize: '12px',
                              backgroundColor: getStatusColor(scenario.status) === 'success' ? '#f6ffed' : 
                                             getStatusColor(scenario.status) === 'processing' ? '#e6f7ff' : '#fafafa',
                              color: getStatusColor(scenario.status) === 'success' ? '#52c41a' : 
                                     getStatusColor(scenario.status) === 'processing' ? '#1890ff' : '#999',
                              border: `1px solid ${getStatusColor(scenario.status) === 'success' ? '#b7eb8f' : 
                                                  getStatusColor(scenario.status) === 'processing' ? '#91d5ff' : '#d9d9d9'}`
                            }}
                          >
                            {scenario.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 描述 */}
                    <Paragraph 
                      style={{ 
                        color: '#666', 
                        lineHeight: '1.6',
                        flex: 1,
                        margin: 0
                      }}
                    >
                      {scenario.description}
                    </Paragraph>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
      <SiteFooter />
    </Layout>
  );
};

export default ScenariosPage;
