import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { GithubOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography as any;

const Footer: React.FC = () => {
  return (
    <AntFooter className="bg-[#0f2235] text-white mt-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Title level={4} className="text-white mb-3">Galaxy AI Platform</Title>
            <Text className="text-white/80 block">
              面向研发场景的AI工具平台，整合MCP、Agent、上下文、提示词、多任务、知识库等能力。
            </Text>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Title level={5} className="text-white mb-3">快速链接</Title>
            <ul className="space-y-2">
              <li><a className="text-white/80 hover:text-white" href="#">首页</a></li>
              <li><a className="text-white/80 hover:text-white" href="#">场景工具</a></li>
              <li><a className="text-white/80 hover:text-white" href="#">模板库</a></li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Title level={5} className="text-white mb-3">关注我们</Title>
            <Space size="large">
              <a aria-label="Github" className="text-white/80 hover:text-white text-xl" href="#"><GithubOutlined /></a>
              <a aria-label="Twitter" className="text-white/80 hover:text-white text-xl" href="#"><TwitterOutlined /></a>
              <a aria-label="LinkedIn" className="text-white/80 hover:text-white text-xl" href="#"><LinkedinOutlined /></a>
            </Space>
          </Col>
        </Row>
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/70 text-sm">© 2024 Galaxy AI Platform</div>
          <div className="text-white/70 text-sm">Created by Galaxy AI Team</div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;

