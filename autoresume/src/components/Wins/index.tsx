import React, { useState } from 'react';
import { Layout, List, Input, Button } from 'antd';
import GenericHeader from '../GenericHeader';
import WinCard from '../WinCard';
import AddWin from '../AddWin';

const { Content } = Layout;
const { Search } = Input;

const dummyWins = [
  {
    date: '12/01/2020',
    title: 'TAMM - Software Engineer',
    description:
      'Deployed up to 20 services to the platform allowing users unlock value that ranged from requesting for city permits, to requesting support for a range of interesting problems',

    skills: [
      {
        name: 'python',
        key: 1,
      },
      {
        name: 'javascript',
        key: 2,
      },
      {
        name: 'system design',
        key: 3,
      },
    ],
  },
  {
    date: '12/01/2020',
    title: 'TAMM - software engineer',
    description:
      'deployed up to 20 services to the platform allowing users unlock value that ranged from requesting for city permits, to requesting support for a range of interesting problems',

    skills: [
      {
        name: 'python',
        key: 1,
      },
      {
        name: 'javascript',
        key: 2,
      },
      {
        name: 'system design',
        key: 3,
      },
    ],
  },
  {
    date: '12/01/2020',
    title: 'TAMM - software engineer',
    description:
      'deployed up to 20 services to the platform allowing users unlock value that ranged from requesting for city permits, to requesting support for a range of interesting problems',

    skills: [
      {
        name: 'python',
        key: 1,
      },
      {
        name: 'javascript',
        key: 2,
      },
      {
        name: 'system design',
        key: 3,
      },
    ],
  },
  {
    date: '12/01/2020',
    title: 'TAMM - software engineer',
    description:
      'deployed up to 20 services to the platform allowing users unlock value that ranged from requesting for city permits, to requesting support for a range of interesting problems',

    skills: [
      {
        name: 'python',
        key: 1,
      },
      {
        name: 'javascript',
        key: 2,
      },
      {
        name: 'system design',
        key: 3,
      },
    ],
  },

];

const Wins = (props: WinsProps) => {
  const { collapsed, setSiderCollapse } = props;
  return (
    <Layout>
      <WinsHeader
        collapsed={collapsed}
        setSiderCollapse={setSiderCollapse}
        searchParam={() => {}}
      />
      <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
        <WinsGrid wins={dummyWins} />
      </Content>
    </Layout>
  );
};

const WinsHeader = (props: WinHeaderProps) => {
  const { collapsed, setSiderCollapse, searchParam } = props;
  return (
    <GenericHeader collapsed={collapsed} setSiderCollapse={setSiderCollapse}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 4,
        }}
      >
        <SearchInput
          searchParam={searchParam}
        />
        <div style={{ padding: '0 20px' }}>
          <AddWin />
        </div>
      </div>
    </GenericHeader>
  );
}

const SearchInput = (props: SearchInputProps) => {
  const { searchParam } = props;
  return (
    <Search
      placeholder="search your accomplishments"
      onSearch={(value: string) => searchParam(value)}
      size="large"
      enterButton
    />
  ); 
}

const WinsGrid = (props: { wins: Win[] }) => {
  const { wins } = props;
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 3,
      }}
      dataSource={wins}
      renderItem={(win: Win) => (
        <List.Item>
          <WinCard win={win} />
        </List.Item>
      )}
    />
  );
};


export default Wins;

// TODO: Move types to declaration files. What even are declaration files?
type Win = {
  description: string,
  skills: Skill[],
  date: string,
  title: string,
}

type Skill = {
  name: string;
}

type WinsProps = {
  collapsed: boolean;
  setSiderCollapse: Function;
};

type SearchInputProps = { searchParam: Function };

// TODO: Do not use Function why?
type WinHeaderProps = WinsProps & SearchInputProps;

