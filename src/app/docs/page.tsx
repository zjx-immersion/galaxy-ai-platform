'use client';

import React from 'react';
import { Layout, Typography, Card, Row, Col, List, Tag } from 'antd';
import {
  FileTextOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  ApiOutlined,
  SettingOutlined,
  BulbOutlined
} from '@ant-design/icons';
import Header from '@/components/layout/Header';
import SiteFooter from '@/components/layout/Footer';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

// 文档分类数据
const docCategories = [
  {
    title: '快速开始',
    icon: <BulbOutlined />,
    color: '#52c41a',
    docs: [
      { title: '平台介绍', description: '了解Galaxy AI Platform的核心功能和特性' },
      { title: '快速上手', description: '5分钟快速体验平台主要功能' },
      { title: '环境配置', description: '本地开发环境搭建指南' }
    ]
  },
  {
    title: '用户指南',
    icon: <BookOutlined />,
    color: '#1890ff',
    docs: [
      { title: 'AI需求自动化使用指南', description: '如何使用AI自动生成和管理需求' },
      { title: '智能测试执行指南', description: '测试用例管理和执行的完整流程' },
      { title: '代码分析工具使用', description: 'AI代码分析功能的详细说明' }
    ]
  },
  {
    title: 'API文档',
    icon: <ApiOutlined />,
    color: '#722ed1',
    docs: [
      { title: 'REST API参考', description: '完整的API接口文档和示例' },
      { title: 'SDK使用指南', description: '各语言SDK的集成和使用方法' },
      { title: 'Webhook配置', description: '事件通知和回调配置说明' }
    ]
  },
  {
    title: '配置管理',
    icon: <SettingOutlined />,
    color: '#fa8c16',
    docs: [
      { title: '系统配置', description: '平台系统级配置参数说明' },
      { title: '权限管理', description: '用户权限和角色管理配置' },
      { title: '集成配置', description: '第三方系统集成配置指南' }
    ]
  },
  {
    title: '常见问题',
    icon: <QuestionCircleOutlined />,
    color: '#eb2f96',
    docs: [
      { title: 'FAQ', description: '用户常见问题和解决方案' },
      { title: '故障排查', description: '常见问题的诊断和解决方法' },
      { title: '性能优化', description: '平台性能优化建议和最佳实践' }
    ]
  },
  {
    title: '更新日志',
    icon: <FileTextOutlined />,
    color: '#13c2c2',
    docs: [
      { title: '版本更新记录', description: '平台版本更新历史和新功能介绍' },
      { title: '已知问题', description: '当前版本已知问题和解决进度' },
      { title: '路线图', description: '平台功能发展规划和时间表' }
    ]
  }
];

const DocsPage: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* 页面标题 */}
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <Title level={1} style={{ margin: '0 0 16px 0', color: '#2d5a4a' }}>
              文档中心
            </Title>
            <Paragraph style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              完整的平台使用指南、API文档和最佳实践
            </Paragraph>
          </div>

          {/* 文档分类网格 */}
          <Row gutter={[24, 24]}>
            {docCategories.map((category, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card
                  hoverable
                  style={{ height: '100%' }}
                  styles={{ body: { padding: '24px' } }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* 分类标题 */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                      <div 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          width: '40px', 
                          height: '40px', 
                          backgroundColor: `${category.color}15`,
                          borderRadius: '8px',
                          marginRight: '12px'
                        }}
                      >
                        <span style={{ fontSize: '20px', color: category.color }}>
                          {category.icon}
                        </span>
                      </div>
                      <Title level={4} style={{ margin: 0, color: category.color }}>
                        {category.title}
                      </Title>
                    </div>

                    {/* 文档列表 */}
                    <List
                      size="small"
                      dataSource={category.docs}
                      renderItem={(doc) => (
                        <List.Item style={{ padding: '8px 0', border: 'none' }}>
                          <div style={{ width: '100%' }}>
                            <div style={{ 
                              fontWeight: 500, 
                              marginBottom: '4px',
                              color: '#333',
                              cursor: 'pointer'
                            }}>
                              {doc.title}
                            </div>
                            <div style={{ 
                              fontSize: '12px', 
                              color: '#666',
                              lineHeight: '1.4'
                            }}>
                              {doc.description}
                            </div>
                          </div>
                        </List.Item>
                      )}
                    />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* 底部提示 */}
          <div style={{ 
            marginTop: '48px', 
            padding: '24px', 
            backgroundColor: '#fff', 
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid #e8e8e8'
          }}>
            <Title level={4} style={{ color: '#2d5a4a', marginBottom: '8px' }}>
              需要帮助？
            </Title>
            <Paragraph style={{ color: '#666', marginBottom: '16px' }}>
              如果您在使用过程中遇到问题，可以通过以下方式获取支持
            </Paragraph>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <Tag color="blue" style={{ padding: '4px 12px', fontSize: '14px' }}>
                📧 support@galaxy-ai.com
              </Tag>
              <Tag color="green" style={{ padding: '4px 12px', fontSize: '14px' }}>
                💬 在线客服
              </Tag>
              <Tag color="orange" style={{ padding: '4px 12px', fontSize: '14px' }}>
                📞 400-123-4567
              </Tag>
            </div>
          </div>
        </div>
      </Content>
      <SiteFooter />
    </Layout>
  );
};

export default DocsPage;
