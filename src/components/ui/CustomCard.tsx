import React from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/es/card';

interface CustomCardProps extends CardProps {
  children: React.ReactNode;
  hover?: boolean;
  gradient?: boolean;
}

const CustomCard: React.FC<CustomCardProps> = ({
  children,
  hover = true,
  gradient = false,
  className = '',
  ...props
}) => {
  const cardClass = `
    ${hover ? 'custom-card' : ''}
    ${gradient ? 'gradient-primary' : ''}
    ${className}
  `.trim();

  return (
    <Card
      className={cardClass}
      variant="outlined"
      {...props}
    >
      {children}
    </Card>
  );
};

export default CustomCard;
