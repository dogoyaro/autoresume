import React from 'react';
import { Card, Typography, Tag } from 'antd';

const { Paragraph, Text } = Typography;

const WinCard = (props: { win: Win }) => {
  const { win } = props;
  const { title, date, skills, description } = win;
  return (
    <Card
      hoverable
      bodyStyle={{ textAlign: 'left', paddingLeft: 30 }}
    >
      <CustomHeader title={title} date={date} />
      <Description description={description} />
      <Skills skills={skills} />
    </Card>
  );
};

const Description = ({ description }: { description: string }) => {
  return <Paragraph ellipsis={{ rows: 3, expandable: true }}>{description}</Paragraph>;
};

const CustomHeader = ({ title, date }: { title: string; date: string }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 25 }}>
    <Text strong>{title}</Text>
    <Text strong>{date}</Text>
  </div>
);

const Skills = ({ skills }: { skills: { name: string }[] }) => {
  return (
    <div>
      {skills.map(({ name, ...rest }) => (
        <Tag color="success" {...rest}>
          {name}
        </Tag>
      ))}
    </div>
  );
};

export default WinCard;

// TODO: Move types to declaration files. What even are declaration files?
export type Win = {
  description: string,
  skills: Skill[],
  date: string,
  title: string,
}

type Skill = {
  name: string;
}
