import React, { useState } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import Wins from '../../components/Wins';
import Drawer from '../../components/Drawer';

const Dashboard = () => {
  const [collapsed, setCollapse] = useState(false);
  return (
    <Layout>
      <Drawer collapsed={collapsed} />
      <Switch>
        <Route path="/wins">
          <Wins collapsed={collapsed} setSiderCollapse={setCollapse} />
        </Route>
      </Switch>
    </Layout>
  );
};

export default Dashboard;
