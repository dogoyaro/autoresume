import React, { useState } from 'react';
import {
  Input,
  Form,
  Button,
  Modal,
  Typography,
  DatePicker,
  Select,
  Tooltip,
} from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import SelectSkills from '../SelectSkills';
import RoleForm from '../RoleForm';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const AddWin = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Button type="primary" size="large" onClick={() => setShowModal(true)}>
        Add Win
      </Button>
      <AddWinModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

const AddWinModal = (props: AddWinModalProps) => {
  const { showModal, setShowModal } = props;
  const addWinInitialValues = {};
  const handleCancel = () => setShowModal(false);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };

  return (
    <Modal
      title={<Title level={4}>Add Win</Title>}
      visible={showModal}
      onCancel={handleCancel}
      bodyStyle={{ padding: 40 }}
      width="40%"
    >
      <Form
        {...formItemLayout}
        layout="vertical"
        size="large"
        name="Add Win"
        initialValues={addWinInitialValues}
      >
        <Form.Item>
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <TextArea
            placeholder="Describe the value of what you have achieved e.g I worked to optimize javascript size that reduced the page load time by 20%"
            autoSize={{ minRows: 3 }}
            style={{ resize: 'none' }}
          />
        </Form.Item>
        <Form.Item>
          <SelectSkills skillList={['python', 'javascript', 'system design']} />
        </Form.Item>
        <Form.Item>
          <AddRoleForm
            roles={[{ id: 1, name: 'Software Engineer', company: 'TAMM' }]}
          />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Add comma separated Links" size="middle" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const AddRoleForm = (props: { roles: Role[] }) => {
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState('');

  const { roles } = props;
  const handleFormSubmit = (values: any) => {
    console.log('the values', values);
  };

  const roleForm = (
    <RoleForm
      handleFormSubmit={handleFormSubmit}
      showButton={true}
      size="small"
    />
  ); 
  const handleRoleSelection = (value: string) => {
    setRole(value);
  };

  return (
    <>
      <Input.Group style={{ display: 'flex', alignItems: 'center' }}>
        <Select
          showSearch
          size="middle"
          placeholder="Add Role"
          value={role ? role : undefined}
          onChange={handleRoleSelection}
          style={{ marginRight: 10, display: 'flex', minWidth: '50%' }}
        >
          {roles.map((role) => (
            <Option value={role.id}>{`${role.name} - ${role.company}`}</Option>
          ))}
        </Select>
        <Tooltip title="Add a New Role">
          <Button
            type="link"
            icon={showForm ? <MinusCircleOutlined /> : <PlusCircleOutlined />}
            onClick={() => setShowForm(!showForm)}
          />
        </Tooltip>
      </Input.Group>
      <div style={{ padding: showForm ? 30 : 0 }}>{showForm && roleForm}</div>
    </>
  );
};

type Role = {
  id: number;
  name: string;
  company: string;
};

type AddWinModalProps = {
  showModal: boolean;
  setShowModal: Function;
};

export default AddWin;
