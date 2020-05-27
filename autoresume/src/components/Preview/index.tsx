import React, { useState } from 'react';
import { Tabs } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import { DragObjectWithType, DndProvider, useDrag, useDrop } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { PREVIEW_CONTENT_TYPES, draggableTypes } from '../../constants';
import PreviewContent from './Content';

const { PREVIEW_TAB_BAR } = draggableTypes;
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
      content: { firstName: 'Pravin', lastName: 'Kumar' }
    },
    {
      title: 'Address',
      tabKey: '2',
      contentType: PREVIEW_CONTENT_TYPES.ADDRESS,
      content: null,
    },
    {
      title: 'Experience',
      tabKey: '3',
      contentType: PREVIEW_CONTENT_TYPES.EXPERIENCE,
      content: null,
    },
    {
      title: 'Education',
      tabKey: '4',
      contentType: PREVIEW_CONTENT_TYPES.EDUCATION,
      content: null,
    },
    {
      title: 'Skills',
      tabKey: '5',
      contentType: PREVIEW_CONTENT_TYPES.SKILLS,
      content: null,
    },
  ];
  const [tabs, setTabs] = useState<TabBarItem[]>(initialTabs);

  const findTab = (key: string) => tabs.findIndex(tab => tab.tabKey === key); 
  const moveTab = (destinationKey: string, originalIndex: number) => {
    const destinationIndex = findTab(destinationKey);
    setTabs(update (tabs, {
      $splice: [[destinationIndex, 1], [originalIndex, 0, tabs[destinationIndex]]]
    }))
  }

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
    >
      {tabs.map((tab) => (
        <TabPane tab={tab.title} key={tab.tabKey}>
            {PreviewContent(tabs)}
        </TabPane>
      ))}
    </Tabs>
  );
};

const DraggableTabBar = ({
  tabKey,
  children,
  index,
  moveTab
}: {
  tabKey: string;
  children: JSX.Element;
  index: number;
  moveTab: (destinationKey: string, originalIndex: number) => void;
}) => {
  const moveTabBar = (destinationKey: string) => { moveTab(destinationKey, index) };

  const [{ isDragging }, drag] = useDrag({
    item: { type: PREVIEW_TAB_BAR, tabKey },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: PREVIEW_TAB_BAR,
    canDrop: () => false,
    hover({ tabKey: draggedKey }: TabBarItemType) {
      if (draggedKey !== tabKey) {
        moveTabBar(draggedKey);
      }
    },
  });

  const opacity = isDragging ? 0 : 1;

  return React.cloneElement(children, { ref: (node: any) => drag(drop(node)) });
};

interface TabBarItem {
  tabKey: string;
  title: string;
  contentType: string; 
  content: any;
}

interface TabBarItemType extends TabBarItem, DragObjectWithType {}

interface DraggableTabsProps {
}
export default Preview;
