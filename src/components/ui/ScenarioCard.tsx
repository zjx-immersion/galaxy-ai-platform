import React from 'react';
import { Card, Typography } from 'antd';
import { CardProps } from 'antd/es/card';

const { Title, Paragraph } = Typography;

interface ScenarioCardProps extends Omit<CardProps, 'onClick'> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({
  title,
  description,
  icon,
  onClick,
  className = '',
  ...props
}) => {
  return (
    <Card
      className={`scenario-card cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
      variant="outlined"
      hoverable
      onClick={onClick}
      style={{
        borderRadius: 0,
        padding: '8px',
        height: '100%',
        background: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: 'none',
      }}
      styles={{
        body: {
          padding: '24px',
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }
      }}
      {...props}
    >
      <div className="flex flex-col items-center justify-center h-full">
        {icon && (
          <div className="mb-6 text-5xl" style={{ color: '#2d5a4a' }}>
            {icon}
          </div>
        )}
        <Title level={4} className="mb-3" style={{ color: '#333333', margin: '0 0 12px 0' }}>
          {title}
        </Title>
        <Paragraph
          className="mb-0 text-center"
          style={{
            color: '#666666',
            fontSize: '14px',
            lineHeight: '1.6',
            margin: 0
          }}
        >
          {description}
        </Paragraph>
      </div>
    </Card>
  );
};

export default ScenarioCard;
