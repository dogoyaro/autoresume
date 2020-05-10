import React from 'react';
import { Layout, Popover, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

type GenericHeaderProps = {
  setSiderCollapse: Function;
  collapsed: boolean;
  children?: React.ReactNode;
};

const GenericHeader = (props: GenericHeaderProps) => {
  const { setSiderCollapse, collapsed } = props;

  return (
    <Header
      style={{
        padding: 0,
        background: '#fafafa',
        display: 'flex',
        alignItems: 'center',
      }}
      hasSider
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <div style={{ display: 'flex', flex: 3 }}>
          {collapsed ? (
            <MenuUnfoldOutlined onClick={() => setSiderCollapse(!collapsed)} />
          ) : (
            <MenuFoldOutlined onClick={() => setSiderCollapse(!collapsed)} />
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 4,
          }}
        >
          {props.children}
          <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
            <UserActions />
          </div>
        </div>
      </div>
    </Header>
  );
};

const UserActions = () => {
  const content = (
    <Menu mode="inline">
      <Menu.Item key="1" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Popover placement="bottomLeft" content={content}>
      <UserOutlined />
    </Popover>
  );
};

export default GenericHeader;
