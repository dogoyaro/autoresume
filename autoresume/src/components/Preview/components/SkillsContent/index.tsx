import React from 'react';
import { Typography, Card } from 'antd';

const { Text } = Typography;

const SkillsContent: React.FC<SkillsContentProps> = (props) => {
  const { categories } = props;
  return (
    <Card
      hoverable
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 30,
      }}
    >
      {categories.map(({ name, skills }) => {
        return (
          <div>
            <Text>{name}</Text>:{' '}
            {skills.map((skill) => (
              <><Text code>{skill}</Text>{' '}</>
            ))}
          </div>
        );
      })}{' '}
    </Card>
  );
};

interface Category {
  name: string;
  skills: string[];
}

export interface SkillsContentProps {
  categories: Category[];
}

export default SkillsContent;
