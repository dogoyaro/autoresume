import React, { useState } from 'react';
import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { PREVIEW_CONTENT_TYPES, } from '../../constants';
import PreviewContent from './Content';
import DraggableTabBar, { TabBarItem } from '../DraggableTabBar';

const { TabPane } = Tabs;

const Preview = () => {
  return (
    <DndProvider backend={Backend}>
      <DraggableTabs />
    </DndProvider>
  );
};

const DraggableTabs: React.FC<DraggableTabsProps> = () => {
  const initialTabs: TabBarItem[] = [
    {
      title: 'Name',
      tabKey: '1',
      contentType: PREVIEW_CONTENT_TYPES.NAME,
      content: { firstName: 'Pravin', lastName: 'Kumar' },
    },
    {
      title: 'Address',
      tabKey: '2',
      contentType: PREVIEW_CONTENT_TYPES.ADDRESS,
      content: {
        home: 'House 5, Villa 19, Mohammed Bin Zayed City, Abu Dhabi, U.A.E',
        email: 'pravin.kumar@appsintegra.com',
        phone: '+971495898987',
        social: { linkedIn: 'pravinkumar', github: 'pravinkumar' },
      },
    },
    {
      title: 'Experience',
      tabKey: '3',
      contentType: PREVIEW_CONTENT_TYPES.EXPERIENCE,
      content: {
        roles: [
          {
            company: 'Andela',
            startDate: '12/12/2020',
            endDate: '12/12/2020',
            wins: [
              'Deployed services that helped users track their growth trajectory',
              'Accomplished a shit ton of stuff, believe me I did',
            ],
          },
          {
            company: 'Jetpack',
            startDate: '12/12/2020',
            endDate: '12/12/2020',
            wins: [
              'Deployed services that helped users track their growth trajectory',
              'Accomplished a shit ton of stuff, believe me I did',
            ],
          },
        ],
      },
    },
    {
      title: 'Education',
      tabKey: '4',
      contentType: PREVIEW_CONTENT_TYPES.EDUCATION,
      content: {
        education: [
          {
            degree: 'B.Sc. Electrical Electronic Engineering',
            school: 'University of Ibadan',
            startYear: '12/12/2020',
            endYear: '12/12/2020',
          },
          {
            degree: 'M.Sc. Computing',
            school: 'Georgia Tech',
            startYear: '12/12/2020',
            endYear: '12/12/2020',
          },
        ],
      },
    },
    {
      title: 'Skills',
      tabKey: '5',
      contentType: PREVIEW_CONTENT_TYPES.SKILLS,
      content: {
        categories: [
          {
            name: 'Languages',
            skills: ['Python', 'Javascript'],
          },
          {
            name: 'Tools',
            skills: ['AWS', 'Docker'],
          },
        ],
      },
    },
  ];
  const [tabs, setTabs] = useState<TabBarItem[]>(initialTabs);
  const [activeKey, setActiveKey] = useState(initialTabs[0].tabKey);

  const changeActiveTab = setActiveKey;

  const findTab = (key: string) => tabs.findIndex((tab) => tab.tabKey === key);
  const moveTab = (destinationKey: string, originalIndex: number) => {
    const destinationIndex = findTab(destinationKey);
    setTabs(
      update(tabs, {
        $splice: [
          [destinationIndex, 1],
          [originalIndex, 0, tabs[destinationIndex]],
        ],
      }),
    );
  };

  const renderTabBar = (props: TabsProps, DefaultBar: React.ComponentClass) => (
    <DefaultBar {...props}>
      {(node: any) => {
        return (
          <DraggableTabBar
            tabKey={node.key}
            index={findTab(node.key)}
            moveTab={moveTab}
          >
            {node}
          </DraggableTabBar>
        );
      }}
    </DefaultBar>
  );

  return (
    <Tabs
      renderTabBar={renderTabBar}
      tabPosition="left"
      size="small"
      activeKey={activeKey}
    >
      {tabs.map((tab) => (
        <TabPane tab={tab.title} key={tab.tabKey}>
          {PreviewContent(tabs, moveTab, findTab, changeActiveTab)}
        </TabPane>
      ))}
    </Tabs>
  );
};

interface DraggableTabsProps {}
export default Preview;
