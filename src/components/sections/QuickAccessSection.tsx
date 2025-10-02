import React from 'react';
import { Typography, Row, Col } from 'antd';
import { 
  CodeOutlined, 
  BulbOutlined, 
  DatabaseOutlined, 
  RobotOutlined 
} from '@ant-design/icons';
import { ScenarioCard } from '@/components/ui';

const { Title, Paragraph } = Typography;

interface QuickAccessSectionProps {
  onScenarioClick?: (scenarioId: string) => void;
}

const QuickAccessSection: React.FC<QuickAccessSectionProps> = ({ 
  onScenarioClick 
}) => {
  const scenarios = [
    {
      id: 'code-analysis',
      title: '代码分析与优化',
      description: '发现强大的代码分析工具，提升代码质量和开发效率',
      icon: <CodeOutlined />,
    },
    {
      id: 'prompt-engineering',
      title: '提示词工程',
      description: '探索各种用例的经过验证的提示词模板',
      icon: <BulbOutlined />,
    },
    {
      id: 'knowledge-management',
      title: '知识库管理',
      description: '与社区分享您的知识库和管理经验',
      icon: <DatabaseOutlined />,
    },
    {
      id: 'agent-workflow',
      title: 'Agent工作流',
      description: '构建和部署智能Agent，自动化复杂任务流程',
      icon: <RobotOutlined />,
    },
  ];

  const handleScenarioClick = (scenarioId: string) => {
    if (onScenarioClick) {
      onScenarioClick(scenarioId);
    }
  };

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <Title level={2} className="text-dark mb-4 text-xl md:text-2xl lg:text-3xl">
            研发场景
          </Title>
          <Paragraph className="text-base md:text-lg text-muted max-w-2xl mx-auto">
            开始使用最受欢迎的功能
          </Paragraph>
        </div>

        <Row gutter={[16, 16]} justify="center" className="md:gutter-24">
          {scenarios.map((scenario) => (
            <Col xs={24} sm={12} md={12} lg={8} xl={6} key={scenario.id}>
              <div style={{ height: '240px' }} className="md:h-[280px]">
                <ScenarioCard
                  title={scenario.title}
                  description={scenario.description}
                  icon={scenario.icon}
                  onClick={() => handleScenarioClick(scenario.id)}
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default QuickAccessSection;
