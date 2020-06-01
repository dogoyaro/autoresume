import React from 'react';
import { Typography, Card } from 'antd';

const { Text } = Typography;

const FullNameContent: React.FC<FullNameContentProps> = ({ firstName, lastName }) => {
  return (
    <Card hoverable bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Text editable code>
        {firstName} {lastName}
      </Text>
    </Card>
  );
}

export interface FullNameContentProps {
  firstName: string;
  lastName: string;
}

export default FullNameContent;
