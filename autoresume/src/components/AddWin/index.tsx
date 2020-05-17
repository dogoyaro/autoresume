import React, { useState } from 'react';
import {
  Rate,
  Input,
  Form,
  Button,
  Modal,
  Typography,
  DatePicker,
  Select,
  Tag,
  Row,
  Col,
  Tooltip,
} from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
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

const SelectSkills = (props: { skillList: string[] }) => {
  const { skillList } = props;
  const initialSkills: { [key: string]: any } = {};
  const [skills, setSkills] = useState(initialSkills);
  const [presentSkill, setPresentSkill] = useState('');
  const [presentRate, setPresentRate] = useState(0);
  const [options, setOptions] = useState(skillList);

  const handleSkillSelectChange = (value: string) => {
    setPresentSkill(value);
    if (skills[value]) {
      setPresentRate(skills[value]);
    }
  };

  const handleRateSkillChange = (value: number) => {
    setPresentRate(value);
  };

  const handleAddSkillClick = () => {
    setPresentSkill('');
    setPresentRate(0);
    setSkills({ ...skills, [presentSkill]: presentRate });
  };

  const handleCloseTag = (key: string) => {
    const initialValue: { [key: string]: any } = {};
    const newSkills: { [key: string]: any } = Object.keys(skills).reduce(
      (reduced: { [key: string]: any }, skill: string) => {
        let result = reduced;
        if (skill !== key) {
          result = { ...reduced, [skill]: skills[skill] };
        }
        return result;
      },
      initialValue,
    );
    setSkills(newSkills);
  };

  const handleSearch = (value: string) => {
    const skillListSet = new Set([...skillList, value]);
    setOptions([...skillListSet]);
  };

  return (
    <div>
      <div>
        <Row gutter={[10, 5]}>
          {Object.entries(skills).map(([key, value]) => {
            return (
              <Col span={value + 6}>
                <Tag
                  visible
                  closable
                  color="cyan"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                  onClose={() => handleCloseTag(key)}
                >
                  {key}
                </Tag>
              </Col>
            );
          })}
        </Row>
      </div>
      <Input.Group style={{ display: 'flex', alignItems: 'center' }}>
        <Select
          showSearch
          placeholder="Add Skill"
          size="middle"
          value={presentSkill ? presentSkill : undefined}
          onChange={handleSkillSelectChange}
          onSearch={handleSearch}
          style={{ marginRight: 10, display: 'flex', minWidth: '25%' }}
        >
          {options.map((skill) => (
            <Option key={skill} value={skill}>
              {skill}
            </Option>
          ))}
        </Select>
        <Rate
          value={presentRate}
          onChange={handleRateSkillChange}
          style={{ marginRight: 10 }}
          allowClear
          allowHalf
        />
        <Tooltip title="Rank the Importance of this Skill to this Win">
          <Button
            type="link"
            icon={<PlusCircleOutlined />}
            onClick={handleAddSkillClick}
            disabled={!(presentRate && presentSkill)}
          />
        </Tooltip>
      </Input.Group>
    </div>
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
    <Form layout="vertical" size="small" onFinish={handleFormSubmit}>
      <Form.Item name="dates">
        <RangePicker />
      </Form.Item>
      <Form.Item
        name="companyName"
        rules={[
          {
            required: true,
            message:
              'Please enter the name of the Company/Organization e.g. Facebook, Open Source',
          },
        ]}
      >
        <Input placeholder="Enter Company Name" />
      </Form.Item>
      <Form.Item
        name="role"
        rules={[
          {
            required: true,
            message: 'Please enter the name of the role e.g. Software Engineer',
          },
        ]}
      >
        <Input placeholder="Enter Role. e.g Software Engineer" />
      </Form.Item>
      <Form.Item name="description">
        <Input.TextArea
          placeholder="Add Role Description"
          autoSize={{ minRows: 3 }}
          style={{ resize: 'none' }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="ghost" htmlType="submit">
          Add New Role
        </Button>
      </Form.Item>
    </Form>
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
