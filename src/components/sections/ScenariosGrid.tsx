"use client";

import React from "react";
import { Typography, Row, Col, Card } from "antd";
import { CodeOutlined, BulbOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const ScenariosGrid: React.FC = () => {
  const cards = [
    { title: "浏览服务器", desc: "发现强大的服务器以提升您的AI工作流程", icon: <CodeOutlined /> },
    { title: "探索提示词模板", desc: "寻找适用于各种用例的成熟提示词模板", icon: <BulbOutlined /> },
    { title: "发布内容", desc: "与社区分享您的服务器和提示词模板", icon: <PlusOutlined /> },
  ];

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Title level={2} className="text-center mb-1">场景</Title>
        <Paragraph className="text-center text-gray-600 mb-6 md:mb-10">从最受欢迎的功能开始使用</Paragraph>
        {/* 小屏横向滚动，md+ 网格 */}
        <div className="relative block md:hidden -mx-4 px-4">
          <div className="overflow-x-auto scrollbar-none">
            <div className="flex gap-4 min-w-[920px]">
              {cards.map((c, idx) => (
                <div key={idx} className="w-[280px] flex-shrink-0">
                  <Card className="h-full" variant="outlined">
                    <div className="text-center p-6">
                      <div className="flex justify-center mb-4 text-primary text-4xl">{c.icon}</div>
                      <Title level={4} className="mb-3">{c.title}</Title>
                      <Paragraph className="text-gray-600 mb-0">{c.desc}</Paragraph>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          {/* 箭头 */}
          <button aria-label="左" className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border px-2 py-1 text-gray-800">‹</button>
          <button aria-label="右" className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border px-2 py-1 text-gray-800">›</button>
          {/* 指示点 */}
          <div className="mt-4 flex justify-center gap-2">
            <span className="w-2 h-2 bg-gray-400"></span>
            <span className="w-2 h-2 bg-gray-300"></span>
            <span className="w-2 h-2 bg-gray-300"></span>
            <span className="w-2 h-2 bg-gray-300"></span>
          </div>
        </div>
        <Row gutter={[24, 24]} className="hidden md:flex">
          {cards.map((c, idx) => (
            <Col xs={24} md={8} key={idx}>
              <Card className="h-full" variant="outlined">
                <div className="text-center p-6">
                  <div className="flex justify-center mb-4 text-primary text-4xl">{c.icon}</div>
                  <Title level={4} className="mb-3">{c.title}</Title>
                  <Paragraph className="text-gray-600 mb-0">{c.desc}</Paragraph>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default ScenariosGrid;

