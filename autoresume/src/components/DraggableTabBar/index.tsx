import React from 'react';
import { draggableTypes } from '../../constants';
import Draggable from '../hoc/Draggable';

const { PREVIEW_TAB_BAR } = draggableTypes;


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
  return (
    <Draggable
      itemKey={tabKey}
      children={children}
      index={index}
      move={moveTab}
      dragType={PREVIEW_TAB_BAR}
    />
  );

};

export interface TabBarItem {
  tabKey: string;
  title: string;
  contentType: string; 
  content: any;
}

export default DraggableTabBar;
