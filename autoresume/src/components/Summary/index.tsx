import React from 'react';
import { Tabs, Layout } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import GenericHeader from '../GenericHeader';
import Download from '../Download';
import './Summary.css';

const { TabPane } = Tabs;
const { Content } = Layout;

const Summary = (props: SummaryProps) => {
  const { collapsed, setSiderCollapse } = props;
  return (
    <Layout style={{ height: '100vh' }}>
      <SummaryHeader
        collapsed={collapsed}
        setSiderCollapse={setSiderCollapse}
      />
      <Content
        style={{ margin: '24px 16px', padding: '0 15%', minHeight: 280 }}
      >

        <SummaryTabs />
      </Content>
    </Layout>
  );
};

const SummaryHeader = (props: SummaryHeaderProps) => {
  const { collapsed, setSiderCollapse } = props;
  return (
    <GenericHeader collapsed={collapsed} setSiderCollapse={setSiderCollapse} />
  );
};

const SummaryTabs = () => {
  return (
    <>
    <div className="card-container">
      <Tabs type="card" tabBarStyle={{ display: 'flex', flex: 1 }}>
        <TabPane
          key="1"
          tab={
            <span>
              <DownloadOutlined />
              Download
            </span>
          }
        >
          <Download />
        </TabPane>
        <TabPane
          key="2"
          tab={
            <span>
              <UploadOutlined />
              Upload
            </span>
          }
        >
              Upload Tab Coming Soon...
        </TabPane>
      </Tabs>
    </div>
    </>
  );
};

type SummaryProps = {
  collapsed: boolean;
  setSiderCollapse: (shouldCollapse: boolean) => any;
};

type SummaryHeaderProps = SummaryProps;

export default Summary;
