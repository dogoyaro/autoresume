import React from 'react';
import { Typography, Card, Collapse } from 'antd';
import './index.css';

const { Panel } = Collapse;

const { Paragraph } = Typography;

const ExperienceContent: React.FC<ExperienceContentProps> = (props) => {
  const { roles } = props;
  return (
    <Card hoverable>
      <Collapse bordered={false} className="site-collapse-custom-collapse">
        {roles.map((role, index) => {
          const { company, startDate, endDate, wins } = role;
          return (
            <Panel
              header={`${company} ${startDate} - ${endDate}`}
              key={index}
              className="site-collapse-custom-panel"
            >
              <ExperienceItem
                company={company}
                startDate={startDate}
                endDate={endDate}
                wins={wins}
              />
            </Panel>
          );
        })}
      </Collapse>
    </Card>
  );
};

const ExperienceItem: React.FC<Experience> = (props) => {
  const { wins } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      {wins.map((win: string) => (
        <Paragraph>{win}</Paragraph>
      ))}
    </div>
  );
};

export interface ExperienceContentProps {
  roles: Experience[];
}

interface Experience {
  company: string;
  startDate: string;
  endDate: string;
  wins: string[];
}

export default ExperienceContent;
