import React from 'react';
import { Typography, Button, Row, Col } from 'antd';
import {
  RocketOutlined,
  ExperimentOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  DownloadOutlined,
  UserOutlined
} from '@ant-design/icons';
import { StatCard } from '@/components/ui';

const { Title, Paragraph } = Typography;

const HeroSection: React.FC = () => {
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
    <section className="text-white">
      <div className="mx-auto max-w-7xl">
        {/* 面板容器，保证与下方区域对齐且有足够留白 */}
        <div className="gradient-hero shadow-sm border border-white/10 overflow-hidden">
          <div className="px-6 md:px-10 lg:px-12 py-6 md:py-8 lg:py-10">
            <Row gutter={[48, 24]} justify="space-between" align="top" className="min-h-[320px] md:min-h-[420px] items-stretch">
              {/* 左侧内容 */}
              <Col xs={24} lg={13} xl={13}>
                <div className="h-full flex flex-col justify-between text-center lg:text-left lg:pr-8 xl:pr-12">
                  <div className="space-y-2 md:space-y-3">
                  <Title
                    level={1}
                    className="text-white mb-3 md:mb-4 text-3xl md:text-5xl leading-tight"
                    style={{ color: 'white', margin: 0, maxWidth: 760 }}
                  >
                    Galaxy AI Platform
                  </Title>
                  <Paragraph
                    className="text-base md:text-xl text-white/90 mb-3 md:mb-5"
                    style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '18px', maxWidth: 720 }}
                  >
                    AI工具平台 · 研发场景解决方案中心
                  </Paragraph>
                  <Paragraph
                    className="text-sm md:text-base text-white/80 mb-6 md:mb-8 leading-relaxed"
                    style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', maxWidth: 720 }}
                  >
                    集成MCP、Agent、上下文管理、提示词、多任务、知识库等工具，按场景整合能力，聚焦研发场景，面向问题提供端到端解决方案
                  </Paragraph>
                  </div>
                  <div className="mt-auto flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 md:gap-4">
                    <Button
                      type="primary"
                      size="large"
                      icon={<RocketOutlined />}
                      className="bg-white text-primary-green border-white hover:bg-gray-100 w-full sm:w-auto"
                    >
                      浏览场景工具
                    </Button>
                    <Button
                      size="large"
                      icon={<ExperimentOutlined />}
                      className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                      ghost
                    >
                      探索模板
                    </Button>
                  </div>
                </div>
              </Col>

              {/* 右侧统计指标（单个容器 + 分割线） */}
              <Col xs={24} lg={11} xl={11} className="mt-6 lg:mt-0">
                <div className="bg-white/10 backdrop-blur-sm border border-white/15 p-0 h-full">
                  <div className="grid grid-cols-2">
                    {stats.map((stat, index) => {
                      const top = index >= 2 ? 'border-t border-white/10' : '';
                      const left = index % 2 === 1 ? 'border-l border-white/10' : '';
                      return (
                        <div
                          key={index}
                          className={`p-6 md:p-7 flex flex-col items-center justify-center ${top} ${left}`}
                        >
                          <div className="w-12 h-12 bg-white/15 flex items-center justify-center text-white/90 text-2xl mb-3 border border-white/25">
                            {stat.icon}
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">
                            {typeof stat.value === 'number' && stat.value > 1000
                              ? `${(stat.value / 1000).toFixed(0)}k+`
                              : stat.value}
                          </div>
                          <div className="text-xs md:text-sm text-white/70 tracking-wide uppercase">
                            {stat.title}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
