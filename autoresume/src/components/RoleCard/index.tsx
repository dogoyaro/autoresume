import React, { useState } from 'react';
import { Card, Typography, Carousel } from 'antd';
import WinCard, { Win } from '../WinCard';

const { Paragraph, Text } = Typography;

const CompanyName = ({ company }: { company: string }) => {
  return <Text style={{ textAlign: 'left' }} strong>{company}</Text>
}

const RoleTitle = ({ title }: { title: string }) => {
  return <Text strong>{title}</Text>;
};

const RoleDescription = ({ description }: { description: string }) => {
  return (
    <Paragraph
      style={{ textAlign: 'left' }}
      ellipsis={{ rows: 3, expandable: true }}
    >
      {description}
    </Paragraph>
  );
}

const Wins = ({ wins, autoplay }: { wins: Win[]; autoplay: boolean }) => {
  return (
    <Carousel autoplay={autoplay}>
      {wins.map((win) => (
        <WinCard win={win} />
      ))}
    </Carousel>
  );
};

const Dates = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  return (
    <div>
      <Text strong>{startDate}</Text>
      {endDate && <span> - </span>}
      <Text strong>{endDate}</Text>
    </div>
  );
};

const RoleCard = ({
  role: { company, title, description, wins, startDate, endDate },
}: {
  role: Role;
}) => {
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  return (
    <Card
      onFocus={() => setShouldAutoplay(true)}
      onBlur={() => setShouldAutoplay(false)}
      style={{padding: '15px 10px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            marginBottom: 20,
          }}
        >
          <CompanyName company={company} />
          <RoleTitle title={title} />
        </div>
        <Dates startDate={startDate} endDate={endDate} />
      </div>
      <RoleDescription description={description} />
      <Wins wins={wins} autoplay={shouldAutoplay} />
    </Card>
  );
};

export default RoleCard;

export type Role = {
  company: string,
  title: string,
  description: string,
  wins: Win[],
  startDate: string,
  endDate: string,
}
