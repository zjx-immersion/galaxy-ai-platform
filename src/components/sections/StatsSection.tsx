import React from 'react';
import { Row, Col } from 'antd';
import { 
  AppstoreOutlined, 
  FileTextOutlined, 
  DownloadOutlined, 
  UserOutlined 
} from '@ant-design/icons';
import { StatCard } from '@/components/ui';

const StatsSection: React.FC = () => {
  const stats = [
    {
      title: 'AI工具',
      value: 24,
      icon: <AppstoreOutlined />,
    },
    {
      title: '场景模板',
      value: 17,
      icon: <FileTextOutlined />,
    },
    {
      title: '下载量',
      value: 158060,
      icon: <DownloadOutlined />,
    },
    {
      title: '活跃用户',
      value: 2964,
      icon: <UserOutlined />,
    },
  ];

  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <Row gutter={[16, 16]} justify="center">
          {stats.map((stat, index) => (
            <Col xs={12} sm={6} md={6} lg={6} key={index}>
              <StatCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
              />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default StatsSection;
