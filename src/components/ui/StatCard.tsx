import React from 'react';
import { Card, Statistic } from 'antd';
import { CardProps } from 'antd/es/card';

interface StatCardProps extends CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  suffix?: string;
  precision?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  suffix,
  precision,
  className = '',
  ...props
}) => {
  return (
    <Card
      className={`stat-card ${className}`}
      variant="outlined"
      style={{ border: 'none' }}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-muted text-sm mb-1">{title}</div>
          <Statistic
            value={value}
            suffix={suffix}
            precision={precision}
            valueStyle={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#2d5a4a'
            }}
          />
        </div>
        {icon && (
          <div className="text-2xl text-primary-green opacity-60">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
