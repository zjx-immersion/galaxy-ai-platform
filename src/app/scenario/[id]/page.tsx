'use client';

import React from 'react';
import { Layout, Typography, Breadcrumb, Button, Row, Col, Card, Tag } from 'antd';
import { ArrowLeftOutlined, PlayCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/layout/Header';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

// 场景数据配置
const scenarioData = {
  'code-analysis': {
    title: '代码分析与优化',
    description: '通过AI驱动的代码分析工具，提升代码质量、发现潜在问题、优化性能，并提供智能重构建议。',
    category: '开发工具',
    tags: ['代码质量', '性能优化', '重构', 'AI分析'],
    tools: [
      {
        name: 'CodeReview AI',
        description: '智能代码审查工具，自动检测代码问题和安全漏洞',
        status: 'active'
      },
      {
        name: 'Performance Analyzer',
        description: '性能分析工具，识别性能瓶颈并提供优化建议',
        status: 'active'
      },
      {
        name: 'Refactor Assistant',
        description: '智能重构助手，提供代码重构建议和自动化重构',
        status: 'beta'
      }
    ]
  },
  'prompt-engineering': {
    title: '提示词工程',
    description: '专业的提示词设计与优化平台，提供各种场景的提示词模板和优化工具。',
    category: 'AI工具',
    tags: ['提示词', '模板', '优化', 'GPT'],
    tools: [
      {
        name: 'Prompt Builder',
        description: '可视化提示词构建器，支持模板化和参数化',
        status: 'active'
      },
      {
        name: 'Template Library',
        description: '丰富的提示词模板库，覆盖各种使用场景',
        status: 'active'
      },
      {
        name: 'Prompt Optimizer',
        description: '提示词效果优化工具，提升AI响应质量',
        status: 'active'
      }
    ]
  },
  'knowledge-management': {
    title: '知识库管理',
    description: '智能知识库管理系统，支持文档管理、知识图谱构建和智能检索。',
    category: '知识管理',
    tags: ['知识库', '文档管理', '智能检索', '知识图谱'],
    tools: [
      {
        name: 'Document Manager',
        description: '智能文档管理系统，支持多格式文档处理',
        status: 'active'
      },
      {
        name: 'Knowledge Graph',
        description: '知识图谱构建工具，可视化知识关系',
        status: 'beta'
      },
      {
        name: 'Smart Search',
        description: '智能搜索引擎，支持语义搜索和相关推荐',
        status: 'active'
      }
    ]
  },
  'agent-workflow': {
    title: 'Agent工作流',
    description: '构建和管理智能Agent工作流，实现复杂任务的自动化处理。',
    category: '自动化',
    tags: ['Agent', '工作流', '自动化', '任务编排'],
    tools: [
      {
        name: 'Workflow Designer',
        description: '可视化工作流设计器，拖拽式构建复杂流程',
        status: 'active'
      },
      {
        name: 'Agent Manager',
        description: 'Agent管理平台，监控和调度智能代理',
        status: 'active'
      },
      {
        name: 'Task Scheduler',
        description: '任务调度器，支持定时和事件触发执行',
        status: 'beta'
      }
    ]
  }
};

export default function ScenarioPage() {
  const router = useRouter();
  const params = useParams();
  const scenarioId = params.id as string;
  
  const scenario = scenarioData[scenarioId as keyof typeof scenarioData];

  if (!scenario) {
    return (
      <Layout className="min-h-screen">
        <Header />
        <Content className="p-6">
          <div className="text-center">
            <Title level={2}>场景未找到</Title>
            <Button type="primary" onClick={() => router.push('/')}>
              返回首页
            </Button>
          </div>
        </Content>
      </Layout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green';
      case 'beta': return 'orange';
      case 'coming-soon': return 'blue';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '可用';
      case 'beta': return '测试版';
      case 'coming-soon': return '即将推出';
      default: return status;
    }
  };

  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* 面包屑导航 */}
          <Breadcrumb className="mb-6">
            <Breadcrumb.Item>
              <Button 
                type="link" 
                icon={<ArrowLeftOutlined />} 
                onClick={() => router.push('/')}
                className="p-0"
              >
                首页
              </Button>
            </Breadcrumb.Item>
            <Breadcrumb.Item>场景工具</Breadcrumb.Item>
            <Breadcrumb.Item>{scenario.title}</Breadcrumb.Item>
          </Breadcrumb>

          {/* 场景头部信息 */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-2">
              <Title level={1} className="mb-0 mr-0 sm:mr-4 text-xl md:text-2xl lg:text-3xl">
                {scenario.title}
              </Title>
              <Tag color="blue">{scenario.category}</Tag>
            </div>
            <Paragraph className="text-base md:text-lg text-gray-600 mb-4">
              {scenario.description}
            </Paragraph>
            <div className="flex flex-wrap gap-2">
              {scenario.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>

          {/* 工具列表 */}
          <div>
            <Title level={2} className="mb-4 md:mb-6 text-lg md:text-xl lg:text-2xl">场景化工具集成</Title>
            <Row gutter={[16, 16]} className="md:gutter-24">
              {scenario.tools.map((tool, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <Card
                    className="h-full"
                    actions={[
                      <Button 
                        key="start" 
                        type="primary" 
                        icon={<PlayCircleOutlined />}
                        size="small"
                      >
                        开始使用
                      </Button>,
                      <Button 
                        key="config" 
                        icon={<SettingOutlined />}
                        size="small"
                      >
                        配置
                      </Button>
                    ]}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <Title level={4} className="mb-0">
                        {tool.name}
                      </Title>
                      <Tag color={getStatusColor(tool.status)}>
                        {getStatusText(tool.status)}
                      </Tag>
                    </div>
                    <Paragraph className="text-gray-600">
                      {tool.description}
                    </Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Content>
    </Layout>
  );
}
