import React from 'react';
import TabBarItem from './index';
import { draggableTypes, PREVIEW_CONTENT_TYPES } from '../../constants';
import Draggable from '../hoc/Draggable';
import ExperienceContent, {
  ExperienceContentProps,
} from './components/ExperienceContent';
import FullNameContent, {
  FullNameContentProps,
} from './components/FullnameContent';
import AddressContent, {
  AddressContentProps,
} from './components/AddressContent';
import EducationContent, {
  EducationContentProps,
} from './components/EducationContent';
import SkillsContent, { SkillsContentProps } from './components/SkillsContent';

const { PREVIEW_CONTENT_CARD } = draggableTypes;

const CONTENT_MAPPING = {
  [PREVIEW_CONTENT_TYPES.NAME]: ({
    firstName,
    lastName,
  }: FullNameContentProps) => (
    <FullNameContent firstName={firstName} lastName={lastName} />
  ),
  [PREVIEW_CONTENT_TYPES.ADDRESS]: ({
    home,
    email,
    phone,
    social,
  }: AddressContentProps) => (
    <AddressContent home={home} email={email} phone={phone} social={social} />
  ),
  [PREVIEW_CONTENT_TYPES.EXPERIENCE]: ({ roles }: ExperienceContentProps) => (
    <ExperienceContent roles={roles} />
  ),
  [PREVIEW_CONTENT_TYPES.EDUCATION]: ({ education }: EducationContentProps) => (
    <EducationContent education={education} />
  ),
  [PREVIEW_CONTENT_TYPES.SKILLS]: ({ categories }: SkillsContentProps) => (
    <SkillsContent categories={categories} />
  ),
};

const PreviewContent = (
  tabs: TabBarItem[],
  moveTab: any,
  findTab: any,
  changeActiveTab: any,
) => {
  return tabs.map(
    ({ contentType, content, tabKey }: TabBarItem, index: number) => {
      console.log('the tabkey, index', tabKey, index);
      const contentDisplay =
        CONTENT_MAPPING[contentType] && content
          ? CONTENT_MAPPING[contentType](content)
          : null;
      return (
        <Draggable
          itemKey={tabKey}
          index={findTab(tabKey)}
          dragType={PREVIEW_CONTENT_CARD}
          move={moveTab}
        >
          <div onClick={() => changeActiveTab(tabKey)}>{contentDisplay}</div>
        </Draggable>
      );
    },
  );
};

interface TabBarItem {
  tabKey: string;
  title: string;
  contentType: string;
  content: any;
}

export default PreviewContent;
