"use client";

import React from "react";
import { Typography, Row, Col, Card, Tag, Space, Button } from "antd";
import { StarFilled, EyeOutlined, BranchesOutlined, HeartOutlined, BookOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const FeaturedServers: React.FC = () => {
  const servers = [
    {
      title: "UX Pilot AI 服务器",
      stars: 892,
      views: 12,
      branches: 8,
      desc: "UX Pilot AI 官方提供上下文较短的服务器，提供 GPT 模型集成和接入 AI 对话能力，支持多种 AI 任务处理",
      tags: ["ai-工具", "python"],
    },
    {
      title: "智能网络爬虫引擎",
      stars: 678,
      views: 12,
      branches: 5,
      desc: "专为大规模爬取设计的智能网络爬虫引擎，提供数据提取、内容解析、格式化处理和自动爬取功能",
      tags: ["网络服务", "python"],
    },
    {
      title: "UX Pilot 智能助手",
      stars: 756,
      views: 12,
      branches: 8,
      desc: "UX Pilot 集成服务器，提供简易 AI 对话、代码分析、文档生成和高精度推理能力，适合专业开发者",
      tags: ["ai-工具", "node"],
    },
  ];

  return (
    <section className="py-14 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <Title level={2} className="mb-0">推荐服务器</Title>
          <Button type="link">查看全部</Button>
        </div>
        <Paragraph className="text-gray-600 mb-8">发现强大的服务器以增强您的AI工作流程</Paragraph>
        <Row gutter={[24, 24]}>
          {servers.map((s, idx) => (
            <Col xs={24} md={8} key={idx}>
              <Card hoverable>
                <div className="p-1">
                  <div className="flex items-center justify-between mb-3">
                    <Title level={4} className="mb-0">{s.title}</Title>
                    <div className="flex items-center text-gray-500">
                      <span className="mr-1">{s.stars}</span>
                      <StarFilled className="text-yellow-400" />
                    </div>
                  </div>
                  <div className="flex items-center mb-3 text-sm text-gray-500">
                    <div className="flex items-center mr-3"><EyeOutlined className="mr-1" />12</div>
                    <div className="flex items-center"><BranchesOutlined className="mr-1" />{s.branches}</div>
                  </div>
                  <Paragraph className="text-gray-600 text-sm mb-4">{s.desc}</Paragraph>
                  <div className="flex items-center justify-between">
                    <Space size="small">
                      {s.tags.map((t, i) => (
                        <Tag key={i}>{t}</Tag>
                      ))}
                    </Space>
                    <Space size="middle">
                      <Button type="text" icon={<HeartOutlined />} />
                      <Button type="text" icon={<BookOutlined />} />
                    </Space>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default FeaturedServers;

