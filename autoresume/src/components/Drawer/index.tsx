import React from 'react';

import { Layout, Menu, Typography } from 'antd';
import {
  FilePdfOutlined,
  CrownOutlined,
  DatabaseOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { Title } = Typography;

type DrawerProps = {
  collapsed: boolean;
};

const Drawer = (props: DrawerProps) => {
  const { collapsed } = props;

  return (
    <Sider trigger={null} theme="light" collapsible collapsed={collapsed}>
      <div
        className="logo"
        style={{ height: 32, margin: 16, textAlign: 'center' }}
      >
        <Title level={4}>{collapsed ? "L" : "Logbook"}</Title>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        inlineIndent={48}
        style={{ textAlign: 'left' }}
      >
        <Menu.Item key="1" icon={<CrownOutlined />}>
          Wins
        </Menu.Item>
        <Menu.Item key="2" icon={<DatabaseOutlined />}>
          Roles
        </Menu.Item>
        <Menu.Item key="3" icon={<FilePdfOutlined />}>
          Pdf
        </Menu.Item>
        <Menu.Item key="4" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Drawer;
