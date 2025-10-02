"use client";

import React from "react";
import { Typography, Button } from "antd";

const { Title, Paragraph } = Typography;

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-[#006d77] text-white text-center">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Title level={2} className="text-white mb-3">准备好提升您的开发工作流程了吗？</Title>
        <Paragraph className="text-white/90 mb-8 text-lg max-w-3xl mx-auto">
          加入我们的Galaxy AI平台，访问专为软件工程师设计的强大AI工具
        </Paragraph>
        <div className="flex justify-center gap-3 md:gap-4">
          <Button className="bg-white text-[#006d77] hover:bg-gray-100" size="large">开始使用</Button>
          <Button className="border-white text-white hover:bg-white/10" size="large" ghost>了解更多</Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

