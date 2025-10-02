'use client';

import React from 'react';
import { Layout, Typography, Card, Row, Col, Avatar, Button, Tag, Statistic } from 'antd';
import { useAIAssistantLayout } from '@/hooks/useAIAssistantLayout';
import {
  UserOutlined,
  TeamOutlined,
  CrownOutlined,
  StarOutlined,
  TrophyOutlined,
  CalendarOutlined,
  SettingOutlined,
  EditOutlined
} from '@ant-design/icons';
import Header from '@/components/layout/Header';
import SiteFooter from '@/components/layout/Footer';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const UsersPage: React.FC = () => {
  // 使用AI助手布局适应Hook
  const { getContentStyle } = useAIAssistantLayout();

  // 模拟用户数据
  const currentUser = {
    name: 'Galaxy001',
    email: 'galaxy001@company.com',
    role: '高级开发工程师',
    department: '研发中心',
    joinDate: '2023-06-15',
    avatar: null,
    level: 'VIP',
    points: 2580,
    completedTasks: 156,
    activeProjects: 8
  };

  const userStats = [
    { title: '积分总数', value: currentUser.points, icon: <StarOutlined />, color: '#faad14' },
    { title: '完成任务', value: currentUser.completedTasks, icon: <TrophyOutlined />, color: '#52c41a' },
    { title: '活跃项目', value: currentUser.activeProjects, icon: <TeamOutlined />, color: '#1890ff' },
    { title: '使用天数', value: 128, icon: <CalendarOutlined />, color: '#722ed1' }
  ];

  const recentActivities = [
    { action: '完成了需求分析任务', time: '2小时前', type: 'success' },
    { action: '创建了新的测试用例', time: '4小时前', type: 'info' },
    { action: '参与了代码审查', time: '1天前', type: 'processing' },
    { action: '更新了项目文档', time: '2天前', type: 'default' },
    { action: '提交了Bug修复', time: '3天前', type: 'success' }
  ];

  const achievements = [
    { title: '需求专家', description: '完成100个需求分析任务', icon: '🎯', earned: true },
    { title: '测试大师', description: '执行500个测试用例', icon: '🧪', earned: true },
    { title: '代码守护者', description: '参与50次代码审查', icon: '🛡️', earned: false },
    { title: '文档达人', description: '编写10万字技术文档', icon: '📚', earned: false }
  ];

  return (
    <Layout className="min-h-screen">
      <Header />
      <Content style={getContentStyle({ padding: '24px', background: '#f5f5f5' })}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* 用户信息卡片 */}
          <Card style={{ marginBottom: '24px' }}>
            <Row gutter={24} align="middle">
              <Col xs={24} sm={6} style={{ textAlign: 'center', marginBottom: '16px' }}>
                <Avatar 
                  size={120} 
                  icon={<UserOutlined />} 
                  style={{ backgroundColor: '#2d5a4a', marginBottom: '16px' }}
                />
                <div>
                  <Title level={3} style={{ margin: '0 0 8px 0' }}>
                    {currentUser.name}
                  </Title>
                  <Tag color="gold" icon={<CrownOutlined />}>
                    {currentUser.level} 用户
                  </Tag>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div style={{ marginBottom: '16px' }}>
                  <Paragraph style={{ margin: '8px 0', fontSize: '16px' }}>
                    <strong>邮箱：</strong>{currentUser.email}
                  </Paragraph>
                  <Paragraph style={{ margin: '8px 0', fontSize: '16px' }}>
                    <strong>职位：</strong>{currentUser.role}
                  </Paragraph>
                  <Paragraph style={{ margin: '8px 0', fontSize: '16px' }}>
                    <strong>部门：</strong>{currentUser.department}
                  </Paragraph>
                  <Paragraph style={{ margin: '8px 0', fontSize: '16px' }}>
                    <strong>加入时间：</strong>{currentUser.joinDate}
                  </Paragraph>
                </div>
              </Col>
              <Col xs={24} sm={6} style={{ textAlign: 'right' }}>
                <Button type="primary" icon={<EditOutlined />} style={{ marginBottom: '8px', width: '100%' }}>
                  编辑资料
                </Button>
                <Button icon={<SettingOutlined />} style={{ width: '100%' }}>
                  账户设置
                </Button>
              </Col>
            </Row>
          </Card>

          {/* 统计数据 */}
          <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
            {userStats.map((stat, index) => (
              <Col xs={12} sm={6} key={index}>
                <Card>
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    prefix={
                      <span style={{ color: stat.color, fontSize: '20px' }}>
                        {stat.icon}
                      </span>
                    }
                    valueStyle={{ color: stat.color }}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={[24, 24]}>
            {/* 最近活动 */}
            <Col xs={24} lg={12}>
              <Card title="最近活动" style={{ height: '400px' }}>
                <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                  {recentActivities.map((activity, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      padding: '12px 0',
                      borderBottom: index < recentActivities.length - 1 ? '1px solid #f0f0f0' : 'none'
                    }}>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%',
                        backgroundColor: activity.type === 'success' ? '#52c41a' : 
                                       activity.type === 'info' ? '#1890ff' :
                                       activity.type === 'processing' ? '#faad14' : '#d9d9d9',
                        marginRight: '12px',
                        flexShrink: 0
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, marginBottom: '4px' }}>
                          {activity.action}
                        </div>
                        <div style={{ fontSize: '12px', color: '#999' }}>
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* 成就徽章 */}
            <Col xs={24} lg={12}>
              <Card title="成就徽章" style={{ height: '400px' }}>
                <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                  <Row gutter={[16, 16]}>
                    {achievements.map((achievement, index) => (
                      <Col xs={24} sm={12} key={index}>
                        <div style={{ 
                          padding: '16px',
                          border: '1px solid #f0f0f0',
                          borderRadius: '8px',
                          textAlign: 'center',
                          opacity: achievement.earned ? 1 : 0.5,
                          backgroundColor: achievement.earned ? '#f6ffed' : '#fafafa'
                        }}>
                          <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                            {achievement.icon}
                          </div>
                          <div style={{ 
                            fontWeight: 500, 
                            marginBottom: '4px',
                            color: achievement.earned ? '#52c41a' : '#999'
                          }}>
                            {achievement.title}
                          </div>
                          <div style={{ 
                            fontSize: '12px', 
                            color: '#666',
                            lineHeight: '1.4'
                          }}>
                            {achievement.description}
                          </div>
                          {achievement.earned && (
                            <Tag color="success" size="small" style={{ marginTop: '8px' }}>
                              已获得
                            </Tag>
                          )}
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <SiteFooter />
    </Layout>
  );
};

export default UsersPage;
