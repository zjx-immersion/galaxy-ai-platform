"use client";

import React from "react";
import Link from "next/link";
import { Typography, Card } from "antd";
import { CodeOutlined, ExperimentOutlined, BulbOutlined, BranchesOutlined, HourglassOutlined, BugOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

// 核心场景列表（按你的描述优化了简介文案）
const features = [
  {
    iconBg: "bg-blue-100 text-blue-600",
    icon: <BranchesOutlined />,
    title: "AI历史需求追溯",
    desc: "基于工程代码按功能维度自动梳理演进，跨仓库关联提交与需求，重构历史上下文，解决因需求缺失造成的断层。",
  },
  {
    iconBg: "bg-green-100 text-green-600",
    icon: <BulbOutlined />,
    title: "AI需求自动化",
    desc: "从需求文档解析生成符合银河规范的EPIC与任务，智能推荐优先级与关联关系，并按成熟度模型自动评估质量。",
    href: "/scenarios/ai-req-automation/mock-board",
  },
  {
    iconBg: "bg-purple-100 text-purple-600",
    icon: <CodeOutlined />,
    title: "AI辅助代码分析",
    desc: "结合需求与代码上下文进行设计、规范与质量预检，生成PR/代码审查计划，给出重点审查项与检查清单。",
  },
  {
    iconBg: "bg-orange-100 text-orange-600",
    icon: <ExperimentOutlined />,
    title: "AI赋能精准测试",
    desc: "理解代码Diff与影响范围，自动生成精准测试用例与测试计划，并根据改动调整现有用例优先级。",
  },
  {
    iconBg: "bg-red-100 text-red-600",
    icon: <BugOutlined />,
    title: "智能化手工测试",
    desc: "AI驱动的测试用例管理与执行，智能生成测试用例，自动化测试流程，提升测试效率和质量。",
    href: "/scenarios/intelligent-manual-testing",
  },
];

  // 为不同卡片设置顶部色，可按需扩展；默认使用主题绿
  const cardColors = ['#2d5a4a', '#4a7c59', '#5a9b8a', '#2d5a4a', '#9aa7ad'];


const CoreScenarios: React.FC = () => {


  return (
    <section className="py-14 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
                 style={{
                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                 }}>
              <div className="w-5 h-5 bg-white rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 rounded-sm"
                     style={{
                       background: 'linear-gradient(45deg, #667eea, #764ba2)',
                     }} />
              </div>
            </div>
            <Title level={2} className="mb-0 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              核心AI场景
            </Title>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>
          <Paragraph className="text-center text-gray-600 text-lg max-w-2xl mx-auto">
            为特定研发流程打造的场景化 AI 能力，提升开发效率和质量
          </Paragraph>
        </div>
        {/* 三列两行网格：最多6张卡片；不足填充空白占位以保持对齐 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.slice(0, 6).map((f, idx) => (
            <div key={idx} className="group">
              <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                {/* 渐变背景装饰 */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                     style={{
                       background: `linear-gradient(135deg, ${cardColors[idx % cardColors.length]}, ${cardColors[(idx + 1) % cardColors.length]})`,
                       borderRadius: '0 0 0 100%'
                     }} />

                <Link href={f.href || '#'} className="block no-underline text-inherit">
                  <div className="relative p-6 flex flex-col">
                    {/* 头部：统一高度，标题水平线对齐 */}
                    <div className="flex items-center gap-3 h-12 mb-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                           style={{
                             background: `linear-gradient(135deg, ${cardColors[idx % cardColors.length]}, ${cardColors[(idx + 1) % cardColors.length]})`,
                           }}>
                        <span className="text-white text-xl">{f.icon}</span>
                      </div>
                      <div className="flex-1">
                        <Title level={4} className="mb-0 group-hover:text-gray-900 transition-colors duration-300">
                          {f.title}
                        </Title>
                        <div className="w-8 h-0.5 mt-1 rounded-full"
                             style={{
                               background: `linear-gradient(90deg, ${cardColors[idx % cardColors.length]}, transparent)`,
                             }} />
                      </div>
                    </div>

                    {/* 简介：强制只显示两行，不提供展开（AntD ellipsis + CSS 双重兜底）*/}
                    <Paragraph
                      className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                      ellipsis={{ rows: 2 }}
                      style={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        margin: 0,
                        marginBottom: '16px',
                      }}
                    >
                      {f.desc}
                    </Paragraph>

                    {/* AI状态指示器 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-gray-500 font-medium">AI就绪</span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                             style={{
                               background: `linear-gradient(135deg, ${cardColors[idx % cardColors.length]}20, ${cardColors[(idx + 1) % cardColors.length]}20)`,
                             }}>
                          <span className="text-xs">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
          {/* 若不足6张，渲染空白占位，保证两行三列对齐 */}
          {Array.from({ length: Math.max(0, 6 - features.length) }).map((_, i) => (
            <div key={`placeholder-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreScenarios;

