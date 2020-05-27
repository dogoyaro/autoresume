import React from 'react';
import { Typography, Card } from 'antd';
import TabBarItem from './index';
import { PREVIEW_CONTENT_TYPES } from '../../constants';

const CONTENT_MAPPING = {
  [PREVIEW_CONTENT_TYPES.NAME]: ({ firstName, lastName }: any) => (
    <FullNameContent firstName={firstName} lastName={lastName} />
  ),
};

const { Text } = Typography;

const FullNameContent: React.FC<FullNameContent> = ({ firstName, lastName }) => {
  return (
    <Text code>
      {firstName} {lastName}
    </Text>
  );
}

const PreviewContent = (tabs: TabBarItem[]) => {
  return tabs.map(({ contentType, content }: TabBarItem) => {
    const contentDisplay = CONTENT_MAPPING[contentType]
      ? CONTENT_MAPPING[contentType](content)
      : null; 
    return <TabContent>{contentDisplay}</TabContent>;
  });
};

const TabContent = (props: any) => {
  return <Card>{props.children}</Card>; 
}

interface TabBarItem {
  tabKey: string;
  title: string;
  contentType: string;
  content: any;
}

interface PreviewContentProps {
  tabs: TabBarItem[]
}

interface FullNameContent {
  firstName: string;
  lastName: string;
}

export default PreviewContent;
