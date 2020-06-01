import React from 'react';
import { Typography, Card } from 'antd';

const { Text } = Typography;

const EducationContent: React.FC<EducationContentProps> = (props) => {
  const { education } = props;
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
      {education.map(({ degree, school, startYear, endYear }) => (
        <Card
          type="inner"
          style={{ width: '100%' }}
          bodyStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <Text code>{school}</Text>,{' '} 
            <Text code>{degree}</Text>
          </div>
          <span>
            <Text code>
              {startYear} - {endYear}
            </Text>
          </span>
        </Card>
      ))}
    </Card>
  );

}

interface Education {
  degree: string;
  school: string;
  startYear: string;
  endYear: string;
}

export interface EducationContentProps {
  education: Education[];
}

export default EducationContent;
