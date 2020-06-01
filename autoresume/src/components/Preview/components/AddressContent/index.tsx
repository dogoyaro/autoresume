import React from 'react';
import { Typography, Card } from 'antd';
import { LinkedinFilled, GithubOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const AddressContent: React.FC<AddressContentProps> = (props) => {
  const { home, email, phone, social } = props;
  const { github, linkedIn } = social || {};
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
      <Paragraph code>{home}</Paragraph>
      <Text code>{email}</Text>
      <Text code>{phone}</Text>
      <div style={{ display: 'flex', marginTop: 10, flexDirection: 'column' }}>
        {github && (
          <span>
            <GithubOutlined />
            {'  '} <Text underline>{github}</Text>
          </span>
        )}
        {linkedIn && (
          <span>
            <LinkedinFilled />
            {'  '}
            <Text underline>{linkedIn}</Text>
          </span>
        )}
      </div>
    </Card>
  );
};

interface SocialMedia {
  linkedIn?: string;
  github?: string;
}

export interface AddressContentProps {
  home?: string;
  email?: string;
  phone?: string;
  social?: SocialMedia;
}

export default AddressContent;
