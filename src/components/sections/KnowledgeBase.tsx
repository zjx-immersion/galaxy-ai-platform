"use client";

import React from "react";
import { Typography, Row, Col, Card } from "antd";
import { CodeOutlined, ClusterOutlined, RobotOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const KnowledgeBase: React.FC = () => {
  const items = [
    { title: "编程语言", desc: "各种编程语言的全面文档、最佳实践和示例", icon: <CodeOutlined /> },
    { title: "系统架构", desc: "设计模式、架构原则和系统设计文档", icon: <ClusterOutlined /> },
    { title: "AI模型训练", desc: "模型训练、微调和优化技术指南", icon: <RobotOutlined /> },
  ];

  return (
    <section className="py-14 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <Title level={2} className="mb-0">知识库</Title>
          <a className="text-[#006d77]">浏览全部</a>
        </div>
        <Paragraph className="text-gray-600 mb-8">访问专业知识库以增强您的AI应用</Paragraph>
        <Row gutter={[24, 24]}>
          {items.map((it, idx) => (
            <Col xs={24} md={12} lg={8} key={idx}>
              <Card variant="outlined">
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 mr-3">{it.icon}</div>
                    <Title level={4} className="mb-0">{it.title}</Title>
                  </div>
                  <Paragraph className="text-gray-600 mb-0">{it.desc}</Paragraph>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default KnowledgeBase;

