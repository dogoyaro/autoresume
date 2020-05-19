import React from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu, Typography } from 'antd';
import {
  FilePdfOutlined,
  CrownOutlined,
  DatabaseOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import constants from '../../constants';

const { WINS_PATH, ROLES_PATH, GET_PDF_PATH, SETTINGS_PATH } = constants;


const { Sider } = Layout;
const { Title } = Typography;

type DrawerProps = {
  collapsed: boolean;
};

const Drawer = (props: DrawerProps) => {
  const { collapsed } = props;

  return (
    <Sider
      trigger={null}
      theme="light"
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
    >
      <div
        className="logo"
        style={{ height: 32, margin: 16, textAlign: 'center' }}
      >
        <Title level={4}>{collapsed ? 'L' : 'Logbook'}</Title>
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        inlineIndent={48}
        style={{ textAlign: 'left' }}
      >
        <Menu.Item key="1">
          <CrownOutlined />
          <span>Wins</span>
          <Link to={WINS_PATH} />
        </Menu.Item>
        <Menu.Item key="2">
          <DatabaseOutlined />
          <span>Roles</span>
          <Link to={ROLES_PATH} />
        </Menu.Item>
        <Menu.Item key="3">
          <FilePdfOutlined />
          <span>Pdf</span>
          <Link to={GET_PDF_PATH} />
        </Menu.Item>
        <Menu.Item key="4">
          <SettingOutlined />
          <span>Settings</span>
          <Link to={SETTINGS_PATH} />
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Drawer;
