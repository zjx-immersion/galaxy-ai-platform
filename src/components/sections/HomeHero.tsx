"use client";

import React from "react";
import { Typography, Button, Row, Col } from "antd";
import {
  AppstoreOutlined,
  BulbOutlined,
  DownloadOutlined,
  UserOutlined,
  RocketOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const HomeHero: React.FC = () => {
  const stats = [
    { title: "服务器", value: 24, icon: <AppstoreOutlined /> },
    { title: "提示词模板", value: 17, icon: <BulbOutlined /> },
    { title: "下载量", value: 158060, icon: <DownloadOutlined /> },
    { title: "活跃用户", value: 2964, icon: <UserOutlined /> },
  ];

  return (
    <section className="text-white mt-3 md:mt-4">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* 内部容器使用渐变背景，避免整行充满 */}
        <div className="bg-gradient-to-r from-[#0a3142] to-[#006d77] border border-white/15">
          <div className="px-4 md:px-6 py-8 md:py-12">
            <Row gutter={[48, 24]} align="middle" justify="space-between">
              <Col xs={24} lg={13}>
                <div className="text-center lg:text-left">
                  <div className="space-y-3 md:space-y-4 lg:space-y-5">
                    <Title level={1} className="text-white text-3xl md:text-5xl" style={{ margin: 0, color: '#ffffff', lineHeight: 1.25 }}>
                      Galaxy AI平台
                    </Title>
                    <Title level={3} className="text-white/95 text-xl md:text-2xl" style={{ margin: 0, color: '#ffffff', lineHeight: 1.5 }}>
                      智能开发助手与工具中心
                    </Title>
                    <Paragraph className="text-white/90 text-base md:text-lg" style={{ maxWidth: 720, color: 'rgba(255,255,255,0.9)', lineHeight: 1.8 }}>
                      发现并分享强大的AI工具和模板，提升您的开发工作流程效率
                    </Paragraph>
                  </div>
                  <div className="mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                    <Button size="large" icon={<RocketOutlined />}
                            className="border-white text-white hover:bg-white/10 w-full sm:w-auto" ghost>
                      浏览服务器
                    </Button>
                    <Button size="large" icon={<ExperimentOutlined />}
                            className="border-white text-white hover:bg-white/10 w-full sm:w-auto" ghost>
                      探索提示词
                    </Button>
                  </div>
                </div>
              </Col>
              <Col xs={24} lg={11}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="grid grid-cols-2">
                    {stats.map((s, i) => (
                      <div key={i} className={`p-6 md:p-7 text-center ${i >= 2 ? "border-t border-white/15" : ""} ${i % 2 === 1 ? "border-l border-white/15" : ""}`}>
                        <div className="w-12 h-12 bg-white/15 text-white/90 text-2xl flex items-center justify-center mb-3 border border-white/25">
                          {s.icon}
                        </div>
                        <div className="text-2xl font-bold mb-1">
                          {typeof s.value === "number" && s.value > 1000 ? `${(s.value / 1000).toFixed(0)}k+` : s.value}
                        </div>
                        <div className="text-xs md:text-sm text-white/75 tracking-wide uppercase">{s.title}</div>
                      </div>
                    ))}
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

export default HomeHero;

