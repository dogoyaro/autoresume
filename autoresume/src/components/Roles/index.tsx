import React from 'react';
import { Layout, List } from 'antd';
import GenericHeader from '../GenericHeader';
import SearchInput, { SearchInputProps } from '../SearchInput';
import RoleCard, { Role } from '../RoleCard';
import AddRole from '../AddRole';
import { useGetRoles } from '../../hooks';

const { Content } = Layout;

const dummyRoles = [
  {
    company: 'TAMM',
    title: 'Software Engineer',
    description: 'Migrating services for the Abu Dhabi Government',
    wins: [],
    startDate: '12/01/2020',
    endDate: '12/02/2020',
  },
  {
    company: 'TAMM',
    title: 'Software Engineer',
    description: 'Migrating services for the Abu Dhabi Government',
    wins: [],
    startDate: '12/01/2020',
    endDate: '12/02/2020',
  },
];

const Roles = (props: RolesProps) => {
  const roles = useGetRoles();
  console.log('the value of the roles');
  const { collapsed, setSiderCollapse } = props;
  return (
    <Layout style={{ height: '100vh' }}>
      <RolesHeader
        collapsed={collapsed}
        setSiderCollapse={setSiderCollapse}
        placeholder="Search Your Roles"
        searchParam={() => {}}
      />
      <Content style={{ margin: '24px 16px', padding: '0 15%', minHeight: 280 }} >
        <RolesGrid roles={dummyRoles} />
      </Content>
    </Layout>
  );
};

const RolesHeader = (props: RolesHeaderProps) => {
  const { collapsed, setSiderCollapse, searchParam, placeholder } = props;
  return (
    <GenericHeader collapsed={collapsed} setSiderCollapse={setSiderCollapse}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 4,
        }}
      >
        <SearchInput
          placeholder={placeholder}
          searchParam={searchParam}
        />
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
          <AddRole />
        </div>
      </div>
    </GenericHeader>
  );
}

const RolesGrid = ({ roles }: { roles: Role[] }) => {
  return (
    <List
      grid={{
        gutter: 1,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 1,
      }}
      dataSource={roles}
      renderItem={(role: Role) => (
        <List.Item>
          <RoleCard role={role} />
        </List.Item>
      )}
    />
  )

}

export default Roles;

type RolesProps = {
  collapsed: boolean;
  setSiderCollapse: Function;
};

type RolesHeaderProps = RolesProps & SearchInputProps;
